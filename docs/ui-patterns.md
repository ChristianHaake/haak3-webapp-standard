# UI Patterns

Common interaction requirements for buttons, fields, disclosures, dialogs,
status, shell, and editor/preview are specified in
[Interaction component contracts](component-contracts.md). This file retains
the family-wide shell and workflow rules.

## Application shell

Every app SHOULD contain:

1. a header with brand, short purpose, and global controls;
2. a main task area;
3. a footer with haak3 attribution, help, examples, about, support, terms,
   privacy, imprint,
   and a repository link only when its public visibility is confirmed;
4. dedicated content pages that preserve a clear route back to the app.

The shell must remain usable when the main workflow becomes long or dense.

## Header

The header MUST identify the current app with its own app name and logo when
an approved asset exists. Existing logos MUST NOT be recolored automatically.
Until an app has an approved logo, its name provides the identity; do not
invent a replacement mark during shell migration. The identity link MUST lead
to that app's start/workspace, not the haak3 website, and MUST preserve work
or apply the existing data-loss protection.

The header SHOULD:

- use a compact brand mark, app name, and short functional tagline;
- communicate local processing when accurate;
- place language and educator controls in a compact secondary group that can
  wrap on narrow screens;
- keep primary workflow actions separate from identity and informational links.

Sticky headers MAY be used for long editors, but MUST not consume excessive
mobile viewport height.

### Language selection

- Apps with multiple available interface translations MUST offer one compact,
  labeled language menu with full names such as Deutsch and English, without
  flags or language-code-only labels.
- Only implemented interface translations MUST be offered. A single-language
  app MUST omit the language menu.
- A native select SHOULD be used unless an existing accessible component meets
  the same keyboard and focus behavior. The control MUST be at least 44×44 px.
- Switching language MUST preserve edited content, update the document
  language, and translate interface errors/status without translating user
  content. Content language MUST be marked separately where needed.
- Language preference SHOULD persist locally with a documented app-specific
  key. Blocked or unavailable storage MUST NOT prevent language selection.
- The family target locale set is Deutsch, English, Français, Español, and
  Nederlands, based on Feedbackbogen-Generator's implemented locale behavior.
  An app MUST offer a target locale only once its interface, errors, status,
  and required content pages are complete in that locale. A missing target
  locale is a documented migration issue, not a reason to expose partial UI.
- The initial locale SHOULD follow the browser preference when it matches an
  implemented locale; a later manual choice SHOULD persist locally. Both
  behaviors are fallbacks: unavailable storage or an unknown browser locale
  MUST fall back to the app's documented default without blocking use.

## Footer

The footer MUST link to:

- help;
- examples, when the app ships examples;
- about;
- a support information page;
- terms (AGB);
- privacy;
- imprint or legal notice.

It MUST include restrained haak3 attribution linked to `https://haak3.de/`.
The public repository link follows the conditional rule below. Educator
guidance or responsible-use information MAY be added where needed.

Footer labels, order, and route names SHOULD remain consistent within a
language. Do not hide essential legal links in a menu.

Support MUST remain visibly labeled on mobile and render as a filled
action-orange link with a decorative coffee icon, at least 44×44 px.
Use „Unterstützen“ in German and an equivalent localized label elsewhere.
It MUST lead to the internal support page. Keep it in the footer rather than
competing with the editor's main action in the task area. Wrap footer links
without hiding required pages, including below 360 px.

### Repository link

A repository link MUST appear only when the correct repository URL and public
visibility have been confirmed during adoption/release review. Omit it for
private or unverified repositories; do not expose private repository URLs or
add a runtime visibility API call. The link MUST render as an icon with a
localized accessible name identifying the app and source destination, a
keyboard-focus/hover tooltip, and a target of at least 44×44 px.
It MUST open in a new tab with `rel="noopener noreferrer"` and MUST NOT load
third-party scripts, embeds, or tracking. A native title alone does not satisfy
the keyboard tooltip requirement.

Framework-independent structure, adapted from Feedbackbogen-Generator.
The app's CSS must supply the target dimensions and show the tooltip on
hover and keyboard focus:

```html
<a
  class="github-link"
  href="https://github.com/ChristianHaake/<app>"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="<App name>: source code on GitHub"
>
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.9 4.8 19 5.1 19 5.1c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.7c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
  </svg>
  <span class="github-link__tooltip" aria-hidden="true">Source code on GitHub</span>
</a>
```

### Support page

Every production app MUST provide a localized support information page. The
footer links to this internal page, not directly to a donation provider. The
page MUST explain the voluntary nature of support, the concrete project costs
or maintenance it supports, and another non-financial way to help.
It MUST offer a visible feedback route to `apps@haak3.de` for bug reports and
feature ideas. The mail link SHOULD prefill the app name and a concise subject;
it MUST NOT disclose project content or add tracking parameters.

The page MUST contain one plain outbound "Buy me a coffee" link to
`https://www.buymeacoffee.com/Haake` unless the operator specifies another
target. The outbound link:

- MUST use `target="_blank"` and `rel="noopener noreferrer"`, with no
  third-party script, embed, or tracking pixel;
- MUST have a visible, localized label and an accessible name;
- SHOULD use the family action-orange treatment; other page navigation remains
  visually secondary.

Reference markup, adapted from the NOREA.schule support page:

```html
<a
  class="support-page__coffee"
  href="https://www.buymeacoffee.com/Haake"
  target="_blank"
  rel="noopener noreferrer"
>
  <!-- coffee icon, aria-hidden="true" -->
  <span>Buy me a coffee</span>
</a>
```

## Editor and preview

For document or media generators:

- Desktop SHOULD use a side-by-side editor and live preview where space allows.
- Mobile MUST provide an explicit editor/preview switch or a clear sequential
  flow.
- Changes SHOULD appear in the preview immediately.
- Editor panels SHOULD be grouped by user intent, not internal data structure.
- Advanced or infrequent options SHOULD be collapsed by default. Native
  `<details>` and `<summary>` elements SHOULD be used to ensure semantic
  accessibility for these collapsible sections.
- Editors requiring a specific device orientation MAY include a dismissible
  orientation strip to guide the user.
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

Opening internal content pages and returning MUST preserve recoverable editor
work. Direct links and browser back/forward MUST work; page navigation MUST
move focus to the page heading or main content, and returning MUST restore a
meaningful focus location. A full page reload is acceptable only when the
app's persistence/recovery preserves work. The in-memory workshop solution is
not a requirement to keep every production editor mounted.

### Examples

Examples MUST be clearly identified as local sample content. Opening an example
MUST NOT overwrite current work without the app's existing replacement
protection. Sample projects MUST NOT include personal, production, or otherwise
sensitive data. If examples can be downloaded, their format and recovery
behavior follow the normal project import/export contract.

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
- Wrap or regroup actions before truncating meaningful labels. Container queries
  SHOULD be used to restructure tight components (e.g., side-by-side options)
  when their container lacks space.
- Required footer and legal links MUST remain visible on narrow screens;
  wrap or regroup them instead of hiding them.
- Test at `320px`, `390px`, tablet portrait, and a standard desktop width.
- Paper previews may scale visually, but editor text and controls must remain
  readable without zooming.
