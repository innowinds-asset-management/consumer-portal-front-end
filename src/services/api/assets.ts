import { ASSET_API_URL } from '@/config/environment'
import { AssetType } from './assetTypes'
import { AssetSubType } from './assetSubTypes'

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
  createdAt?: string;
  updatedAt?: string;
  departmentId?: string | null;
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



// Create a separate HTTP client for asset API calls
class AssetHttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = ASSET_API_URL
    this.defaultHeaders = { 'Content-Type': 'application/json' }
    console.log('AssetHttpClient initialized with baseURL:', this.baseURL)
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    try {
      console.log(`Making request to: ${url}`)
      
      // Add timeout to fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const res = await fetch(url, { 
        headers: this.defaultHeaders, 
        ...options,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!res.ok) {
        const errorText = await res.text()
        console.error(`HTTP error ${res.status} for ${url}:`, errorText)
        throw new Error(`HTTP error ${res.status}: ${errorText}`)
      }
      
      const data = await res.json()
      console.log(`Response from ${url}:`, data)
      return data
    } catch (error) {
      console.error(`Request failed for ${url}:`, error)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - server not responding')
      }
      throw error
    }
  }

  get<T>(endpoint: string) { return this.request<T>(endpoint, { method: 'GET' }) }
  post<T>(endpoint: string, body: any) { return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }) }
  put<T>(endpoint: string, body: any) { return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }) }
}

const assetHttp = new AssetHttpClient()

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
      
      const response = await assetHttp.get<Asset[]>(endpoint)
      return response
    } catch (error) {
      console.error('Error fetching assets:', error)
      throw error
    }
  }

  // Get asset by ID
  async getAssetById(id: string): Promise<Asset> {
    try {
      const response = await assetHttp.get<Asset>(`/asset/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching asset:', error)
      throw error
    }
  }

  // Create asset from GRN PO line item
  async createAssetFromGrnPoLineItem(assetData: any): Promise<any> {
    try {
      const response = await assetHttp.post<any>('/asset/grn-po-line-item', assetData)
      return response
    } catch (error) {
      console.error('Error creating asset from GRN PO line item:', error)
      throw error
    }
  }

  // Update asset
  async updateAsset(id: string, assetData: any): Promise<any> {
    try {
      const response = await assetHttp.put<any>(`/asset/${id}`, assetData)
      return response
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
      const response = await assetHttp.get<{
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
      return response.data
    } catch (error) {
      console.error('Error fetching asset counts by status:', error)
      throw error
    }
  }

  // Update asset and warranty
  async updateAssetWarranty(assetId: string, data: {
    consumerId: string;
    asset: {
      assetId: string;
      status?: string;
      departmentId?: string;
      consumerId: string;
    };
    warranty: {
      warrantyTypeId: number;
      startDate: string;
      endDate: string;
      warrantyPeriod: number;
      coverageType: string;
      consumerId: string;
    };
  }): Promise<any> {
    try {
      const response = await assetHttp.put<any>(`/asset/${assetId}/warranty`, data)
      return response
    } catch (error) {
      console.error('Error updating asset and warranty:', error)
      throw error
    }
  }
}

export const assetsService = new AssetsService() 