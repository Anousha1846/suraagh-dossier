alter table products enable row level security;
create policy "public read active products"
  on products for select
  using (status = 'active');

alter table customers enable row level security;
create policy "anon can insert customers"
  on customers for insert
  with check (true);

alter table orders enable row level security;
create policy "anon can insert orders"
  on orders for insert
  with check (true);

alter table order_items enable row level security;
create policy "anon can insert order_items"
  on order_items for insert
  with check (true);

alter table payments enable row level security;
create policy "anon can insert payments"
  on payments for insert
  with check (true);

alter table shipments enable row level security;