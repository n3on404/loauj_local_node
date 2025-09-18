-- Add day pass fields to drivers table
ALTER TABLE drivers ADD COLUMN has_valid_day_pass BOOLEAN DEFAULT FALSE;
ALTER TABLE drivers ADD COLUMN day_pass_expires_at TIMESTAMP;

-- Create day_passes table
CREATE TABLE day_passes (
    id TEXT PRIMARY KEY,
    driver_id TEXT NOT NULL,
    vehicle_id TEXT NOT NULL,
    license_plate TEXT NOT NULL,
    price REAL DEFAULT 2.0,
    purchase_date TIMESTAMP NOT NULL,
    valid_from TIMESTAMP NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_expired BOOLEAN DEFAULT FALSE,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (created_by) REFERENCES staff(id)
);

-- Create indexes for better performance
CREATE INDEX idx_day_passes_driver_id ON day_passes(driver_id);
CREATE INDEX idx_day_passes_vehicle_id ON day_passes(vehicle_id);
CREATE INDEX idx_day_passes_purchase_date ON day_passes(purchase_date);
CREATE INDEX idx_day_passes_valid_from ON day_passes(valid_from);
CREATE INDEX idx_day_passes_valid_until ON day_passes(valid_until);
CREATE INDEX idx_day_passes_is_active ON day_passes(is_active);
CREATE INDEX idx_day_passes_is_expired ON day_passes(is_expired);