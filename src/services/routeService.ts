import { prisma } from '../config/database';
import axios from 'axios';

export class RouteService {
  /**
   * Get all routes
   */
  async getAllRoutes() {
    try {
      const routes = await prisma.route.findMany({
        orderBy: {
          stationName: 'asc'
        }
      });

      return routes;
    } catch (error) {
      console.error('Error getting all routes:', error);
      throw error;
    }
  }

  /**
   * Get route by ID
   */
  async getRouteById(id: string) {
    try {
      const route = await prisma.route.findUnique({
        where: { id }
      });

      return route;
    } catch (error) {
      console.error('Error getting route by ID:', error);
      throw error;
    }
  }

  /**
   * Update route price
   */
  async updateRoutePrice(id: string, basePrice: number, supervisorStationId: string) {
    try {
      // First update the local database
      const updatedRoute = await prisma.route.update({
        where: { id },
        data: {
          basePrice,
          updatedAt: new Date()
        }
      });

      // Then sync to central server with supervisor's station ID
      await this.syncRoutePriceToCentral(updatedRoute, basePrice, supervisorStationId);

      return updatedRoute;
    } catch (error) {
      console.error('Error updating route price:', error);
      throw error;
    }
  }

  /**
   * Sync route price to central server
   */
  private async syncRoutePriceToCentral(route: any, basePrice: number, supervisorStationId: string) {
    try {
      const centralServerUrl = process.env.CENTRAL_SERVER_URL || 'http://localhost:5000';
      
      // Update the route price in central server using supervisor's station ID
      const response = await axios.put(
        `${centralServerUrl}/api/v1/routes/${supervisorStationId}/price`,
        {
          basePrice: basePrice,
          targetStationId: route.stationId // Include the target station ID for bidirectional route matching
        },
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        console.log(`✅ Route price synced to central server: ${supervisorStationId} → ${route.stationId} - ${basePrice} TND`);
      } else {
        console.warn(`⚠️ Failed to sync route price to central server: ${supervisorStationId} → ${route.stationId}`);
      }
    } catch (error: any) {
      console.error(`❌ Error syncing route price to central server: ${supervisorStationId} → ${route.stationId}`, error.message);
      
      // Don't throw error to avoid breaking the local update
      // The sync can be retried later if needed
    }
  }

  /**
   * Get routes by station ID
   */
  async getRoutesByStation(stationId: string) {
    try {
      const routes = await prisma.route.findMany({
        where: { stationId },
        orderBy: {
          stationName: 'asc'
        }
      });

      return routes;
    } catch (error) {
      console.error('Error getting routes by station:', error);
      throw error;
    }
  }

  /**
   * Get route by station ID (single route)
   */
  async getRouteByStationId(stationId: string) {
    try {
      const route = await prisma.route.findUnique({
        where: { stationId }
      });

      return route;
    } catch (error) {
      console.error('Error getting route by station ID:', error);
      throw error;
    }
  }
}

export const routeService = new RouteService(); 