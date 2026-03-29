-- Demo accounts (2 per role). Password for all: DemoPass123!
-- Apply after migrations: `supabase db reset` or run against your Postgres (requires access to auth schema).

-- Demo class ids (shared by teacher/student/parent in each cohort)
-- Class A / Class B

begin;

-- 8 fixed user ids (v4 UUIDs)
-- students
-- 10000000-0000-4000-8000-000000000001 student1
-- 10000000-0000-4000-8000-000000000002 student2
-- teachers
-- 20000000-0000-4000-8000-000000000001 teacher1
-- 20000000-0000-4000-8000-000000000002 teacher2
-- parents
-- 30000000-0000-4000-8000-000000000001 parent1
-- 30000000-0000-4000-8000-000000000002 parent2
-- admins
-- 40000000-0000-4000-8000-000000000001 admin1
-- 40000000-0000-4000-8000-000000000002 admin2

-- class ids
-- aaaaaaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa
-- bbbbbbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) values
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-4000-8000-000000000001',
    'authenticated',
    'authenticated',
    'student1@demo.local',
    crypt('DemoPass123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-4000-8000-000000000002',
    'authenticated',
    'authenticated',
    'student2@demo.local',
    crypt('DemoPass123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '20000000-0000-4000-8000-000000000001',
    'authenticated',
    'authenticated',
    'teacher1@demo.local',
    crypt('DemoPass123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '20000000-0000-4000-8000-000000000002',
    'authenticated',
    'authenticated',
    'teacher2@demo.local',
    crypt('DemoPass123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '30000000-0000-4000-8000-000000000001',
    'authenticated',
    'authenticated',
    'parent1@demo.local',
    crypt('DemoPass123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '30000000-0000-4000-8000-000000000002',
    'authenticated',
    'authenticated',
    'parent2@demo.local',
    crypt('DemoPass123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '40000000-0000-4000-8000-000000000001',
    'authenticated',
    'authenticated',
    'admin1@demo.local',
    crypt('DemoPass123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '40000000-0000-4000-8000-000000000002',
    'authenticated',
    'authenticated',
    'admin2@demo.local',
    crypt('DemoPass123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  )
on conflict (id) do nothing;

-- Email identities (required for email/password sign-in)
insert into auth.identities (
  id,
  user_id,
  provider_id,
  provider,
  identity_data,
  last_sign_in_at,
  created_at,
  updated_at
) values
  (
    gen_random_uuid(),
    '10000000-0000-4000-8000-000000000001',
    'student1@demo.local',
    'email',
    jsonb_build_object(
      'sub', '10000000-0000-4000-8000-000000000001',
      'email', 'student1@demo.local',
      'email_verified', true,
      'phone_verified', false
    ),
    now(),
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    '10000000-0000-4000-8000-000000000002',
    'student2@demo.local',
    'email',
    jsonb_build_object(
      'sub', '10000000-0000-4000-8000-000000000002',
      'email', 'student2@demo.local',
      'email_verified', true,
      'phone_verified', false
    ),
    now(),
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    '20000000-0000-4000-8000-000000000001',
    'teacher1@demo.local',
    'email',
    jsonb_build_object(
      'sub', '20000000-0000-4000-8000-000000000001',
      'email', 'teacher1@demo.local',
      'email_verified', true,
      'phone_verified', false
    ),
    now(),
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    '20000000-0000-4000-8000-000000000002',
    'teacher2@demo.local',
    'email',
    jsonb_build_object(
      'sub', '20000000-0000-4000-8000-000000000002',
      'email', 'teacher2@demo.local',
      'email_verified', true,
      'phone_verified', false
    ),
    now(),
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    '30000000-0000-4000-8000-000000000001',
    'parent1@demo.local',
    'email',
    jsonb_build_object(
      'sub', '30000000-0000-4000-8000-000000000001',
      'email', 'parent1@demo.local',
      'email_verified', true,
      'phone_verified', false
    ),
    now(),
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    '30000000-0000-4000-8000-000000000002',
    'parent2@demo.local',
    'email',
    jsonb_build_object(
      'sub', '30000000-0000-4000-8000-000000000002',
      'email', 'parent2@demo.local',
      'email_verified', true,
      'phone_verified', false
    ),
    now(),
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    '40000000-0000-4000-8000-000000000001',
    'admin1@demo.local',
    'email',
    jsonb_build_object(
      'sub', '40000000-0000-4000-8000-000000000001',
      'email', 'admin1@demo.local',
      'email_verified', true,
      'phone_verified', false
    ),
    now(),
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    '40000000-0000-4000-8000-000000000002',
    'admin2@demo.local',
    'email',
    jsonb_build_object(
      'sub', '40000000-0000-4000-8000-000000000002',
      'email', 'admin2@demo.local',
      'email_verified', true,
      'phone_verified', false
    ),
    now(),
    now(),
    now()
  );

insert into public.profiles (id, role, full_name, avatar_url, class_id)
values
  ('10000000-0000-4000-8000-000000000001', 'student'::public.user_role, 'Demo Student One', null, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  ('10000000-0000-4000-8000-000000000002', 'student'::public.user_role, 'Demo Student Two', null, 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  ('20000000-0000-4000-8000-000000000001', 'teacher'::public.user_role, 'Demo Teacher One', null, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  ('20000000-0000-4000-8000-000000000002', 'teacher'::public.user_role, 'Demo Teacher Two', null, 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  ('30000000-0000-4000-8000-000000000001', 'parent'::public.user_role, 'Demo Parent One', null, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  ('30000000-0000-4000-8000-000000000002', 'parent'::public.user_role, 'Demo Parent Two', null, 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  ('40000000-0000-4000-8000-000000000001', 'admin'::public.user_role, 'Demo Admin One', null, null),
  ('40000000-0000-4000-8000-000000000002', 'admin'::public.user_role, 'Demo Admin Two', null, null)
on conflict (id) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  class_id = excluded.class_id;

commit;
