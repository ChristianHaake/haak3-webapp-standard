# Content and Legal Pages

## Required pages

Every production app MUST provide:

- Help;
- Contact (see [contact and feedback](contact-and-feedback.md));
- Support (see [support page](ui-patterns.md#support-page));
- Terms (AGB);
- Privacy;
- Imprint or legal notice.

Apps SHOULD provide an About page. Responsible-use guidance, educator guidance,
and transparency notices are required when the product's risks or audience
justify them.

## Implementation

- Content SHOULD be stored as Markdown, separate from UI components.
- Pages MUST use stable routes and support direct navigation.
- Each page MUST have one clear `h1` and a route back to the app.
- External links MUST be visually identifiable and opened safely when using a
  new tab.
- Raw HTML in Markdown MUST be disabled or sanitized.

## Privacy page

The privacy page MUST match actual production behavior and cover:

- operator and contact information;
- hosting provider and connection data;
- localStorage, IndexedDB, cookies, and their purposes;
- uploaded files and whether they leave the device;
- analytics or other third-party processing;
- data deletion and reset behavior;
- date or version of the notice.

Do not state “no data transmission” when the host necessarily receives
connection metadata. Distinguish user-created content from technical request
data.

## Imprint

The imprint MUST be completed and reviewed by the operator before release.
Templates and generated text are not legal approval.

## Terms (AGB)

Every production app MUST provide a stable terms route, labeled AGB in German
and with an equivalent localized label elsewhere. The terms MUST describe the
actual app scope and be completed and reviewed by the operator before release.
The starter supplies a visible draft structure only; it does not establish legal
compliance or generate terms.

## Support

The support page MUST describe voluntary contributions in the app's own terms.
It MUST put the coffee action before non-payment feedback and explain that the
external provider is contacted only after the user opens its link. Keep the
feedback forms and `apps@haak3.de` available without a donation. Follow the
full [support-page contract](ui-patterns.md#support-page); a Markdown renderer
MAY style the coffee link as a button without loading a provider widget.

## Help and about

Help SHOULD explain:

- the shortest successful workflow;
- saving, importing, exporting, and resetting;
- local persistence and recovery limits;
- supported files and size limits;
- known browser or device limitations.

About SHOULD explain the educational purpose, intended audience, source
license, and project ownership.

## Translation

When an app supports multiple interface languages, all required content pages
SHOULD be translated. If a legally authoritative version exists only in one
language, the translated page must say so clearly.
