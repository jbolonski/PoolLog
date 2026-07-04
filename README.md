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

Build and run the container stack:

```bash
docker compose up -d --build
```

The stack uses a persistent volume for backend data and can be routed through Traefik with the provided compose labels.
