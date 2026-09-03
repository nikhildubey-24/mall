import Link from "next/link";
import type { Metadata } from "next";
import { MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found | Acropolis The Mall",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-darker px-6 text-center">
      <div className="flex size-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
        <MapPinOff className="size-10 text-gold" aria-hidden="true" />
      </div>

      <h1 className="mt-8 text-3xl font-semibold text-white sm:text-4xl">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>

      <Button asChild className="mt-8 bg-gold text-gold-foreground hover:bg-gold/90">
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}
