import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

// Service Request interface based on sample JSON
export interface ServiceRequest {
  serviceRequestStatus?: any;
  serviceRequestId?: string;
  assetId: string;
  technicianName: string;
  serviceSupplierId?: string;
  serviceContractId?: string;
  warrantyStatus: string;
  srStatus: string;
  srStatusCode:string
  srNo: string;
  serviceType: string | null;
  serviceDescription: string | null;
  assetCondition?: string;
  assetConditionCode?:string
  problem?: string;
  createdAt?: string;
  updatedAt?: string;
  approverName: string | null;
  closureNotes?: string;
  closureDate?: string | null;
  closureBy?: string | null;
  closureReason?: string;
  totalCost?: number | null;
  asset?: any;
  serviceSupplier?: any;
  serviceContract?: any;
  serviceRequestItems?: ServiceRequestItem[];
}

// Service Request Item interface
export interface ServiceRequestItem {
  serviceRequestItemId?: number;
  serviceRequestId?: string;
  partName: string;
  partCost: number;
  labourCost: number;
  quantity: number;
  totalCost: number;
  defectDescription: string;
  createdAt?: string;
  updatedAt?: string | null;
}

// Create Service Request Item interface
export interface CreateServiceRequestItemRequest {
  serviceRequestId: string;
  partName: string;
  partCost: number;
  labourCost: number;
  quantity: number;
  totalCost: number;
  defectDescription: string;
}

// Update Service Request Item interface
export interface UpdateServiceRequestItemRequest {
  partName?: string;
  partCost?: number;
  labourCost?: number;
  quantity?: number;
  totalCost?: number;
  defectDescription?: string;
}

// Create Service Request Request interface
export interface CreateServiceRequestRequest {
  assetId: string;
  technicianName?: string;
  serviceSupplierName?: string;
  warrantyStatus?: string;
  serviceStatus?: string | null;
  approverName?: string | null;
  serviceType?: string | null;
  serviceDescription?: string | null;
  problem?: string | null;
  assetCondition?: string | null;
  assetConditionCode?: string | null;
}

// Update Service Request interface
export interface UpdateServiceRequestRequest {
  technicianName?: string;
  srStatus?: string;
  closureNotes?: string;
  closureReason?: string;
  serviceDescription?: string;
  assetCondition?: string;
  problem?: string;
}

class ServiceRequestService {
  async createServiceRequest(data: CreateServiceRequestRequest): Promise<ServiceRequest> {
    try {
      const response = await httpClient.post<ServiceRequest>('/servicerequest', data)
      return response.data
    } catch (error) {
      console.error('Error creating service request:', error)
      throw error
    }
  }

  async getServiceRequests(params?: { status?: string; supplierId?: string; departmentId?: string }): Promise<ServiceRequest[]> {
    try {
      let endpoint = '/servicerequest'
      const queryParams = new URLSearchParams()
      
      if (params?.status) {
        queryParams.append('status', params.status)
      }
      
      if (params?.supplierId) {
        queryParams.append('sid', params.supplierId)
      }
      
      if (params?.departmentId) {
        queryParams.append('did', params.departmentId)
      }
      
      if (queryParams.toString()) {
        endpoint += `?${queryParams.toString()}`
      }
      
      const response = await httpClient.get<ServiceRequest[]>(endpoint)
      return response.data
    } catch (error) {
      console.error('Error fetching service requests:', error)
      throw error
    }
  }

  async getServiceRequestById(id: string): Promise<ServiceRequest> {
    try {
      const response = await httpClient.get<ServiceRequest>(`/servicerequest/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching service request:', error)
      throw error
    }
  }

  async getServiceRequestByAssetId(assetId: string): Promise<ServiceRequest[]> {
    try {
      const response = await httpClient.get<ServiceRequest[]>(`/servicerequest/asset/${assetId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching service request by asset ID:', error)
      throw error
    }
  }

  async updateServiceRequest(id: string, data: UpdateServiceRequestRequest): Promise<ServiceRequest> {
    try {
      const response = await httpClient.put<ServiceRequest>(`/servicerequest/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating service request:', error)
      throw error
    }
  }

  async createServiceRequestItem(data: CreateServiceRequestItemRequest): Promise<ServiceRequestItem> {
    try {
      const response = await httpClient.post<ServiceRequestItem>(`/servicerequest/${data.serviceRequestId}/item`, data)
      return response.data
    } catch (error) {
      console.error('Error creating service request item:', error)
      throw error
    }
  }

  async updateServiceRequestItem(id: number, data: UpdateServiceRequestItemRequest): Promise<ServiceRequestItem> {
    try {
      const response = await httpClient.put<ServiceRequestItem>(`/servicerequest/item/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating service request item:', error)
      throw error
    }
  }

  async deleteServiceRequestItem(id: number): Promise<void> {
    try {
      await httpClient.delete(`/servicerequest/item/${id}`)
    } catch (error) {
      console.error('Error deleting service request item:', error)
      throw error
    }
  }

  // Get service request counts by status
  async getServiceRequestCountByStatus(): Promise<{
    cancelled: number;
    closed: number;
    completed: number;
    open: number;
    inProgress: number;
    pending: number;
  }> {
    try {
      const response = await httpClient.get<{
        success: boolean;
        data: {
          cancelled: number;
          closed: number;
          completed: number;
          open: number;
          inProgress: number;
          pending: number;
        };
      }>('/servicerequest/count/status')
      return response.data.data
    } catch (error) {
      console.error('Error fetching service request counts by status:', error)
      throw error
    }
  }
}

export const serviceRequestService = new ServiceRequestService() 