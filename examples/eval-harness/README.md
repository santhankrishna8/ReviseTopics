# Eval harness

A small, complete LLM eval you can run, read in one sitting and explain in an interview. The notes in the app
(AI Engineer track → **LLM Evals**) explain every idea used here.

It tests two features of a made-up support app, "Acme Cloud":

| Task | What the model does | Graded by |
| --- | --- | --- |
| `triage` | Classify a support ticket into one of 5 categories (Structured Outputs) | code: valid JSON, category matches; precision, recall and F1 per category |
| `grounded_qa` | Answer only from a given context, or reply "I don't know" | code: abstains correctly, includes the key facts, excludes injected text; **LLM judge**: faithfulness |

## Run it

```bash
pip install -r requirements.txt
python -m pytest -q                         # tests for the graders themselves

python run_evals.py triage --mock           # no API key, no cost: a rule-based stand-in model
python run_evals.py triage                  # real model, needs OPENAI_API_KEY
python run_evals.py grounded_qa --trials 3  # run each case 3 times to see how much the model varies
python run_evals.py triage --tag injection  # only one slice of the dataset
python run_evals.py triage --model gpt-4.1-mini   # compare models; the score is compared with the baseline
python run_evals.py grounded_qa --min-pass 0.9 --strict   # CI gate: exit 1 below 90% or on any regression
```

Models default to `gpt-4o-mini` (task) and `gpt-4o` (judge). Override with `--model` and `--judge-model`, or the
`OPENAI_MODEL` and `OPENAI_JUDGE_MODEL` environment variables. For reasoning models that reject `temperature`,
pass `--temperature none`. A full run of both tasks is about 50 calls on small models, a few cents at most.

## Files

```text
llm.py           the only code that calls the model; counts tokens; MockModel for offline runs
tasks.py         the systems under test: prompts + calls. Edit a prompt here, then re-run
graders.py       code graders and the LLM judge (rubric, reasoning first, pass/fail via Structured Outputs)
run_evals.py     runner: parallel calls, trials, report, per-tag and per-label scores, baseline diff, CI exit code
data/*.jsonl     the datasets: one case per line, with expected values and tags
baselines/       the last accepted run per task (committed); later runs are diffed against it
results/         every run's full record: outputs, grades, reasons (git-ignored)
test_graders.py  unit tests for the graders
```

## The loop

1. Run the eval and **read the failures** (the report prints each one with its output).
2. Change one thing: the prompt in `tasks.py`, the model, or the temperature.
3. Run again. The report shows the change in score against `baselines/` and lists every case that regressed or was fixed.
4. Keep the change only if it wins with no important regressions, then `--save-baseline`.
5. When you find a new failure in real use, add it to `data/` as a case so it can never come back unnoticed.

## What a regression looks like

With the baseline at 100%, the QA prompt was weakened to "You are a helpful support assistant for Acme Cloud. Use
the context to answer the customer's question." (no "only the context", no "I don't know" rule):

```text
Pass rate     75.0%  (9/12)   95% CI 46.8%-91.1%
Per tag       core 100.0% (6/6)   injection 100.0% (2/2)   unanswerable 0.0% (0/3)
  q04 [unanswerable] answered a question the context cannot answer
      output: 'Currently, Acme Cloud does not offer a student discount. ...'
vs baseline (gpt-4o-mini, 100.0%): -25.0 points   regressed ['q04', 'q07', 'q12']
FAIL: 3 case(s) regressed from the baseline
```

`q04` is a real hallucination: the context never says there is no student discount. `q07` and `q12` refused
correctly but in their own words, so the strict `"I don't know"` check failed them. That is the trade-off between a
strict code grader (cheap, exact, sometimes too literal) and an LLM judge (flexible, costs money and needs checking).

## Ideas to extend it

- Make the dataset harder: both tasks score 100% on `gpt-4o-mini`, so the eval cannot catch the next regression.
  Add multi-issue tickets, long contexts, questions that are almost answerable.
- Check the judge: label 30 answers by hand and measure how often `judge_faithful` agrees with you.
- Track cost: multiply the token counts by your model's prices.
- Run it in CI on every pull request that touches `tasks.py` or `data/`.
