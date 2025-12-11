import { auth0, isAuthConfigured } from "@/lib/auth0";

export async function GET(req) {
  try {
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
  } catch (error) {
    console.error("Auth0 profile error:", error);
    return Response.json(
      { user: null, error: "Failed to load profile" },
      { status: 500 }
    );
  }
}

