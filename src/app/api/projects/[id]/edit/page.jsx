// src/app/projects/[id]/edit/page.jsx
import { getProject } from "@/lib/db";
import EditProjectForm from "@/components/EditProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }) {
  const project = await getProject(params.id);

  if (!project) {
    return notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-semibold mb-6">Edit project</h1>
      <EditProjectForm project={project} />
    </main>
  );
}
