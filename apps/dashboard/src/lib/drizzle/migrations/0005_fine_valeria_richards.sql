DO $$ BEGIN
 CREATE TYPE "public"."integration_type" AS ENUM('github');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "integrations" ADD COLUMN "type" "integration_type" DEFAULT 'github' NOT NULL;