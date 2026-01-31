# table name=users
# columns    
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password text not null,
  role text check(role in ('customer','owner','driver')),
  created_at timestamp default now()
# endtable

# constraints
role must be one of 'customer','owner','driver'
email unique
# relationships
one user have many vehicles as owner