begin;

create extension if not exists pgcrypto;


create table if not exists gift
  ( id uuid primary key
  , museum_id uuid not null
  , account_id uuid not null
  , sender_name text not null
  , recipient_name text not null
  , recipient_greeting text not null
  , parts jsonb not null
  , created_at timestamp with time zone not null default now()
  );
create index on gift (museum_id);
create index on gift (account_id);


-- create type account_status as enum ('unverified', 'verified');

-- create table if not exists account
-- ( id uuid primary key default gen_random_uuid()
-- , email text not null
-- , name text not null
-- , password text not null
-- , status account_status not null default 'unverified'
-- , created_at timestamp with time zone not null default now()
-- );


-- create table if not exists museum
-- ( id uuid primary key default gen_random_uuid()
-- , name string not null
-- , created_at timestamp with time zone not null default now()
-- );

commit;
