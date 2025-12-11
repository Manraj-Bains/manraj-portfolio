import { Auth0Client } from "@auth0/nextjs-auth0/server";

const requiredEnv = [
  "AUTH0_DOMAIN",
  "AUTH0_CLIENT_ID",
  "AUTH0_CLIENT_SECRET",
  "AUTH0_SECRET",
  "AUTH0_BASE_URL",
];

const missing = requiredEnv.filter((k) => !process.env[k]);
export const isAuthConfigured = missing.length === 0;

const appBaseUrl =
  process.env.AUTH0_BASE_URL ||
  process.env.APP_BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:3000";

function buildAuth0() {
  if (!isAuthConfigured) {
    console.warn(
      `Auth0 not configured; missing env vars: ${missing.join(", ")}`
    );
    // Safe fallback client that never authenticates
    return {
      getSession: async () => null,
      middleware: async () =>
        Response.json(
          { error: "Auth0 not configured" },
          { status: 500 }
        ),
    };
  }

  return new Auth0Client({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    secret: process.env.AUTH0_SECRET,
    appBaseUrl,
    routes: {
      login: "/api/auth/login",
      logout: "/api/auth/logout",
      callback: "/api/auth/callback",
      profile: "/api/auth/me",
    },
  });
}

export const auth0 = buildAuth0();