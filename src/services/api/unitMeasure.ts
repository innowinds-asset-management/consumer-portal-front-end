import { ASSET_API_URL } from '@/config/environment'

export interface UnitMeasure {
  value: string;
  label: string;
}

class UnitMeasureHttpClient {
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

const unitMeasureHttp = new UnitMeasureHttpClient()

class UnitMeasureService {
  async getAllUnitMeasures(): Promise<UnitMeasure[]> {
    try {
      const response = await unitMeasureHttp.get<UnitMeasure[]>(`/inventory/unit-measures`)
      return response
    } catch (error) {
      console.error('Error fetching unit measures:', error)
      throw error
    }
  }
}

export const unitMeasureService = new UnitMeasureService()
