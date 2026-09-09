create type order_status as enum (
  'pending_verification', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
);

create type payment_method as enum ('cod', 'online_transfer');

create type payment_status as enum (
  'unpaid', 'pending_verification', 'paid', 'failed', 'refunded'
);

create table orders (
  id                uuid primary key default gen_random_uuid(),
  order_number      text not null unique,
  customer_id       uuid not null references customers(id),
  customer_name     text not null,
  shipping_phone    text not null,
  shipping_address  text not null,
  shipping_city     text not null,
  status            order_status not null default 'pending_verification',
  payment_method    payment_method not null,
  payment_status    payment_status not null default 'unpaid',
  subtotal          numeric(10,2) not null check (subtotal >= 0),
  shipping_cost     numeric(10,2) not null default 0 check (shipping_cost >= 0),
  total             numeric(10,2) not null check (total >= 0),
  notes             text,
  verified_at       timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_orders_customer on orders (customer_id);
create index idx_orders_status on orders (status);