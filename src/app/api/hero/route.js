import { getHero, updateHero } from "@/lib/db";

export async function GET() {
  const hero = await getHero();
  return Response.json(hero || {});
}

export async function PUT(req) {
  const body = await req.json();
  const id = await updateHero(body);
  return Response.json({ ok: true, id });
}
