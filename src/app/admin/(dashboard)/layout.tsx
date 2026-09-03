import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata = {
  title: "Admin | Acropolis The Mall",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const user = {
    email: session.user.email ?? "",
    name: session.user.name ?? "",
  };

  return (
    <div className="min-h-screen bg-muted/40 lg:flex">
      <AdminSidebar user={user} />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
