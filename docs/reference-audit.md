# Reference Application Audit

Audit date: 2026-06-13

This audit records the evidence used to create the first draft. It is not a
permanent ranking of the apps.

## SocialMediaCreator

Strong reference patterns:

- cohesive neutral-and-blue visual system;
- clear header hierarchy and local-processing badge;
- responsive editor/live-preview model;
- extensive German and English Markdown content;
- versioned and constrained project archives;
- unit, component, end-to-end, and production smoke tests;
- hardened Cloudflare security and caching headers.

Exceptions or app-specific behavior:

- Cloudflare Web Analytics requires an explicit privacy exception;
- simulation warnings and provenance markers are product-specific;
- React architecture is not required for simpler apps.

## Feedbackbogen-Generator

Strong reference patterns:

- framework-light Vanilla TypeScript implementation;
- runtime validation and migration of saved configuration;
- several editable export formats;
- keyboard shortcuts, live status, reduced-motion support, and keyboard
  alternatives to drag-and-drop;
- content separated into JSON and Markdown.

Gaps relative to the draft:

- visual language differs from the SocialMediaCreator baseline;
- production header hardening is less explicit;
- English route names differ from the German routes used by the other apps;
- license metadata conflicts: the README and package metadata declare MIT while
  the license file contains GPLv3 text.

## StoryboardDesigner

Strong reference patterns:

- IndexedDB autosave for projects containing image blobs;
- versioned ZIP-based project files;
- responsive task controls and print-specific styling;
- German and English interface;
- typed React state and focused tests for persistence and project codecs.

Gaps relative to the draft:

- no browser-level test suite is documented;
- production security headers are less explicit;
- footer and content-page coverage are narrower than SocialMediaCreator.

## Shared conclusions

The standard therefore does not mandate React, Tailwind, Zustand, or any export
library. It standardizes observable behavior, data safety, documentation, and
visual foundations while allowing each app to retain an appropriate stack.
