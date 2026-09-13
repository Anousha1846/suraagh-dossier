alter table products add column compare_at_price numeric(10,2) check (compare_at_price is null or compare_at_price >= price);
alter table products add column player_range_label text;