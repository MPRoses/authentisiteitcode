create extension if not exists pgcrypto;

create table if not exists public.posts (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    title text not null,
    excerpt text not null default '',
    content jsonb not null default '[]'::jsonb,
    image_url text not null default '',
    date_label text not null default '',
    read_time text not null default '',
    document_url text not null default '',
    document_name text not null default '',
    document_size_bytes bigint not null default 0,
    document_label text not null default '',
    sort_order integer,
    published boolean not null default false,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = timezone('utc', now());
    return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;

create trigger posts_set_updated_at
before update on public.posts
for each row
execute function public.set_updated_at();

alter table public.posts
    add column if not exists document_url text not null default '',
    add column if not exists document_name text not null default '',
    add column if not exists document_size_bytes bigint not null default 0,
    add column if not exists document_label text not null default '';

alter table public.posts enable row level security;

drop policy if exists "Published posts are readable by everyone" on public.posts;
create policy "Published posts are readable by everyone"
on public.posts
for select
using (published = true);

drop policy if exists "Authenticated users can manage posts" on public.posts;
create policy "Authenticated users can manage posts"
on public.posts
for all
to authenticated
using (true)
with check (true);
