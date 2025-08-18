import { ASSET_API_URL } from '@/config/environment'

// Warranty interface
export interface WarrantyData {
  warrantyTypeId: number;
  warrantyNumber: string;
  startDate: string;
  endDate: string;
  warrantyPeriod: number;
  coverageType: string;
  coverageDescription: string;
  termsConditions: string;
  cost: string;
  isActive: boolean;
  autoRenewal: boolean;
  consumerId: number;
  supplierId: number;
}

// Complete Asset Request interface
export interface CreateAssetCompleteRequest {
  assetTypeId: string;
  assetSubTypeId: string;
  assetName: string;
  installationDate?: Date | null;
  brand?: string | null;
  model?: string | null;
  isActive?: boolean;
  consumerId: string;
  departmentId?: string;
  building?: string;
  floorNumber?: string;
  roomNumber?: string;
  isCurrentLocation?: boolean;
  warranty?: WarrantyData;
}

// Complete Asset Request Array interface
export interface CreateAssetCompleteRequestArray extends Array<CreateAssetCompleteRequest> {}

// Complete Asset Response interface
export interface CreateAssetCompleteResponse {
  asset: {
    id: string;
    assetName: string;
    // ... other asset fields
  };
  location: {
    id: string;
    assetId: string;
    // ... other location fields
  };
  installation: {
    id: string;
    assetId: string;
    locationId: string;
    // ... other installation fields
  };
}

// Create a separate HTTP client for complete asset API calls
class AssetCompleteHttpClient {
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

const assetCompleteHttp = new AssetCompleteHttpClient()

class AssetCompleteService {
  async createAssetComplete(assetData: CreateAssetCompleteRequest): Promise<CreateAssetCompleteResponse> {
    // Send single asset object directly
    console.log("About to make API call to assetCompleteService.createAssetComplete");
    console.log("Asset data:", assetData);
    return assetCompleteHttp.post<CreateAssetCompleteResponse>('/asset/complete', assetData)
  }
}

export const assetCompleteService = new AssetCompleteService() 