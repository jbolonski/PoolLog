## Why

The current pool log data is stored only in the browser, which makes it device-specific and limits the app's ability to share or preserve entries consistently. Moving the data to a lightweight server-side database will make the pool log more reliable and better suited for future multi-device or remote access use cases.

## What Changes

- Add a lightweight server-side persistence layer for pool log entries.
- Replace client-only storage with server-backed API operations for creating and reading pool log data.
- Keep the existing user experience intact while using server storage under the hood.

## Capabilities

### New Capabilities
- server-side-pool-log-storage: persist pool log entries through a backend service and database.

### Modified Capabilities
- None.

## Impact

- Application data flow and persistence strategy.
- New backend service and database setup.
- Future compatibility with multi-device or synced pool log access.
