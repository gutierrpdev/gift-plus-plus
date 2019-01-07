begin;

create extension if not exists pgcrypto;

/**
 * Gifts
 */

create table if not exists gift
( id uuid primary key default gen_random_uuid()
, created_at timestamp with time zone not null default now()
);

commit;
