# table name=trip
# columns
  id uuid primary key default gen_random_uuid() ,
customer_id uuid references users(id) on delete cascade on update cascade,
vehicle_id uuid references vehicles(id) on delete cascade on update cascade,
start_date date,
end_date date,
location text not null,
distance_km integer,
passengers integer,
tripCost integer,
isCompleted boolean default false,
  created_at timestamp default now()
# endtable


# constraints
passengers not greater than allowed_passengers in vehicles 
# relationships
customer_id references users(id)
vehicle_id references vehicles(id)