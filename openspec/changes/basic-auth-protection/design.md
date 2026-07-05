## Context

The deployed application is exposed through a containerized backend and frontend stack. The current deployment does not include any authentication layer, so the application can be accessed directly once published. A lightweight basic-auth approach is appropriate because it is easy to configure, does not require external identity infrastructure, and fits a self-hosted deployment model.

## Goals / Non-Goals

**Goals:**
- Protect the application behind basic authentication for deployed instances.
- Allow credentials to be configured in a file mounted into the backend container.
- Keep the change simple and compatible with the existing Docker-based deployment.

**Non-Goals:**
- Implementing OAuth, SSO, or role-based access control.
- Supporting multi-user management through a UI.
- Requiring external services for authentication.

## Decisions

- Use HTTP Basic Authentication at the backend layer.
- Store credentials in a simple text-based config file mounted into the container at runtime.
- Support a single or multiple user entries in the config file.
- Apply authentication to the application routes so the frontend and API are protected.

## Risks / Trade-offs

- [Operational simplicity] → A file-based credentials store is easy to manage but not as flexible as a dedicated identity system.
- [Credential handling] → Passwords should be stored in a simple, clearly documented format and mounted securely.

## Migration Plan

- Enable authentication through configuration and keep the default behavior open for local development.
- Existing deployments can opt in by mounting a credentials file and setting the relevant environment variable.

## Open Questions

- Should the authentication config file be mounted at a fixed path such as /app/config/auth-users.json or /data/auth-users.json?
  - Use /data/auth-users.json for consistency with the existing persistent volume pattern.
