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
  --app-bg: #f4f2ef;
  --surface: #ffffff;
  --surface-subtle: #f8f6f3;
  --text: #24211e;
  --text-muted: #645c53;
  --border: #dfdad4;
  --control-border: #887b6b;
  --brand: #ff9000;
  --on-brand: #24211e;
  --primary: #b84a00;
  --primary-hover: #943900;
  --primary-soft: #fff0df;
  --link: #b84a00;
  --success: #176b3a;
  --success-soft: #edfbf2;
  --warning: #5f4700;
  --warning-soft: #fff8e8;
  --danger: #b42318;
  --danger-soft: #fef3f2;
  --focus: #943900;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-soft: 0 18px 45px rgb(36 33 30 / 8%);
}
```

Apps MAY adjust the primary hue for a justified product identity. Semantic
meaning, contrast, and interaction states MUST remain consistent.

Brand orange is not the action background: normal white text on
`--brand` fails minimum text contrast (2.27:1). Apps MUST use a contrast-safe
foreground/background pairing: the baseline uses `--on-brand` on `--brand`
(7.05:1) and white on `--primary` (5.23:1). Control boundaries and focus
indicators MUST remain distinguishable against their adjacent surfaces;
`--border` alone is not the baseline input boundary. These measured pairs
do not establish contrast compliance for every component or appearance mode.

Text links and filled actions have distinct roles. The light baseline happens
to use the same hue for `--link` and `--primary`; a dark appearance may need
a lighter link foreground while keeping a dark action fill with white text.
For example, the Storyboard pilot uses `#ffb36b` for dark-mode links. Recheck
normal, hover, focus and selected text against the actual surface rather than
reusing an action-background token blindly.

Existing blue apps MAY retain their current palette during staged adoption,
with the remaining migration recorded in their conformance document. Do not
bulk-replace blue in preview content, stored theme IDs, or original logo assets.

## Typography

- Use a local system font stack. Remote font services MUST NOT be required.
- Body text MUST use at least `16px` on content pages and SHOULD use at least
  `14px` in dense editor controls.
- Long-form text SHOULD use a line height between `1.5` and `1.7`.
- Headings MUST form a logical hierarchy and SHOULD use tight but readable
  spacing rather than decorative styling.
- Uppercase labels MAY identify sections, but MUST NOT carry essential meaning
  alone.

## Appearance preferences

- Apps with extended editing workflows SHOULD respect the system colour scheme
  or offer a user-selected appearance.
- If an app offers appearance modes, every mode MUST preserve text, control,
  focus, and status contrast.
- An appearance setting SHOULD persist locally and apply before the main UI
  paints when a visible theme flash would disrupt the workflow.
- Product previews MAY use their own visual modes. Do not confuse a preview
  mode with the application accessibility setting.

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
