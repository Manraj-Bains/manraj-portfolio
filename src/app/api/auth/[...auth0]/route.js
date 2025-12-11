import { auth0, isAuthConfigured } from "@/lib/auth0";

// Ensure this route runs on the Node.js runtime (not Edge) for compatibility
export const runtime = "nodejs";

// Single catch-all handler for Auth0 routes (login/logout/callback/me)
export async function GET(req) {
  if (!isAuthConfigured) {
    return Response.json(
      { error: "Auth0 not configured" },
      { status: 500 }
    );
  }
  try {
    return await auth0.middleware(req);
  } catch (error) {
    console.error("Auth0 GET error:", error);
    return Response.json(
      { error: "Authentication failed", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  if (!isAuthConfigured) {
    return Response.json(
      { error: "Auth0 not configured" },
      { status: 500 }
    );
  }
  try {
    return await auth0.middleware(req);
  } catch (error) {
    console.error("Auth0 POST error:", error);
    return Response.json(
      { error: "Authentication failed", message: error.message },
      { status: 500 }
    );
  }
}
