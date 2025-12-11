import { auth0 } from "@/lib/auth0";
import { redirect, notFound } from "next/navigation";
import { getProject } from "@/lib/db";
import Link from "next/link";
import EditProjectForm from "@/components/EditProjectForm";

export default async function EditProjectPage({ params }) {
  // In React Server Components, params is a Promise; unwrap it
  const { id } = await params;

  // Server-side auth check
  const session = await auth0.getSession();
  if (!session) {
    redirect(`/api/auth/login?returnTo=/projects/${id}/edit`);
  }

  // Load project from the database with safe fallback
  let project = null;
  try {
    if (id) {
      project = await getProject(id);
    }
  } catch (error) {
    console.error("Failed to load project", error);
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-16">
      <Link href={`/projects/${id}`} className="text-neutral-500 hover:underline">
        ← Back to project
      </Link>

      <h1 className="text-3xl font-semibold mb-6">Edit project</h1>
      <EditProjectForm project={project} />
    </main>
  );
}
