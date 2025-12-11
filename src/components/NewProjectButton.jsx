"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NewProjectButton() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Link
      href="/projects/new"
      className="inline-flex rounded bg-black px-4 py-2 text-sm font-medium text-white"
    >
      New Project
    </Link>
  );
}
