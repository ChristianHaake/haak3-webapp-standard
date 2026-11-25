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

Use the [rollout matrix](rollout-matrix.md) for family scope and preserved
app-specific behavior. Adopt [component contracts](component-contracts.md)
with the existing app stack; the matrix is a staged plan, not blanket
authorization to migrate every app at once.

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

Standard version: 1.1.0-draft

### Exceptions

- Rule:
- Reason:
- Scope:
- Review date:
```

An empty exception list is preferable to a vague claim of full compliance.

## UI overhaul adoption

The first two implementation candidates and their actual checks are recorded
in [Pilot verification](pilot-verification.md). Do not infer deployment or
complete conformance from passing automated checks.

The approved orange palette and shell contract are recorded in
[UI overhaul decisions](ui-overhaul-decisions.md). Preserve existing logos,
project formats, storage keys, imports/exports, offline and presentation
behavior while migrating. Record any temporarily retained blue palette.

SocialMediaCreator is the first UI pilot, followed by StoryboardCreator as a
complex editor and then other apps. The AgentOS workshop transfer is a separate
operations surface, not an educational-app runtime mandate. KnowledgeVault
is excluded from this overhaul. No React migration or shared-package extraction
is authorized merely by adopting these UI rules.

### Language migration record

Feedbackbogen-Generator's locale behavior is the family target: browser
preference fallback, locally persisted manual selection, and complete German,
English, French, Spanish, and Dutch interfaces. Each app MUST record missing
target locales as an issue in its conformance record. Do not list a locale in
the application until its interface, errors, status, and required content
pages are complete.

### Reuse assessment

SocialMediaCreator and StoryboardCreator are the first comparison pair for
shell, locale preference, content-page framing, confirmation dialog, and
project-file action wording. Record the matching behavior, tests, and concrete
maintenance gain before extracting anything. The local Storyboard `@haak3/ui`
package is evidence, not a family package.

Check each note below against the current checkout; historical gaps may
already have been closed. Track current tests rather than adding duplicate
suites.

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
