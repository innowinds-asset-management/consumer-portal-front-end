import { ASSET_API_URL } from '@/config/environment'

// Asset Status interface
export interface AssetStatus {
  statusCode: string;
  displayName: string;
  group: string;
}

// Create a separate HTTP client for asset status API calls
class AssetStatusHttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = ASSET_API_URL
    this.defaultHeaders = { 'Content-Type': 'application/json' }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const res = await fetch(url, { headers: this.defaultHeaders, ...options })
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    return res.json()
  }

  get<T>(endpoint: string) { return this.request<T>(endpoint, { method: 'GET' }) }
}

const assetStatusHttp = new AssetStatusHttpClient()

// Asset Status API service
class AssetStatusService {
  // Get all asset statuses
  async getAssetStatuses(): Promise<{ success: boolean; data: AssetStatus[]; error?: string }> {
    try {
      const response = await assetStatusHttp.get<{ success: boolean; data: AssetStatus[]; error?: string }>('/asset-status')
      return response
    } catch (error) {
      console.error('Error fetching asset statuses:', error)
      throw error
    }
  }
}

export const assetStatusService = new AssetStatusService()
