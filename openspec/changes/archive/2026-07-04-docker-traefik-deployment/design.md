## Context

The application currently runs as a Vite frontend plus an Express API and is intended to be deployed on a self-hosted Docker server. The deployment needs to support routing through Traefik while keeping the app containerized and easy to configure via environment variables.

## Goals / Non-Goals

**Goals:**
- Provide a container-based deployment path for the frontend and API.
- Make the application reachable through Traefik-based routing.
- Support environment-based configuration for API URLs and runtime settings.

**Non-Goals:**
- Replacing Traefik with another reverse proxy.
- Introducing a full Kubernetes deployment model.
- Adding complex multi-service orchestration beyond Docker Compose.

## Decisions

- Use a single Docker Compose stack with separate services for the frontend and backend so the app remains straightforward to run and maintain.
- Expose the app through Traefik labels so the deployment can be integrated into an existing reverse-proxy network.
- Keep the backend storage file in a persistent volume to preserve pool log entries across container restarts.
- Use environment variables for the API base URL and port configuration so the deployment can adapt to different hostnames and networks.

## Risks / Trade-offs

- [Traefik labels may need adjustment for each host environment] → Keep labels configurable and documented for easy tuning.
- [Container networking can introduce URL mismatches] → Use explicit environment variables for the frontend API base URL and backend port.
- [Persistent file storage may need a writable host path] → Document the required volume mount clearly.
