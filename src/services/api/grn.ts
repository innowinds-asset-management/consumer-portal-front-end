import { ASSET_API_URL } from '@/config/environment'

export interface GrnItem {
  id?: string
  grnId?: string
  poLineItemId: string
  quantityOrdered: number
  quantityReceived?: number
  quantityAccepted: number
  quantityRejected: number
  quantityRemaining?: number
  remarks?: string | null
  poLineItem?: {
    id?: string
    itemName?: string
    partNo?: string
  }
}

export interface Grn {
  id?: string
  grnNo?: string
  poId: string
  challan?: string | null
  deliveryNote?: string | null
  deliveryDate?: string | null
  vehicleNumber?: string | null
  driverName?: string | null
  receivedBy?: string | null
  createdAt?: string
  updatedAt?: string
  grnItem?: GrnItem[]
  po?: {
    status?: string
    totalAmount?: string
  }
}

class GrnHttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = ASSET_API_URL
    this.defaultHeaders = { 'Content-Type': 'application/json' }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const res = await fetch(url, { headers: this.defaultHeaders, ...options })
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    return res.json()
  }

  get<T>(endpoint: string) { return this.request<T>(endpoint, { method: 'GET' }) }
  post<T>(endpoint: string, body: any) { return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }) }
}

class GrnService {
  private http = new GrnHttpClient()

  createGrn(payload: Grn) { return this.http.post<Grn>('/grn', payload) }
  getGrnsByPoId(poId: string) { return this.http.get<Grn[]>(`/grn/po/${poId}`) }
  getGrns() { return this.http.get<Grn[]>('/grn') }
  getGrnById(id: string) { return this.http.get<Grn>(`/grn/${id}`) }
}

export const grnService = new GrnService()
