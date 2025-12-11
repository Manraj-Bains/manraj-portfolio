// src/app/dashboard/page.jsx
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth0.getSession(); // reads cookies on the request

  if (!session) {
    // not logged in – send to login page and come back here after
    redirect("/api/auth/login?returnTo=/dashboard");
  }

  const { user } = session;

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-2">Signed in as: <strong>{user.email}</strong></p>
      <p className="text-muted-foreground">
        You can now edit/delete projects and use the protected features.
      </p>
    </main>
  );
}
