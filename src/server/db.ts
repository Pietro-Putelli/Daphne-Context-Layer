import { databaseUrl } from "./env";

let db: Bun.SQL | undefined;

export function getDb() {
  return (db ??= new Bun.SQL(databaseUrl(process.env.DATABASE_URL), {
    connectionTimeout: 5,
  }));
}
