import { expect, test } from "bun:test";
import { getDb } from "../src/server/db";
import { databaseUrl } from "../src/server/env";

test("requires a PostgreSQL connection URL", () => {
  for (const value of [
    undefined,
    "",
    "mysql://localhost/daphne",
    "postgres://",
  ]) {
    expect(() => databaseUrl(value)).toThrow("DATABASE_URL");
  }
});

test("PostgreSQL can execute a pgvector distance query", async () => {
  const db = getDb();
  const [row] =
    await db`SELECT '[0,0]'::vector <-> '[3,4]'::vector AS distance`;
  expect(row.distance).toBe(5);
});
