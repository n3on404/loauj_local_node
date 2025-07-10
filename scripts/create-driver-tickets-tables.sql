-- Create driver entry tickets table
CREATE TABLE IF NOT EXISTS driver_entry_tickets (
    id TEXT PRIMARY KEY,
    vehicle_id TEXT NOT NULL,
    license_plate TEXT NOT NULL,
    station_id TEXT NOT NULL,
    station_name TEXT NOT NULL,
    queue_position INTEGER NOT NULL,
    next_vehicle_plate TEXT,
    entry_time TIMESTAMP NOT NULL,
    ticket_price REAL DEFAULT 2.0,
    ticket_number TEXT UNIQUE NOT NULL,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (created_by) REFERENCES staff(id)
);

-- Create driver exit tickets table
CREATE TABLE IF NOT EXISTS driver_exit_tickets (
    id TEXT PRIMARY KEY,
    vehicle_id TEXT NOT NULL,
    license_plate TEXT NOT NULL,
    departure_station_id TEXT NOT NULL,
    departure_station_name TEXT NOT NULL,
    destination_station_id TEXT NOT NULL,
    destination_station_name TEXT NOT NULL,
    exit_time TIMESTAMP NOT NULL,
    ticket_number TEXT UNIQUE NOT NULL,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (created_by) REFERENCES staff(id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_driver_entry_tickets_vehicle_id ON driver_entry_tickets(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_driver_entry_tickets_license_plate ON driver_entry_tickets(license_plate);
CREATE INDEX IF NOT EXISTS idx_driver_entry_tickets_created_at ON driver_entry_tickets(created_at);

CREATE INDEX IF NOT EXISTS idx_driver_exit_tickets_vehicle_id ON driver_exit_tickets(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_driver_exit_tickets_license_plate ON driver_exit_tickets(license_plate);
CREATE INDEX IF NOT EXISTS idx_driver_exit_tickets_created_at ON driver_exit_tickets(created_at); 