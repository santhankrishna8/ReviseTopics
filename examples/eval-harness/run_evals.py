"""Run an eval: every case through the task, every grader on every output, then a scored report.

    python run_evals.py triage --mock              no API key, no cost: a rule-based stand-in model
    python run_evals.py triage                     the real model (needs OPENAI_API_KEY)
    python run_evals.py grounded_qa --trials 3     repeat each case to see how much the model varies
    python run_evals.py triage --tag injection     only the cases with one tag
    python run_evals.py triage --save-baseline     later runs are compared with this one
    python run_evals.py triage --min-pass 0.9      exit code 1 below 90%: use it as a CI gate
"""
import argparse
import json
import math
import os
import sys
import time
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from llm import MockModel, Model, OpenAIModel
from tasks import TASKS, Task

HERE = Path(__file__).parent


def load_cases(path: Path, tag: str | None) -> list[dict]:
    cases = [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]
    return [c for c in cases if tag is None or tag in c.get("tags", [])]


def run_trial(task: Task, case: dict, model: Model, judge: Model | None) -> dict:
    try:
        reply = task.run(case, model)
    except Exception as e:   # one failed call is a failed case, not a crashed run
        return {"output": None, "latency_ms": None, "grades": {}, "error": f"{type(e).__name__}: {e}", "passed": False}
    grades = {}
    for grader in task.graders:
        try:
            grade = grader(case, reply.text, judge)
        except Exception as e:
            grades[grader.__name__] = {"passed": False, "reason": f"grader error {type(e).__name__}: {e}"}
            continue
        if grade is not None:
            grades[grader.__name__] = {"passed": grade.passed, "reason": grade.reason}
    passed = all(g["passed"] for g in grades.values())
    return {"output": reply.text, "latency_ms": round(reply.latency_ms), "grades": grades, "error": None, "passed": passed}


def wilson(k: int, n: int, z: float = 1.96) -> tuple[float, float]:
    """95% confidence interval for a pass rate of k out of n. Better than p ± 1.96·SE when n is small."""
    if n == 0:
        return 0.0, 0.0
    p = k / n
    d = 1 + z * z / n
    centre = (p + z * z / (2 * n)) / d
    half = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / d
    return max(0.0, centre - half), min(1.0, centre + half)


def percentile(values: list[float], q: float) -> float:
    s = sorted(values)
    return s[min(len(s) - 1, int(q * len(s)))] if s else 0.0


def label_metrics(task: Task, results: list[dict]) -> dict:
    """Precision, recall and F1 per label, counted over every trial."""
    tp, fp, fn = Counter(), Counter(), Counter()
    for r in results:
        want = task.label(r["case"])
        for t in r["trials"]:
            got = task.predicted(t["output"]) if t["output"] else None
            if got == want:
                tp[want] += 1
            else:
                fn[want] += 1
                if got:
                    fp[got] += 1
    out = {}
    for lab in sorted(set(tp) | set(fp) | set(fn)):
        p = tp[lab] / (tp[lab] + fp[lab]) if tp[lab] + fp[lab] else 0.0
        r = tp[lab] / (tp[lab] + fn[lab]) if tp[lab] + fn[lab] else 0.0
        out[lab] = {"precision": p, "recall": r, "f1": 2 * p * r / (p + r) if p + r else 0.0, "support": tp[lab] + fn[lab]}
    return out


def pct(x: float) -> str:
    return f"{100 * x:.1f}%"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("task", choices=TASKS)
    ap.add_argument("--model", default=os.getenv("OPENAI_MODEL", "gpt-4o-mini"))
    ap.add_argument("--judge-model", default=os.getenv("OPENAI_JUDGE_MODEL", "gpt-4o"))
    ap.add_argument("--temperature", default="0", help='sampling temperature, or "none" to leave it out')
    ap.add_argument("--trials", type=int, default=1, help="runs per case")
    ap.add_argument("--workers", type=int, default=8, help="parallel calls")
    ap.add_argument("--tag", help="only run cases with this tag")
    ap.add_argument("--mock", action="store_true", help="use the offline rule-based stand-in")
    ap.add_argument("--min-pass", type=float, default=0.0, help="exit 1 if the pass rate is below this (0-1)")
    ap.add_argument("--strict", action="store_true", help="also exit 1 if any case regressed from the baseline")
    ap.add_argument("--save-baseline", action="store_true")
    args = ap.parse_args()

    task = TASKS[args.task]
    cases = load_cases(task.data, args.tag)
    if not cases:
        print(f"no cases for tag {args.tag!r}")
        return 1
    temp = None if args.temperature.lower() == "none" else float(args.temperature)
    model = MockModel() if args.mock else OpenAIModel(args.model, temp)
    judge = (MockModel() if args.mock else OpenAIModel(args.judge_model, 0.0)) if task.needs_judge else None

    started = time.perf_counter()
    jobs = [(c, i) for c in cases for i in range(args.trials)]
    with ThreadPoolExecutor(args.workers) as pool:
        trials = list(pool.map(lambda job: run_trial(task, job[0], model, judge), jobs))
    results = [{"case": c, "trials": trials[k * args.trials:(k + 1) * args.trials]} for k, c in enumerate(cases)]
    elapsed = time.perf_counter() - started

    # ---------- summary ----------
    flat = [t for r in results for t in r["trials"]]
    passed = sum(t["passed"] for t in flat)
    rate = passed / len(flat)
    lo, hi = wilson(passed, len(flat))
    all_k = sum(all(t["passed"] for t in r["trials"]) for r in results)
    per_grader: dict[str, list[bool]] = {}
    for t in flat:
        for name, g in t["grades"].items():
            per_grader.setdefault(name, []).append(g["passed"])
    per_tag: dict[str, list[bool]] = {}
    for r in results:
        for tag in r["case"].get("tags", []):
            per_tag.setdefault(tag, []).extend(t["passed"] for t in r["trials"])
    latencies = [t["latency_ms"] for t in flat if t["latency_ms"]]

    print(f"\nTask {args.task}   model {model.name}" + (f"   judge {judge.name}" if judge else "")
          + f"   {len(cases)} cases x {args.trials} trial(s)   {elapsed:.1f}s")
    print(f"  Pass rate     {pct(rate)}  ({passed}/{len(flat)})   95% CI {pct(lo)}-{pct(hi)}")
    if args.trials > 1:
        print(f"  pass^{args.trials}        {pct(all_k / len(results))}  ({all_k}/{len(results)} cases passed every trial)")
    print("  Per grader    " + "   ".join(f"{n} {pct(sum(v) / len(v))}" for n, v in per_grader.items()))
    print("  Per tag       " + "   ".join(f"{n} {pct(sum(v) / len(v))} ({sum(v)}/{len(v)})" for n, v in sorted(per_tag.items())))
    labels = label_metrics(task, results) if task.label else {}
    for lab, m in labels.items():
        print(f"  {lab:<16}precision {m['precision']:.2f}   recall {m['recall']:.2f}   F1 {m['f1']:.2f}   n={m['support']}")
    if latencies:
        print(f"  Latency       p50 {percentile(latencies, 0.5):.0f} ms   p95 {percentile(latencies, 0.95):.0f} ms")
    print(f"  Tokens        model in {model.tokens_in:,} out {model.tokens_out:,}"
          + (f"   judge in {judge.tokens_in:,} out {judge.tokens_out:,}" if judge else ""))

    failures = Counter()   # identical failures across trials are printed once, with a count
    for r in results:
        for t in r["trials"]:
            if not t["passed"]:
                why = t["error"] or "; ".join(f"{n}: {g['reason']}" for n, g in t["grades"].items() if not g["passed"])
                failures[(r["case"]["id"], ", ".join(r["case"].get("tags", [])), why, (t["output"] or "").strip()[:160])] += 1
    if failures:
        print("\nFailures   (read these: they tell you what to fix next)")
        for (cid, tags, why, output), n in failures.items():
            print(f"  {cid} [{tags}]{f' x{n}' if n > 1 else ''} {why}")
            print(f"      output: {output!r}")

    # ---------- baseline comparison ----------
    now = {r["case"]["id"]: all(t["passed"] for t in r["trials"]) for r in results}
    baseline_path = HERE / "baselines" / f"{args.task}.json"
    regressed = []
    if baseline_path.exists():
        base = json.loads(baseline_path.read_text(encoding="utf-8"))
        before = base["by_case"]
        regressed = [i for i in now if before.get(i) is True and not now[i]]
        fixed = [i for i in now if before.get(i) is False and now[i]]
        delta = 100 * (rate - base["pass_rate"])
        print(f"\nvs baseline ({base['model']}, {pct(base['pass_rate'])}): {delta:+.1f} points   "
              f"regressed {regressed or 'none'}   fixed {fixed or 'none'}")

    record = {"task": args.task, "model": model.name, "judge_model": judge.name if judge else None,
              "trials": args.trials, "tag": args.tag, "created": time.strftime("%Y-%m-%dT%H:%M:%S"),
              "pass_rate": rate, "ci95": [lo, hi], "per_grader": {n: sum(v) / len(v) for n, v in per_grader.items()},
              "labels": labels, "by_case": now, "results": results}
    out_dir = HERE / "results"
    out_dir.mkdir(exist_ok=True)
    out = out_dir / f"{args.task}-{time.strftime('%Y%m%d-%H%M%S')}.json"
    out.write_text(json.dumps(record, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nSaved {out.relative_to(HERE)}")
    if args.save_baseline:
        if args.tag:
            print("not saving a baseline from a tag-filtered run")
        else:
            baseline_path.parent.mkdir(exist_ok=True)
            baseline_path.write_text(json.dumps({k: record[k] for k in ("task", "model", "created", "pass_rate", "by_case")},
                                                indent=2), encoding="utf-8")
            print(f"Baseline saved to {baseline_path.relative_to(HERE)}")

    if rate < args.min_pass:
        print(f"FAIL: pass rate {pct(rate)} is below the gate {pct(args.min_pass)}")
        return 1
    if args.strict and regressed:
        print(f"FAIL: {len(regressed)} case(s) regressed from the baseline")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
