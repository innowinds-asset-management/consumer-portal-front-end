import { ASSET_API_URL } from '@/config/environment'

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

// Create Location Request interface
export interface CreateLocationRequest {
  assetId: string;
  departmentId: string;
  building: string;
  floorNumber: string;
  roomNumber: string;
  isCurrentLocation: boolean;
}

// Create a separate HTTP client for location API calls
class LocationHttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = ASSET_API_URL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private getHeaders(): Record<string, string> {
    return { ...this.defaultHeaders }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

const locationHttp = new LocationHttpClient()

class LocationService {
  async createLocation(locationData: CreateLocationRequest): Promise<Location> {
    return locationHttp.post<Location>('/location', locationData)
  }
}

export const locationService = new LocationService() 