import { ASSET_API_URL } from '@/config/environment'

export interface DepartmentInventory {
  id: string
  departmentId: string
  inventoryId: string
  quantity: number
  createdAt: string
  updatedAt: string
  department: {
    deptId: string
    deptName: string
  }
  inventory: {
    id: string
    itemName: string
    itemNo: string
    unitMeasure: string
  }
}

// Create a separate HTTP client for department inventory API calls
class DepartmentInventoryHttpClient {
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
}

const departmentInventoryHttp = new DepartmentInventoryHttpClient()

// Department Inventory API service
class DepartmentInventoryService {
  async getByDepartmentAndInventory(departmentId: string, inventoryId: string): Promise<DepartmentInventory | null> {
    try {
      const response = await departmentInventoryHttp.get<{ success: boolean; data: DepartmentInventory; message?: string }>(`/inventory/department-inventory/${departmentId}/${inventoryId}`)
      
      if (!response.success) {
        // If it's a 404 or not found error, return null instead of throwing
        if (response.message?.toLowerCase().includes('not found') || response.message?.toLowerCase().includes('404')) {
          return null;
        }
        throw new Error(response.message || 'Failed to fetch department inventory')
      }
      
      return response.data
    } catch (error: any) {
      console.error('Error fetching department inventory:', error)
      
      // Handle HTTP 404 errors gracefully
      if (error.message?.includes('404')) {
        return null;
      }
      
      throw error
    }
  }

  async getByDepartment(departmentId: string): Promise<DepartmentInventory[]> {
    try {
      const response = await departmentInventoryHttp.get<{ success: boolean; data: DepartmentInventory[]; message?: string }>(`/inventory/department-inventory/${departmentId}`)
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch department inventory list')
      }
      
      return response.data
    } catch (error) {
      console.error('Error fetching department inventory list:', error)
      throw error
    }
  }
}

export const departmentInventoryService = new DepartmentInventoryService()
