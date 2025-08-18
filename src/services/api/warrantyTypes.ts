import { http } from '../http';
import { WARRANTY_API_URL } from '@/config/environment';

export interface WarrantyType {
  warrantyTypeId: number;
  typeName: string;
  description: string;
  createdAt: string;
  consumerId: string;
  supplierId: string;
}

class WarrantyTypeHttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = WARRANTY_API_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private getHeaders(): Record<string, string> {
    return { ...this.defaultHeaders };
  }

  async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async delete(endpoint: string): Promise<void> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  async getAllWarrantyTypes(): Promise<WarrantyType[]> {
    return await this.get<WarrantyType[]>('/warranty-type');
  }

  async getWarrantyTypesByConsumerId(consumerId: string): Promise<WarrantyType[]> {
    return await this.get<WarrantyType[]>(`/warranty-type/consumer/${consumerId}`);
  }

  async getWarrantyTypeById(id: number): Promise<WarrantyType> {
    return await this.get<WarrantyType>(`/warranty-type/${id}`);
  }

  async createWarrantyType(data: Omit<WarrantyType, 'warrantyTypeId' | 'createdAt'>): Promise<WarrantyType> {
    return await this.post<WarrantyType>('/warranty-type', data);
  }

  async updateWarrantyType(id: number, data: Partial<WarrantyType>): Promise<WarrantyType> {
    return await this.put<WarrantyType>(`/warranty-type/${id}`, data);
  }

  async deleteWarrantyType(id: number): Promise<void> {
    return await this.delete(`/warranty-type/${id}`);
  }
}

export const warrantyTypeHttpClient = new WarrantyTypeHttpClient();

export class WarrantyTypeService {
  async getAllWarrantyTypes(): Promise<WarrantyType[]> {
    return await warrantyTypeHttpClient.getAllWarrantyTypes();
  }

  async getWarrantyTypesByConsumerId(consumerId: string): Promise<WarrantyType[]> {
    return await warrantyTypeHttpClient.getWarrantyTypesByConsumerId(consumerId);
  }

  async getWarrantyTypeById(id: number): Promise<WarrantyType> {
    return await warrantyTypeHttpClient.getWarrantyTypeById(id);
  }

  async createWarrantyType(data: Omit<WarrantyType, 'warrantyTypeId' | 'createdAt'>): Promise<WarrantyType> {
    return await warrantyTypeHttpClient.createWarrantyType(data);
  }

  async updateWarrantyType(id: number, data: Partial<WarrantyType>): Promise<WarrantyType> {
    return await warrantyTypeHttpClient.updateWarrantyType(id, data);
  }

  async deleteWarrantyType(id: number): Promise<void> {
    return await warrantyTypeHttpClient.deleteWarrantyType(id);
  }
}

export const warrantyTypeService = new WarrantyTypeService();
