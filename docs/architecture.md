# Architecture

## Runtime model

- Apps MUST work without an account.
- Core creation and editing workflows MUST run in the browser.
- User-created content MUST NOT require server persistence.
- Static or serverless deployment compatible with Cloudflare is the default.
- Network-dependent features MUST degrade without blocking the core workflow.

React is not mandatory. The framework should match product complexity. Vanilla
TypeScript remains valid for compact applications.

## State and persistence

Use the smallest suitable storage mechanism:

| Need | Preferred mechanism |
| --- | --- |
| Shareable, non-sensitive view state | URL parameters |
| Small preferences and text configuration | `localStorage` |
| Projects containing blobs or substantial data | IndexedDB |
| Durable user-controlled backup | Versioned downloadable file |

Apps MUST:

- namespace storage keys;
- version persisted schemas;
- validate imported and restored data at runtime;
- reject unsupported future versions cleanly;
- preserve current state when an import fails;
- provide a clear way to reset local data;
- document what is stored, where, and for how long.

Autosave is a recovery mechanism, not a substitute for explicit project export
when losing work would be costly.

## Import and export

- Imported JSON, ZIP entries, filenames, MIME types, dimensions, and sizes MUST
  be treated as untrusted input.
- Archive extraction MUST prevent path traversal and resource exhaustion.
- Project formats MUST include a schema version.
- Migrations SHOULD be explicit and tested.
- Exported files SHOULD use sanitized, meaningful filenames.
- Expensive export operations MUST expose progress or busy state and recover
  from failure.

## Privacy and network use

- Application-level behavioral tracking, advertising, fingerprinting, and
  third-party analytics MUST NOT be added.
- External CDNs and remote assets SHOULD NOT be runtime dependencies.
- Hosting-provider analytics MAY be enabled only when they are necessary,
  privacy-conscious, documented in the privacy page, and approved by the
  operator.
- If the app claims that content stays local, its Content Security Policy
  SHOULD prevent outbound connections not required by the product.
## Deployment and security

Production apps MUST use HTTPS and SHOULD define:

- `Content-Security-Policy`;
- `Referrer-Policy`;
- `X-Content-Type-Options: nosniff`;
- `Permissions-Policy`;
- frame restrictions through CSP `frame-ancestors`;
- immutable caching for fingerprinted assets;
- revalidation for HTML and route fallbacks.

The CSP MUST reflect actual application behavior. Do not copy
`connect-src 'none'` into an app that legitimately makes network requests.

Apps deploying to Cloudflare Pages SHOULD use a `wrangler.jsonc` file to
configure static asset deployment, directing to the build output directory
(e.g., `dist`) and setting `not_found_handling` to `single-page-application`
for SPAs.

Preview deployments SHOULD use `X-Robots-Tag: noindex`.

## Routing and content

- Direct navigation and refresh MUST work for every public route.
- Content routes SHOULD use stable, readable paths.
- Markdown content SHOULD be bundled at build time unless runtime editing is a
  product requirement.
- Markdown rendering MUST sanitize or exclude unsafe HTML.

## Dependencies

- Add a dependency only when it removes meaningful implementation or
  maintenance risk.
- Production dependencies MUST have compatible licenses and active maintenance.
- Browser-native APIs are preferred for simple tasks.
- Shared packages are justified only by the extraction criteria in
  `concept.md`.
