import { getProjects, createProject } from "@/lib/db";
import { auth0 } from "@/lib/auth0";
import { projectSchema } from "@/lib/schemas";

export async function GET() {
  const projects = await getProjects();
  return Response.json({ projects });
}

export async function POST(req) {
  // Check authentication
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
