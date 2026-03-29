import type { UserRole } from "@/types/profile";

/** Первый экран кабинета после входа для каждой роли */
export function defaultDashboardPath(role: UserRole): string {
  switch (role) {
    case "student":
      return "/dashboard/student/schedule";
    case "teacher":
      return "/dashboard/teacher/classes";
    case "parent":
      return "/dashboard/parent/overview";
    case "admin":
      return "/dashboard/admin";
    default: {
      const _exhaustive: never = role;
      return _exhaustive;
    }
  }
}
