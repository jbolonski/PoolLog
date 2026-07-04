# AGENTS

## Project overview

PoolLog is a React + TypeScript + Vite frontend with an Express backend for storing pool chemistry logs. The app is designed around quick entry of chemistry readings and simple persistence.

## Working conventions

- Keep the UI chemistry-focused and mobile-friendly.
- Prefer lightweight backend solutions over heavy infrastructure.
- Preserve the existing client/server split unless a change explicitly requires otherwise.
- When adding features, keep the form flow fast and simple.

## Commands

- Install dependencies: `npm install`
- Start the local dev workflow: `node scripts/dev.mjs`
- Build the app: `npm run build`
- Run the Docker stack: `docker compose up -d --build`

## Notes

- Backend data is stored in a JSON-backed file store.
- Container deployment support is intended for Docker hosts, including Traefik-based setups.
