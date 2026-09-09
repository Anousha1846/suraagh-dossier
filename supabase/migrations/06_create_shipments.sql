create type shipment_status as enum ('not_created', 'created', 'in_transit', 'delivered', 'failed');

create table shipments (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid not null unique references orders(id) on delete cascade,
  status            shipment_status not null default 'not_created',
  courier           text default 'postex',
  tracking_number   text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_shipments_order on shipments (order_id);