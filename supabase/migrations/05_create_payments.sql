create type payment_record_status as enum ('pending', 'verified', 'rejected');

create table payments (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references orders(id) on delete cascade,
  method          payment_method not null,
  amount          numeric(10,2) not null check (amount >= 0),
  status          payment_record_status not null default 'pending',
  proof_reference text,
  transaction_ref text unique,
  verified_by     text,
  verified_at     timestamptz,
  created_at      timestamptz not null default now()
);

create index idx_payments_order on payments (order_id);