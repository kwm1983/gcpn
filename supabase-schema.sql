-- ============================================================
-- GULF COAST PRODUCTION NETWORK — Database Schema
-- ============================================================
-- Run this entire file in your Supabase project:
--   Dashboard → SQL Editor → New Query → paste → Run
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES TABLE
-- Extends Supabase auth.users with public profile data
-- ============================================================
create table public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),

  -- Account type
  account_type  text check (account_type in ('pro', 'client')) not null default 'client',

  -- Basic info
  full_name     text,
  display_name  text,
  email         text,
  phone         text,
  avatar_url    text,
  cover_url     text,
  bio           text,
  website       text,

  -- Pro-specific
  specialty     text,
  secondary_specialties text[],
  city          text,
  service_area  text[],
  years_exp     int,
  day_rate      int,
  equipment     text[],
  skills        text[],
  available     boolean default true,

  -- Membership
  plan          text check (plan in ('free', 'pro', 'featured')) default 'free',
  verified      boolean default false,
  featured      boolean default false,

  -- Stats (auto-updated by triggers)
  review_count  int default 0,
  avg_rating    numeric(3,2) default 0
);

-- Allow public read, owner write
alter table public.profiles enable row level security;

create policy "Profiles are publicly readable"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, account_type)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'account_type', 'client')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- PORTFOLIO ITEMS TABLE
-- ============================================================
create table public.portfolio_items (
  id          uuid default uuid_generate_v4() primary key,
  pro_id      uuid references public.profiles(id) on delete cascade,
  created_at  timestamptz default now(),
  title       text not null,
  description text,
  media_url   text,
  media_type  text check (media_type in ('image', 'video', 'link')) default 'image',
  thumbnail   text,
  sort_order  int default 0
);

alter table public.portfolio_items enable row level security;
create policy "Portfolio items are public" on public.portfolio_items for select using (true);
create policy "Pros manage own portfolio" on public.portfolio_items for all using (auth.uid() = pro_id);

-- ============================================================
-- REVIEWS TABLE
-- ============================================================
create table public.reviews (
  id          uuid default uuid_generate_v4() primary key,
  created_at  timestamptz default now(),
  pro_id      uuid references public.profiles(id) on delete cascade,
  reviewer_id uuid references public.profiles(id) on delete set null,
  reviewer_name text,
  reviewer_company text,
  rating      int check (rating between 1 and 5) not null,
  body        text not null,
  project_type text,
  verified    boolean default false
);

alter table public.reviews enable row level security;
create policy "Reviews are public" on public.reviews for select using (true);
create policy "Authenticated users can write reviews" on public.reviews for insert with check (auth.uid() = reviewer_id);

-- Auto-update avg_rating and review_count on profiles
create or replace function public.update_pro_rating()
returns trigger as $$
begin
  update public.profiles
  set
    avg_rating   = (select round(avg(rating)::numeric, 2) from public.reviews where pro_id = new.pro_id),
    review_count = (select count(*) from public.reviews where pro_id = new.pro_id)
  where id = new.pro_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_review_created
  after insert or update on public.reviews
  for each row execute procedure public.update_pro_rating();

-- ============================================================
-- JOB POSTINGS TABLE
-- ============================================================
create table public.job_postings (
  id              uuid default uuid_generate_v4() primary key,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  client_id       uuid references public.profiles(id) on delete cascade,

  -- Job details
  title           text not null,
  description     text not null,
  production_type text not null,
  role_needed     text not null,
  city            text not null,
  project_date    date,
  duration        text,
  location_detail text,
  budget_range    text,
  contact_name    text,
  contact_email   text not null,
  contact_phone   text,

  -- Status
  status text check (status in ('open', 'filled', 'closed')) default 'open',
  views  int default 0
);

alter table public.job_postings enable row level security;
create policy "Open jobs are public" on public.job_postings for select using (status = 'open');
create policy "Clients manage own jobs" on public.job_postings for all using (auth.uid() = client_id);
-- Allow anonymous job posting (client_id can be null for guests)
create policy "Anyone can post a job" on public.job_postings for insert with check (true);

-- ============================================================
-- MESSAGES TABLE (simple contact system)
-- ============================================================
create table public.messages (
  id          uuid default uuid_generate_v4() primary key,
  created_at  timestamptz default now(),
  sender_id   uuid references public.profiles(id) on delete set null,
  recipient_id uuid references public.profiles(id) on delete cascade,
  subject     text,
  body        text not null,
  read        boolean default false
);

alter table public.messages enable row level security;
create policy "Users see their messages" on public.messages for select
  using (auth.uid() = recipient_id or auth.uid() = sender_id);
create policy "Authenticated users can send messages" on public.messages for insert
  with check (auth.uid() = sender_id);
create policy "Recipients can mark read" on public.messages for update
  using (auth.uid() = recipient_id);

-- ============================================================
-- USEFUL VIEWS
-- ============================================================

-- Public pro listing (only pro accounts, with counts)
create or replace view public.pro_listings as
  select
    p.id, p.display_name, p.full_name, p.avatar_url, p.cover_url,
    p.specialty, p.secondary_specialties, p.city, p.service_area,
    p.bio, p.years_exp, p.day_rate, p.skills, p.equipment,
    p.available, p.verified, p.featured, p.plan,
    p.avg_rating, p.review_count, p.created_at
  from public.profiles p
  where p.account_type = 'pro';

-- ============================================================
-- DONE! Your database is ready.
-- ============================================================
