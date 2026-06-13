# Agent Instructions

## Scope

This repository defines the shared standard for the haak3 educational web app
family. Documentation changes can affect multiple production applications.

## Required behavior

- Read `README.md`, `concept.md`, and every document affected by the task before
  editing.
- Treat `docs/` as normative. Keep summaries in this file short and do not
  duplicate full rules here.
- Use SocialMediaCreator as the primary visual reference, not as a source to
  copy blindly.
- Compare relevant behavior in SocialMediaCreator, Feedbackbogen-Generator,
  and StoryboardDesigner before standardizing an existing pattern.
- Distinguish **MUST**, **SHOULD**, and **MAY** requirements.
- Keep framework-independent rules framework-independent.
- Document contradictions, migration cost, and exceptions explicitly.
- Do not claim legal compliance. Require operator review for legal text.
- Do not introduce tracking, accounts, server persistence, or external runtime
  services as defaults.
- Do not create a shared package until the extraction criteria in `concept.md`
  are met.

## Quality gate

Before finishing:

1. Check internal Markdown links.
2. Check that new mandatory rules appear in `docs/review-checklist.md`.
3. Check that `README.md`, app templates, and agent instructions do not
   contradict the normative documents.
4. State which reference-app evidence informed a new rule.
