"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function MyNavBar() {
  // Force profile fetch to our /api/auth/me route to avoid /auth/profile 404s.
  const { user, isLoading } = useUser({ profileUrl: "/api/auth/me" });
  const [fallbackUser, setFallbackUser] = useState(null);
  const [fallbackLoading, setFallbackLoading] = useState(true);

  // Fallback: if the SDK stays “checking session…”, fetch the profile directly.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!cancelled && res.ok) {
          const data = await res.json();
          if (data?.user) setFallbackUser(data.user);
        }
      } catch (e) {
        // ignore; nav will stay in default state
      } finally {
        if (!cancelled) setFallbackLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const effectiveUser = user || fallbackUser;
  const effectiveLoading = isLoading && !effectiveUser && fallbackLoading;

  return (
    <header className="border-b">
      <nav className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="font-semibold text-lg">
          ManrajPortfolio
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>

          {/* Right side: auth actions */}
          {effectiveLoading ? (
            <span className="text-sm text-muted-foreground">Checking session…</span>
          ) : effectiveUser ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Logged in as {effectiveUser.email}
              </span>
              <Link
                href="/dashboard"
                className="text-sm underline underline-offset-4"
              >
                Dashboard
              </Link>
              <Link
                href="/api/auth/logout"
                className="px-3 py-1 rounded-full bg-black text-white text-sm"
              >
                Log out
              </Link>
            </div>
          ) : (
            <Link
              href="/api/auth/login?returnTo=/dashboard"
              className="px-3 py-1 rounded-full bg-black text-white text-sm"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}