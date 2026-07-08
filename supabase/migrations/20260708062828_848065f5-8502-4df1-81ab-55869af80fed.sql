
-- ============ ENUMS ============
create type public.app_role as enum ('admin', 'user');
create type public.subscription_plan as enum ('free', 'pro', 'business', 'enterprise');
create type public.subscription_status as enum ('active', 'trialing', 'past_due', 'canceled', 'incomplete');

-- ============ updated_at helper ============
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============ USER ROLES ============
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

create policy "users can read own roles" on public.user_roles
  for select to authenticated
  using (auth.uid() = user_id);
create policy "admins manage roles" on public.user_roles
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ PROFILES ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "read own profile" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();

-- ============ FOLDERS ============
create table public.folders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  parent_id uuid references public.folders(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.folders to authenticated;
grant all on public.folders to service_role;
alter table public.folders enable row level security;
create policy "own folders" on public.folders for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create trigger folders_updated_at before update on public.folders for each row execute function public.set_updated_at();
create index folders_user_idx on public.folders(user_id);

-- ============ DOCUMENTS ============
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  folder_id uuid references public.folders(id) on delete set null,
  title text not null default 'Untitled',
  content text not null default '',
  document_type text not null default 'document',
  tool text,
  is_favorite boolean not null default false,
  word_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.documents to authenticated;
grant all on public.documents to service_role;
alter table public.documents enable row level security;
create policy "own documents" on public.documents for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create trigger documents_updated_at before update on public.documents for each row execute function public.set_updated_at();
create index documents_user_idx on public.documents(user_id);
create index documents_folder_idx on public.documents(folder_id);

-- ============ TEMPLATES ============
create table public.templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text,
  category text not null,
  content text not null default '',
  is_public boolean not null default false,
  is_featured boolean not null default false,
  uses_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.templates to authenticated;
grant all on public.templates to service_role;
alter table public.templates enable row level security;
create policy "read public or own templates" on public.templates for select to authenticated
  using (is_public = true or auth.uid() = user_id);
create policy "insert own templates" on public.templates for insert to authenticated
  with check (auth.uid() = user_id);
create policy "update own templates" on public.templates for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own templates" on public.templates for delete to authenticated
  using (auth.uid() = user_id);
create trigger templates_updated_at before update on public.templates for each row execute function public.set_updated_at();
create index templates_category_idx on public.templates(category);

-- ============ FAVORITES ============
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid references public.templates(id) on delete cascade,
  document_id uuid references public.documents(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (template_id is not null or document_id is not null)
);
grant select, insert, update, delete on public.favorites to authenticated;
grant all on public.favorites to service_role;
alter table public.favorites enable row level security;
create policy "own favorites" on public.favorites for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index favorites_user_idx on public.favorites(user_id);

-- ============ SUBSCRIPTIONS ============
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  plan public.subscription_plan not null default 'free',
  status public.subscription_status not null default 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  stripe_customer_id text,
  stripe_subscription_id text,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.subscriptions to authenticated;
grant all on public.subscriptions to service_role;
alter table public.subscriptions enable row level security;
create policy "read own subscription" on public.subscriptions for select to authenticated using (auth.uid() = user_id);
create trigger subscriptions_updated_at before update on public.subscriptions for each row execute function public.set_updated_at();

-- ============ USAGE ============
create table public.usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  period_month date not null default date_trunc('month', now())::date,
  ai_requests_count integer not null default 0,
  tokens_used bigint not null default 0,
  storage_bytes bigint not null default 0,
  documents_created integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, period_month)
);
grant select on public.usage to authenticated;
grant all on public.usage to service_role;
alter table public.usage enable row level security;
create policy "read own usage" on public.usage for select to authenticated using (auth.uid() = user_id);
create trigger usage_updated_at before update on public.usage for each row execute function public.set_updated_at();

-- ============ PAYMENTS ============
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount_cents integer not null,
  currency text not null default 'usd',
  status text not null,
  description text,
  stripe_payment_intent_id text,
  stripe_invoice_id text,
  created_at timestamptz not null default now()
);
grant select on public.payments to authenticated;
grant all on public.payments to service_role;
alter table public.payments enable row level security;
create policy "read own payments" on public.payments for select to authenticated using (auth.uid() = user_id);
create index payments_user_idx on public.payments(user_id);

-- ============ HISTORY (document versions) ============
create table public.history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_id uuid not null references public.documents(id) on delete cascade,
  snapshot jsonb not null,
  label text,
  created_at timestamptz not null default now()
);
grant select, insert, delete on public.history to authenticated;
grant all on public.history to service_role;
alter table public.history enable row level security;
create policy "own history" on public.history for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index history_document_idx on public.history(document_id);

-- ============ AI REQUESTS ============
create table public.ai_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool text not null,
  model text,
  prompt text,
  response text,
  tokens_used integer,
  cost_cents integer,
  document_id uuid references public.documents(id) on delete set null,
  status text not null default 'success',
  error text,
  created_at timestamptz not null default now()
);
grant select, insert on public.ai_requests to authenticated;
grant all on public.ai_requests to service_role;
alter table public.ai_requests enable row level security;
create policy "read own ai_requests" on public.ai_requests for select to authenticated using (auth.uid() = user_id);
create policy "insert own ai_requests" on public.ai_requests for insert to authenticated with check (auth.uid() = user_id);
create index ai_requests_user_idx on public.ai_requests(user_id);

-- ============ SETTINGS ============
create table public.settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  theme text not null default 'light',
  language text not null default 'English',
  ai_tone text not null default 'Editorial',
  ai_model text not null default 'google/gemini-2.5-flash',
  notifications jsonb not null default '{"email": true, "product": true, "marketing": false}'::jsonb,
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.settings to authenticated;
grant all on public.settings to service_role;
alter table public.settings enable row level security;
create policy "own settings" on public.settings for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create trigger settings_updated_at before update on public.settings for each row execute function public.set_updated_at();

-- ============ NOTIFICATIONS ============
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  href text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
grant select, update, delete on public.notifications to authenticated;
grant all on public.notifications to service_role;
alter table public.notifications enable row level security;
create policy "own notifications" on public.notifications for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index notifications_user_idx on public.notifications(user_id);

-- ============ NEW USER TRIGGER ============
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.settings (user_id) values (new.id) on conflict (user_id) do nothing;
  insert into public.subscriptions (user_id, plan, status) values (new.id, 'free', 'active')
    on conflict (user_id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'user')
    on conflict (user_id, role) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
