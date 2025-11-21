"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProjectsNotFound() {
  const params = useParams();
  const slug = params?.slug;

  return (
    <main className="mx-auto max-w-xl px-4 py-16 space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Project not found</h1>

      {slug && (
        <p className="text-sm text-muted-foreground">
          We couldn’t find a project with the id{" "}
          <span className="font-semibold">{slug}</span>.
        </p>
      )}

      <Button asChild>
        <Link href="/projects">Back to projects</Link>
      </Button>
    </main>
  );
}
