# Shell validation pilot

Date: 2026-11-19. Status: isolated validation pilot, not a production app or
conformance declaration.

## Scope

The pilot validates the family shell without product data or publication
features. It provides a rectangular app identity in the header, a compact
native language menu, internal content routes, and a wrapping footer.

## Confirmed contract

- The language control offers Deutsch, English, Français, Español, and
  Nederlands with full names. It falls back to the browser/default locale and
  persists a manual choice locally without blocking use if storage is absent.
- Help and support provide a visible route for bug reports and feature ideas to
  `apps@haak3.de`; no project content is put into the mail link.
- Examples are clearly marked local sample content.
- Footer navigation contains help, examples when shipped, about, internal
  support, terms, privacy, and imprint, plus restrained haak3 attribution.
  Support remains a labeled orange coffee action and points internally before
  the external provider.
- The pilot has browser checks at 320, 390, 768, and 1440 CSS pixels for the
  shell, locale persistence, direct content navigation, and horizontal
  overflow. Build and test passed in the pilot workspace.

## Reference-app evidence

- Feedbackbogen-Generator supplies the multi-locale set, browser fallback, and
  persisted choice reference.
- SocialMediaCreator supplies the visual shell and local-first workflow
  reference.
- StoryboardCreator supplies the complex editor, content-page, and local
  `@haak3/ui` comparison reference.

## Migration issues

- StoryboardCreator lacks Dutch under the target locale policy.
- SocialMediaCreator currently provides German and English only.
- Every other app requires a current locale-completeness audit before a menu is
  added. A partial translation must not be exposed merely to match the target
  list.
- Legal text and operator details remain unreviewed until each production
  deployment is checked by the operator.

## Reuse decision

No family package is extracted. SocialMediaCreator and StoryboardCreator must
first implement and verify matching shell, locale, content-page, dialog, and
project-action behavior. Only then can the concrete maintenance gain and API
be assessed under [Component contracts](component-contracts.md#shared-package-decision).
