ALTER TYPE "integration_type" ADD VALUE 'figma';--> statement-breakpoint
ALTER TABLE "integrations" ADD COLUMN "data" jsonb;--> statement-breakpoint
ALTER TABLE "integrations" DROP COLUMN IF EXISTS "installation_id";--> statement-breakpoint
ALTER TABLE "integrations" DROP COLUMN IF EXISTS "repository_id";