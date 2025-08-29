import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

// Contract Type interface
export interface ContractType {
  contractTypeId: number;
  typeName: string;
  typeCode: string;
  description?: string;
  contractDurationMonths?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Contract Types API service
class ContractTypesService {

  // Get all contract types
  async getContractTypes(): Promise<ContractType[]> {
    try {
      console.log('Fetching contract types...')
      const response = await httpClient.get<ContractType[]>('/contract-type')
      return response.data
    } catch (error) {
      console.error('Error fetching contract types:', error)
      throw error
    }
  }

  // Get contract type by ID
  async getContractTypeById(id: string): Promise<ContractType> {
    try {
      const response = await httpClient.get<ContractType>(`/contract-type/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching contract type:', error)
      throw error
    }
  }
}

export const contractTypesService = new ContractTypesService()
