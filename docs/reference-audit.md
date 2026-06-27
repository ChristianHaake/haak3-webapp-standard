# Reference Application Audit

Audit date: 2026-06-25 (refreshed from 2026-06-16)

This audit records the evidence used to maintain the standard. It is not a
permanent ranking of the apps. It was refreshed after parallel
development that closed several earlier gaps (such as CI and Playwright coverage)
and introduced new patterns from apps including Prompter.

## SocialMediaCreator

Strong reference patterns:

- cohesive neutral-and-blue visual system;
- clear header hierarchy and local-processing badge;
- responsive editor/live-preview model;
- extensive German and English content with a custom i18n layer
  (`src/i18n/de.ts`, `src/i18n/en.ts`);
- versioned and constrained project archives;
- unit, component, end-to-end (Playwright), and production smoke tests;
- continuous integration (`.github/workflows/ci.yml`);
- offline PWA support via `vite-plugin-pwa` with a full icon and maskable set;
- hardened Cloudflare security headers (`public/_headers`): CSP, Permissions-
  Policy, Referrer-Policy, X-Content-Type-Options, X-Frame-Options;
- service worker generated without external URLs;
- semantic disclosures using `<details>` and `<summary>` for complex forms.

Exceptions or app-specific behavior:

- Cloudflare Web Analytics requires an explicit privacy exception;
- simulation warnings and provenance markers are product-specific;
- an optional "Buy me a coffee" footer support link (external, no tracking);
- React architecture is not required for simpler apps.

## Feedbackbogen-Generator

Strong reference patterns:

- framework-light Vanilla TypeScript implementation;
- runtime validation and migration of saved configuration;
- several editable export formats;
- keyboard shortcuts, live status, reduced-motion support, and keyboard
  alternatives to drag-and-drop;
- content separated into JSON and Markdown;
- accessible footer repository link with an inline GitHub icon
  (`src/ui/templates.ts`), used as the markup reference for the footer pattern;
- cross-browser end-to-end coverage with Playwright and `verify:live` deployment validation.

Gaps relative to the draft:

- visual language differs from the SocialMediaCreator baseline;
- no production security headers and no `wrangler` configuration; a CSP PR was
  reverted (#36 → #37) and the hardening is still missing;
- no continuous integration workflow;
- license metadata conflicts and is still unresolved: `package.json` declares
  `MIT` while the `LICENSE` file contains GPLv3 text. The other apps declare
  `GPL-3.0-only` consistently.

## StoryboardDesigner

Strong reference patterns:

- IndexedDB autosave (`idb-keyval`) for projects containing image blobs;
- versioned ZIP-based project files;
- responsive task controls and print-specific styling;
- German and English interface via `i18next` / `react-i18next`;
- typed React state and focused tests for persistence and project codecs;
- end-to-end coverage with Playwright (`playwright.config.ts`) plus a smoke
  check — this closes the earlier "no browser test suite" gap;
- hardened Cloudflare security headers (`public/_headers`) matching the
  SocialMediaCreator set;
- offline PWA support via `vite-plugin-pwa`;
- feature-sliced source structure with the store split into slices.

Gaps relative to the draft:

- no continuous-integration workflow yet;
- branding assets are lighter than the other apps (no `public` SVG logo set).

## Prompter

Strong reference patterns:

- Cloudflare deployment explicitly managed via `wrangler.jsonc`;
- unified verification pipeline via `npm run verify` running in a GitHub Actions CI workflow;
- responsive UI adapting footer spacing for narrow viewports.

## Shared conclusions

The standard still does not mandate React, Tailwind, Zustand, or any export
library. It standardizes observable behavior, data safety, documentation, and
visual foundations while allowing each app to retain an appropriate stack.

Now satisfied or eligible because two or more apps match (per the `concept.md`
extraction criteria):

- **Production security headers** — SocialMediaCreator and StoryboardDesigner
  ship a near-identical `_headers` set. This is already a checklist requirement;
  Feedbackbogen-Generator is the remaining migration target.
- **Browser end-to-end tests (Playwright)** — present in SocialMediaCreator,
  StoryboardDesigner, and Feedbackbogen-Generator. 
- **Continuous integration** — SocialMediaCreator and Prompter use a
  `.github/workflows/ci.yml` CI workflow running `npm run verify`. 
- **Cloudflare deployment configuration** — Prompter's use of `wrangler.jsonc` 
  is the documented baseline for new apps.
- **Offline PWA support** — SocialMediaCreator and StoryboardDesigner both use
  `vite-plugin-pwa`. Recommended (SHOULD), not mandatory.
- **Favicon, web manifest, and logo assets** — present across the apps.

Single-app patterns held back (document, do not mandate):

- **Footer donation / "Buy me a coffee" link** — only SocialMediaCreator. MAY,
  documented in `docs/ui-patterns.md`.

Storage mechanism stays behavior-based, not mechanism-mandated: localStorage
(Feedbackbogen-Generator) and IndexedDB (StoryboardDesigner, for image blobs)
are both valid. The contract is versioned keys and validated imports.

Open issues to resolve in the apps (not standard changes):

- Feedbackbogen-Generator license conflict (`package.json` MIT vs GPLv3
  `LICENSE` file).
- Feedbackbogen-Generator missing production security headers and `wrangler`
  configuration.
