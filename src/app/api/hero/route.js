import { auth0 } from "@/lib/auth0";
import { getHero, updateHero } from "@/lib/db";

const FALLBACK_HERO = {
  avatar: "",
  full_name: "Hi, I'm Manraj",
  short_description:
    "A full-stack developer focused on clean UI, fast performance, and practical, real-world projects.",
  long_description: "",
};

function validateHeroInput({ full_name, short_description, long_description }) {
  if (!full_name || typeof full_name !== "string" || full_name.trim().length === 0) {
    return "Name/title is required.";
  }
  if (full_name.length > 200) return "Name/title is too long.";
  if (short_description && short_description.length > 500)
    return "Short description is too long.";
  if (long_description && long_description.length > 4000)
    return "Long description is too long.";
  return null;
}

async function fileToDataUrl(file) {
  if (!file || !(file instanceof File) || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const type = file.type || "application/octet-stream";
  return `data:${type};base64,${buffer.toString("base64")}`;
}

export async function GET() {
  const hero = (await getHero()) || FALLBACK_HERO;
  return Response.json({ hero });
}

export async function PUT(req) {
  const session = await auth0.getSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const existing = await getHero();

    const avatarFile = form.get("avatar");
    const avatarFromFile = await fileToDataUrl(avatarFile);
    const avatar = avatarFromFile || (typeof avatarFile === "string" ? avatarFile : existing?.avatar || "");

    const full_name = (form.get("full_name") || "").toString();
    const short_description = (form.get("short_description") || "").toString();
    const long_description = (form.get("long_description") || "").toString();

    const validationError = validateHeroInput({
      full_name,
      short_description,
      long_description,
    });
    if (validationError) {
      return Response.json({ message: validationError }, { status: 400 });
    }

    const id = await updateHero({
      avatar,
      full_name,
      short_description,
      long_description,
    });

    const updated = await getHero();
    return Response.json({ id, hero: updated });
  } catch (error) {
    console.error("Hero update error:", error);
    return Response.json(
      { message: "Failed to update hero" },
      { status: 500 }
    );
  }
}
