import { http } from '../http'
import { ASSET_API_URL } from '@/config/environment'

// Asset Type interface
export interface AssetType {
  id: string
  assetName: string
  code: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  industryId: string
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

// Asset Types API service
class AssetTypesService {
  // Get all asset types
  async getAssetTypes(): Promise<AssetType[]> {
    try {
      const response = await assetHttp.get<AssetType[]>('/asset-type')
      return response
    } catch (error) {
      console.error('Error fetching asset types:', error)
      throw error
    }
  }

  // Get active asset types only
  async getActiveAssetTypes(): Promise<AssetType[]> {
    try {
      const allAssetTypes = await this.getAssetTypes()
      return allAssetTypes.filter(assetType => assetType.isActive)
    } catch (error) {
      console.error('Error fetching active asset types:', error)
      throw error
    }
  }
}

export const assetTypesService = new AssetTypesService() 