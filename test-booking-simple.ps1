# Queue Booking System Test Script

Write-Host "🚀 Starting Queue Booking System Test" -ForegroundColor Green
Write-Host "=" * 50

# Test configuration
$baseUrl = "http://localhost:3001"
$headers = @{
    "Content-Type" = "application/json"
}

# Step 1: Login
Write-Host "`n🔐 Step 1: Staff Login" -ForegroundColor Yellow

$loginBody = @{
    cin = "12345678"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST -Body $loginBody -Headers $headers
    
    if ($loginResponse.success) {
        Write-Host "✅ Login successful" -ForegroundColor Green
        Write-Host "   Staff: $($loginResponse.data.staff.firstName) $($loginResponse.data.staff.lastName)" -ForegroundColor White
        Write-Host "   Role: $($loginResponse.data.staff.role)" -ForegroundColor White
        
        $token = $loginResponse.data.token
        $authHeaders = @{
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $token"
        }
    } else {
        Write-Host "❌ Login failed: $($loginResponse.error)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Login request failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Add a vehicle to queue first
Write-Host "`n🚗 Step 2: Adding vehicle to queue for testing" -ForegroundColor Yellow

$queueBody = @{
    licensePlate = "TN-2024-001"
} | ConvertTo-Json

try {
    $queueResponse = Invoke-RestMethod -Uri "$baseUrl/api/queue/enter" -Method POST -Body $queueBody -Headers $headers
    
    if ($queueResponse.success) {
        Write-Host "✅ Vehicle added to queue successfully" -ForegroundColor Green
        Write-Host "   Vehicle: $($queueResponse.data.vehicle.licensePlate)" -ForegroundColor White
        Write-Host "   Destination: $($queueResponse.data.destination)" -ForegroundColor White
        Write-Host "   Position: $($queueResponse.data.queuePosition)" -ForegroundColor White
    } else {
        Write-Host "⚠️ Queue entry info: $($queueResponse.message)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️ Queue entry request failed (may be normal if vehicle already in queue): $($_.Exception.Message)" -ForegroundColor Yellow
}

# Step 3: Get Available Destinations
Write-Host "`n📊 Step 3: Getting Available Destinations" -ForegroundColor Yellow

try {
    $destinationsResponse = Invoke-RestMethod -Uri "$baseUrl/api/queue-booking/destinations" -Method GET -Headers $authHeaders
    
    if ($destinationsResponse.success) {
        Write-Host "✅ Available destinations retrieved:" -ForegroundColor Green
        foreach ($dest in $destinationsResponse.data) {
            Write-Host "   • $($dest.destinationName) (ID: $($dest.destinationId))" -ForegroundColor White
            Write-Host "     Available seats: $($dest.totalAvailableSeats)" -ForegroundColor White
            Write-Host "     Vehicles: $($dest.vehicleCount)" -ForegroundColor White
        }
        
        if ($destinationsResponse.data.Count -gt 0) {
            $firstDestination = $destinationsResponse.data[0]
            Write-Host "`n   Using destination: $($firstDestination.destinationName)" -ForegroundColor Cyan
        } else {
            Write-Host "❌ No destinations available for booking" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ Failed to get destinations: $($destinationsResponse.error)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Destinations request failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 4: Get Detailed Seat Information
Write-Host "`n🚗 Step 4: Getting Seat Details for $($firstDestination.destinationName)" -ForegroundColor Yellow

try {
    $seatsResponse = Invoke-RestMethod -Uri "$baseUrl/api/queue-booking/destinations/$($firstDestination.destinationId)/seats" -Method GET -Headers $authHeaders
    
    if ($seatsResponse.success) {
        Write-Host "✅ Seat details retrieved:" -ForegroundColor Green
        Write-Host "   Destination: $($seatsResponse.data.destinationName)" -ForegroundColor White
        Write-Host "   Total available seats: $($seatsResponse.data.totalAvailableSeats)" -ForegroundColor White
        Write-Host "   Vehicles in queue:" -ForegroundColor White
        
        $vehicleIndex = 1
        foreach ($vehicle in $seatsResponse.data.vehicles) {
            Write-Host "   $vehicleIndex. $($vehicle.licensePlate) (Position $($vehicle.queuePosition))" -ForegroundColor White
            Write-Host "      Available: $($vehicle.availableSeats)/$($vehicle.totalSeats) seats" -ForegroundColor White
            Write-Host "      Price: $($vehicle.basePrice)/seat" -ForegroundColor White
            Write-Host "      Status: $($vehicle.status)" -ForegroundColor White
            $vehicleIndex++
        }
        
        if ($seatsResponse.data.totalAvailableSeats -eq 0) {
            Write-Host "❌ No seats available for booking" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ Failed to get seat details: $($seatsResponse.error)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Seat details request failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 5: Create a Booking
Write-Host "`n🎫 Step 5: Creating a Test Booking" -ForegroundColor Yellow

$seatsToBook = [Math]::Min(2, $seatsResponse.data.totalAvailableSeats)

$bookingBody = @{
    destinationId = $firstDestination.destinationId
    seatsRequested = $seatsToBook
    customerName = "Ahmed Ben Ali"
    customerPhone = "+216 20 123 456"
    paymentMethod = "CASH"
} | ConvertTo-Json

try {
    $bookingResponse = Invoke-RestMethod -Uri "$baseUrl/api/queue-booking/book" -Method POST -Body $bookingBody -Headers $authHeaders
    
    if ($bookingResponse.success) {
        Write-Host "✅ Booking created successfully!" -ForegroundColor Green
        Write-Host "   Customer: $($bookingResponse.data.summary.customer)" -ForegroundColor White
        Write-Host "   Total seats: $($bookingResponse.data.summary.totalSeats)" -ForegroundColor White
        Write-Host "   Total amount: $($bookingResponse.data.summary.totalAmount)" -ForegroundColor White
        Write-Host "   Vehicles used: $($bookingResponse.data.summary.vehicleCount)" -ForegroundColor White
        Write-Host "   Verification codes: $($bookingResponse.data.verificationCodes -join ', ')" -ForegroundColor White
        
        Write-Host "`n   📋 Booking details:" -ForegroundColor Cyan
        $bookingIndex = 1
        foreach ($booking in $bookingResponse.data.bookings) {
            Write-Host "   Booking $bookingIndex"
            Write-Host "     ID: $($booking.id)" -ForegroundColor White
            Write-Host "     Vehicle: $($booking.vehicleLicensePlate)" -ForegroundColor White
            Write-Host "     Seats: $($booking.seatsBooked)" -ForegroundColor White
            Write-Host "     Amount: $($booking.totalAmount)" -ForegroundColor White
            Write-Host "     Verification: $($booking.verificationCode)" -ForegroundColor White
            $bookingIndex++
        }
        
        $firstVerificationCode = $bookingResponse.data.verificationCodes[0]
    } else {
        Write-Host "❌ Booking failed: $($bookingResponse.error)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Booking request failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.Exception.Response | ConvertTo-Json)" -ForegroundColor Red
    exit 1
}

# Step 6: Verify the Ticket
Write-Host "`n🔍 Step 6: Verifying Ticket" -ForegroundColor Yellow

$verifyBody = @{
    verificationCode = $firstVerificationCode
} | ConvertTo-Json

try {
    $verifyResponse = Invoke-RestMethod -Uri "$baseUrl/api/queue-booking/verify" -Method POST -Body $verifyBody -Headers $authHeaders
    
    if ($verifyResponse.success) {
        Write-Host "✅ Ticket verified successfully!" -ForegroundColor Green
        Write-Host "   Customer: $($verifyResponse.data.customerName)" -ForegroundColor White
        Write-Host "   Vehicle: $($verifyResponse.data.vehicleLicensePlate)" -ForegroundColor White
        Write-Host "   Destination: $($verifyResponse.data.destinationName)" -ForegroundColor White
        Write-Host "   Seats: $($verifyResponse.data.seatsBooked)" -ForegroundColor White
        Write-Host "   Amount: $($verifyResponse.data.totalAmount)" -ForegroundColor White
    } else {
        Write-Host "❌ Ticket verification failed: $($verifyResponse.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Verification request failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 7: Get Booking Statistics
Write-Host "`n📊 Step 7: Getting Booking Statistics" -ForegroundColor Yellow

try {
    $statsResponse = Invoke-RestMethod -Uri "$baseUrl/api/queue-booking/stats" -Method GET -Headers $authHeaders
    
    if ($statsResponse.success) {
        Write-Host "✅ Today's booking statistics:" -ForegroundColor Green
        Write-Host "   Total bookings: $($statsResponse.data.today.totalBookings)" -ForegroundColor White
        Write-Host "   Total seats booked: $($statsResponse.data.today.totalSeats)" -ForegroundColor White
        Write-Host "   Total revenue: $($statsResponse.data.today.totalRevenue)" -ForegroundColor White
        Write-Host "   Pending verifications: $($statsResponse.data.today.pendingVerifications)" -ForegroundColor White
    } else {
        Write-Host "❌ Failed to get statistics: $($statsResponse.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Statistics request failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n" + "=" * 50
Write-Host "✅ Queue Booking System Test Completed!" -ForegroundColor Green
Write-Host "=" * 50 