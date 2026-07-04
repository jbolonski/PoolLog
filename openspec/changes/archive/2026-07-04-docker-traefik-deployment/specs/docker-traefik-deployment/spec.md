## ADDED Requirements

### Requirement: Containerized deployment for Docker and Traefik
The system SHALL support running the application in Docker containers behind a Traefik reverse proxy using environment-based configuration.

#### Scenario: Container stack starts successfully
- **WHEN** the deployment stack is started on a Docker host
- **THEN** the frontend and backend services come up with their expected routing and persistence behavior

#### Scenario: Traefik routes traffic to the app
- **WHEN** a request is sent to the configured Traefik host
- **THEN** the request is forwarded to the application without requiring local development ports

#### Scenario: Backend storage persists across container restarts
- **WHEN** the backend container is restarted
- **THEN** pool log data remains available through the configured persistent volume
