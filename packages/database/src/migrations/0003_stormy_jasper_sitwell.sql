ALTER TABLE "resources" DROP CONSTRAINT "resources_name_unique";--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_name_project_id_unique" UNIQUE("name","project_id");