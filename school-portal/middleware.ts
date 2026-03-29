import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { isUserRole, type UserRole } from "@/types/profile";

/** Preserve refreshed Supabase session cookies on redirects. */
function redirectWithCookies(supabaseResponse: NextResponse, url: URL): NextResponse {
  const res = NextResponse.redirect(url);
  const setCookies = supabaseResponse.headers.getSetCookie();
  for (const cookie of setCookies) {
    res.headers.append("Set-Cookie", cookie);
  }
  return res;
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return redirectWithCookies(supabaseResponse, url);
    }

    const { data: profileRow } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    const roleValue = profileRow?.role;
    if (!roleValue || typeof roleValue !== "string" || !isUserRole(roleValue)) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return redirectWithCookies(supabaseResponse, url);
    }

    const role: UserRole = roleValue;

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 1 && segments[0] === "dashboard") {
      const url = request.nextUrl.clone();
      url.pathname = `/dashboard/${role}`;
      return redirectWithCookies(supabaseResponse, url);
    }

    if (segments[0] === "dashboard" && segments.length >= 2) {
      const routeRole = segments[1];
      if (!isUserRole(routeRole) || routeRole !== role) {
        const url = request.nextUrl.clone();
        url.pathname = `/dashboard/${role}`;
        return redirectWithCookies(supabaseResponse, url);
      }
    }

    return supabaseResponse;
  }

  if (pathname === "/login" && user) {
    const { data: profileRow } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    const roleValue = profileRow?.role;
    if (roleValue && typeof roleValue === "string" && isUserRole(roleValue)) {
      const url = request.nextUrl.clone();
      url.pathname = `/dashboard/${roleValue}`;
      return redirectWithCookies(supabaseResponse, url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
