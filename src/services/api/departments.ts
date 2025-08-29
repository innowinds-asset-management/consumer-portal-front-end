import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface Department {
  deptId: string
  deptName: string
  consumerId: string
  createdAt: string
  updatedAt: string
  assetCount?: number
  openServiceRequestCount?: number
  assets?: any[]
  serviceRequests?: any[]
}

export interface DepartmentSearchResult {
  deptId: string
  deptName: string
}

class DepartmentService {
  async getDepartments(): Promise<Department[]> {
    try {
      const response = await httpClient.get<Department[]>('/department')
      return response.data
    } catch (error) {
      console.error('Error fetching departments:', error)
      throw error
    }
  }

  async getDepartmentById(id: string): Promise<Department> {
    try {
      const response = await httpClient.get<Department>(`/department/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching department:', error)
      throw error
    }
  }

  async createDepartment(departmentData: { deptName: string }): Promise<Department> {
    try {
      const response = await httpClient.post<Department>('/department', departmentData)
      return response.data
    } catch (error) {
      console.error('Error creating department:', error)
      throw error
    }
  }

  async updateDepartment(id: string, departmentData: Partial<Department>): Promise<Department> {
    try {
      const response = await httpClient.put<Department>(`/department/${id}`, departmentData)
      return response.data
    } catch (error) {
      console.error('Error updating department:', error)
      throw error
    }
  }

  async deleteDepartment(id: string): Promise<void> {
    try {
      await httpClient.delete(`/department/${id}`)
    } catch (error) {
      console.error('Error deleting department:', error)
      throw error
    }
  }

  async searchDepartments(searchTerm: string): Promise<DepartmentSearchResult[]> {
    try {
      const response = await httpClient.get<DepartmentSearchResult[]>(`/department/search?search=${encodeURIComponent(searchTerm)}`)
      return response.data
    } catch (error) {
      console.error('Error searching departments:', error)
      throw error
    }
  }

  async getDepartmentCountByConsumerId(): Promise<number> {
    try {
      const response = await httpClient.get<{
        success: boolean;
        data: {
          departmentCount: number;
        };
      }>('/department/count')
      return response.data.data.departmentCount
    } catch (error) {
      console.error('Error fetching department count:', error)
      throw error
    }
  }

  async getDepartmentsByConsumerId(): Promise<Department[]> {
    try {
      const response = await httpClient.get<Department[]>('/department/consumer')
      return response.data
    } catch (error) {
      console.error('Error fetching departments by consumer ID:', error)
      throw error
    }
  }
}

export const departmentService = new DepartmentService() 