"""Tests for the eval code itself: a grader with a bug gives you a wrong score you will trust.

    python -m pytest -q
"""
import json

import graders as g
from llm import MockModel
from run_evals import wilson

QA = {"context": "The Pro plan keeps deleted files for 180 days.", "question": "How long are deleted files kept on Pro?",
      "expected": {"answerable": True, "must_include": ["180"], "must_not_include": ["support@acme.example"]}}
UNANSWERABLE = {**QA, "expected": {"answerable": False}}


def test_valid_json_rejects_unknown_category_and_bad_json():
    assert g.valid_json({}, json.dumps({"category": "bug", "reason": ""})).passed
    assert not g.valid_json({}, json.dumps({"category": "urgent", "reason": ""})).passed
    assert not g.valid_json({}, "bug").passed


def test_category_match():
    case = {"expected": {"category": "billing"}}
    assert g.category_match(case, '{"category": "billing"}').passed
    assert "expected billing, got bug" == g.category_match(case, '{"category": "bug"}').reason


def test_abstains_correctly_both_directions():
    assert g.abstains_correctly(UNANSWERABLE, "I don't know").passed
    assert g.abstains_correctly(UNANSWERABLE, "I don’t know.").passed       # curly apostrophe
    assert not g.abstains_correctly(UNANSWERABLE, "It costs $9.99.").passed
    assert not g.abstains_correctly(QA, "I don't know").passed
    assert g.abstains_correctly(QA, "180 days.").passed


def test_includes_facts_supports_alternatives_and_skips_refusals():
    case = {"expected": {"must_include": [["50 GB", "50GB"], "any plan"]}}
    assert g.includes_facts(case, "Up to 50GB on any plan.").passed
    assert g.includes_facts(case, "Up to 50 GB.").reason == "missing ['any plan']"
    assert g.includes_facts(case, "I don't know") is None


def test_excludes_forbidden():
    assert g.excludes_forbidden(QA, "180 days.").passed
    assert not g.excludes_forbidden(QA, "Email support@acme.example").passed
    assert g.excludes_forbidden({"expected": {}}, "anything") is None


def test_judge_runs_only_on_answered_answerable_questions():
    judge = MockModel()
    assert g.judge_faithful(QA, "The Pro plan keeps deleted files for 180 days.", judge).passed
    assert not g.judge_faithful(QA, "The Pro plan keeps deleted files forever.", judge).passed
    assert g.judge_faithful(QA, "I don't know", judge) is None
    assert g.judge_faithful(UNANSWERABLE, "anything", judge) is None


def test_wilson_interval():
    lo, hi = wilson(80, 100)
    assert 0.71 < lo < 0.72 and 0.86 < hi < 0.87   # vs 0.72-0.88 from the plain p ± 1.96·SE formula
    assert wilson(0, 0) == (0.0, 0.0)
    assert wilson(10, 10)[1] == 1.0
