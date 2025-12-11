import { Auth0Client } from "@auth0/nextjs-auth0/server";

const requiredEnv = [
  "AUTH0_DOMAIN",
  "AUTH0_CLIENT_ID",
  "AUTH0_CLIENT_SECRET",
  "AUTH0_SECRET",
  "AUTH0_BASE_URL",
];

const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length > 0) {
  const message = `Missing Auth0 env vars: ${missing.join(", ")}`;
  // Fail fast in development to avoid silent misconfigurations.
  throw new Error(message);
}

const appBaseUrl =
  process.env.AUTH0_BASE_URL ||
  process.env.APP_BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:3000";

export const auth0 = new Auth0Client({
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