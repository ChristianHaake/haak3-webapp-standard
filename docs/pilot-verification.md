# Pilot implementation evidence

Checked: 2026-11-13. Standard remains **1.1.0-draft**.

This records changes in the real application source trees, not the isolated
workshop. It is evidence for implementation review, not production deployment,
legal approval or complete accessibility conformance.

| Pilot | Unchanged source baseline | Final automated evidence |
| --- | --- | --- |
| SocialMediaCreator | `2750519d8409df8b588b58bab7ee0b54afcddf8b` | 124 unit/component tests; lint and build/typecheck; 39 Chromium and 37 WebKit browser tests passed; 2 explicit WebKit limits |
| StoryboardCreator | `5c6249bd2b505c445268db7dfaa351656fda2ec3` | 82 unit tests; lint, typecheck and build; 57 Chromium and 56 WebKit browser tests passed; 1 explicit WebKit limit |

The existing suites were extended, including actual archive/image/PDF
operations and invalid imports. New shell workflows cover 320/390/768/1440 px,
supported languages, focus/history, visible legal links, 44-pixel central
targets, reduced motion and sampled computed contrast. Storyboard checks
light/dark/high-contrast modes, including text links, caret, control boundaries
and focus; editor/print/presentation remain its existing task-specific surfaces.

SocialMediaCreator additionally guards startup restoration against early edits
and tests a genuine project-file backup when browser storage fails. Failed
deletion keeps work intact and reports failure. No key, schema, archive
representation, API or export codec was migrated. Storyboard image-upload/ZIP
roundtrips and text/session recovery are checked; a combined WebKit image-blob
autosave roundtrip is not claimed.

## Lessons incorporated in the contract

- Action fills and link text need distinct semantic roles in dark appearances.
- Native selects need measured target dimensions; a declared minimum height
  alone was insufficient in WebKit.
- Tablet portrait may need the mobile editor/preview switch rather than a
  cramped desktop split.
- Expanded pickers must remain operable when content fields move earlier;
  SocialMediaCreator uses an inline emoji chooser instead of a clipped overlay.
- Safe internal navigation includes links inside dialogs and browser history,
  not only footer clicks.

## Open acceptance gates

Actual desktop Chrome 200% page zoom passed on both source pilots on 2026-11-13.
Native browser controls confirmed 200%. SocialMediaCreator covered caption
editing, date-error correction, a completed .smc download and Support return.
StoryboardCreator covered scene editing/review and completed .storyboard/PDF
downloads. Chrome device profiles additionally displayed 375×667 and 768×1024;
Storyboard Support navigation/return passed in the tablet profile. Emulation
does not establish physical-touch or screenreader conformance. Zoom was reset
to 100% and emulation disabled after verification.

The user confirmed on 2026-11-13 that VoiceOver was tested successfully in
both apps. Record this as user-performed acceptance, not an exhaustive WCAG
audit; individual scenarios and environment versions were not separately
recorded. The earlier local automation start failure does not invalidate it.
The user explicitly deferred physical smartphone/tablet checks until after
deployment; they no longer block completion of the local implementation,
but remain required before declaring full device acceptance.

Deferred physical touch-device checks,
operator legal/privacy review and a production rollback rehearsal remain open.
macOS denied native-input permission to the Safari automation client; viewport
or device-pixel-ratio emulation is not recorded as real zoom. The native Chrome
check above resolves the zoom gate despite that Safari-client restriction.

Installed headless WebKit rejects SocialMediaCreator's existing IndexedDB Blob
writes with `UnknownError: Error preparing Blob/File data to be stored in object
store`, reproduced on the untouched baseline. Its recovery roundtrip is not
counted as passing; visible failure handling and a real .smc backup pass in both
engines. Actual desktop Safari additionally saved/restored a synthetic caption
and reloaded/opened Support with its app origin server stopped; no storage
error occurred. Physical-iPad image recovery remains a release gate.

WebKit offline emulation fails service-worker navigation in the installed
Playwright runtimes; both apps mark that check explicitly skipped and retain
physical Safari/iPad offline/update verification. Chromium cached reload is
checked; the SocialMediaCreator desktop-Safari origin-unavailability check
above is narrower than a device offline/airplane-mode test.
See the [upstream reproduction](https://github.com/microsoft/playwright/issues/42775).
Installed Firefox fails to launch headlessly on this host, so no Firefox
conformance claim is made.

## Shared package decision

Keep the contracts and tokens centralized as documentation for now.
Storyboard reuses its existing local `@haak3/ui`; the SocialMediaCreator
implementation uses its existing CSS architecture. These checked candidates
are not yet two production adoptions, and no net maintenance gain for a new
cross-app package has been demonstrated. Extraction is therefore deferred
under [the existing criteria](../concept.md#implementation-strategy).

Continue with the [per-app rollout matrix](rollout-matrix.md) after pilot
acceptance. No other application's source or publishing pipeline was changed.
