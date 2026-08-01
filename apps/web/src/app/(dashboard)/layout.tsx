import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { requireOrganization } from "@/lib/session";
import { usePathname } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await requireOrganization();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar userName={user.name} />
      <div className="lg:pl-60 min-h-screen border-l border-zinc-900/50">
        <Header userName={user.name} />
        <main className="mx-auto max-w-6xl px-4 sm:px-8 py-8">{children}</main>
      </div>
      <QuickActions />
    </div>
  );
}
