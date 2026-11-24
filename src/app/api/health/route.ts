import { getDb } from "@/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const headers = { "Cache-Control": "no-store" };

  try {
    const sql = getDb();
    await sql`SELECT 1`;
    return Response.json({ status: "ok" }, { headers });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503, headers });
  }
}
