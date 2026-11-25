"""The only code that talks to a model. Every call goes through Model.chat, which also counts tokens.

MockModel is a rule-based stand-in with the same interface, so the whole harness runs with no API key and no cost.
It is not a model: it exists to show the pipeline and to test the harness itself.
"""
import json
import re
import threading
import time
from dataclasses import dataclass


@dataclass
class Reply:
    text: str
    latency_ms: float


class Model:
    name = "model"

    def __init__(self):
        self.tokens_in = self.tokens_out = self.calls = 0
        self._lock = threading.Lock()

    def _count(self, tokens_in: int, tokens_out: int):
        with self._lock:
            self.tokens_in += tokens_in
            self.tokens_out += tokens_out
            self.calls += 1

    def chat(self, messages: list[dict], schema: dict | None = None, schema_name: str = "output") -> Reply:
        raise NotImplementedError


class OpenAIModel(Model):
    def __init__(self, name: str, temperature: float | None = 0.0):
        super().__init__()
        from openai import OpenAI

        self.client = OpenAI(max_retries=5)   # the SDK retries 429 and 5xx with exponential backoff
        self.name = name
        self.temperature = temperature        # None: omit it (some reasoning models reject the parameter)

    def chat(self, messages, schema=None, schema_name="output"):
        kwargs = {}
        if schema:   # Structured Outputs: the reply is guaranteed to match the JSON Schema
            kwargs["response_format"] = {"type": "json_schema", "json_schema": {"name": schema_name, "strict": True, "schema": schema}}
        if self.temperature is not None:
            kwargs["temperature"] = self.temperature
        start = time.perf_counter()
        r = self.client.chat.completions.create(model=self.name, messages=messages, **kwargs)
        ms = (time.perf_counter() - start) * 1000
        self._count(r.usage.prompt_tokens, r.usage.completion_tokens)
        return Reply(r.choices[0].message.content or "", ms)


# ---------- the offline stand-in ----------

KEYWORDS = {   # first match wins, so the order matters
    "billing": ["charge", "refund", "invoice", "billing", "card", "plan", "cobra", "pay"],
    "account": ["password", "log in", "login", "2fa", "two-factor", "connecter", "delete my account"],
    "feature_request": ["add ", "would be great", "could you support", "please support", "wish"],
    "bug": ["crash", "stuck", "broken", "does nothing", "no results", "nothing syncs", "error"],
}
STOP = set("a an the is are am do does i my me you your can how what when of to in on for and or it if be this that "
           "with from at by still now today".split())


def _words(text: str) -> set[str]:
    return {w.rstrip("s") for w in re.findall(r"[a-z0-9]+", text.lower())} - STOP


def _sentences(text: str) -> list[str]:
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", text) if s.strip()]


class MockModel(Model):
    name = "mock"

    def chat(self, messages, schema=None, schema_name="output"):
        user = messages[-1]["content"]
        if schema_name == "triage":
            text = user.lower()
            category = next((c for c, keys in KEYWORDS.items() if any(k in text for k in keys)), "other")
            out = json.dumps({"category": category, "reason": "keyword match (mock)"})
        elif schema_name == "verdict":   # judge: pass when every answer sentence appears in the context
            context = user.split("<context>")[1].split("</context>")[0]
            answer = user.split("<answer>")[1].split("</answer>")[0].strip()
            ok = all(s.rstrip(".") in context for s in _sentences(answer))
            out = json.dumps({"reasoning": "substring check (mock)", "verdict": "pass" if ok else "fail"})
        else:   # grounded QA: return the context sentence that shares the most words with the question
            context, question = user.split("Question:")
            best = max(_sentences(context.replace("Context:", "")), key=lambda s: len(_words(s) & _words(question)))
            out = best if len(_words(best) & _words(question)) >= 2 else "I don't know"
        self._count(len(user) // 4, len(out) // 4)   # rough estimate: about 4 characters per token
        return Reply(out, 0.0)
