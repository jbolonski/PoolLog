## ADDED Requirements

### Requirement: Persist pool log entries on the server
The system SHALL store pool log entries in a server-side database rather than relying only on client-side storage.

#### Scenario: Successful save
- **WHEN** a user submits a pool log entry
- **THEN** the system SHALL persist the entry through a backend storage layer.

#### Scenario: Retrieve saved entries
- **WHEN** the app loads the pool log view
- **THEN** the system SHALL retrieve recent pool log entries from the server.

### Requirement: Preserve the current log data contract
The system SHALL continue to support the same pool log fields for pH, chlorine PPM, salt PPM, temperature, and total alkalinity.

#### Scenario: Field preservation
- **WHEN** a pool log entry is saved or fetched
- **THEN** the system SHALL preserve the five expected measurement values.
