import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

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

class AssetCompleteService {
  async createAssetComplete(assetData: CreateAssetCompleteRequest): Promise<CreateAssetCompleteResponse> {
    try {
      const response = await httpClient.post<CreateAssetCompleteResponse>('/asset/complete', assetData)
      return response.data
    } catch (error) {
      console.error('Error creating complete asset:', error)
      throw error
    }
  }

  async createAssetCompleteArray(assetDataArray: CreateAssetCompleteRequestArray): Promise<CreateAssetCompleteResponse[]> {
    try {
      const response = await httpClient.post<CreateAssetCompleteResponse[]>('/asset/complete/array', assetDataArray)
      return response.data
    } catch (error) {
      console.error('Error creating complete asset array:', error)
      throw error
    }
  }
}

export const assetCompleteService = new AssetCompleteService() 