import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'
import { ApiResponse } from './ApiResponse'

// Warranty interface
export interface Warranty {
  warrantyId: number;
  assetId: string;
  warrantyTypeId: number;
  warrantySupplierId: string | null;
  warrantyNumber: string;
  startDate: string;
  endDate: string;
  warrantyPeriod: number | null;
  coverageType: string | null;
  coverageDescription: string | null;
  termsConditions: string | null;
  cost: string | null;
  isActive: boolean;
  autoRenewal: boolean;
  createdAt: string;
  updatedAt: string;
  consumerId: string;
  supplierId: string | null;
  excluded: string | null;
  included: string | null;
  warrantyType: {
    warrantyTypeId: number;
    typeName: string;
    description: string;
    createdAt: string;
    consumerId: string;
    supplierId: string;
  };
  asset: {
    id: string;
    assetTypeId: string;
    assetSubTypeId: string;
    assetName: string;
    warrantyPeriod: number | null;
    warrantyStartDate: string | null;
    warrantyEndDate: string | null;
    installationDate: string | null;
    brand: string | null;
    model: string | null;
    subModel: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    consumerId: string;
    partNo: string;
    supplierCode: string | null;
    isAmc: boolean;
    consumerSerialNo: string;
    departmentId: string | null;
    grnId: string | null;
    grnItemId: string | null;
    poLineItemId: string | null;
    supplierId: string | null;
    supplierSerialNo: string | null;
    assetConditionCode: string | null;
    ageDays: number;
    draft: boolean;
    status: string | null;
    assetAssignTo: string | null;
  };
  notifications: any[];
}



class WarrantyService {
  // Get all warranties
  async getWarranties(): Promise<ApiResponse<Warranty[]>> {
    try {
      const response = await httpClient.get<ApiResponse<Warranty[]>>('/warranty');
      if (response.data.success === 1) {
        return response.data;
      } else {
        // You can throw an error with the message from the API, or a default message
        throw new Error(response.data.msg || 'Failed to fetch warranties');
      }
    } catch (error) {
      console.error('Error fetching warranties:', error)
      throw error
    }
  }

  async getWarrantiesByAssetId(assetId: string): Promise<Warranty[]> {
    try {
      const response = await httpClient.get<Warranty[]>(`/warranty/asset/${assetId}`)
      return response.data
      //const response = await httpClient.get<WarrantyApiResponse>(`/warranty/asset/${assetId}`)
      //return response.data.payload
    } catch (error) {
      console.error('Error fetching warranties by asset ID:', error)
      throw error
    }
  }
}

export const warrantyService = new WarrantyService() 