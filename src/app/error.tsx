"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-darker px-6">
      <div className="w-full max-w-lg rounded-3xl border border-gold/20 bg-surface-card p-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
          <TriangleAlert className="size-8 text-gold" aria-hidden="true" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-white">
          Something went wrong
        </h1>

        {error.message && (
          <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        )}

        <Button
          onClick={() => retry()}
          className="mt-8 bg-gold text-gold-foreground hover:bg-gold/90"
        >
          Try Again
        </Button>

        <p className="mt-6 text-sm text-muted-foreground">
          <Link href="/" className="text-gold underline-offset-4 hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </main>
  );
}
