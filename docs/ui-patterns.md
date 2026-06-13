# UI Patterns

## Application shell

Every app SHOULD contain:

1. a header with brand, short purpose, and global controls;
2. a main task area;
3. a footer with help, privacy, imprint, and repository links;
4. dedicated content pages that preserve a clear route back to the app.

The shell must remain usable when the main workflow becomes long or dense.

## Header

The header SHOULD:

- use a compact brand mark, app name, and short functional tagline;
- communicate local processing when accurate;
- place language and educator controls on the right;
- keep primary workflow actions separate from identity and informational links.

Sticky headers MAY be used for long editors, but MUST not consume excessive
mobile viewport height.

## Footer

The footer MUST link to:

- help;
- privacy;
- imprint or legal notice;
- the public source repository.

It SHOULD also link to an about page and may include educator guidance, terms,
or responsible-use information where the product needs them.

Footer labels, order, and route names SHOULD remain consistent within a
language. Do not hide essential legal links in a menu.

## Editor and preview

For document or media generators:

- Desktop SHOULD use a side-by-side editor and live preview where space allows.
- Mobile MUST provide an explicit editor/preview switch or a clear sequential
  flow.
- Changes SHOULD appear in the preview immediately.
- Editor panels SHOULD be grouped by user intent, not internal data structure.
- Advanced or infrequent options SHOULD be collapsed by default.
- The currently edited item MUST be visually identifiable.

## Project actions

Use consistent verbs:

- **New** or **Reset**: clear the current project;
- **Open** or **Import**: load a user-selected file;
- **Save project** or **Export project**: create an editable backup;
- **Export PDF/Image/DOCX**: create an output artifact.

Do not use “Save” for both local autosave and file download without clarifying
the distinction.

Replacing non-empty work MUST require confirmation. Failed imports MUST leave
the current project intact.

## Content pages

Content pages SHOULD use:

- a centered white article surface;
- a visible back link near the top;
- one `h1`;
- readable line length;
- standard link styling;
- the same footer as the application.

## Empty, loading, and error states

- Empty states must tell users what to do next.
- Loading indicators must identify the operation when it lasts more than a
  brief moment.
- Errors must use plain language and preserve recoverable work.
- Validation errors should appear next to the affected field and in a summary
  when several errors block progress.

## Responsive behavior

- Do not merely shrink desktop controls.
- Keep the primary action visible and reachable.
- Wrap or regroup actions before truncating meaningful labels.
- Test at `320px`, `390px`, tablet portrait, and a standard desktop width.
- Paper previews may scale visually, but editor text and controls must remain
  readable without zooming.
