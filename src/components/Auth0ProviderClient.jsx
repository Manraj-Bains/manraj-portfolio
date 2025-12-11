"use client";

import { Auth0Provider } from "@auth0/nextjs-auth0/client";

export default function Auth0ProviderClient({ children }) {
  // Force the SDK to use our /api/auth/me route for session checks.
  return <Auth0Provider profileUrl="/api/auth/me">{children}</Auth0Provider>;
}

