import { ASSET_API_URL } from '@/config/environment'

export interface Department {
  deptId: string
  deptName: string
  description?: string
  consumerId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  assetCount?: number
  openServiceRequestCount?: number
  assets?: any[]
  serviceRequests?: any[]
}

// Create a separate HTTP client for department API calls
class DepartmentHttpClient {
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

  async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
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

  async put<T>(endpoint: string, data: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    console.log('Making PUT request to:', url)
    console.log('Request data:', data)
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
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

  async delete<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    console.log('Making DELETE request to:', url)
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getHeaders(),
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

const departmentHttp = new DepartmentHttpClient()

// Department API service
class DepartmentService {
  async getDepartmentsByConsumerId(consumerId: string): Promise<Department[]> {
    try {
      const response = await departmentHttp.get<Department[]>(`/department/consumer/${consumerId}`)
      return response
    } catch (error) {
      console.error('Error fetching departments:', error)
      throw error
    }
  }

  async getAllDepartments(): Promise<Department[]> {
    try {
      const response = await departmentHttp.get<Department[]>('/department')
      return response
    } catch (error) {
      console.error('Error fetching all departments:', error)
      throw error
    }
  }

  async getDepartmentById(deptId: string): Promise<Department> {
    try {
      const response = await departmentHttp.get<Department>(`/department/${deptId}`)
      return response
    } catch (error) {
      console.error('Error fetching department:', error)
      throw error
    }
  }

  async createDepartment(department: Partial<Department>): Promise<Department> {
    try {
      const response = await departmentHttp.post<Department>('/department', department)
      return response
    } catch (error) {
      console.error('Error creating department:', error)
      throw error
    }
  }

  async updateDepartment(deptId: string, department: Partial<Department>): Promise<Department> {
    try {
      const response = await departmentHttp.put<Department>(`/department/${deptId}`, department)
      return response
    } catch (error) {
      console.error('Error updating department:', error)
      throw error
    }
  }

  async deleteDepartment(deptId: string): Promise<void> {
    try {
      await departmentHttp.delete(`/department/${deptId}`)
    } catch (error) {
      console.error('Error deleting department:', error)
      throw error
    }
  }

  // Get department count by consumer ID
  async getDepartmentCountByConsumerId(consumerId: string): Promise<number> {
    try {
      const response = await departmentHttp.get<{
        success: boolean;
        data: {
          departmentCount: number;
        };
      }>(`/department/count/${consumerId}`)
      return response.data.departmentCount
    } catch (error) {
      console.error('Error fetching department count:', error)
      throw error
    }
  }
}

export const departmentService = new DepartmentService() 