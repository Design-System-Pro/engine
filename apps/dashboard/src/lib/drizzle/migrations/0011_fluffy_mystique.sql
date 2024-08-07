ALTER TABLE "design_systems" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "figma_files" ADD CONSTRAINT "figma_files_design_system_id_unique" UNIQUE("design_system_id");