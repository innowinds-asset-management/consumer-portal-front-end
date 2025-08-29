import httpClient from '@/services/http'

// Asset interface
export interface AssetData {
  assetTypeId: string;
  assetSubTypeId: string;
  assetName: string;
  consumerId?: string;
  warrantyPeriod: number;
  warrantyStartDate: string;
  warrantyEndDate: string;
  installationDate: string;
  brand: string;
  model: string;
  subModel: string;
  isActive: boolean;
  partNo: string;
  supplierCode: string;
  consumerSerialNo: string;
  grnId: string;
  grnItemId: string;
  poLineItemId: string;
  supplierId: string;
  isAmc: boolean;
  supplierSerialNo: string;
  departmentId: string;
  building: string;
  floorNumber: string;
  roomNumber: string;
  isCurrentLocation: boolean;
  installStatus: string;
}

// Warranty interface
export interface WarrantyData {
  warrantyTypeId: number;
  warrantyNumber?: string;
  startDate: string;
  endDate: string;
  warrantyPeriod: number;
  coverageType: string;
  coverageDescription: string;
  termsConditions: string;
  included: string;
  excluded: string;
  cost?: string;
  isActive: boolean;
  autoRenewal: boolean;
  consumerId?: string;
  supplierId: string;
}

// Asset Warranty Request interface
export interface CreateAssetWarrantyRequest {
  asset: AssetData;
  warranty: WarrantyData;
}

// Asset Warranty Response interface
export interface CreateAssetWarrantyResponse {
  id: string;
  assetId: string;
  warrantyId: string;
  createdAt: string;
  updatedAt: string;
}

class AssetWarrantyService {
  async createAssetWarranty(assetWarrantyData: CreateAssetWarrantyRequest): Promise<CreateAssetWarrantyResponse> {
    try {
      const response = await httpClient.post<CreateAssetWarrantyResponse>('/asset/warranty', assetWarrantyData)
      return response.data
    } catch (error) {
      console.error('Error creating asset warranty:', error)
      throw error
    }
  }

  async getAssetWarrantyById(id: string): Promise<CreateAssetWarrantyResponse> {
    try {
      const response = await httpClient.get<CreateAssetWarrantyResponse>(`/asset-warranty/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching asset warranty:', error)
      throw error
    }
  }

  async updateAssetWarranty(id: string, assetWarrantyData: Partial<CreateAssetWarrantyRequest>): Promise<CreateAssetWarrantyResponse> {
    try {
      const response = await httpClient.put<CreateAssetWarrantyResponse>(`/asset-warranty/${id}`, assetWarrantyData)
      return response.data
    } catch (error) {
      console.error('Error updating asset warranty:', error)
      throw error
    }
  }

  async deleteAssetWarranty(id: string): Promise<void> {
    try {
      await httpClient.delete(`/asset-warranty/${id}`)
    } catch (error) {
      console.error('Error deleting asset warranty:', error)
      throw error
    }
  }
}

export const assetWarrantyService = new AssetWarrantyService()
