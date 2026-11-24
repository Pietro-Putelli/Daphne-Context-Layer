# Daphne

Daphne is a knowledge workspace for engineering teams. This repository contains a Next.js web app and HTTP API running on Bun, backed by PostgreSQL with pgvector.

## Run locally

Install Bun 1.4.5 and start Docker with the Compose plugin. Check that `bun --version` prints `1.4.5`.

```sh
bun install --frozen-lockfile
cp .env.example .env
docker compose up -d --wait db
docker compose exec db psql -U daphne -d daphne -c 'CREATE EXTENSION IF NOT EXISTS vector'
bun run dev
```

Open [Daphne](http://localhost:3000) in your browser. The [API health endpoint](http://localhost:3000/api/health) returns HTTP 200 when PostgreSQL is reachable and HTTP 503 when it is unavailable.

Stop the web app with Ctrl+C. Run `docker compose down` to stop local PostgreSQL and keep its data in the Docker volume.

## Repository structure

```text
src/app/                 Next.js pages, layouts, and styles
src/app/api/health/      HTTP endpoint for database readiness
src/server/              Server configuration and database access
tests/                   Integration checks
compose.yaml             Local PostgreSQL and pgvector
.github/workflows/ci.yml Pull request and main branch checks
```

## Checks

Start the local database and enable pgvector before running the integration tests. Use a development or test database for these checks.

```sh
bun run format:check
bun run lint
bun run typecheck
bun test
bun run build
bun run start
```

`bun run format` applies formatting. CI runs the checks from a frozen install, starts the production build, and requests both the homepage and the health endpoint.
