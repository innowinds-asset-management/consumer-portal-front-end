import { ASSET_API_URL } from '@/config/environment'

// Department interface
export interface Department {
  deptId: string;
  deptName: string;
  consumerId: string;
  createdAt: string;
  updatedAt: string;
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
}

const departmentHttp = new DepartmentHttpClient()

class DepartmentService {
  async getDepartmentsByConsumerId(consumerId: string): Promise<Department[]> {
    return departmentHttp.get<Department[]>(`/department/consumer/${consumerId}`)
  }
}

export const departmentService = new DepartmentService() 