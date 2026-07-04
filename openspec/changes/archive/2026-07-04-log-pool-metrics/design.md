## Context

The current app shell includes static chemistry cards and routine tasks, but it does not yet support entering or retaining real pool test results. The new change should introduce a lightweight logging flow that fits the existing mobile-first experience without introducing server-side complexity.

## Goals / Non-Goals

**Goals:**
- Provide a simple form for entering the requested pool measurements.
- Persist entries locally in the browser so the app remembers them between sessions.
- Display recent readings in a compact history view.

**Non-Goals:**
- Cloud sync or multi-device sharing.
- Advanced analytics, charts, or alerting.
- Authentication or account-based data management.

## Decisions

- Use browser local storage for persistence because the app is a client-side PWA and does not currently require a backend.
- Keep the interaction lightweight by using a single form and a short list of recent entries rather than introducing a separate management screen.
- Normalize each entry with a timestamp plus the five requested measurement fields so future features can reason about the data consistently.

## Risks / Trade-offs

- [Browser storage limits] → Keep entries compact and avoid storing unnecessary payloads.
- [Input quality] → Validate required fields and value ranges before saving.
- [Limited offline durability] → Treat local storage as a simple persistence layer and document that data is device-local.

## Migration Plan

- No data migration is required for the initial release.
- New entries will begin being stored as soon as the logging experience is introduced.

## Open Questions

- Should the initial release show only the latest entry or a small recent history list?
- Should measurement units be displayed with the existing labels or standardized in a future follow-up?
