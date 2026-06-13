# Design System

## Direction

The family uses a calm, functional interface modeled primarily on
SocialMediaCreator. Product content should dominate; branding and decoration
should remain restrained.

## Tokens

Apps MUST define semantic tokens rather than repeating raw values throughout
components. These values are the family baseline:

```css
:root {
  --app-bg: #f3f5f8;
  --surface: #ffffff;
  --surface-subtle: #f8fafc;
  --text: #111827;
  --text-muted: #667085;
  --border: #dfe3e8;
  --primary: #245dcc;
  --primary-hover: #1949a4;
  --primary-soft: #eaf0ff;
  --success: #176b3a;
  --success-soft: #edfbf2;
  --warning: #5f4700;
  --warning-soft: #fff8e8;
  --danger: #b42318;
  --danger-soft: #fef3f2;
  --focus: rgb(36 93 204 / 35%);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --shadow-soft: 0 18px 45px rgb(15 23 42 / 8%);
}
```

Apps MAY adjust the primary hue for a justified product identity. Semantic
meaning, contrast, and interaction states MUST remain consistent.

## Typography

- Use a local system font stack. Remote font services MUST NOT be required.
- Body text MUST use at least `16px` on content pages and SHOULD use at least
  `14px` in dense editor controls.
- Long-form text SHOULD use a line height between `1.5` and `1.7`.
- Headings MUST form a logical hierarchy and SHOULD use tight but readable
  spacing rather than decorative styling.
- Uppercase labels MAY identify sections, but MUST NOT carry essential meaning
  alone.

## Layout

- The minimum supported viewport width is `320px`.
- Main content SHOULD use a centered maximum width.
- Desktop editor tools MAY use an editor/preview split.
- Mobile layouts MUST provide one clear primary task at a time. Horizontal
  page scrolling is not acceptable.
- A4 or document previews MUST be visually distinct from editor controls.

## Surfaces

- Use white surfaces on a neutral gray workspace.
- Group related controls in bordered panels.
- Use shadows sparingly and only to clarify elevation.
- Keep border radii consistent. Avoid mixing many unrelated radii.
- Avoid gradients, glass effects, and decorative animation unless they serve a
  product-specific purpose.

## Controls

- Primary actions use the primary color and must be visually unambiguous.
- Secondary actions use a neutral surface and border.
- Destructive actions use danger styling and require confirmation when data
  loss is not trivially reversible.
- Icon-only controls MUST have an accessible name and SHOULD provide a tooltip
  when their meaning is not universally clear.
- Interactive targets MUST be at least `40px` in both dimensions; `44px` is
  preferred for touch-first workflows.

## Status and messaging

- Local processing SHOULD be communicated near the application header or
  primary workflow.
- Success, warning, and danger colors MUST be paired with text or an icon.
- Persistent educational or safety notices SHOULD be visually distinct but
  must not overpower the task.
- Notifications MUST explain what happened and, where relevant, how to recover.
