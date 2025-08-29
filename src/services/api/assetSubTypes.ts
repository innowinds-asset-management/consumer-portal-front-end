import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

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

// Asset Sub-Types API service
class AssetSubTypesService {
  // Get all asset sub-types
  async getAssetSubTypes(): Promise<AssetSubType[]> {
    try {
      const response = await httpClient.get<AssetSubType[]>('/asset-sub-type')
      return response.data
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
  // async getAssetSubTypesByAssetTypeId(assetTypeId: string): Promise<AssetSubType[]> {
  //   try {
  //     const allAssetSubTypes = await this.getActiveAssetSubTypes()
  //     return allAssetSubTypes.filter(assetSubType => assetSubType.assetTypeId === assetTypeId)
  //   } catch (error) {
  //     console.error('Error fetching asset sub-types by asset type ID:', error)
  //     throw error
  //   }
  // }

  // Get asset sub-types by asset type ID
  async getAssetSubTypesByAssetTypeId(assetTypeId: string): Promise<AssetSubType[]> {
    try {
      const response = await httpClient.get<AssetSubType[]>(`/asset-sub-type/by-asset-type/${assetTypeId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching asset sub-types by asset type ID:', error)
      throw error
    }
  }
}

export const assetSubTypesService = new AssetSubTypesService() 