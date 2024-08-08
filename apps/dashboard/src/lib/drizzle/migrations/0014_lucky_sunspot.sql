ALTER TABLE "tokens" RENAME TO "resources";--> statement-breakpoint
ALTER TABLE "figma_files" RENAME COLUMN "design_system_id" TO "resource_id";--> statement-breakpoint
ALTER TABLE "figma_files" DROP CONSTRAINT "figma_files_design_system_id_unique";--> statement-breakpoint
ALTER TABLE "resources" DROP CONSTRAINT "tokens_design_system_id_unique";--> statement-breakpoint
ALTER TABLE "figma_files" DROP CONSTRAINT "figma_files_design_system_id_design_systems_id_fk";
--> statement-breakpoint
ALTER TABLE "resources" DROP CONSTRAINT "tokens_design_system_id_design_systems_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "figma_files" ADD CONSTRAINT "figma_files_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources" ADD CONSTRAINT "resources_design_system_id_design_systems_id_fk" FOREIGN KEY ("design_system_id") REFERENCES "public"."design_systems"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "figma_files" DROP COLUMN IF EXISTS "design_tokens";--> statement-breakpoint
ALTER TABLE "figma_files" ADD CONSTRAINT "figma_files_resource_id_unique" UNIQUE("resource_id");--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_design_system_id_unique" UNIQUE("design_system_id");