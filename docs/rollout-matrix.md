# Family rollout matrix

This is a planning matrix for staged adoption. It does not declare any app
conformant, authorize production changes, or require a simultaneous fleet
migration. Apply the safety-first sequence in [App adoption](app-adoption.md),
then record app-specific exceptions in that app's conformance document.

| Product | Planned scope | Preserve and verify | Known constraint or exception | Rollback target |
| --- | --- | --- | --- | --- |
| SocialMediaCreator | First visual and interaction pilot; apply approved shell and component contracts. | Existing sessions, project/archive formats and media, exports, offline behavior, safety/provenance behavior, and current tests. | Preserve its simulation-specific controls and safety language; it is the visual reference, not a universal layout. | Last known production build plus the existing compatible persistence and import path. |
| StoryboardCreator | Second pilot; validate contracts against the complex editor and local UI package. | Existing browser persistence and image blobs, project files, wizard routes, print/PDF/presentation, supported languages, and keyboard reordering. | Keep current editor workflow, persistence approach, and local UI package; no automatic extraction or framework/style rewrite. | Last known production build plus the existing compatible project and persistence path. |
| Feedbackbogen-Generator | Adopt contracts in its current Vanilla TypeScript UI. | Current saved configuration, validation/import behavior, criteria order, print layout, and all export formats. | Keep Vanilla TypeScript; any framework change needs a separate decision. Resolve the existing license inconsistency independently before release. | Last known production build plus the existing compatible configuration and import path. |
| SeriesCreator | Apply shell and field/action contracts to its staged editor. | Existing recovery behavior, project storage and file format, presentation, print, and language behavior. | Preserve its step-based workflow and current recovery behavior. | Last known production build plus the existing compatible project and persistence path. |
| InterviewCreator / TalkCreator | Apply field, status, action, and responsive editor contracts. | Session recovery, phases/questions, sorting, current JSON/Markdown exports, and languages. | Preserve conversation-phase structure and current export semantics. | Last known production build plus the existing compatible project and session recovery path. |
| DebateMaster | Address verified keyboard/focus issues first, then apply common controls. | Current saved debates, participant order, timer behavior, and existing state. Add focused regression coverage where none exists. | Verify keyboard behavior against focused controls before changing global shortcuts; existing automated test coverage needs confirmation at adoption. | Last known production build plus the existing compatible saved-state path. |
| EduNewsletter-Webapp | Apply contracts within the existing Next.js publishing cockpit. | Server routes, drafts, autosave, immutable versions, approval, and idempotent n8n jobs. | Keep Next.js and existing server/publishing contracts; no publish action is part of a UI-only migration. | Last known production deployment plus the existing compatible server/data path; restore the prior app build without replaying publish jobs. |
| Prompter | Apply contracts to editor/settings and feedback; retain presentation runtime. | Current saved projects/history, import validation, speed, mirroring, fullscreen, wake lock, and PWA behavior. | Keep the Vanilla TypeScript and presentation runtime; no framework migration is implied. | Last known production build plus the existing compatible project/history path. |
| UnterrichtsDashboard | Apply contracts to controls and orientation around its canvas workflow. | Current browser database and migrations, boards/widgets, validated workspace import/export, canvas interaction/alternatives, presentation, and i18n. | Preserve free-form canvas interaction and its task-specific gestures; require practical keyboard alternatives. | Last known production build plus the existing compatible database and workspace-import path. |
| PitchTimer | Apply button, status, and notes/history access contracts. | Current saved preferences/data, timer semantics, history, rich-text notes, fullscreen, wake lock, and PWA behavior. | Preserve timer timing and presentation behavior; do not apply editor/preview assumptions to the timer surface. | Last known production build plus the existing compatible saved-data path. |
| TextArchitect | Use the contracts when the new product is designed and implemented. | Select product design and stack deliberately; validate core authoring and preview workflow before release. | No existing UI or deployed data format to migrate; define the first format before release. | Before first release, revert to the last accepted design/build artifact; no production rollback target exists yet. |
| edunewsletter publishing pipeline | Review generated HTML/template presentation and validation separately from the webapp. | Current Node pipeline, HTML validation, review and release steps. | This is a publishing pipeline, not a webapp; do not apply UI framework requirements or bypass manual publication review. | Previous approved pipeline/template artifact and its matching configuration; keep the last published output unchanged until a replacement is approved. |
| AgentOS | Treat as a separate operations surface. Reuse relevant accessibility and responsive behavior only where appropriate. | Process contracts, read-only API/collector behavior, data age and error states, search/filter, and service links. | Separate operations tool; do not impose educational-app runtime or student-project assumptions. | Last known operations UI build plus the compatible read-only API/collector contract. |
| KnowledgeVault | Excluded. | No migration scope under this standard rollout. | Excluded by decision. | Not applicable; excluded from this rollout. |

## Per-app release gate

Before each production adoption, the responsible app repository MUST record
the standard version and exceptions, identify the exact rollback target from
the matrix (including the actual build/artifact identifier and compatible
data path), and complete relevant checks in the [review checklist](review-checklist.md).
At minimum:

- Verify representative existing projects still load and round-trip through
  import/export; invalid imports and storage failures leave current work intact.
- Keep the existing persistence keys, schemas, and project formats in a UI-only
  rollout. If a later data migration is separately needed, version it, preserve
  recoverable backups, and prove rollback before release.
- Verify the primary workflow with keyboard, focus restoration, narrow view,
  zoom, reduced motion, and touch checks relevant to the app.
- Stop rollout if existing work becomes unreadable, a core export breaks, or
  the main task cannot be completed. Restore the previous production build and
  retain its compatible data path before resuming.

These are gates for future app adoption, not a claim that these checks have
already passed across the family. Do not mark a pilot complete until its app
owner records the actual evidence and remaining exceptions.
