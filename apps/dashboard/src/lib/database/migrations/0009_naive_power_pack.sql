ALTER TABLE "integrations" DROP CONSTRAINT "integrations_type_unique";--> statement-breakpoint
ALTER TABLE "integrations" ADD COLUMN "design_system_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "integrations" ADD CONSTRAINT "integrations_design_system_id_design_systems_id_fk" FOREIGN KEY ("design_system_id") REFERENCES "public"."design_systems"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_type_design_system_id_unique" UNIQUE("type","design_system_id");