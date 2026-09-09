create type product_status as enum ('draft', 'active', 'archived');

create table products (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name              text not null,
  tagline           text,
  description       text,
  difficulty        smallint not null check (difficulty between 1 and 5),
  min_players       smallint not null check (min_players > 0),
  max_players       smallint not null check (max_players >= min_players),
  duration_min_mins smallint check (duration_min_mins is null or duration_min_mins > 0),
  duration_max_mins smallint check (duration_max_mins is null or duration_max_mins >= duration_min_mins),
  price             numeric(10,2) not null check (price >= 0),
  stock_quantity    integer not null default 0 check (stock_quantity >= 0),
  status            product_status not null default 'draft',
  weight_grams      integer check (weight_grams is null or weight_grams > 0),
  cover_image_url   text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_products_status on products (status);