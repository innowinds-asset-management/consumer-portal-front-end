import { API_URL } from '@/config/environment'
import { AssetType } from './assetTypes'
import { AssetSubType } from './assetSubTypes'
import httpClient from '@/services/http'

// Asset interface
export interface Asset {
  id: string;
  assetTypeId: string;
  assetSubTypeId: string;
  assetName: string;
  consumerId: string;
  partNo: string;
  supplierId: string;
  supplierSerialNo: string;
  consumerSerialNo: string;
  poLineItemId: string;
  warrantyPeriod: number;
  warrantyStartDate: string;
  warrantyEndDate: string;
  warrantyId: string;
  installationDate: string;
  brand: string;
  grnId: string;
  grnItemId: string;
  model: string;
  subModel: string;
  supplierCode: string;
  supplierName: string;
  isActive: boolean;
  isAmc?: boolean;
  lastServiceDate?: string;
  assetCondition?: string | {
    code: string;
    name: string;
    displayName: string;
  };
  status?: string;
  assetAssignTo?: string | null;
  createdAt?: string;
  updatedAt?: string;
  departmentId?: string | null;
  building?: string;
  floorNumber?: string;
  roomNumber?: string;
  assetType?: AssetType;
  assetSubType?: AssetSubType;
  locations?: Location[];
  installations?: Installation[];
  serviceRequests?: ServiceRequest[];
  department?: any;
  supplier?: {
    id: string;
    name: string;
    code: string;
    gstNumber: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    primaryContactName?: string | null;
    primaryContactEmail?: string | null;
    primaryContactPhone?: string | null;
  };
  assetStatus?: {
    statusCode: string;
    displayName: string;
  };
}

// Location interface
export interface Location {
  id: string;
  assetId: string;
  departmentId: string;
  building: string;
  floorNumber: string;
  roomNumber: string;
  isCurrentLocation: boolean;
  createdAt: string;
  updatedAt: string;
}

// Installation interface
export interface Installation {
  id: string;
  assetId: string;
  locationId: string;
  departmentId: string;
  installationDate: string;
  createdAt: string;
  updatedAt: string;
}

// ServiceRequest interface
export interface ServiceRequest {
  serviceRequestId: string;
  assetId: string;
  technicianName: string;
  serviceSupplierId: string;
  serviceContractId: string | null;
  srNo: string;
  serviceType: string | null;
  serviceDescription: string | null;
  problem: string;
  createdAt: string;
  updatedAt: string;
  approverName: string | null;
  closureNotes: string | null;
  closureDate: string | null;
  closureBy: string | null;
  closureReason: string | null;
  totalCost: string | null;
  warrantyId: number;
  srStatusCode: string;
  assetConditionCode: string;
}

// Assets API service
class AssetsService {

  // Get all assets with optional query parameters
  async getAssets(params?: { consumerId?: string; supplierId?: string; departmentId?: string; groupstatus?: string }): Promise<Asset[]> {
    try {
      let endpoint = '/asset'
      const queryParams = new URLSearchParams()
      
      if (params?.consumerId) {
        queryParams.append('consumerId', params.consumerId)
      }
      if (params?.supplierId) {
        queryParams.append('supplierId', params.supplierId)
      }
      if (params?.departmentId) {
        queryParams.append('departmentId', params.departmentId)
      }
      if (params?.groupstatus) {
        queryParams.append('groupstatus', params.groupstatus)
      }
      if (queryParams.toString()) {
        endpoint += `?${queryParams.toString()}`
      }
      
      const response = await httpClient.get<Asset[]>(endpoint)
      return response.data
    } catch (error) {
      console.error('Error fetching assets:', error)
      throw error
    }
  }

  // Get asset by ID
  async getAssetById(id: string): Promise<Asset> {
    try {
      const response = await httpClient.get<Asset>(`/asset/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching asset:', error)
      throw error
    }
  }

  // Create asset from GRN PO line item
  async createAssetFromGrnPoLineItem(assetData: any): Promise<any> {
    try {
      const response = await httpClient.post<any>('/asset/grn-po-line-item', assetData)
      return response.data
    } catch (error) {
      console.error('Error creating asset from GRN PO line item:', error)
      throw error
    }
  }

  // Update asset
  async updateAsset(id: string, assetData: any): Promise<any> {
    try {
      const response = await httpClient.put<any>(`/asset/${id}`, assetData)
      return response.data
    } catch (error) {
      console.error('Error updating asset:', error)
      throw error
    }
  }

  // Get asset counts by status
  async getAssetCountByStatus(): Promise<{
    active: number;
    retired: number;
    preActive: number;
    totalWithStatus: number;
    totalWithoutStatus: number;
    grandTotal: number;
  }> {
    try {
      const response = await httpClient.get<{
        success: boolean;
        data: {
          active: number;
          retired: number;
          preActive: number;
          totalWithStatus: number;
          totalWithoutStatus: number;
          grandTotal: number;
        };
      }>('/asset/count/status')
      return response.data.data
    } catch (error) {
      console.error('Error fetching asset counts by status:', error)
      throw error
    }
  }

  // Update asset and warranty
  async updateAssetWarranty(assetId: string, data: {
    // consumerId: string;
    asset: {
      assetId: string;
      status?: string;
      departmentId?: string;
      // consumerId: string;
      assetAssignTo?: string | null;
    };
    warranty: {
      warrantyTypeId: number;
      startDate: string;
      endDate: string;
      warrantyPeriod: number;
      coverageType: string;
      // consumerId: string;
    };
  }): Promise<any> {
    try {
      const response = await httpClient.put<any>(`/asset/${assetId}/warranty`, data)
      return response.data
    } catch (error) {
      console.error('Error updating asset and warranty:', error)
      throw error
    }
  }
}

export const assetsService = new AssetsService() 