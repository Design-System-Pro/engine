----------------------
-- Custom triggers

-- inserts a row into public.accounts
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
	inserted_account_id uuid;
	inserted_project_id uuid;
begin
	-- Insert into accounts and get the generated account ID
	insert into public.accounts (user_id)
	values (new.id)
	returning id into inserted_account_id;

	-- Insert into projects and get the generated project ID
	insert into public.projects default values
	returning id into inserted_project_id;

	-- Insert into accounts_to_projects with the retrieved IDs
	insert into public.accounts_to_projects (account_id, project_id)
	values (inserted_account_id, inserted_project_id);

	return new;
end;
$$;

-- trigger the function every time an auth user is created in auth.users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();

-- Custom triggers
----------------------