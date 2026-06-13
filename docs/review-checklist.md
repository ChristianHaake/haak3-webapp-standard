# Review Checklist

## Product

- [ ] Intended users and educational purpose are explicit.
- [ ] Core workflow works without login.
- [ ] Empty states and recovery paths are clear.
- [ ] Destructive actions protect existing work.

## Design and responsive behavior

- [ ] Semantic design tokens are used.
- [ ] Header, footer, and content pages follow the shared patterns.
- [ ] Primary workflow works at 320px, 390px, tablet portrait, and desktop.
- [ ] Editor and preview remain readable without horizontal page scrolling.

## Accessibility

- [ ] Primary workflow is keyboard operable.
- [ ] Focus is visible and correctly restored after dialogs.
- [ ] Controls have names, labels, and associated errors.
- [ ] Status changes are announced.
- [ ] Contrast, 200% zoom, and reduced motion are checked.
- [ ] Drag-and-drop has a keyboard alternative.

## Data and privacy

- [ ] Storage keys and schemas are versioned.
- [ ] Imported data is validated before state replacement.
- [ ] File and archive resource limits exist.
- [ ] Failed imports preserve current work.
- [ ] Reset and local-data behavior are documented.
- [ ] Privacy claims match network requests and hosting analytics.

## Content and legal

- [ ] Help, privacy, and imprint routes work on direct navigation.
- [ ] Footer links to required pages and source repository.
- [ ] Markdown does not render unsafe raw HTML.
- [ ] Legal text has been reviewed by the operator.

## Engineering and release

- [ ] Node and package-manager requirements are documented.
- [ ] Build, test, lint, and typecheck pass.
- [ ] Persistence, migration, invalid import, and core domain behavior are tested.
- [ ] Primary browser workflow has automated coverage where practical.
- [ ] Production security headers match actual runtime behavior.
- [ ] HTML revalidates and fingerprinted assets use immutable caching.
- [ ] README, package metadata, and the license file name the same license.
- [ ] License and dependency licenses are compatible.
- [ ] Standard exceptions are documented.
