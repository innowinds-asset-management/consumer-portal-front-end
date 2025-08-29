import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface GrnItem {
  id?: string
  grnId?: string
  poLineItemId: string
  quantityOrdered: number
  quantityReceived?: number
  quantityAccepted: number
  quantityRejected: number
  quantityRemaining?: number
  remarks?: string | null
  poLineItem?: {
    id?: string
    itemName?: string
    partNo?: string
  }
}

export interface Grn {
  id?: string
  grnNo?: string
  poId: string
  challan?: string | null
  deliveryNote?: string | null
  deliveryDate?: string | null
  vehicleNumber?: string | null
  driverName?: string | null
  receivedBy?: string | null
  createdAt?: string
  updatedAt?: string
  grnItem?: GrnItem[]
  po?: {
    status?: string
    totalAmount?: string
    supplier?: {
      id: string;
      name: string;
      code: string;      
    };
  }
}

class GrnService {
  async createGrn(payload: Grn): Promise<Grn> {
    try {
      const response = await httpClient.post<Grn>('/grn', payload)
      return response.data
    } catch (error) {
      console.error('Error creating GRN:', error)
      throw error
    }
  }

  async getGrnsByPoId(poId: string): Promise<Grn[]> {
    try {
      const response = await httpClient.get<Grn[]>(`/grn/po/${poId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching GRNs by PO ID:', error)
      throw error
    }
  }

  async getGrns(): Promise<Grn[]> {
    try {
      const response = await httpClient.get<Grn[]>('/grn')
      return response.data
    } catch (error) {
      console.error('Error fetching GRNs:', error)
      throw error
    }
  }

  async getGrnById(id: string): Promise<Grn> {
    try {
      const response = await httpClient.get<Grn>(`/grn/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching GRN by ID:', error)
      throw error
    }
  }
}

export const grnService = new GrnService()
