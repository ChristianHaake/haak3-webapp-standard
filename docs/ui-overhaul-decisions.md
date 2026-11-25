# UI overhaul: decisions and migration

Decision date: 2026-11-13. Standard revision: **1.1.0-draft**.

This record explains the approved family direction. Normative details live in
[Design system](design-system.md), [UI patterns](ui-patterns.md),
[Content and legal pages](content-and-legal-pages.md) and
[Component contracts](component-contracts.md), [Rollout matrix](rollout-matrix.md),
and [Review checklist](review-checklist.md). It does not declare existing apps
conformant or authorize a production deployment.

## Approved direction

| Area | Decision | Migration impact |
| --- | --- | --- |
| Palette | Orange actions, separate brand orange, warm neutral surfaces, system fonts | Map semantic tokens; audit control/focus contrast; preserve logo colors and stored theme IDs |
| Identity | Own app logo/name in header; haak3 attribution in footer | Keep original assets; name fallback until an approved logo exists; safe app-start navigation |
| Support | Visible orange coffee action plus localized label, including mobile | Footer opens internal support page; provider link stays on that page, without embeds |
| Repository | GitHub icon only for a confirmed public repository | Check URL/visibility; omit private or unknown targets; accessible name and focus/hover tooltip |
| Languages | One compact menu with full language names, no flags; Feedbackbogen's browser fallback and persisted choice are the target behavior | German, English, French, Spanish, and Dutch remain issues until each interface and content-page translation is complete; preserve edits and handle blocked preference storage |
| Content and contact | Help, examples, terms, privacy, imprint, and support use stable internal routes; feedback goes to `apps@haak3.de` | Legal text needs operator review; examples remain local and cannot replace work silently |
| Workflow | B: direct editor, progressive settings, explicit mobile preview | Recommended task pattern, not a universal dashboard layout or a measured user-study winner |
| Legal links | Visible wrapped links down to 320 px | Remove the former suggestion to hide privacy below 360 px |

About is now a required page/footer link. The repository rule is conditional,
replacing the former unconditional public-source link requirement. The
icon-only presentation replaces the former icon-and-label recommendation.
The orange baseline replaces the previous blue baseline; staged legacy
palettes remain allowed when recorded during adoption.

## Evidence and limits

The following local source comparisons informed this revision, checked on
2026-11-13:

- SocialMediaCreator: `src/app/components/AppHeader.tsx` uses its own logo
  and German/English language buttons; `AppFooter.tsx` contains coffee and
  GitHub icons but links straight to the provider. Its direct donation link
  and language-code buttons are migration work, not the new family contract.
- Feedbackbogen-Generator: `src/ui/templates.ts` contains own-logo identity,
  named locale controls, an internal support route, a coffee icon, and a
  GitHub link with safe new-tab attributes. The internal support route
  provides existing production evidence for that behavior.
- StoryboardCreator / repository StoryboardDesigner:
  `src/app/layout/BrandLogo.tsx`, `TopBar.tsx`, `LanguageToggle.tsx` and
  `Footer.tsx` show original responsive logo assets, implemented language
  choices, 44-pixel controls, safe project replacement, and wrapping footer
  links. Direct provider navigation and the hidden mobile coffee label need
  migration.

User decisions, rather than a claim of existing family-wide implementation,
authorize the new orange palette, logo hierarchy, language menu, repository
presentation and stronger support prominence. haak3.de supplied the brand
orange reference; NOREA.schule informed the dark-orange action and internal
support-page model. No entire external theme is adopted.

The isolated UI workshop implemented these decisions in SocialMediaCreator,
StoryboardCreator and a separate AgentOS operations overview. On the final
shell revision, build/typecheck and five shell-result records passed,
covering layouts at 320/390/768/1440 px, history, focus, preserved edits,
SocialMediaCreator German/English and blocked preference storage. The
comparison and transfer suites had also passed before the final
support-prominence-only change. Eleven selected contrast pairs passed;
white on action orange measures 5.23:1 and dark text on brand orange 7.05:1.
These checks are prototype evidence, not production or full accessibility
certification. Real devices, screenreaders and actual 200% browser zoom remain
open. Prototype legal pages are explicitly unapproved drafts.

The original [reference audit](reference-audit.md) retains its historical
observations; its blue description does not override the current tokens.

## Adoption sequence and costs

1. SocialMediaCreator pilot: change shell/tokens and language-menu presentation;
   add internal support navigation; retain actual persistence, archives,
   image export, offline support, safety/provenance behavior and tests.
2. StoryboardCreator: apply shell/tokens while retaining image blobs, IndexedDB,
   ZIP projects, print/presentation flows, appearance controls and all actual
   supported languages. Do not reduce it to the workshop's German-only UI.
3. Remaining apps: map the same contracts onto their own workflows and stack.
   Audit existing tests and assets before copying patterns.

Follow the safety-first order in [App adoption](app-adoption.md): privacy and
network claims, data safety, accessibility, then shell/tokens. Add production
regression checks for old projects, import/export and offline behavior.
Record retained legacy palette or other exceptions with scope and review date.

This revision does not mandate React, replace backend frameworks, add accounts
or server storage, or extract a shared package. Feedbackbogen's Vanilla
TypeScript guidance remains; any framework migration needs a separate
justification. KnowledgeVault is excluded from this overhaul. AgentOS is
separate from the educational-app runtime assumptions.

The 2026-11-19 shell-validation pilot confirms the full-name five-locale menu,
persisted language choice, feedback route, local examples, terms route, and
mobile footer structure in isolation. Its records and limits are in
[Shell validation pilot](shell-validation-pilot.md); this is not evidence that
any production app has adopted the behavior.

The standard stays draft until the existing stability criteria in
[Concept](../concept.md#governance) are met.
