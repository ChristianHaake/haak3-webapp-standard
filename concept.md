# Concept and rationale

## Problem

The haak3 apps solve related educational workflows but currently make product
and engineering decisions independently. That creates avoidable differences in
navigation, legal pages, storage behavior, accessibility, deployment security,
and agent-generated code.

## Decision

This repository is the normative standard for the haak3 educational web app
family.

Each app keeps its own product identity and implementation. The standard
defines the behavior that should feel consistent across the family:

- local-first and account-free use;
- clear privacy and storage communication;
- a restrained, accessible interface;
- consistent header, footer, content-page, import, export, and reset patterns;
- static or serverless deployment on Cloudflare;
- explicit validation of imported data;
- maintainable TypeScript with automated verification;
- documented instructions for coding agents.

## Design direction

SocialMediaCreator is the primary visual reference. The standard adopts its
strongest qualities:

- neutral gray workspace with white surfaces;
- dark, high-contrast typography;
- one blue primary accent;
- restrained borders, radii, and shadows;
- clear hierarchy through labels, headings, and grouped panels;
- visible local-processing and educational-context communication;
- responsive editor and preview layouts.

This is a design direction, not a requirement to copy its React components or
its app-specific social-media preview styling.

## Implementation strategy

The standard starts as documentation and templates. Shared npm packages are
premature while the apps use different UI stacks and the stable shared API is
not yet known.

A component or utility should move into a shared package only after:

1. at least two apps have equivalent production implementations;
2. their behavior and accessibility contract match;
3. central versioning reduces more work than it introduces;
4. the package does not force an app to adopt an otherwise unnecessary
   framework.

Until then, apps should reproduce the documented behavior using their existing
stack.

## Governance

Changes to this repository are changes to the family contract. They should:

- state whether they are mandatory or recommended;
- identify migration impact on existing apps;
- update the review checklist when behavior changes;
- avoid encoding one app's incidental implementation as a universal rule.

The current draft becomes stable after it has been applied to all three
reference apps and contradictions have been resolved.
