# New Repository Checklist

Delete this file after setup is complete.

## Replace placeholders

Search the repository for `{{` and replace every placeholder.

## Select the stack

- [ ] Initialize the chosen Vite and TypeScript setup.
- [ ] Add strict TypeScript configuration.
- [ ] Add `dev`, `build`, `test`, `lint`, `typecheck`, and `verify` scripts.
- [ ] Pin the supported Node major version.

## Configure infrastructure

- [ ] Rename the app in `wrangler.jsonc` and confirm the `dist` directory.
- [ ] Enable the GitHub Actions CI workflow in `.github/workflows/ci.yml`.

## Agent skills

- [ ] Confirm Codex discovers `.agents/skills/caveman` and
  `.agents/skills/cavecrew`.
- [ ] Confirm Claude Code discovers `.claude/skills/caveman` and
  `.claude/skills/cavecrew`.
- [ ] Test explicit `/caveman` or `$caveman` invocation.
- [ ] Test cavecrew fallback when subagent tools are unavailable.

## Complete the application shell

- [ ] Header with own app logo/name, safe app-start link, and accurate local-processing message.
- [ ] Footer with haak3 attribution, Hilfe, Beispiele when shipped, Über die App, Unterstützen, AGB, Datenschutz and Impressum; required links stay visible at 320px.
- [ ] Unterstützen is a labeled orange coffee action, at least 44×44px, leading to the internal page.
- [ ] Add a repository icon only after confirming its correct public URL; include accessible name, focus/hover tooltip, 44×44px target and safe external-link attributes.
- [ ] Use the full-name language menu only for implemented translations; omit for a single language. Preserve work on switching and handle blocked preference storage.
- [ ] Record each missing German, English, French, Spanish, or Dutch target locale as a migration issue; use browser preference with a persisted manual choice where locales exist.
- [ ] Direct navigation works for every content route.
- [ ] Internal content navigation and browser history preserve work and move/restore focus.
- [ ] Semantic design tokens follow the shared design system.
- [ ] Adopted interactions meet the shared [component contracts](https://github.com/ChristianHaake/haak3-webapp-standard/blob/main/docs/component-contracts.md).
- [ ] Add the required Unterstützen page with actual project costs, a non-financial
      help option, and a localized Buy-me-a-coffee link.
- [ ] Add a visible `apps@haak3.de` mail link for error reports and feature ideas; do not prefill project content.

## Verify production behavior

- [ ] Adjust `public/_headers` to actual network and embedding requirements.
- [ ] Complete and review privacy and imprint content.
- [ ] Confirm storage, reset, import, and export behavior.
- [ ] Test production builds locally with a `verify:live` or `smoke:production` script.
- [ ] Complete `docs/review-checklist.md`.

## License

- [ ] Confirm that `LICENSE`, README, and package metadata all declare
  `GPL-3.0-only`.
