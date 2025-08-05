import { ASSET_API_URL } from '@/config/environment'

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
  isActive: boolean;
}

// Create Asset Request interface
export interface CreateAssetRequest {
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
  departmentId: string;
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
  isActive: boolean;
}

// Create a separate HTTP client for asset API calls
class AssetHttpClient {
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

  async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
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

const assetHttp = new AssetHttpClient()

// Assets API service
class AssetsService {
  // Create a new asset
  async createAsset(assetData: CreateAssetRequest): Promise<Asset> {
    try {
      const response = await assetHttp.post<Asset>('/asset', assetData)
      return response
    } catch (error) {
      console.error('Error creating asset:', error)
      throw error
    }
  }

  // Get all assets
  async getAssets(): Promise<Asset[]> {
    try {
      const response = await assetHttp.get<Asset[]>('/asset')
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
}

export const assetsService = new AssetsService() 