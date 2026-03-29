"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Calendar,
  NotebookText,
  Presentation,
  Bot,
  Trophy,
  Brain,
  Home,
  Users,
  ClipboardList,
  Sparkles,
  User,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "@config/brand";
import type { UserRole } from "@/types/profile";

const studentItems = [
  { title: "Расписание", url: "/dashboard/student/schedule", icon: Calendar },
  { title: "Домашние задания", url: "/dashboard/student/homework", icon: NotebookText },
  { title: "Виртуальный класс", url: "/dashboard/student/classroom", icon: Presentation },
  { title: "ИИ‑чат", url: "/dashboard/student/ai-chat", icon: Bot },
  { title: "Достижения", url: "/dashboard/student/achievements", icon: Trophy },
  { title: "AI‑психолог", url: "/dashboard/student/ai-psychologist", icon: Brain },
  { title: "Профиль", url: "/dashboard/student/profile", icon: User },
];

const parentItems = [
  { title: "Обзор", url: "/dashboard/parent/overview", icon: Home },
  { title: "Профиль", url: "/dashboard/parent/profile", icon: User },
];

const teacherItems = [
  { title: "Классы", url: "/dashboard/teacher/classes", icon: Users },
  { title: "Задания", url: "/dashboard/teacher/assignments", icon: ClipboardList },
  { title: "ИИ‑планировщик", url: "/dashboard/teacher/ai-planner", icon: Sparkles },
  { title: "Урок", url: "/dashboard/teacher/classroom", icon: Presentation },
  { title: "Профиль", url: "/dashboard/teacher/profile", icon: User },
];

const adminItems = [{ title: "Панель", url: "/dashboard/admin", icon: Shield }];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();
  const role = pathname.split("/")[2] as UserRole | undefined;

  const items =
    role === "student"
      ? studentItems
      : role === "parent"
        ? parentItems
        : role === "admin"
          ? adminItems
          : teacherItems;

  const groupLabel =
    role === "student"
      ? "Ученик"
      : role === "parent"
        ? "Родитель"
        : role === "admin"
          ? "Администратор"
          : "Учитель";

  const getNavCls = (href: string) =>
    cn(
      "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-all duration-200 hover:bg-white/10",
      pathname === href || pathname.startsWith(`${href}/`)
        ? "bg-[#7C3AED] font-semibold text-white shadow-sm"
        : undefined
    );

  return (
    <Sidebar collapsible="icon" className="w-60 border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <SidebarContent className="p-4">
        <div className="mb-4 px-2">
          <img
            src={brand.logoPath}
            alt={brand.siteName}
            className="h-10 w-auto max-w-[180px] object-contain object-left"
          />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest text-white/70">
            {groupLabel}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                    <Link href={item.url} className={getNavCls(item.url)}>
                      <div className="relative">
                        <item.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      </div>
                      <span className="transition-all duration-200 group-hover:translate-x-1">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
