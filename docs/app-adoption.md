# App Adoption

## New app

1. Duplicate the complete `templates/app-repo/` folder into the new repository,
   including hidden files.
2. Replace every `{{PLACEHOLDER}}`.
3. Follow `TEMPLATE-CHECKLIST.md`.
4. Initialize the application stack without deleting the supplied standard,
   content, security, and documentation files.
5. Complete the review checklist before release.

## Agent compatibility

The starter includes:

- `AGENTS.md` and `.agents/skills/` for Codex;
- `CLAUDE.md` and `.claude/skills/` for Claude Code;
- matching `caveman` and `cavecrew` skill definitions for both tools.

Use a current client version and open the tool from the repository or a
subdirectory so project instructions and skills are discovered. Cavecrew uses
available subagent capabilities and falls back to main-thread work when the
runtime does not expose them.

## Existing app

Adopt in this order:

1. privacy claims, legal pages, and production network behavior;
2. import validation, persistence versioning, and data-loss protection;
3. keyboard access, focus, labels, and responsive workflow;
4. shared shell and design tokens;
5. source organization and command consistency.

This order prioritizes user harm and data loss over visual consistency.

## Local conformance section

Each app's README or `docs/standard-conformance.md` SHOULD record:

```markdown
## haak3 standard

Standard version: 1.0.0-draft

### Exceptions

- Rule:
- Reason:
- Scope:
- Review date:
```

An empty exception list is preferable to a vague claim of full compliance.

## Current migration notes

### SocialMediaCreator

- Use as the visual baseline.
- Preserve its stronger security headers and end-to-end testing.
- Review the hosting analytics exception against the privacy rule.

### Feedbackbogen-Generator

- Keep Vanilla TypeScript; React migration is not justified.
- Align shell styling and German route naming where practical.
- Add hardened production headers.
- Resolve the current license conflict: `README.md` and `package.json` declare
  MIT while `LICENSE` contains GPLv3 text.

### StoryboardDesigner

- Keep IndexedDB for projects containing image blobs.
- Align design tokens and footer links with the family shell.
- Add production security headers comparable to SocialMediaCreator.
- Add browser-level tests for the primary workflow.
