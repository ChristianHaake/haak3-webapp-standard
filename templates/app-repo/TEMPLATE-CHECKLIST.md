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

- [ ] Header with app identity and accurate local-processing message.
- [ ] Link Hilfe, Kontakt, Über, AGB, Datenschutz and Impressum in the footer. Include the repository link only for confirmed public source.
- [ ] Add a localized "Weitere Apps" footer link to https://haak3.de/apps-fur-die-schule/ with visible focus and a 44 × 44 px target. Check 320/360 px layouts.
- [ ] Wire the contact and support Markdown files to internal routes. Use the [brand and form directory](https://github.com/ChristianHaake/haak3-webapp-standard/blob/main/docs/contact-and-feedback.md) for all five URL placeholders. Follow its email fallback for groups without assigned forms.
- [ ] Render accessible social icon links with visible platform names. Test the footer at 320/360 px and verify unsaved edits survive navigation to contact and back.
- [ ] Link the Footer support action to the internal support page, not directly
      to the provider.
- [ ] Replace `{{ACTUAL_MAINTENANCE_OR_TESTING_WORK}}` with a specific, true
      sentence. Render the coffee link as the first prominent action, at least
      44 × 44 px, and keep the no-payment feedback actions below it.
- [ ] Add a stable AGB route with app-specific content; do not ship the starter text as approved terms.
- [ ] Direct navigation works for every content route, including AGB.
- [ ] Semantic design tokens follow the shared design system.

## Verify production behavior

- [ ] Adjust `public/_headers` to actual network and embedding requirements.
- [ ] For dashboard-injected Cloudflare Web Analytics on a proxied domain, use the policy in `variants/cloudflare-web-analytics/_headers` in place of `public/_headers`. Preserve existing app-specific script hashes and permissions when migrating. Verify the loaded script and a successful POST to `/cdn-cgi/rum` after deployment. Keep the restrictive base policy for deployments without analytics.
- [ ] Complete and review AGB, privacy, and imprint content with the operator.
- [ ] Confirm storage, reset, import, and export behavior.
- [ ] Test production builds locally with a `verify:live` or `smoke:production` script.
- [ ] Complete `docs/review-checklist.md`.

## License

- [ ] Confirm that `LICENSE`, README, and package metadata all declare
  `GPL-3.0-only`.
