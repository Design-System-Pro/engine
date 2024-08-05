CREATE TABLE IF NOT EXISTS "figma_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"design_system_id" uuid NOT NULL,
	"name" text,
	"file_key" text NOT NULL,
	"thumbnail_url" text,
	"last_modified" timestamp with time zone,
	CONSTRAINT "figma_files_file_key_unique" UNIQUE("file_key")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "figma_files" ADD CONSTRAINT "figma_files_design_system_id_design_systems_id_fk" FOREIGN KEY ("design_system_id") REFERENCES "public"."design_systems"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
