import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

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

// Department Inventory API service
class DepartmentInventoryService {
  async getByDepartmentAndInventory(departmentId: string, inventoryId: string): Promise<DepartmentInventory | null> {
    try {
      const response = await httpClient.get<{ success: boolean; data: DepartmentInventory; message?: string }>(`/inventory/department-inventory/${departmentId}/${inventoryId}`)
      
      if (!response.data.success) {
        // If it's a 404 or not found error, return null instead of throwing
        if (response.data.message?.toLowerCase().includes('not found') || response.data.message?.toLowerCase().includes('404')) {
          return null;
        }
        throw new Error(response.data.message || 'Failed to fetch department inventory')
      }
      
      return response.data.data
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
      const response = await httpClient.get<{ success: boolean; data: DepartmentInventory[]; message?: string }>(`/inventory/department-inventory/${departmentId}`)
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch department inventory list')
      }
      
      return response.data.data
    } catch (error) {
      console.error('Error fetching department inventory list:', error)
      throw error
    }
  }
}

export const departmentInventoryService = new DepartmentInventoryService()
