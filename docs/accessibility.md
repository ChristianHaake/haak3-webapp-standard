# Accessibility

The target is WCAG 2.2 AA for the complete core workflow.

## Required behavior

- Use semantic HTML before ARIA.
- Every control MUST have a programmatic name.
- All functionality MUST be keyboard operable.
- Focus MUST be visible and must not be obscured by sticky UI.
- Focus order MUST follow the visual and task order.
- Dialogs MUST trap focus, close with `Escape` where appropriate, and restore
  focus to their trigger.
- Status updates and asynchronous errors MUST be announced through an
  appropriate live region.
- Color MUST NOT be the only means of conveying information.
- Text and interactive controls MUST meet WCAG AA contrast.
- Images that convey information MUST have useful alternative text.
- Decorative images and icons MUST be hidden from assistive technology.
- The interface MUST remain usable at 200% browser zoom.
- Motion MUST respect `prefers-reduced-motion`.

## Forms

- Use persistent visible labels.
- Associate help and error text with controls.
- Mark required fields in text, not only through color or symbols.
- Preserve user input after validation errors.
- Use native input types and autocomplete tokens where they improve usability.

## Reordering and drag-and-drop

Drag-and-drop MUST have a keyboard alternative. Up/down buttons are acceptable
when their accessible names identify the item and direction. Reordering MUST
announce the result.

## Language

- Set the document language.
- Mark passages in another language when needed.
- Language switches MUST expose their current state.
- Translation keys must not leak into the rendered interface.

## Exported artifacts

An accessible editor does not automatically produce an accessible export.
Apps MUST test the relevant output:

- printed/PDF text remains readable and is not clipped;
- document exports use headings, tables, and labels appropriately;
- essential meaning is not encoded only through color;
- filenames and document titles are meaningful.

If an export format cannot be made fully accessible, document the limitation
and provide the most accessible practical alternative.

## Verification

Each release SHOULD include:

- keyboard-only completion of the primary workflow;
- automated accessibility checks for major routes;
- manual screen-reader checks for dialogs, import/export status, and dynamic
  editor updates;
- checks at 200% zoom and with reduced motion.
