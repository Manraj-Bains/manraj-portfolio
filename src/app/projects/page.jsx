import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSlug } from "@/lib/utils";

export default async function ProjectsPage() {
  // Fetch all projects from our API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    cache: "no-store",
  });

  const { projects } = await res.json();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Header row: title + New Project button */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>

        <Button asChild variant="outline" size="sm">
          <Link href="/projects/new">New Project</Link>
        </Button>
      </div>

      {/* Project cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p) => {
          const slug = createSlug(p.title);

          return (
            <Card
              key={slug}
              className="group flex flex-col gap-3 p-4 transition-transform hover:scale-105"
            >
              {/* Image */}
              <Image
                src={p.image}
                alt={p.title}
                width={300}
                height={300}
                className="h-40 w-full rounded-md object-cover"
              />

              {/* Title */}
              <h3 className="text-base font-semibold">{p.title}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {p.description}
              </p>

              {/* Buttons */}
              <div className="mt-auto flex gap-2">
                {/* External project link */}
                <Button asChild size="sm" variant="secondary">
                  <a href={p.link} target="_blank" rel="noreferrer">
                    Open
                  </a>
                </Button>

                {/* Internal details page */}
                <Button asChild size="sm">
                  <Link href={`/projects/${slug}`}>Details</Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
