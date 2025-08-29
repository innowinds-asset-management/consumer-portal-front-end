import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface WarrantyType {
  warrantyTypeId: number;
  typeName: string;
  description: string;
  createdAt: string;
  consumerId: string;
  supplierId: string;
}

export class WarrantyTypeService {
  async getAllWarrantyTypes(): Promise<WarrantyType[]> {
    try {
      const response = await httpClient.get<WarrantyType[]>('/warranty-type')
      return response.data
    } catch (error) {
      console.error('Error fetching all warranty types:', error)
      throw error
    }
  }

  async getWarrantyTypesByConsumerId(): Promise<WarrantyType[]> {
    try {
      const response = await httpClient.get<WarrantyType[]>('/warranty-type')
      return response.data
    } catch (error) {
      console.error('Error fetching warranty types by consumer ID:', error)
      throw error
    }
  }

  async getWarrantyTypeById(id: number): Promise<WarrantyType> {
    try {
      const response = await httpClient.get<WarrantyType>(`/warranty-type/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching warranty type by ID:', error)
      throw error
    }
  }

  async createWarrantyType(data: Omit<WarrantyType, 'warrantyTypeId' | 'createdAt'>): Promise<WarrantyType> {
    try {
      const response = await httpClient.post<WarrantyType>('/warranty-type', data)
      return response.data
    } catch (error) {
      console.error('Error creating warranty type:', error)
      throw error
    }
  }

  async updateWarrantyType(id: number, data: Partial<WarrantyType>): Promise<WarrantyType> {
    try {
      const response = await httpClient.put<WarrantyType>(`/warranty-type/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating warranty type:', error)
      throw error
    }
  }

  async deleteWarrantyType(id: number): Promise<void> {
    try {
      await httpClient.delete(`/warranty-type/${id}`)
    } catch (error) {
      console.error('Error deleting warranty type:', error)
      throw error
    }
  }
}

export const warrantyTypeService = new WarrantyTypeService()
