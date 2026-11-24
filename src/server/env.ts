export function databaseUrl(value: string | undefined): string {
  const url = value ? URL.parse(value) : null;
  if (!url?.hostname || !["postgres:", "postgresql:"].includes(url.protocol)) {
    throw new Error("DATABASE_URL must be a PostgreSQL connection URL.");
  }
  return url.href;
}
