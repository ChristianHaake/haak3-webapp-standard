# haak3 Web App Standard

Shared product, design, architecture, accessibility, privacy, and engineering
rules for the haak3 educational web app family.

The standard is based on patterns found in:

- [SocialMediaCreator](https://github.com/ChristianHaake/SocialMediaCreator)
  (`smc.haak3.de`) as the primary visual reference
- [Feedbackbogen-Generator](https://github.com/ChristianHaake/Feedbackbogen-Generator)
  (`fbg.haak3.de`)
- [StoryboardDesigner](https://github.com/ChristianHaake/StoryboardDesigner)
  (`sbd.haak3.de`)

## Status

Version: **1.1.0-draft**

The current draft adopts the approved orange family palette, app-specific
header identity, haak3 footer attribution, a prominent internal support link,
conditional public-repository icons, and language menus with full names.
It also records the Feedbackbogen locale behavior as the family target and
the shared help, examples, terms, privacy, imprint, and support structure.
See [UI overhaul decisions and migration](docs/ui-overhaul-decisions.md).
Existing apps migrate incrementally; this documentation update is not a
production migration or a declaration of conformance.

Normative terms use the meanings from RFC 2119:

- **MUST**: required for conformance
- **SHOULD**: expected unless a documented reason prevents it
- **MAY**: optional

Existing apps may adopt the standard incrementally. New apps should conform
from their first release.

## Documents

| Document | Purpose |
| --- | --- |
| [Design system](docs/design-system.md) | Visual foundations and design tokens |
| [Architecture](docs/architecture.md) | Runtime, storage, deployment, and security |
| [UI patterns](docs/ui-patterns.md) | Shared shell and interaction patterns |
| [Shell validation pilot](docs/shell-validation-pilot.md) | Validated shell behavior and remaining migration issues |
| [Component contracts](docs/component-contracts.md) | Observable behavior for common controls and editor patterns |
| [Accessibility](docs/accessibility.md) | Required accessibility behavior |
| [Coding standards](docs/coding-standards.md) | Source structure, testing, and dependencies |
| [Content and legal pages](docs/content-and-legal-pages.md) | Markdown pages, privacy, and imprint |
| [App adoption](docs/app-adoption.md) | How an app adopts and documents the standard |
| [Review checklist](docs/review-checklist.md) | Release and conformance review |
| [Reference audit](docs/reference-audit.md) | Evidence from the three existing apps |
| [UI overhaul decisions](docs/ui-overhaul-decisions.md) | Approved changes, evidence, and migration impact |
| [Pilot verification](docs/pilot-verification.md) | Real-app checks, lessons, and remaining acceptance gates |
| [Rollout matrix](docs/rollout-matrix.md) | Staged product scope, preserved behavior, and release gates |

## Authority and exceptions

The documents in `docs/` are the source of truth. `AGENTS.md` and `CLAUDE.md`
tell coding agents how to apply them.

An app-specific rule may override this standard only when the app repository
documents:

1. the exact rule being overridden;
2. the product or technical reason;
3. the affected files or behavior;
4. whether the exception is temporary or permanent.

Silent divergence is not allowed.

## New repository

`templates/app-repo/` is a self-contained, framework-neutral starter. Duplicate
its contents into an empty repository, including hidden files:

```bash
cp -R templates/app-repo/. /path/to/new-repository/
```

Then replace every `{{PLACEHOLDER}}` and follow `TEMPLATE-CHECKLIST.md`. The
template links to this standard instead of duplicating all normative documents.

The starter also includes repository-scoped `caveman` and `cavecrew` skills for
Codex and Claude Code. Skill discovery still depends on the installed client
version and enabled capabilities; `AGENTS.md` and `CLAUDE.md` define an explicit
fallback instead of pretending unavailable delegation occurred.

## Licensing

New haak3 apps SHOULD use `GPL-3.0-only`. Existing apps keep their current,
unambiguous license until deliberately relicensed. Conflicting license files
and package metadata MUST be resolved. Dependencies and copied code MUST be
license-compatible with the target app.
