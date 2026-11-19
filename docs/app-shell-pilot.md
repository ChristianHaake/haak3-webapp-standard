# App-Shell Pilot

`prototypes/app-shell/` contains the source, assets and browser checks for the
isolated app-shell pilot. It is synthetic test data only: it neither reads
product data nor replaces app-specific project, export or offline formats.

## Reproduce

Use Node 22.12 through 22.x and run the following from a fresh checkout:

```sh
cd prototypes/app-shell
npm ci
npx playwright install chromium
npm run build
npm run preview
```

In a second terminal, with the preview server running:

```sh
npm test
```

The test suite checks the selected direct-editor comparison, the transfers for
StoryboardCreator and AgentOS, and the `?surface=standard` shell. The standard
surface has direct content routes, history and focus restoration, five browser
language fallbacks, safe support links, example-state preservation and
320/360/768/1440-pixel overflow checks.

## Scope boundary

This is evidence for shared visual and interaction rules. It is not a shared UI
package and must not be imported into a product app. A reusable package remains
conditional on successful, tested use in at least two original apps.
