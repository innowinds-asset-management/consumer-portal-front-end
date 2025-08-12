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
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  departmentId?: string | null;
  assetType?: AssetType;
  assetSubType?: AssetSubType;
  locations?: Location[];
  installations?: Installation[];
  department?: any;
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
}

export const assetsService = new AssetsService() 