import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

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

// Asset Types API service
class AssetTypesService {
  // Get all asset types
  async getAssetTypes(): Promise<AssetType[]> {
    try {
      const response = await httpClient.get<AssetType[]>('/asset-type')
      return response.data
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