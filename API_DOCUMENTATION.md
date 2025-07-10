# Local-Node API Documentation

This document provides comprehensive documentation for all API endpoints and WebSocket connections in the local-node application.

## Table of Contents

- [Authentication](#authentication)
- [Queue Management](#queue-management)
- [Overnight Queue Management](#overnight-queue-management)
- [Queue Booking](#queue-booking)
- [Cash Booking](#cash-booking)
- [Booking Management](#booking-management)
- [Vehicle Management](#vehicle-management)
- [Station Management](#station-management)
- [Synchronization](#synchronization)
- [Auto Trip Sync](#auto-trip-sync)
- [WebSocket Management](#websocket-management)
- [WebSocket Connection](#websocket-connection)
- [Permission Levels](#permission-levels)
- [Error Handling](#error-handling)

## Authentication

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/auth/login` | POST | Initiates login with CIN | Public | `{ cin: string }` | `{ success: boolean, message: string, requiresVerification: boolean, data: object }` |
| `/api/auth/verify` | POST | Verifies SMS code to complete authentication | Public | `{ cin: string, verificationCode: string }` | `{ success: boolean, message: string, token: string, staff: object }` |
| `/api/auth/verify-token` | POST | Verifies token validity | Public | `{ token: string }` or Bearer token | `{ success: boolean, message: string, staff: object, source: string }` |
| `/api/auth/logout` | POST | Logs out user | Public | `{ token: string }` or Bearer token | `{ success: boolean, message: string }` |
| `/api/auth/status` | GET | Gets connection status to central server | Public | None | `{ success: boolean, connectionStatus: string, isConnectedToCentral: boolean, websocketState: string }` |

### Authentication Roles

- `WORKER`: Basic staff member
- `SUPERVISOR`: Higher privileges for management functions
- `ADMIN`: Full system access

## Queue Management

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/queue/enter` | POST | Enter vehicle into queue | Public | `{ licensePlate: string }` | `{ success: boolean, message: string, data: object }` |
| `/api/queue/exit` | POST | Exit vehicle from queue | Public | `{ licensePlate: string }` | `{ success: boolean, message: string, data: object }` |
| `/api/queue/available` | GET | Get all available destination queues | Staff | None | `{ success: boolean, data: array }` |
| `/api/queue/stats` | GET | Get comprehensive queue statistics | Staff | None | `{ success: boolean, data: object }` |
| `/api/queue/:destinationId` | GET | Get detailed queue for specific destination | Staff | None | `{ success: boolean, data: object }` |
| `/api/queue/status` | PUT | Update vehicle status in queue | Staff | `{ licensePlate: string, status: string }` | `{ success: boolean, message: string, data: object }` |

## Overnight Queue Management

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/overnight-queue/register` | POST | Register vehicle for overnight queue | Staff | `{ licensePlate: string, destination: string }` | `{ success: boolean, message: string, data: object }` |
| `/api/overnight-queue/list` | GET | Get list of vehicles in overnight queue | Staff | None | `{ success: boolean, data: array }` |
| `/api/overnight-queue/process` | POST | Process overnight queue | Staff | None | `{ success: boolean, message: string, data: object }` |

## Queue Booking

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/queue-booking/create` | POST | Create a booking in queue | Staff | `{ customerInfo: object, destination: string, seats: number }` | `{ success: boolean, message: string, data: object }` |
| `/api/queue-booking/list` | GET | List all queue bookings | Staff | None | `{ success: boolean, data: array }` |
| `/api/queue-booking/assign` | PUT | Assign booking to vehicle | Staff | `{ bookingId: string, vehicleId: string }` | `{ success: boolean, message: string, data: object }` |
| `/api/queue-booking/verify` | POST | Verify booking | Staff | `{ bookingId: string }` | `{ success: boolean, message: string, data: object }` |

## Cash Booking

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/cash-booking/create` | POST | Create a cash booking | Staff | `{ customerInfo: object, destination: string, seats: number, amount: number }` | `{ success: boolean, message: string, data: object }` |
| `/api/cash-booking/list` | GET | List all cash bookings | Staff | None | `{ success: boolean, data: array }` |
| `/api/cash-booking/receipt` | POST | Generate receipt for cash booking | Staff | `{ bookingId: string }` | `{ success: boolean, message: string, data: object }` |

## Booking Management

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/bookings` | POST | Create new booking | Staff | `{ customerInfo: object, destination: string, seats: number, vehicleId: string }` | `{ success: boolean, message: string, data: object }` |
| `/api/bookings/:bookingId` | GET | Get booking by ID | Staff | None | `{ success: boolean, data: object }` |
| `/api/bookings/verify` | POST | Verify ticket | Staff | `{ code: string, method: string }` | `{ success: boolean, message: string, data: object }` |
| `/api/bookings/:bookingId` | DELETE | Cancel booking | Staff | None | `{ success: boolean, message: string }` |

## Vehicle Management

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/vehicles` | GET | Get vehicles authorized for this station | Staff | Query params: `search`, `isActive`, `isAvailable` | `{ success: boolean, data: array, count: number, stationId: string }` |
| `/api/vehicles/stats` | GET | Get vehicle statistics | Staff | None | `{ success: boolean, data: object, stationId: string }` |
| `/api/vehicles/:id` | GET | Get specific vehicle by ID | Staff | None | `{ success: boolean, data: object }` |

## Station Management

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/station/config` | GET | Get station configuration | Staff | None | `{ success: boolean, data: object }` |
| `/api/station/destinations` | GET | Get available destinations from station | Staff | None | `{ success: boolean, data: array }` |
| `/api/station/config` | PUT | Update station configuration | Staff/Supervisor | `{ name: string, operatingHours: object, facilities: array, contact: object }` | `{ success: boolean, message: string, data: object }` |
| `/api/station/stats` | GET | Get station statistics | Staff | Query param: `period` | `{ success: boolean, data: object }` |

## Synchronization

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/sync/status` | GET | Get sync status | Staff | None | `{ success: boolean, data: object }` |
| `/api/sync/request` | POST | Request sync from central server | Staff | None | `{ success: boolean, message: string }` |
| `/api/sync/force` | POST | Force full sync | Supervisor | None | `{ success: boolean, message: string }` |

## Auto Trip Sync

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/auto-sync/status` | GET | Get auto trip sync status | Staff | None | `{ success: boolean, data: object }` |
| `/api/auto-sync/toggle` | POST | Toggle auto trip sync | Supervisor | `{ enabled: boolean }` | `{ success: boolean, message: string, data: object }` |

## WebSocket Management

### Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/websocket/status` | GET | Get WebSocket connection status | Public | None | `{ status: string, isConnected: boolean, isAuthenticated: boolean, reconnectEnabled: boolean, timestamp: string }` |
| `/api/websocket/reconnect` | POST | Force WebSocket reconnection | Public | None | `{ status: string, message: string, timestamp: string }` |
| `/api/websocket/toggle` | POST | Enable/disable automatic reconnection | Public | `{ enable: boolean }` | `{ status: string, message: string, timestamp: string }` |

## WebSocket Connection

The local node maintains a WebSocket connection to the central server for real-time communication.

### Connection Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `authenticate` | Local → Central | Authenticates the station with the central server |
| `authenticated` | Central → Local | Confirms successful authentication |
| `auth_error` | Central → Local | Indicates authentication failure |
| `heartbeat` | Local → Central | Regular heartbeat to maintain connection |
| `heartbeat_ack` | Central → Local | Acknowledges heartbeat receipt |
| `vehicle_sync` | Central → Local | Updates vehicle data |
| `booking_update` | Local → Central | Sends booking updates to central server |
| `vehicle_update` | Local → Central | Sends vehicle updates to central server |
| `queue_update` | Local → Central | Sends queue updates to central server |
| `request_sync` | Local → Central | Requests data synchronization |
| `seat_availability_request` | Central → Local | Requests seat availability information |

### Authentication Flow

1. The local node connects to the central server via WebSocket
2. The local node sends an `authenticate` message with station ID and public IP
3. The central server validates the station and responds with `authenticated` or `auth_error`
4. After successful authentication, the local node begins sending regular heartbeats

## Permission Levels

- **Public**: No authentication required
- **Staff**: Requires authentication with any role (WORKER, SUPERVISOR, ADMIN)
- **Supervisor**: Requires SUPERVISOR or ADMIN role
- **Admin**: Requires ADMIN role only

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `INTERNAL_ERROR`: Server-side error
- `NOT_CONNECTED`: Not connected to central server
- `AUTH_REQUIRED`: Authentication required
- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `INVALID_TOKEN`: Authentication token is invalid
- `NO_TOKEN`: No authentication token provided
- `INVALID_CIN`: CIN format is invalid
- `MISSING_FIELDS`: Required fields are missing
- `VERIFICATION_FAILED`: SMS verification failed
- `LOGIN_FAILED`: Login attempt failed 