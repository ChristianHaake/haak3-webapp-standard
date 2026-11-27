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

- [ ] Help, AGB, privacy, and imprint routes work on direct navigation.
- [ ] Contact opens from the footer at 320/360 px and the latest edit survives the round trip.
- [ ] Contact email, visible social labels, local icons, focus, 44 px targets and brand-specific links match the contact standard.
- [ ] Help and support use the assigned feedback destinations. External links open safely and the mobile coffee action has an accessible name.
- [ ] Where Cloudflare injects Web Analytics, verify its script and successful same-origin beacon in production and check the privacy text in every available translation.
- [ ] Footer links to required pages and source repository.
- [ ] The localized "Weitere Apps" footer link opens the public app directory,
      has a visible focus state and a 44 × 44 px target, and remains readable
      without horizontal overflow at 320/360 px.
- [ ] The Footer action opens an internal support route. Its page explains
      voluntary support and actual app work, places a visible 44 × 44 px coffee
      action before non-payment feedback, and explains the external destination.
- [ ] The support action is reachable without horizontal scrolling at 320 px
      and is preferably visible within a 320 × 720 px viewport.
- [ ] The donation link is a safe plain outbound link, with no provider embed,
      script, or tracking pixel.
- [ ] Markdown does not render unsafe raw HTML.
- [ ] AGB, privacy, and imprint have been completed and reviewed by the operator.

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
