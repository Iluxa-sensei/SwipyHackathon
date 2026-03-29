import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/profile";
import { isUserRole } from "@/types/profile";

type GetUserResult =
  | { user: User; profile: Profile }
  | { user: User; profile: null }
  | { user: null; profile: null };

function mapProfile(row: {
  id: string;
  role: string;
  full_name: string | null;
  avatar_url: string | null;
  class_id: string | null;
  created_at: string;
}): Profile | null {
  if (!isUserRole(row.role)) return null;
  return {
    id: row.id,
    role: row.role,
    full_name: row.full_name,
    avatar_url: row.avatar_url,
    class_id: row.class_id,
    created_at: row.created_at,
  };
}

/** Server-only: текущий пользователь Supabase и строка `profiles` (RLS). */
export async function getUser(): Promise<GetUserResult> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { user: null, profile: null };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, full_name, avatar_url, class_id, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) {
    return { user, profile: null };
  }

  const profile = mapProfile(data);
  return { user, profile };
}
