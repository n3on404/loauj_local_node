import { prisma } from '../config/database';
import axios from 'axios';

export class RouteService {
  private static stationNameCache: Map<string, string> = new Map();
  private static cacheExpiry: Map<string, number> = new Map();
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Get station name by station ID from route table
   * Uses caching to improve performance
   */
  async getStationNameById(stationId: string): Promise<string> {
    try {
      // Check cache first
      const cached = RouteService.stationNameCache.get(stationId);
      const cacheTime = RouteService.cacheExpiry.get(stationId);
      
      if (cached && cacheTime && Date.now() < cacheTime) {
        return cached;
      }

      // Fetch from database
      const route = await prisma.route.findUnique({
        where: { stationId },
        select: { stationName: true }
      });

      if (route?.stationName) {
        // Cache the result
        RouteService.stationNameCache.set(stationId, route.stationName);
        RouteService.cacheExpiry.set(stationId, Date.now() + RouteService.CACHE_DURATION);
        return route.stationName;
      }

      // Fallback to formatted station ID if not found in routes
      const fallbackName = this.formatStationId(stationId);
      console.warn(`⚠️ Station name not found in routes for ${stationId}, using fallback: ${fallbackName}`);
      return fallbackName;

    } catch (error) {
      console.error(`❌ Error fetching station name for ${stationId}:`, error);
      return this.formatStationId(stationId);
    }
  }

  /**
   * Clear station name cache (useful when routes are updated)
   */
  static clearStationNameCache(): void {
    RouteService.stationNameCache.clear();
    RouteService.cacheExpiry.clear();
    console.log('✅ Station name cache cleared');
  }

  /**
   * Format station ID as fallback when route not found
   */
  private formatStationId(stationId: string): string {
    // Convert station-tunis to "Tunis", station-sfax to "Sfax", etc.
    return stationId
      .replace(/^station-/, '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

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