ALTER TABLE "integrations" ALTER COLUMN "type" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "figma_files" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "figma_files" ALTER COLUMN "thumbnail_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "figma_files" ALTER COLUMN "last_modified" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_type_unique" UNIQUE("type");