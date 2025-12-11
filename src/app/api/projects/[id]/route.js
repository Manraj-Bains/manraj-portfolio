import { getProject, updateProject, deleteProject } from "@/lib/db";
import { auth0 } from "@/lib/auth0";
import { projectSchema } from "@/lib/schemas";

function getId(req) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1];
}

export async function GET(req) {
  const id = getId(req);
  const project = await getProject(id);

  if (!project) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }

  return Response.json({ project });
}

export async function PUT(req) {
  // Check authentication
  const session = await auth0.getSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = getId(req);
    const body = await req.json();

    // Validate request body
    const validated = projectSchema.parse({
      title: body.title,
      description: body.description || null,
      image: body.image || "",
      link: body.link || "",
      keywords: body.keywords || [],
    });

    await updateProject(id, validated);
    return Response.json({ message: "Updated" });
  } catch (error) {
    if (error.name === "ZodError") {
      return Response.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Error updating project", error);
    return Response.json(
      { message: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  // Check authentication
  const session = await auth0.getSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = getId(req);
    await deleteProject(id);
    return Response.json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting project", error);
    return Response.json(
      { message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
