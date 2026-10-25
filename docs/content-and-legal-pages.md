# Content and Legal Pages

## Required pages

Every production app MUST provide:

- Help;
- Support information;
- Privacy;
- Imprint or legal notice.

Apps SHOULD provide an About page. Terms, responsible-use guidance, educator
guidance, and transparency notices are required when the product's risks or
audience justify them.

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

The support page contains an external link to the donation provider. Explain
that the provider receives no data before a user selects that link and that its
own privacy policy applies after navigation.

## Imprint

The imprint MUST be completed and reviewed by the operator before release.
Templates and generated text are not legal approval.

## Help and about

Help SHOULD explain:

- the shortest successful workflow;
- saving, importing, exporting, and resetting;
- local persistence and recovery limits;
- supported files and size limits;
- known browser or device limitations.

About SHOULD explain the educational purpose, intended audience, source
license, and project ownership.

## Support information

The support page MUST explain that contributions are voluntary. It MUST name
the actual operating or maintenance work that contributions support. It MUST
offer at least one non-financial way to help, such as reporting errors or
sharing the project. Do not invent funding claims or contact channels.

## Translation

When an app supports multiple interface languages, all required content pages
SHOULD be translated. If a legally authoritative version exists only in one
language, the translated page must say so clearly.
