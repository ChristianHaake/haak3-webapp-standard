# UI Patterns

## Application shell

Every app MUST contain:

1. a header with brand, short purpose, and global controls;
2. a main task area;
3. a footer with help, AGB, privacy, imprint, and a repository link when its public URL is confirmed;
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
- terms (AGB);
- privacy;
- imprint or legal notice;

It MUST link to the public source repository when its URL is confirmed. It
SHOULD also link to an about page and may include educator guidance or
responsible-use information where the product needs them.

Footer labels, order, and route names SHOULD remain consistent within a
language. Do not hide essential legal links in a menu.

### Repository link

The required source-repository link SHOULD render as an icon-and-label link
with an accessible name, open in a new tab, and carry
`rel="noopener noreferrer"`. It MUST NOT load third-party scripts, embeds, or
tracking. Reference markup (framework-independent), taken from
Feedbackbogen-Generator:

```html
<a
  class="github-link"
  href="https://github.com/ChristianHaake/<app>"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub Repository"
>
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.9 4.8 19 5.1 19 5.1c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.7c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
  </svg>
  <span>GitHub</span>
</a>
```

### Support page

Every production app MUST provide an internal, directly loadable support page.
The visible Footer action MUST lead there, never directly to a provider. The
page MUST explain that support is voluntary and does not change access to the
app. It MUST name actual maintenance, testing, or operating work without
inventing costs or funding claims.

The page MUST show one clear, visually primary coffee action before secondary
feedback options. It SHOULD be visible without scrolling at 320 × 720 CSS
pixels. The action MUST have a touch target of at least 44 × 44 CSS pixels.
Below it, the page MUST offer a non-payment way to help, including the assigned
error and feature forms where available and `apps@haak3.de` for general contact.
The page MUST explain near the coffee action that the donation provider opens
only after activation. Keep the page's remaining navigation visually secondary.

The provider link to `https://buymeacoffee.com/Haake` MUST use `target="_blank"` and
`rel="noopener noreferrer"`; it MUST NOT load a third-party script, embed, or
tracking pixel. Both the Footer action and the page link need a visible,
localized label and accessible name. The Footer action SHOULD sit apart from
legal navigation and MAY use the single branded accent colour.

SocialMediaCreator's support-page update in PR #54 established the first-action
hierarchy after its previous page hid the coffee link below feedback text.
Feedbackbogen-Generator already demonstrates an internal support route;
StoryboardCreator's checked stage commit on 2026-11-26 still linked directly to
the provider. Transfer the hierarchy in each app's existing framework and route
without copying SocialMediaCreator's component or product-specific wording.
Apps with an existing support route mainly need content order and button styling;
apps with a provider-direct Footer link need an internal route, localized copy,
and a direct-navigation check. Keep existing published support URLs and record
temporary exceptions in the app's conformance document. This change does not
alter project files, storage, or export behavior.

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
- Hide non-critical navigation (e.g., privacy link) on extremely narrow screens
  (e.g., `<360px`) if necessary to prevent layout breakage.
- Test at `320px`, `390px`, tablet portrait, and a standard desktop width.
- Paper previews may scale visually, but editor text and controls must remain
  readable without zooming.
