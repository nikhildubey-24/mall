"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Building2,
  ExternalLink,
  GalleryHorizontalEnd,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Settings,
  Table2,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquareText },
  { href: "/admin/floor-plans", label: "Floor Plans", icon: Building2 },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryHorizontalEnd },
  { href: "/admin/portfolio", label: "Portfolio", icon: Table2 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function NavList({ currentPath }: { currentPath: string }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/admin"
            ? currentPath === "/admin"
            : currentPath.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-gold/15 text-gold-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function getInitials(email: string) {
  const local = email.split("@")[0] ?? "";
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return local.slice(0, 2).toUpperCase() || "A";
}

function SidebarFooter({ user }: { user: { email: string; name?: string | null } }) {
  const { data: session } = useSession();
  const email = user?.email || session?.user?.email || "admin";
  const name = user?.name || session?.user?.name;
  const displayName = name || email.split("@")[0] || "Admin";
  const initials = getInitials(email);

  return (
    <div className="flex flex-col gap-1 px-3 py-4">
      <Separator className="mb-3" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="flex min-w-0 flex-1 flex-col items-start">
              <span className="max-w-full truncate leading-tight">{displayName}</span>
              <span className="max-w-full truncate text-xs leading-tight text-muted-foreground">
                {email}
              </span>
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel className="font-normal text-muted-foreground">
            <span className="truncate">{email}</span>
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/" target="_blank">
              <ExternalLink className="size-4" />
              View Site
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/admin/settings">
              <Settings className="size-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut className="size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function SidebarBrand() {
  return (
    <div className="flex items-center gap-2 border-b px-5 py-4">
      <span className="flex size-8 items-center justify-center rounded-lg bg-gold text-gold-foreground">
        <Building2 className="size-4" />
      </span>
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-tight">Acropolis</div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Admin
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar({
  user,
}: {
  user: { email: string; name?: string | null };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-gold text-gold-foreground">
            <Building2 className="size-4" />
          </span>
          <span className="text-sm font-semibold">Acropolis Admin</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-card lg:flex">
        <SidebarBrand />
        <NavList currentPath={pathname} />
        <SidebarFooter user={user} />
      </aside>

      {/* Mobile slide-over */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[80vw] flex-col bg-card shadow-lg">
            <SidebarBrand />
            <NavList currentPath={pathname} />
            <SidebarFooter user={user} />
          </aside>
        </div>
      )}

      {/* Spacer for desktop fixed sidebar */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0" />
    </>
  );
}
