## Why

The application is currently suited for local development but not yet for deployment in a Docker-based environment behind a reverse proxy. A containerized deployment path is needed so the app can run reliably on a Docker server with Traefik routing and environment-based configuration.

## What Changes

- Add a containerized deployment setup for the frontend and backend so the app can run in Docker.
- Configure the deployment to work behind Traefik using Docker labels and route-based ingress.
- Provide an environment-driven configuration path for the backend API and frontend base URL.
- Keep the deployment simple enough for a self-hosted Docker server without adding unnecessary orchestration complexity.

## Capabilities

### New Capabilities
- `docker-traefik-deployment`: A deployment capability that packages the app for Docker and exposes it through Traefik.

### Modified Capabilities
- `pool-metrics-logging`: The existing pool log workflow remains the same, but its runtime environment will now support container-based deployment.

## Impact

- Adds deployment assets such as Dockerfiles and compose configuration.
- Requires updates to the app’s runtime configuration for container environments.
- Affects the local development workflow and deployment documentation.
