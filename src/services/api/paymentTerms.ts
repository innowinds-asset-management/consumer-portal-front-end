import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

// Payment Terms interface
export interface PaymentTerms {
  paymentCode: string;
  displayName: string;
}

// Payment Terms API service
class PaymentTermsService {
  private baseURL = `${API_URL}/payment-term`;

  // Get all payment terms
  async getPaymentTerms(): Promise<PaymentTerms[]> {
    try {
      console.log('Fetching payment terms...')
      const response = await httpClient.get<PaymentTerms[]>(this.baseURL)
      return response.data
    } catch (error) {
      console.error('Error fetching payment terms:', error)
      throw error
    }
  }
}

export const paymentTermsService = new PaymentTermsService()
