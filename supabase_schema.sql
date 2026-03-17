-- supabase_schema.sql
-- Run this in your Supabase SQL Editor to configure the database

-- 1. Create a table for user wellness profiles
create table public.profiles (
  id uuid references auth.users not null primary key,
  last_period_date date,
  cycle_length integer default 28,
  period_length integer default 5,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies
create policy "Users can view their own profile." on profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile." on profiles
  for update using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

-- Function to automatically create a profile when a new user signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Create a table for Mood Logs
create table public.mood_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  date date not null,
  mood text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date) -- One mood per day per user
);

alter table public.mood_logs enable row level security;

create policy "Users can view their own moods." on mood_logs for select using (auth.uid() = user_id);
create policy "Users can insert their own moods." on mood_logs for insert with check (auth.uid() = user_id);
create policy "Users can update their own moods." on mood_logs for update using (auth.uid() = user_id);
create policy "Users can delete their own moods." on mood_logs for delete using (auth.uid() = user_id);

-- 3. Create a table for the Ranting Journal
create table public.rants (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.rants enable row level security;

create policy "Users can view their own rants." on rants for select using (auth.uid() = user_id);
create policy "Users can insert their own rants." on rants for insert with check (auth.uid() = user_id);
create policy "Users can delete their own rants." on rants for delete using (auth.uid() = user_id);

-- 4. Create a table for Gratitude Entries
create table public.gratitude_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.gratitude_entries enable row level security;

create policy "Users can view their own gratitude." on gratitude_entries for select using (auth.uid() = user_id);
create policy "Users can insert their own gratitude." on gratitude_entries for insert with check (auth.uid() = user_id);
create policy "Users can delete their own gratitude." on gratitude_entries for delete using (auth.uid() = user_id);
