-- Profiles + multi-role RLS (student | teacher | parent | admin)

create extension if not exists pgcrypto;

-- Role enum
create type public.user_role as enum ('student', 'teacher', 'parent', 'admin');

-- Profiles (1:1 with auth.users)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null,
  full_name text,
  avatar_url text,
  class_id uuid null,
  created_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);
create index profiles_class_id_idx on public.profiles (class_id);

comment on table public.profiles is 'Application profile; RLS enforced per role.';

-- SECURITY DEFINER helpers (avoid RLS recursion for admin checks)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to authenticated;

-- Prevent non-admins from changing role column
create or replace function public.profiles_enforce_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if OLD.role is distinct from NEW.role then
    if not public.is_admin() then
      raise exception 'Only administrators can change user roles';
    end if;
  end if;
  return NEW;
end;
$$;

create trigger profiles_role_change
before update on public.profiles
for each row
execute function public.profiles_enforce_role_change();

alter table public.profiles enable row level security;

-- SELECT: own row
create policy "profiles_select_self"
on public.profiles
for select
using (auth.uid() = id);

-- SELECT: admins see everyone
create policy "profiles_select_admin"
on public.profiles
for select
using (public.is_admin());

-- SELECT: teachers see students/parents in the same class (shared class_id)
create policy "profiles_select_teacher_same_class"
on public.profiles
for select
using (
  exists (
    select 1
    from public.profiles as me
    where me.id = auth.uid()
      and me.role = 'teacher'
      and me.class_id is not null
      and public.profiles.class_id = me.class_id
      and public.profiles.role in ('student', 'parent')
  )
);

-- INSERT: users can create only their own profile (e.g. signup)
create policy "profiles_insert_self"
on public.profiles
for insert
with check (auth.uid() = id);

-- UPDATE: own row or admin
create policy "profiles_update_self_or_admin"
on public.profiles
for update
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

-- DELETE: admins only
create policy "profiles_delete_admin"
on public.profiles
for delete
using (public.is_admin());
