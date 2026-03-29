"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { isUserRole, type UserRole } from "@/types/profile";

function safeNextPath(next: string | null, role: UserRole): string {
  if (!next || !next.startsWith("/dashboard")) {
    return `/dashboard/${role}`;
  }
  const parts = next.split("/").filter(Boolean);
  if (parts[0] === "dashboard" && parts[1] === role) {
    return next;
  }
  return `/dashboard/${role}`;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const supabase = createClient();
    const { data, error: signError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signError || !data.user) {
      setError(signError?.message ?? "Sign in failed");
      setPending(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError || !profile?.role || typeof profile.role !== "string") {
      setError("Profile not found");
      setPending(false);
      await supabase.auth.signOut();
      return;
    }

    if (!isUserRole(profile.role)) {
      setError("Invalid profile role");
      setPending(false);
      await supabase.auth.signOut();
      return;
    }

    const role = profile.role;
    const next = searchParams.get("next");
    router.replace(safeNextPath(next, role));
    router.refresh();
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error ? <p role="alert">{error}</p> : null}
      <button type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
