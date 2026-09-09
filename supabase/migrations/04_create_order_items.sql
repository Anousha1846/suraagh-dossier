create table order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references orders(id) on delete cascade,
  product_id    uuid references products(id),
  product_name  text not null,
  unit_price    numeric(10,2) not null check (unit_price >= 0),
  quantity      smallint not null check (quantity > 0),
  line_total    numeric(10,2) not null check (line_total >= 0),
  created_at    timestamptz not null default now()
);

create index idx_order_items_order on order_items (order_id);
create index idx_order_items_product on order_items (product_id);