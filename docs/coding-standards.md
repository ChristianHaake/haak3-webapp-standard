# Coding Standards

## Language and structure

- New source code MUST use TypeScript with strict checking.
- Organize code by responsibility or feature, not by arbitrary file type alone.
- Keep domain data, persistence, export logic, and UI rendering separable.
- Shared app utilities belong in an explicit `shared/` or `lib/` area.
- Avoid abstractions that have only one trivial caller.
- Prefer pure functions for parsing, migration, validation, and export mapping.

Framework-specific conventions may differ, but the boundaries above should
remain visible.

## Data safety

- Never trust parsed JSON or archive contents based on TypeScript types.
- Runtime validators MUST return actionable failures.
- Limits for file size, image dimensions, entry count, and uncompressed archive
  size SHOULD be explicit constants.
- State replacement MUST happen only after complete validation.
- Object URLs and other browser resources MUST be released.

## User-facing text

- Keep UI strings centralized when the app supports multiple languages.
- Do not construct sentences from fragments that translators cannot reorder.
- Error messages should state the failed operation and recovery action.
- Educational and legal claims must be precise and must match actual behavior.

## Testing

Every app MUST have automated tests for:

- persistence serialization and restoration;
- schema migration and invalid imports;
- destructive state transitions;
- core domain transformations;
- export mapping where output can be tested without visual comparison.

Apps SHOULD have browser tests for:

- the primary user workflow;
- direct navigation to content pages;
- import/export interactions;
- mobile editor/preview behavior;
- keyboard access to critical controls.

Visual export and print behavior still require manual testing on target devices.

## Commands

Repositories SHOULD expose predictable commands:

```text
npm run dev
npm run build
npm run test
npm run lint
npm run typecheck
npm run verify
```

`verify` SHOULD run every automated release gate. If a command is not relevant,
the README must state the equivalent.

Use `npm ci` for reproducible CI and release builds. Pin the supported Node
major version.

## Documentation

Each app README MUST state:

- product purpose and intended users;
- live URL;
- local-processing and network behavior;
- persistence and project-file behavior;
- development and verification commands;
- deployment target;
- license;
- known accessibility or export limitations.

Significant serialized formats SHOULD have their own versioned specification.
