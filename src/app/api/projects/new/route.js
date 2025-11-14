
export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("img");
    const link = formData.get("link");

    // keywords comes in as multiple "keywords" entries
    const keywords = formData.getAll("keywords");

    console.log("NEW PROJECT RECEIVED:");
    console.log({ title, description, img, link, keywords });

    return Response.json(
      { ok: true, project: { title, description, img, link, keywords } },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST ERROR:", err);
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}
