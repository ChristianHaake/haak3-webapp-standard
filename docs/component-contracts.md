# Interaction component contracts

This document defines the observable behavior of common controls. It does not
require a framework, component library, shared package, or common visual
markup. Use the app's existing stack and native platform behavior where it
meets the contract. The current orange shell and palette rules remain in
[UI patterns](ui-patterns.md) and [Design system](design-system.md).

## Contracts

| Pattern | Purpose and required behavior | Keyboard and focus | Mobile and responsive behavior | Reference implementations to compare |
| --- | --- | --- | --- | --- |
| Buttons and action links | A button performs an in-place action; a link navigates or downloads. Use the matching native element, a visible verb label, and a single clear primary action per task region. Central actions MUST have a 44×44 CSS-pixel target. During async work, prevent duplicate submission and expose a truthful busy/result state. | Native buttons and links MUST work with Tab and Enter; buttons also work with Space. Focus is visible. Disabled state MUST be conveyed semantically and visually; do not remove a control's name. | Keep primary actions reachable without horizontal scrolling; wrap before truncating labels. Preserve target size and spacing. | SMC `src/app/components/AppHeader.tsx`, `src/features/photo-post/PhotoPostEditor.tsx`; Feedbackbogen `src/ui/components.ts`, `src/ui/templates.ts`; Storyboard `src/app/layout/TopBar.tsx`, `packages/haak3-ui/src/SharedTopBar.tsx`. |
| Form fields | Collect one identifiable value. Every field MUST have a persistent visible label and MUST associate help/error text programmatically. Preserve its value after validation failure. Use native input semantics and types. Errors MUST explain how to recover and MUST not rely on color alone. | Tab order follows task order. Validation MUST focus the first blocking field when submission is rejected and associate its error programmatically. Do not steal focus on each keystroke. | Use a single-column flow when side-by-side fields become cramped. Labels and errors MUST wrap without clipping; fields MUST remain usable at 320 CSS px. | SMC `src/shared/components/ImageUploadField.tsx`, `src/shared/components/StructuredTimestampFields.tsx`; Feedbackbogen `src/ui/components.ts`; Storyboard `src/shared/ui/AutoResizeTextarea.tsx`, `src/features/editor/EditorView.tsx`. |
| Disclosures | Reveal optional or advanced information without leaving the task. Use native `details`/`summary` unless a stack-native accessible equivalent is already used. The summary MUST describe the hidden content and show its expanded state. | Summary MUST be keyboard focusable and toggle by Enter or Space. Expanded content enters normal document/tab order; collapsed content MUST NOT be keyboard focusable. | Disclosure MUST fit the available width and its summary label remain understandable when wrapped. Do not hide essential legal or recovery information inside a disclosure. | SMC `src/shared/components/EditorDisclosure.tsx`; Feedbackbogen `src/ui/templates.ts` (native `details`/`summary` around form sections). No equivalent Storyboard disclosure is cited; use the native contract when needed. |
| Dialogs | Interrupt only for a consequential choice or focused task that cannot fit inline. Give the dialog an accessible name; keep destructive confirmation specific about what will be replaced or lost. Closing/canceling MUST leave the underlying work intact. | On open, move focus into the dialog; contain Tab navigation while modal; Escape closes when safe; provide a visible close/cancel action; on close restore focus to the trigger. Never use a dialog for routine inline edits. | Keep the dialog within the viewport, make its content scrollable without trapping page-level recovery actions, and retain reachable actions on narrow screens and zoom. | SMC `src/app/components/ExportNoticeDialog.tsx`, `src/app/components/TeacherInfoDialog.tsx`; Storyboard `src/shared/ui/ConfirmDialog.tsx`, `src/shared/ui/FieldConfigDialog.tsx`. No Feedbackbogen dialog is cited. |
| Status and feedback | Report saved, locally temporary, exported, loading, stale, and failed states accurately. Routine completion MUST use a polite status announcement; reserve alert announcements for urgent errors. Keep actionable errors next to the affected control, with a recovery instruction. | Status MUST be announced without moving focus. Do not announce every keystroke or timer tick unless that is the task's intended feedback. Repeated identical updates MUST NOT create noisy announcements. | Status text MUST wrap and remain visible; do not depend on hover or color. A compact status indicator MUST have an accessible text equivalent. | SMC `src/app/App.tsx` (workflow feedback integration); Feedbackbogen `src/ui/templates.ts` (polite live regions); Storyboard `src/app/layout/StatusPill.tsx`, `src/app/layout/SaveIndicator.tsx`, `src/shared/ui/LoadingStatus.tsx`. |
| Header and footer | Header identifies the app and offers global controls; workflow actions stay distinct from identity. Footer contains the required family links, attribution, and only a verified public-repository icon. Support links to the internal support page. Follow the full normative shell contract in [UI patterns](ui-patterns.md). | All controls and links MUST have names, visible focus, and logical order. The app identity link MUST preserve work or use existing data-loss protection. | Controls may wrap into groups; required links and support label MUST remain visible down to 320 px. Do not shrink targets below the shell contract. | SMC `src/app/components/AppHeader.tsx`, `src/app/components/AppFooter.tsx`; Feedbackbogen `src/ui/templates.ts`; Storyboard `src/app/layout/TopBar.tsx`, `src/app/layout/LanguageToggle.tsx`, `src/app/layout/Footer.tsx`, `packages/haak3-ui/src/SharedTopBar.tsx`. |
| Editor and preview | Keep one underlying project state while presenting editing and preview. Changes SHOULD appear promptly. A view switch MUST preserve edits and clearly identify the active view. The preview MUST not silently become a second source of truth. | View controls MUST be named buttons with exposed selected/pressed state. Inactive content MUST be removed from keyboard navigation. A view switch should keep focus on its control; announce a changed preview only when useful, not for every edit. | At wide sizes, side-by-side views MAY be used. On narrow screens, provide explicit Editor/Preview switching or a clearly ordered single-column workflow. Neither view may require page-wide horizontal scrolling. | SMC `src/features/photo-post/PhotoPostEditor.tsx` and `PhotoPostPreview.tsx`; Feedbackbogen generated editor/preview in `src/ui/templates.ts`; Storyboard `src/features/editor/EditorView.tsx` and `src/features/wizard/ReviewScreen.tsx`. |

The reference paths are comparison targets, not claims that every target meets
every requirement. Verify the current implementation before borrowing it. The
contracts above build on [Accessibility](accessibility.md), [UI patterns](ui-patterns.md),
and [the approved shell decisions](ui-overhaul-decisions.md).

## Shared package decision

StoryboardCreator already contains a local `@haak3/ui` package. Its
`packages/haak3-ui/src/SharedTopBar.tsx` has a useful separation of identity,
controls, and workflow actions, but it is coupled to Tailwind styling and its
current layout assumptions. Compare it with SMC's `src/app/components/AppHeader.tsx`
and Feedbackbogen's `src/ui/templates.ts` before any reuse. Do not extract or
expand a family package based on this documentation alone.

Extraction requires at least two production implementations with the same
verified behavior and accessibility contract, plus a concrete maintenance
gain that outweighs central versioning and release work. A package MUST NOT
force a framework, styling runtime, or data model on an app. Until those
conditions are evidenced, implement the contract in each app's existing
stack. No production implementations or maintenance gain are asserted here.

The first extraction candidates are the shell (identity, footer, internal
content routing), locale preference, content-page framing, confirmation dialog,
and project-file action wording. They MUST be compared in SocialMediaCreator
and StoryboardCreator after both have adopted the contract. Export renderers,
project schemas, persistence adapters, legal copy, and editor domain controls
MUST remain app-specific unless separate evidence meets the same criteria.

## Adoption checks

For every adopted pattern, verify the interaction in the actual app at 320,
390, tablet portrait, and desktop widths; keyboard-only use; visible/restored
focus; 200% zoom; and at least one real touch device. Exercise the state that
matters (invalid input, busy action, cancel, failure, or saved work). Add any
new mandatory checks to the [review checklist](review-checklist.md).
