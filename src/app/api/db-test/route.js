import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(process.env.NEON_DB_URL);
    const result = await sql`SELECT NOW()`;

    return new Response(
      JSON.stringify({ ok: true, result }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
