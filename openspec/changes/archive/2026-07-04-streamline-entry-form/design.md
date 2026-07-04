## Context

The current app opens a compact form after tapping the log action, but the input fields appear below the summary cards and require vertical scrolling to reach them. That creates unnecessary friction when a user is trying to enter a reading quickly.

## Goals / Non-Goals

**Goals:**
- Make the form entry experience feel immediate and efficient.
- Keep the chemistry-focused layout intact while surfacing the input fields sooner.
- Reduce the need for scrolling when entering a new reading.

**Non-Goals:**
- Changing the underlying persistence or backend flow.
- Reworking the chemistry summary concept itself.
- Adding new data fields to the form.

## Decisions

- Reposition the form so the input fields appear directly in the main entry flow when the form opens, rather than below the summary cards.
- Keep the form compact and use the existing field layout to avoid introducing a larger or more complex UI.
- Preserve the existing submit and history behavior while making the form feel more accessible during entry.

## Risks / Trade-offs

- [Layout compression may reduce visual breathing room] → Use compact spacing and keep the existing field labels to prevent the form from feeling crowded.
- [The form may become harder to scan on smaller screens] → Prioritize the most common fields first and keep the rest in a simple vertical stack.
