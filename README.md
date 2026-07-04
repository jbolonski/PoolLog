# PoolLog

PoolLog is a lightweight pool chemistry logging app built with React, TypeScript, Vite, and an Express backend. It focuses on quick daily readings for pH, chlorine, salt, temperature, and total alkalinity.

## Features

- Capture and review pool chemistry readings
- Persist entries on a lightweight server-backed store
- Mobile-friendly, chemistry-first interface
- Optional Docker-based deployment support

## Development

Install dependencies:

```bash
npm install
```

Start the app locally:

```bash
npm run dev
```

The development workflow also supports running the frontend and backend together via:

```bash
node scripts/dev.mjs
```

## Production build

```bash
npm run build
```

## Docker

The project can be built locally or published to GitHub Container Registry (GHCR) through the GitHub Actions workflow in [.github/workflows/docker-publish.yml](.github/workflows/docker-publish.yml).

### Build locally

```bash
docker compose up -d --build
```

### Pull and deploy images from GitHub Container Registry

1. Update the image references in [docker-compose.yml](docker-compose.yml) to use your GitHub username or organization.
2. Push the workflow to GitHub and run the publish action.
3. Pull and deploy the published images:

```bash
docker compose pull
docker compose up -d
```

The stack uses a persistent volume for backend data and can be routed through Traefik with the provided compose labels.
