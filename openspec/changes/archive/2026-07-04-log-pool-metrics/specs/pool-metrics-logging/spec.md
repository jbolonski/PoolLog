## ADDED Requirements

### Requirement: Capture pool measurements
The system SHALL allow a user to record a pool log entry containing pH, chlorine PPM, salt PPM, temperature, and total alkalinity.

#### Scenario: Successful entry creation
- **WHEN** a user submits a complete set of valid measurements
- **THEN** the system stores the entry with a timestamp and shows it in the recent log view.

#### Scenario: Invalid submission is blocked
- **WHEN** a required measurement is missing or outside an accepted range
- **THEN** the system prevents saving the entry and shows validation feedback.

### Requirement: Retain and present recent readings
The system SHALL persist saved pool measurements locally and present them in a recent entries list.

#### Scenario: Entry persists after refresh
- **WHEN** a user saves a pool measurement and reloads the app
- **THEN** the saved entry remains available in the recent log view.
