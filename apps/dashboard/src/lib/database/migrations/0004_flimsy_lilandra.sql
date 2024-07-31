ALTER TABLE "accounts" DROP COLUMN IF EXISTS "full_name";

-- inserts a row into public.accounts
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  with inserted_design_system as (
      insert into public.design_systems default values returning id
  )
  insert into public.accounts (user_id, design_system_id)
  select new.id, id from inserted_design_system;
  return new;
end;
$$;

-- trigger the function every time an auth user is created in auth.users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();