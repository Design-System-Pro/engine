DO $$ BEGIN
 CREATE TYPE "public"."integration_type" AS ENUM('github', 'figma');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "accounts_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "figma_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resource_id" uuid NOT NULL,
	"name" text NOT NULL,
	"file_key" text NOT NULL,
	"thumbnail_url" text NOT NULL,
	"last_modified" timestamp with time zone NOT NULL,
	CONSTRAINT "figma_files_resource_id_unique" UNIQUE("resource_id"),
	CONSTRAINT "figma_files_file_key_unique" UNIQUE("file_key")
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
CREATE TABLE IF NOT EXISTS "resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"project_id" uuid NOT NULL,
	"name" text NOT NULL,
	"design_tokens" json,
	CONSTRAINT "resources_project_id_unique" UNIQUE("project_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "figma_files" ADD CONSTRAINT "figma_files_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "resources" ADD CONSTRAINT "resources_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Install KeyHippo for API keys management

drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists on_user_created__create_user_api_key_secret on auth.users;
drop trigger if exists on_auth_user_deleted on auth.users;
drop extension if exists "keyhippo@keyhippo";

select dbdev.install('keyhippo@keyhippo');
create extension "keyhippo@keyhippo" version '0.0.16';

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