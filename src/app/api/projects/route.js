import { getProjects, createProject } from "@/lib/db";
import { auth0, isAuthConfigured } from "@/lib/auth0";
import { projectSchema } from "@/lib/schemas";

export async function GET() {
  try {
    const projects = await getProjects();
    return Response.json({ projects });
  } catch (error) {
    console.error("Error loading projects", error);
    return Response.json(
      { message: "Failed to load projects" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  if (!isAuthConfigured) {
    return Response.json(
      { message: "Auth0 not configured" },
      { status: 500 }
    );
  }
  const session = await auth0.getSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // Validate request body
    const validated = projectSchema.parse({
      title: body.title,
      description: body.description || null,
      image: body.image || "",
      link: body.link || "",
      keywords: body.keywords || [],
    });

    const id = await createProject(validated);
    return Response.json({ id }, { status: 201 });
  } catch (error) {
    if (error.message?.includes("Database not configured")) {
      return Response.json(
        { message: "Database not configured" },
        { status: 503 }
      );
    }
    if (error.name === "ZodError") {
      return Response.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating project", error);
    return Response.json(
      { message: "Failed to create project" },
      { status: 500 }
    );
  }
}
