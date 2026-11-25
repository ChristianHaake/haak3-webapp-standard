# Review Checklist

## Product

- [ ] Intended users and educational purpose are explicit.
- [ ] Core workflow works without login.
- [ ] Empty states and recovery paths are clear.
- [ ] Destructive actions protect existing work.

## Design and responsive behavior

- [ ] Semantic design tokens are used.
- [ ] Orange action/brand roles have safe foreground contrast; any staged legacy palette is documented.
- [ ] App logo/name lead in the header; original logos are unchanged, and the identity link preserves work.
- [ ] Header, footer, and content pages follow the shared patterns.
- [ ] Primary workflow works at 320px, 390px, tablet portrait, and desktop.
- [ ] Editor and preview remain readable without horizontal page scrolling.
- [ ] Appearance modes, when offered, preserve contrast and visible focus.
- [ ] Required footer links remain visible at 320px; support is a labeled orange coffee action with a 44×44px target.
- [ ] Footer includes examples when shipped, terms (AGB), privacy, imprint, help, about, and internal support; no essential legal link is hidden in a menu.
- [ ] Multiple languages use one labeled menu with full names, no flags/code-only labels and implemented translations only; missing Deutsch/English/Français/Español/Nederlands target locales are recorded as migration issues; single-language apps omit it.
- [ ] Language selection has a 44×44px target, preserves content, updates document language, and works with blocked storage.

## Accessibility

- [ ] Primary workflow is keyboard operable.
- [ ] Focus is visible and correctly restored after dialogs.
- [ ] Controls have names, labels, and associated errors.
- [ ] Status changes are announced.
- [ ] Contrast, 200% zoom, and reduced motion are checked.
- [ ] Drag-and-drop has a keyboard alternative.
- [ ] Central action targets are at least 44×44px; buttons/links use native keyboard behavior and async actions prevent duplicate submission and expose truthful busy/result states; disabled controls retain a name and semantic disabled state.
- [ ] Form fields have persistent visible labels and programmatically associated help/errors; rejected submission focuses the first blocking field; entered values survive validation errors; errors explain recovery without relying on color.
- [ ] Disclosure summaries describe their content and are keyboard operable; collapsed content is absent from keyboard navigation; essential recovery/legal information is not hidden inside a disclosure.
- [ ] Dialogs have an accessible name and visible cancel/close action, move and contain focus while open, close with Escape when safe, restore focus to the trigger, and leave work intact on cancel.
- [ ] Status announcements do not move focus, distinguish saved/temporary/exported/loading/stale/failed states accurately, announce routine completion politely, reserve alerts for urgent errors, and avoid noisy repeated or per-keystroke announcements.
- [ ] Editor/preview switches expose the active selection, use one project state, preserve edits, keep focus on the switch, and remove inactive view content from keyboard navigation.
- [ ] Adopted header/footer and language controls meet the complete [component contracts](component-contracts.md) and [UI patterns](ui-patterns.md), including mobile wrapping and reachable links.

## Data and privacy

- [ ] Storage keys and schemas are versioned.
- [ ] Imported data is validated before state replacement.
- [ ] File and archive resource limits exist.
- [ ] Failed imports preserve current work.
- [ ] Reset and local-data behavior are documented.
- [ ] Privacy claims match network requests and hosting analytics.

## Content and legal

- [ ] Help, examples when shipped, about, support, terms, privacy, and imprint routes work on direct navigation.
- [ ] Footer includes haak3 attribution and links to help, examples when shipped, about, internal support, terms, privacy, and imprint.
- [ ] Repository icon is present only for a confirmed public repository, with app-specific accessible name, focus/hover tooltip, 44×44px target and safe new-tab attributes.
- [ ] Private/unverified repository URLs are omitted; shell links introduce no third-party scripts, embeds, or tracking.
- [ ] Internal pages, return links and browser history preserve work and move/restore focus meaningfully.
- [ ] The support page has direct navigation, a localized outbound link, and a privacy notice.
- [ ] Support explains voluntary contributions, actual maintenance and non-financial help; outbound donation link uses target="_blank" and rel="noopener noreferrer" without embeds or tracking.
- [ ] Help and support expose `apps@haak3.de` for error reports and feature ideas without prefilled project content.
- [ ] Examples are identified as local samples and cannot replace recoverable work without confirmation.
- [ ] Markdown does not render unsafe raw HTML.
- [ ] Legal text has been reviewed by the operator.

## Engineering and release

- [ ] Node and package-manager requirements are documented.
- [ ] Build, test, lint, and typecheck pass.
- [ ] Persistence, migration, invalid import, and core domain behavior are tested.
- [ ] Multi-language apps validate translation completeness and pin locales in browser tests.
- [ ] Primary browser workflow has automated coverage where practical.
- [ ] Production security headers match actual runtime behavior.
- [ ] HTML revalidates and fingerprinted assets use immutable caching.
- [ ] README, package metadata, and the license file name the same license.
- [ ] License and dependency licenses are compatible.
- [ ] Standard exceptions are documented.
- [ ] The app's conformance record names the standard version, each exception and scope, and the exact rollback build/artifact identifier with its compatible data path before release.
- [ ] UI-only rollout retains the current persistence keys, schemas, and file formats; restore was checked against the prior compatible data path.
