-- Add password field to staff table (local node)
-- This migration adds a password field to the staff table for password-based authentication

-- Add password column to staff table
ALTER TABLE staff ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '';

-- Update existing staff records with their CIN as password (they'll need to change it on first login)
-- This will be handled by the application code, not the migration
-- The migration just adds the column, the application will set CIN as password

-- Add a comment to the column
COMMENT ON COLUMN staff.password IS 'Hashed password for staff authentication';