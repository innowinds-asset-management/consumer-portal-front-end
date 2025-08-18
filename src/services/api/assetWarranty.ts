import { ASSET_API_URL } from '@/config/environment'

// Asset interface
export interface AssetData {
  assetTypeId: string;
  assetSubTypeId: string;
  assetName: string;
  consumerId: string;
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
  consumerId: string;
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

// Create a separate HTTP client for asset warranty API calls
class AssetWarrantyHttpClient {
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

  async post<T>(endpoint: string, data: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    console.log('Making POST request to:', url)
    console.log('Request data:', data)
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error text:', errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const result = await response.json()
      console.log('Response data:', result)
      return result
    } catch (error) {
      console.error('Fetch error details:', error)
      throw error
    }
  }
}

const assetWarrantyHttp = new AssetWarrantyHttpClient()

class AssetWarrantyService {
  async createAssetWarranty(assetWarrantyData: CreateAssetWarrantyRequest): Promise<CreateAssetWarrantyResponse> {
    console.log("About to make API call to assetWarrantyService.createAssetWarranty");
    console.log("Asset Warranty data:", assetWarrantyData);
    return assetWarrantyHttp.post<CreateAssetWarrantyResponse>('/asset/warranty', assetWarrantyData)
  }
}

export const assetWarrantyService = new AssetWarrantyService()
