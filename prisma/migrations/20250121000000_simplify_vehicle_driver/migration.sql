-- Simplify Vehicle and Driver models for local node
-- Remove unnecessary fields and set defaults

-- Remove columns from drivers table
ALTER TABLE "drivers" DROP COLUMN IF EXISTS "phone_number";
ALTER TABLE "drivers" DROP COLUMN IF EXISTS "first_name";
ALTER TABLE "drivers" DROP COLUMN IF EXISTS "last_name";

-- Remove columns from vehicles table
ALTER TABLE "vehicles" DROP COLUMN IF EXISTS "model";
ALTER TABLE "vehicles" DROP COLUMN IF EXISTS "year";
ALTER TABLE "vehicles" DROP COLUMN IF EXISTS "color";

-- Set default capacity for vehicles to 8
ALTER TABLE "vehicles" ALTER COLUMN "capacity" SET DEFAULT 8;

-- Update existing vehicles to have capacity 8 if not set
UPDATE "vehicles" SET "capacity" = 8 WHERE "capacity" IS NULL OR "capacity" = 0;