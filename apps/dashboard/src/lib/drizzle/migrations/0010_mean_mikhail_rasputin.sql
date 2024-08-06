ALTER TABLE "figma_files" ADD COLUMN "design_tokens" json;--> statement-breakpoint
ALTER TABLE "design_systems" DROP COLUMN IF EXISTS "tokens";