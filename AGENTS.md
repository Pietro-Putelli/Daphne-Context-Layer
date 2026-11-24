# Working in Daphne

Daphne is a TypeScript application for engineering teams. The web app and HTTP API share one Next.js package and run on Bun. See the [README](README.md) for local setup and the [Notion brief](https://app.notion.com/p/4212e607b83e80fba604e651e4c254e4) for planned product behavior.

## Where to work

- Put pages and layouts in `src/app/` and HTTP Route Handlers in `src/app/api/`. Keep database access and environment validation in `src/server/`. Read `DATABASE_URL` on the server and keep credentials out of client code and HTTP errors.
- For Next.js conventions, consult the docs shipped with the installed version in `node_modules/next/dist/docs/`. Use the project skill `vercel-react-best-practices` for React rendering and data fetching, and `web-design-guidelines` for UI and accessibility reviews.
- Keep Bun tests in `tests/`. The database checks use a real PostgreSQL instance with pgvector enabled. If a test needs substantial fixture setup, put the helper beside the test.

## Making changes

- Keep TypeScript strict and change callers alongside the contracts they use. During the bootstrap, update development data and examples together with the code. Add compatibility handling only for a documented need.
- Make the smallest complete change. Keep related logic together, introduce packages when they have a concrete responsibility, and document a new package's purpose and public API in its README.
- Comment on contracts another developer could easily break. Explain the reason, relevant callers, and any non-obvious failure or side effect. Use an example when it clarifies how to use the code.
- For future retrieval work, enforce access before source text reaches a model or user. Tie citations to the exact source revision and keep source evidence distinct from guidance that a maintainer has approved.
- Add new tests only when explicitly requested. Update an existing test when a requested behavior change makes its expectation obsolete. Preserve checks that reveal a regression.

## Verification

Use the Bun version pinned in `package.json` and install with `bun install --frozen-lockfile`. CI checks formatting, lint, types, existing tests, and the production build.

```sh
bun run format:check
bun run lint
bun run typecheck
bun test
bun run build
```

Start the database as described in the README before running the tests. For HTTP behavior, exercise the running endpoint. Get an independent review for substantial behavior or architecture changes. Report the checks actually run and what they establish.
