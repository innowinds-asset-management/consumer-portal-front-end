import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

// Location interface
export interface Location {
  id?: string; // Location ID returned from API
  assetId: string;
  departmentId: string;
  building: string;
  floorNumber: string;
  roomNumber: string;
  isCurrentLocation: boolean;
}


// Location interface for array of locations
export interface LocationArray {
  locations: Location[];
}

// Create Location Request interface
export interface CreateLocationRequest {
  assetId: string;
  departmentId: string;
  building: string;
  floorNumber: string;
  roomNumber: string;
  isCurrentLocation: boolean;
}

class LocationService {
  async createLocation(locationData: CreateLocationRequest): Promise<Location> {
    try {
      const response = await httpClient.post<Location>('/location', locationData)
      return response.data
    } catch (error) {
      console.error('Error creating location:', error)
      throw error
    }
  }
}

export const locationService = new LocationService() 