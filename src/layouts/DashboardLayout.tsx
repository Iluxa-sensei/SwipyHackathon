"use client";

import { usePathname } from "next/navigation";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

function roleLabel(role: string): string {
  if (role === "student") return "Ученик";
  if (role === "parent") return "Родитель";
  if (role === "teacher") return "Учитель";
  if (role === "admin") return "Администратор";
  return role;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const role = pathname.split("/")[2] ?? "student";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="h-12 md:h-14 flex items-center border-b px-3 gap-2 sticky top-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
            <SidebarTrigger />
            <span className="text-sm text-muted-foreground">Кабинет · {roleLabel(role)}</span>
          </header>
          <div className="p-4 md:p-6 animate-fade-in">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
