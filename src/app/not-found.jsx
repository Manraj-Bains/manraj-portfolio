import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Button asChild>
        <Link href="/">Back to homepage</Link>
      </Button>
    </main>
  );
}
