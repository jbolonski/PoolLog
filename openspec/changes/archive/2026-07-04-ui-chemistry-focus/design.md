## Context

The current app layout includes a featured Today section, a Routine section, and a bottom navigation item for Tasks. These elements are secondary to the chemistry logging workflow and create visual noise. The redesign should reduce the interface to the core chemistry experience while preserving the existing mobile-friendly structure.

## Goals / Non-Goals

**Goals:**
- Remove the non-essential sections and navigation entry that compete with chemistry focus.
- Keep the interface simple, readable, and centered on recent readings and logging.
- Preserve the existing mobile-first layout and local persistence behavior.

**Non-Goals:**
- Reworking the data model or persistence behavior.
- Adding new analytics or charting.
- Introducing a new navigation model beyond the requested simplification.

## Decisions

- Remove the Today and Routine panels entirely from the main screen to reduce distraction.
- Collapse the top hero area to a minimal title and short supporting text.
- Simplify the bottom navigation to only the essential destinations, excluding Tasks.

## Risks / Trade-offs

- [Less contextual information] → Keep the chemistry card summary prominent so users still understand the current state quickly.
- [Reduced discoverability] → Ensure the log action remains obvious and accessible.

## Migration Plan

- No data migration is required.
- The updated layout will take effect immediately in the next app render.

## Open Questions

- Should the bottom navigation be reduced further to only Home and History?
