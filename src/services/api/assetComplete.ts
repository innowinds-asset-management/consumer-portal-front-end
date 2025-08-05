import { ASSET_API_URL } from '@/config/environment'

// Complete Asset Request interface
export interface CreateAssetCompleteRequest {
  assetTypeId: string;
  assetSubTypeId: string;
  assetName: string;
  warrantyPeriod?: number | null;
  warrantyStartDate?: Date | null;
  warrantyEndDate?: Date | null;
  installationDate?: Date | null;
  brand?: string | null;
  model?: string | null;
  subModel?: string | null;
  isActive?: boolean;
  consumerId: string;
  partNo?: string | null;
  supplierCode?: string | null;
  warrantyId?: string | null;
  consumerSerialNo?: string | null;
  grnId?: string | null;
  grnItemId?: string | null;
  poLineItemId?: string | null;
  supplierId?: string | null;
  supplierSerialNo?: string | null;
  departmentId?: string;
  building?: string;
  floorNumber?: string;
  roomNumber?: string;
  isCurrentLocation?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
    // Wrap single asset in array for backend compatibility
    const assetArray = [assetData];
    return assetCompleteHttp.post<CreateAssetCompleteResponse>('/asset/complete', assetArray)
  }
}

export const assetCompleteService = new AssetCompleteService() 