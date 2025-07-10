# Route Price Sync Documentation

## Overview

When a **supervisor** updates a route price in the local node, it automatically syncs to the central server to keep both systems in sync. Only supervisors can update route prices, and they can only update routes for their assigned station.

## Authentication & Authorization

- ✅ **Authentication Required**: All route price updates require a valid JWT token
- ✅ **Supervisor Only**: Only users with `SUPERVISOR` role can update route prices
- ✅ **Station-Specific**: Supervisors can only update routes for their assigned station
- ✅ **Bidirectional Sync**: Updates both A→B and B→A routes in central server

## API Endpoints

### Local Node Routes

#### 1. Get All Routes
```
GET /api/routes
```
Returns all routes stored locally.

#### 2. Get Route by ID
```
GET /api/routes/:id
```
Returns a specific route by its ID.

#### 3. Update Route Price (SUPERVISOR only)
```
PUT /api/routes/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "basePrice": 25.50
}
```
Updates the route price locally and syncs to central server. Only supervisors can perform this action.

#### 4. Get Routes by Station
```
GET /api/routes/station/:stationId
```
Returns all routes for a specific station.

### Central Server Routes

#### Update Route Price by Station
```
PUT /api/v1/routes/:stationId/price
Content-Type: application/json

{
  "basePrice": 25.50
}
```
Updates all route prices for a specific station in the central server.

## How It Works

1. **Authentication**: Supervisor must provide valid JWT token
2. **Authorization**: System checks if user is SUPERVISOR and has assigned station
3. **Station Verification**: Ensures route belongs to supervisor's assigned station
4. **Local Update**: Updates the local database first
5. **Bidirectional Sync**: Calls central server to update both A→B and B→A routes
6. **Error Handling**: If central server sync fails, local update still succeeds
7. **Logging**: All operations are logged for debugging

## Example Flow

```typescript
// 1. Supervisor logs in and gets JWT token
POST /api/auth/login
{
  "cin": "12345678",
  "password": "password123"
}

// 2. Supervisor requests route price update
PUT /api/routes/route-123
Authorization: Bearer <JWT_TOKEN>
{
  "basePrice": 30.00
}

// 3. System verifies supervisor role and station assignment
// 4. Local database is updated
// 5. Central server is called with bidirectional route matching
PUT /api/v1/routes/monastir-main-station/price
{
  "basePrice": 30.00,
  "targetStationId": "tunis-main-station"
}

// 6. Central server updates both Monastir→Tunis and Tunis→Monastir routes
// 7. Both systems are now in sync
```

## Error Handling

- If central server is unavailable, local update still succeeds
- Sync errors are logged but don't break the local operation
- Retry mechanism can be added later if needed

## Benefits

- ✅ **Automatic Sync**: No manual intervention needed
- ✅ **Reliable**: Local updates always succeed
- ✅ **Transparent**: Users don't need to know about sync
- ✅ **Fault Tolerant**: Central server issues don't break local operations 