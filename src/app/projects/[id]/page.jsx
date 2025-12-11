"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();         // { id: "uuid-here" }
  const { user } = useUser();
  const id = params?.id;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) {
          setProject(null);
        } else {
          const data = await res.json();
          setProject(data.project);
        }
      } catch (err) {
        console.error("Failed to load project", err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (!id) {
    return (
      <main className="max-w-3xl mx-auto py-16">
        <h1 className="text-2xl font-semibold mb-4">Missing project id</h1>
        <Link href="/projects" className="bg-black text-white px-4 py-2 rounded">
          Back to projects
        </Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto py-16">
        <p className="text-neutral-500">Loading project…</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="max-w-3xl mx-auto py-16">
        <h1 className="text-3xl font-semibold mb-4">Project not found</h1>
        <p className="mb-6 text-neutral-500">
          No project found with ID <span className="font-mono">{id}</span>.
        </p>
        <Link href="/projects" className="bg-black text-white px-4 py-2 rounded">
          Back to projects
        </Link>
      </main>
    );
  }

  const keywords = project.keywords || [];

  return (
    <main className="max-w-3xl mx-auto py-16 space-y-6">
      <Link href="/projects" className="text-neutral-500 hover:underline">
        ← Back
      </Link>

      <h1 className="text-4xl font-bold">{project.title}</h1>

      {project.image && (
        <div className="relative h-64 w-full rounded-xl overflow-hidden border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <p className="text-lg text-neutral-700">{project.description}</p>

      {keywords.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="px-3 py-1 text-xs bg-neutral-100 rounded-full"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 pt-4">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Open project
          </a>
        )}

        {/* Only show Edit button when authenticated */}
        {user && (
          <Link
            href={`/projects/${project.id}/edit`}
            className="border px-4 py-2 rounded"
          >
            Edit
          </Link>
        )}
      </div>
    </main>
  );
}
