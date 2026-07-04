## Context

The current app uses browser local storage for pool log entries. That approach is appropriate for a simple client-only demo, but it does not meet the goal of persistent server-side storage. The new design should introduce a lightweight backend and a simple data model that can support creating and retrieving log entries without significant operational overhead.

## Goals / Non-Goals

**Goals:**
- Introduce a lightweight backend persistence layer for pool log entries.
- Support saving and loading entries through server-side APIs.
- Keep the implementation simple and practical for a small application.

**Non-Goals:**
- Building a full multi-tenant platform.
- Adding authentication or complex authorization.
- Supporting advanced reporting or analytics.

## Decisions

- Use a lightweight local database such as SQLite for the backend storage layer to keep setup simple and dependency-light.
- Expose a small API surface for creating and fetching pool log entries.
- Keep the frontend contract similar to the current form flow so the UI can evolve gradually.

## Risks / Trade-offs

- [Operational simplicity] → A lightweight database is easy to run locally but may not be ideal for scale beyond the initial use case.
- [Migration complexity] → Existing client-only entries will need a migration or fallback path if the app transitions from local storage to the server.

## Migration Plan

- The initial implementation can start with a server-backed storage layer and treat existing client-only entries as a separate legacy data source.
- Future iterations can add migration logic if needed.

## Open Questions

- Should the backend be implemented as a dedicated Node service or integrated into the existing Vite app environment?
  - backend can be implemented into the existing environment.
