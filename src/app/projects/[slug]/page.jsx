import Image from "next/image";
import Link from "next/link";
import { createSlug } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ProjectDetailsPage(props) {
  const { slug } = await props.params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    cache: "no-store",
  });

  const { projects } = await res.json();

  const project = projects.find((p) => createSlug(p.title) === slug);

  if (!project) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="mb-4 text-lg font-semibold">Project not found.</p>
        <Button asChild variant="outline">
          <Link href="/projects">Back to projects</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Card className="space-y-6 p-6">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={600}
          className="h-64 w-full rounded-md object-cover"
        />

        <div>
          <h1 className="mb-2 text-2xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>

        {project.keywords?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <Button asChild>
            <a href={project.link} target="_blank" rel="noreferrer">
              Visit project
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">Back to projects</Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}