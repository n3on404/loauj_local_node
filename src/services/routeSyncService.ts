import { prisma } from '../config/database';
import { VehicleData } from './vehicleSyncService';
import axios from 'axios';
import { configService } from '../config/supervisorConfig';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class RouteSyncService {

    async syncRoutesForVehicle(vehicleData: VehicleData) {
        console.log(`🚐 Processing route sync for vehicle ${vehicleData.licensePlate}`);
        
        // Get current station ID from config service
        const currentStationId = configService.getStationId();
        
        // Only sync routes for the current station to avoid overwhelming the central server
        const currentStationAuth = vehicleData.authorizedStations.find(
            auth => auth.stationId === currentStationId
        );
        
        if (!currentStationAuth) {
            console.log(`⚠️ Vehicle ${vehicleData.licensePlate} not authorized for current station ${currentStationId}`);
            return false;
        }
        
        // Retry logic for handling temporary connection issues
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                console.log(`🔍 Fetching routes for station ${currentStationId}... (attempt ${attempt}/${MAX_RETRIES})`);
                const response = await axios.get(`${process.env.CENTRAL_SERVER_URL}/api/v1/routes/search/${currentStationId}`, {
                    timeout: 10000, // 10 second timeout
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.status === 200 && response.data.success) {
                    const routes = response.data.data; // Access the nested data array
                    console.log(`✅ Found ${routes.length} routes for station ${currentStationId}`);
                    
                    // Log route details
                    routes.forEach((route: any) => {
                        console.log(`   Route: ${route.station_id} - ${route.station_name} (${route.base_price} TND) - ${route.governorate}, ${route.delegation}`);

                        this.uploadToDB(route);
                        console.log(`Route data: ${route}`);
                    });
                    
                  
                    return true;
                } else {
                    console.log(`⚠️ No routes found for station ${currentStationId}`);
                    return false;
                }
            } catch (error: any) {
                const isLastAttempt = attempt === MAX_RETRIES;
                
                if (error.response?.status === 404) {
                    console.error(`❌ Station ${currentStationId} not found in central server`);
                    return false; // Don't retry 404 errors
                } else if (error.code === 'ECONNABORTED') {
                    console.error(`❌ Timeout while fetching routes for station ${currentStationId} (attempt ${attempt})`);
                } else if (error.response?.data?.message?.includes('Too many database connections')) {
                    console.error(`❌ Central server database connection pool exhausted (attempt ${attempt})`);
                } else {
                    console.error(`❌ Error fetching routes for station ${currentStationId} (attempt ${attempt}):`, error.message);
                }
                
                if (isLastAttempt) {
                    console.error(`❌ Failed to fetch routes after ${MAX_RETRIES} attempts`);
                    return false;
                } else {
                    console.log(`⏳ Retrying in ${RETRY_DELAY}ms...`);
                    await delay(RETRY_DELAY);
                }
            }
        }
        
        return false;
    }

    async uploadToDB(route: any) {
        console.log(`Uploading route to database: ${route}`);
        
        try {
            // Use upsert to handle unique constraint - create if doesn't exist, update if it does
            const route_data = await prisma.route.upsert({
                where: {
                    stationId: route.station_id
                },
                update: {
                    stationName: route.station_name,
                    basePrice: route.base_price,
                    governorate: route.governorate,
                    governorateAr: route.governorate_ar,
                    delegation: route.delegation,
                    delegationAr: route.delegation_ar,
                    isActive: true,
                    syncedAt: new Date(),
                    updatedAt: new Date()
                },
                create: {
                    id: `${route.station_id}-${Date.now()}`, // Generate unique ID
                    stationId: route.station_id,
                    stationName: route.station_name,
                    basePrice: route.base_price,
                    governorate: route.governorate,
                    governorateAr: route.governorate_ar,
                    delegation: route.delegation,
                    delegationAr: route.delegation_ar,
                    isActive: true,
                    syncedAt: new Date(),
                    updatedAt: new Date()
            }
        });

            console.log(`Route upserted: ${route.station_id} - ${route.station_name} (${route.governorate}, ${route.delegation})`);
        } catch (error: any) {
            console.error(`Error upserting route ${route.station_id}:`, error.message);
        }
    }

}

export const routeSyncService = new RouteSyncService(); 