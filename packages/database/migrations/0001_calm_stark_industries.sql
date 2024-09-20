-- Install dbdev - start
--------------------------------
create extension if not exists "http" with schema extensions;
create extension if not exists "pg_tle";
drop extension if exists "supabase-dbdev";
select pgtle.uninstall_extension_if_exists('supabase-dbdev');
select
    pgtle.install_extension(
        'supabase-dbdev',
        resp.contents ->> 'version',
        'PostgreSQL package manager',
        resp.contents ->> 'sql'
    )
from http(
    (
        'GET',
        'https://api.database.dev/rest/v1/'
        || 'package_versions?select=sql,version'
        || '&package_name=eq.supabase-dbdev'
        || '&order=version.desc'
        || '&limit=1',
        array[
            ('apiKey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXB0cHBsZnZpaWZyYndtbXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxMDczNzIsImV4cCI6MTk5NTY4MzM3Mn0.z2CN0mvO2No8wSi46Gw59DFGCTJrzM0AQKsu_5k134s')::http_header
        ],
        null,
        null
    )
) x,
lateral (
    select
        ((row_to_json(x) -> 'content') #>> '{}')::json -> 0
) resp(contents);
create extension "supabase-dbdev";
select dbdev.install('supabase-dbdev');
drop extension if exists "supabase-dbdev";
create extension "supabase-dbdev";

-- Install dbdev - end
--------------------------------


-- Install KeyHippo for API keys management - start
---------------------------------------------------
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists on_user_created__create_user_api_key_secret on auth.users;
drop trigger if exists on_auth_user_deleted on auth.users;
drop extension if exists "keyhippo@keyhippo";

select dbdev.install('keyhippo@keyhippo');
create extension "keyhippo@keyhippo" version '0.0.31';

-- Install KeyHippo for API keys management - end
---------------------------------------------------

----------------------
-- Custom triggers

-- inserts a row into public.accounts
create or replace function public.create_account_and_project()
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

drop trigger if exists on_auth_user_created__create_account_and_project on auth.users;

-- trigger the function every time an auth user is created in auth.users
create or replace trigger on_auth_user_created__create_account_and_project
  after insert on auth.users
  for each row execute procedure public.create_account_and_project();

-- Custom triggers
----------------------