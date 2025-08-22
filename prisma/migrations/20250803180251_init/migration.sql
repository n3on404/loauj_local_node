-- CreateTable
CREATE TABLE "public"."station_config" (
    "id" TEXT NOT NULL,
    "station_id" TEXT NOT NULL,
    "station_name" TEXT NOT NULL,
    "governorate" TEXT NOT NULL,
    "delegation" TEXT NOT NULL,
    "address" TEXT,
    "opening_time" TEXT NOT NULL DEFAULT '06:00',
    "closing_time" TEXT NOT NULL DEFAULT '22:00',
    "is_operational" BOOLEAN NOT NULL DEFAULT true,
    "server_version" TEXT NOT NULL,
    "last_sync" TIMESTAMP(3),
    "is_online" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "station_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."staff" (
    "id" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login" TIMESTAMP(3),
    "synced_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "staff_data" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_activity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_offline" BOOLEAN NOT NULL DEFAULT false,
    "last_offline_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."drivers" (
    "id" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "origin_governorate_id" TEXT,
    "origin_delegation_id" TEXT,
    "origin_address" TEXT,
    "vehicle_id" TEXT,
    "account_status" TEXT NOT NULL DEFAULT 'APPROVED',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "synced_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vehicles" (
    "id" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "model" TEXT,
    "year" INTEGER,
    "color" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "is_banned" BOOLEAN NOT NULL DEFAULT false,
    "default_destination_id" TEXT,
    "default_destination_name" TEXT,
    "synced_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vehicle_authorized_stations" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "station_id" TEXT NOT NULL,
    "station_name" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_authorized_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vehicle_queue" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,
    "destination_name" TEXT NOT NULL,
    "queueType" TEXT NOT NULL DEFAULT 'REGULAR',
    "queue_position" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "entered_at" TIMESTAMP(3) NOT NULL,
    "available_seats" INTEGER NOT NULL,
    "total_seats" INTEGER NOT NULL,
    "base_price" DOUBLE PRECISION NOT NULL,
    "estimated_departure" TIMESTAMP(3),
    "actual_departure" TIMESTAMP(3),
    "synced_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."routes" (
    "id" TEXT NOT NULL,
    "station_id" TEXT NOT NULL,
    "station_name" TEXT NOT NULL,
    "base_price" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "synced_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vehicle_schedules" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "available_seats" INTEGER NOT NULL,
    "total_seats" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "actual_departure" TIMESTAMP(3),
    "synced_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bookings" (
    "id" TEXT NOT NULL,
    "queue_id" TEXT NOT NULL,
    "seats_booked" INTEGER NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "booking_source" TEXT NOT NULL,
    "booking_type" TEXT NOT NULL DEFAULT 'CASH',
    "user_id" TEXT,
    "customer_phone" TEXT,
    "online_ticket_id" TEXT,
    "payment_status" TEXT NOT NULL DEFAULT 'PAID',
    "payment_method" TEXT NOT NULL DEFAULT 'CASH',
    "payment_processed_at" TIMESTAMP(3),
    "verification_code" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verified_at" TIMESTAMP(3),
    "verified_by_id" TEXT,
    "created_offline" BOOLEAN NOT NULL DEFAULT false,
    "local_id" TEXT,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sync_status" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sync_queue" (
    "id" SERIAL NOT NULL,
    "table_name" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "sync_status" TEXT NOT NULL DEFAULT 'PENDING',
    "retry_count" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_attempt" TIMESTAMP(3),

    CONSTRAINT "sync_queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."operation_logs" (
    "id" SERIAL NOT NULL,
    "staff_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "details" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operation_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."offline_customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "cin" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "offline_customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trips" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,
    "destination_name" TEXT NOT NULL,
    "queue_id" TEXT NOT NULL,
    "seats_booked" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sync_status" TEXT NOT NULL DEFAULT 'PENDING',
    "synced_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."driver_entry_tickets" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "station_id" TEXT NOT NULL,
    "station_name" TEXT NOT NULL,
    "queue_position" INTEGER NOT NULL,
    "next_vehicle_plate" TEXT,
    "entry_time" TIMESTAMP(3) NOT NULL,
    "ticket_price" DOUBLE PRECISION NOT NULL DEFAULT 2.0,
    "ticket_number" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "driver_entry_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."driver_exit_tickets" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "departure_station_id" TEXT NOT NULL,
    "departure_station_name" TEXT NOT NULL,
    "destination_station_id" TEXT NOT NULL,
    "destination_station_name" TEXT NOT NULL,
    "exit_time" TIMESTAMP(3) NOT NULL,
    "ticket_number" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "driver_exit_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "station_config_station_id_key" ON "public"."station_config"("station_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_cin_key" ON "public"."staff"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "public"."sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_cin_key" ON "public"."drivers"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_vehicle_id_key" ON "public"."drivers"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_license_plate_key" ON "public"."vehicles"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_authorized_stations_vehicle_id_station_id_key" ON "public"."vehicle_authorized_stations"("vehicle_id", "station_id");

-- CreateIndex
CREATE UNIQUE INDEX "routes_station_id_key" ON "public"."routes"("station_id");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_online_ticket_id_key" ON "public"."bookings"("online_ticket_id");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_verification_code_key" ON "public"."bookings"("verification_code");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_local_id_key" ON "public"."bookings"("local_id");

-- CreateIndex
CREATE UNIQUE INDEX "driver_entry_tickets_ticket_number_key" ON "public"."driver_entry_tickets"("ticket_number");

-- CreateIndex
CREATE UNIQUE INDEX "driver_exit_tickets_ticket_number_key" ON "public"."driver_exit_tickets"("ticket_number");

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."drivers" ADD CONSTRAINT "drivers_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vehicle_authorized_stations" ADD CONSTRAINT "vehicle_authorized_stations_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vehicle_queue" ADD CONSTRAINT "vehicle_queue_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "public"."vehicle_queue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_verified_by_id_fkey" FOREIGN KEY ("verified_by_id") REFERENCES "public"."staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trips" ADD CONSTRAINT "trips_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trips" ADD CONSTRAINT "trips_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "public"."vehicle_queue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."driver_entry_tickets" ADD CONSTRAINT "driver_entry_tickets_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."driver_entry_tickets" ADD CONSTRAINT "driver_entry_tickets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."driver_exit_tickets" ADD CONSTRAINT "driver_exit_tickets_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."driver_exit_tickets" ADD CONSTRAINT "driver_exit_tickets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
