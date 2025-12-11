import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { getProjects } from "@/lib/db";

export default async function ProjectsPage() {
  const session = await auth0.getSession();
  const isAuthenticated = !!session;

  // Call database function directly since this is a server component
  const projects = await getProjects();

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>

        {/* Only show New Project when logged in */}
        {isAuthenticated && (
          <Link
            href="/projects/new"
            className="px-4 py-2 rounded-full bg-black text-white text-sm"
          >
            New Project
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="border rounded-xl overflow-hidden flex flex-col"
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-44 w-full object-cover"
            />

            <div className="p-4 flex flex-col gap-3">
              <div>
                <h2 className="font-semibold text-lg">{project.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Keywords */}
              {project.keywords && project.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded-full bg-muted text-xs"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center mt-auto">
                <Link
                  href={project.link || "#"}
                  target="_blank"
                  className="text-sm underline underline-offset-4"
                >
                  Open
                </Link>

                <div className="flex gap-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-sm underline underline-offset-4"
                  >
                    Details
                  </Link>

                  {/* Only show Edit when logged in */}
                  {isAuthenticated && (
                    <Link
                      href={`/projects/${project.id}/edit`}
                      className="text-sm underline underline-offset-4"
                    >
                      Edit
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}