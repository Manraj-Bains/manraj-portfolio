"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import NewProjectForm from "@/components/NewProjectForm";

export default function NewProjectPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl py-16">
        <p className="text-neutral-500">Checking login…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl py-16 space-y-4">
        <h1 className="text-2xl font-semibold">Sign in to add a project</h1>
        <p className="text-neutral-600">
          You must be logged in to create new portfolio projects.
        </p>
        <Link
          href="/api/auth/login?returnTo=/projects/new"
          className="inline-flex rounded bg-black px-4 py-2 text-white"
        >
          Login with Auth0
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl py-16 space-y-6">
      <Link href="/projects" className="text-neutral-500 hover:underline">
        ← Back to projects
      </Link>
      <h1 className="text-3xl font-semibold">New project</h1>
      <NewProjectForm />
    </main>
  );
}
