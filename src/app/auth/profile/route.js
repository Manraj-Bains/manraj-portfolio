import { auth0, isAuthConfigured } from "@/lib/auth0";

// Compatibility alias for clients still calling /auth/profile
export async function GET() {
  if (!isAuthConfigured) {
    return Response.json(
      { user: null, error: "Auth0 not configured" },
      { status: 503 }
    );
  }
  const session = await auth0.getSession();
  if (!session || !session.user) {
    return Response.json({ user: null }, { status: 401 });
  }
  return Response.json({ user: session.user }, { status: 200 });
}

