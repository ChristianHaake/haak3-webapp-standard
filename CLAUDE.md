# Claude Code Instructions

Follow `AGENTS.md` and the normative documents in `docs/`.

Before changing a shared rule:

1. inspect the relevant implementations in the three reference apps;
2. separate common product behavior from framework-specific implementation;
3. identify migration impact and exceptions;
4. update the review checklist when requirements change.

SocialMediaCreator informs visual hierarchy and behavior. The current palette
and shell contract are defined in `docs/`, not by its legacy colors or footer.
It is not a universal architecture template.
