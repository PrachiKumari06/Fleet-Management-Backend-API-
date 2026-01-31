# table name=vehicles
# columns
 id uuid primary key default gen_random_uuid(),
name text not null,
  registration_num text unique not null,
allowed_passengers integer,
isAvailable boolean default true,
driver_id uuid references users(id),
rate_per_km integer ,
  owner_id uuid references users(id) on delete cascade on update cascade,
  created_at timestamp default now()
# endtable