import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface UnitMeasure {
  value: string;
  label: string;
}

class UnitMeasureService {
  async getAllUnitMeasures(): Promise<UnitMeasure[]> {
    try {
      const response = await httpClient.get<UnitMeasure[]>(`/inventory/unit-measures`)
      return response.data
    } catch (error) {
      console.error('Error fetching unit measures:', error)
      throw error
    }
  }
}

export const unitMeasureService = new UnitMeasureService()
