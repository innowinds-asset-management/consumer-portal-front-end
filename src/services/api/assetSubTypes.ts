import { ASSET_API_URL } from '@/config/environment'

// Asset Sub-Type interface
export interface AssetSubType {
  id: string
  assetTypeId: string
  name: string
  code: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
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
}

const assetHttp = new AssetHttpClient()

// Asset Sub-Types API service
class AssetSubTypesService {
  // Get all asset sub-types
  async getAssetSubTypes(): Promise<AssetSubType[]> {
    try {
      const response = await assetHttp.get<AssetSubType[]>('/asset-sub-type')
      return response
    } catch (error) {
      console.error('Error fetching asset sub-types:', error)
      throw error
    }
  }

  // Get active asset sub-types only
  async getActiveAssetSubTypes(): Promise<AssetSubType[]> {
    try {
      const allAssetSubTypes = await this.getAssetSubTypes()
      return allAssetSubTypes.filter(assetSubType => assetSubType.isActive)
    } catch (error) {
      console.error('Error fetching active asset sub-types:', error)
      throw error
    }
  }

  // Get asset sub-types by asset type ID
  async getAssetSubTypesByAssetTypeId(assetTypeId: string): Promise<AssetSubType[]> {
    try {
      const allAssetSubTypes = await this.getActiveAssetSubTypes()
      return allAssetSubTypes.filter(assetSubType => assetSubType.assetTypeId === assetTypeId)
    } catch (error) {
      console.error('Error fetching asset sub-types by asset type ID:', error)
      throw error
    }
  }
}

export const assetSubTypesService = new AssetSubTypesService() 