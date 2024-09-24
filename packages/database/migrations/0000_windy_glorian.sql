-- Custom SQL migration file, put you code below! --
DO $$ BEGIN
CREATE TYPE "public"."integration_type" AS ENUM('github', 'figma');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"email" varchar NOT NULL,
	CONSTRAINT "accounts_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "integrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"type" "integration_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"data" jsonb,
	CONSTRAINT "integrations_type_project_id_unique" UNIQUE("type","project_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text DEFAULT 'Default Project' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts_to_projects" (
	"account_id" uuid NOT NULL,
	"project_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "figma_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resource_id" uuid NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "figma_resources_resource_id_unique" UNIQUE("resource_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"project_id" uuid NOT NULL,
	"name" text NOT NULL,
	"design_tokens" json,
	CONSTRAINT "resources_name_project_id_unique" UNIQUE("name","project_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "integrations" ADD CONSTRAINT "integrations_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts_to_projects" ADD CONSTRAINT "accounts_to_projects_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts_to_projects" ADD CONSTRAINT "accounts_to_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "figma_resources" ADD CONSTRAINT "figma_resources_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources" ADD CONSTRAINT "resources_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE SCHEMA IF NOT EXISTS private;

-- Create function to return current account based on authenticated user id

CREATE OR REPLACE FUNCTION private.current_account_id()
RETURNS uuid
SECURITY definer
AS $$
DECLARE
    account_id uuid;
BEGIN
    SELECT a.id INTO account_id
    FROM public.accounts a
    WHERE a.user_id = auth.uid();

    RETURN account_id;
END;
$$ LANGUAGE plpgsql;

-- Returns project ids the current authenticated user id has access to
CREATE OR REPLACE FUNCTION private.get_user_project_ids()
RETURNS TABLE(project_id uuid)
SECURITY definer
AS $$
BEGIN
    RETURN QUERY
    SELECT atp.project_id
    FROM public.accounts_to_projects atp
    WHERE atp.account_id = private.current_account_id();
END;
$$ LANGUAGE plpgsql;


-- Policies
CREATE POLICY "Enable read access for users based on their user_id"
ON "public"."accounts"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
	auth.uid() = user_id
);

CREATE POLICY "Enable read access to accounts_to_projects for users based on their account"
ON "public"."accounts_to_projects"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
	private.current_account_id() = account_id
);

CREATE POLICY "Enable SELECT"
ON "public"."integrations"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
	project_id IN (SELECT project_id FROM private.get_user_project_ids())
	AND
	auth.role() IN ('browser-user', 'api-user')
);

CREATE POLICY "[API] - Enable SELECT"
ON "public"."projects"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
	id IN (SELECT project_id FROM private.get_user_project_ids())
	AND
	auth.role() = 'api-user'
);

CREATE POLICY "[BROWSER] - Enable SELECT"
ON "public"."projects"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
	id IN (SELECT project_id FROM private.get_user_project_ids())
	AND
	auth.role() = 'browser-user'
);

CREATE POLICY "[API] - Enable INSERT"
ON "public"."resources"
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (
	project_id IN (SELECT project_id FROM private.get_user_project_ids())
	AND
	auth.role() = 'api-user'
);

CREATE POLICY "[API] - Enable UPDATE"
ON "public"."resources"
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
	project_id IN (SELECT project_id FROM private.get_user_project_ids())
	AND
	auth.role() = 'api-user'
)
WITH CHECK (
	project_id IN (SELECT project_id FROM private.get_user_project_ids())
	AND
	auth.role() = 'api-user'
);

CREATE POLICY "[API] - Enable SELECT"
ON "public"."resources"
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
	project_id IN (SELECT project_id FROM private.get_user_project_ids())
	AND
	auth.role() = 'api-user'
);
-- Policies


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
	insert into public.accounts (user_id, email)
	values (new.id, new.email)
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