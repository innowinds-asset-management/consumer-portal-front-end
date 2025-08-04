import { API_CONFIG, ERROR_MESSAGES } from '@/utils/constants'
import { ApiError, ApiResponse } from '@/types/admin'

// Custom error class for API errors
export class HttpError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string = 'HTTP_ERROR'
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

// HTTP client configuration
interface RequestConfig extends RequestInit {
  timeout?: number
  retries?: number
}

// HTTP client class
class HttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>
  private defaultTimeout: number
  private defaultRetries: number

  constructor() {
    this.baseURL = API_CONFIG.baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
    this.defaultTimeout = API_CONFIG.timeout
    this.defaultRetries = API_CONFIG.retries
  }

  // Get auth token from localStorage
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  // Add auth header if token exists
  private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const token = this.getAuthToken()
    const headers = { ...this.defaultHeaders, ...customHeaders }
    
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    
    return headers
  }

  // Create timeout promise
  private createTimeoutPromise(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new HttpError('Request timeout', 408, 'TIMEOUT'))
      }, timeout)
    })
  }

  // Handle response
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage: string = ERROR_MESSAGES.unknownError
      let errorCode = 'HTTP_ERROR'

      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
        errorCode = errorData.code || errorCode
      } catch {
        // If error response is not JSON, use status text
        errorMessage = response.statusText || errorMessage
      }

      // Handle specific status codes
      switch (response.status) {
        case 401:
          errorMessage = ERROR_MESSAGES.unauthorized
          errorCode = 'UNAUTHORIZED'
          // Optionally redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            window.location.href = '/login'
          }
          break
        case 403:
          errorMessage = ERROR_MESSAGES.forbidden
          errorCode = 'FORBIDDEN'
          break
        case 404:
          errorMessage = ERROR_MESSAGES.notFound
          errorCode = 'NOT_FOUND'
          break
        case 429:
          errorMessage = ERROR_MESSAGES.rateLimited
          errorCode = 'RATE_LIMITED'
          break
        case 500:
          errorMessage = ERROR_MESSAGES.serverError
          errorCode = 'SERVER_ERROR'
          break
      }

      throw new HttpError(errorMessage, response.status, errorCode)
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    }

    return response.text() as T
  }

  // Main request method with retry logic
  private async request<T>(
    endpoint: string,
    options: RequestConfig = {}
  ): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      ...fetchOptions
    } = options

    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      headers: this.getHeaders(options.headers as Record<string, string>),
      ...fetchOptions,
    }

    let lastError: HttpError

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Create race between fetch and timeout
        const response = await Promise.race([
          fetch(url, config),
          this.createTimeoutPromise(timeout)
        ]) as Response

        return await this.handleResponse<T>(response)
      } catch (error) {
        lastError = error instanceof HttpError ? error : new HttpError(
          error instanceof Error ? error.message : ERROR_MESSAGES.networkError,
          0,
          'NETWORK_ERROR'
        )

        // Don't retry on client errors (4xx)
        if (lastError.statusCode >= 400 && lastError.statusCode < 500) {
          break
        }

        // Don't retry on last attempt
        if (attempt === retries) {
          break
        }

        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt) * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError!
  }

  // HTTP methods
  async get<T>(endpoint: string, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', ...options })
  }

  async post<T>(endpoint: string, data?: any, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  async put<T>(endpoint: string, data?: any, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  async patch<T>(endpoint: string, data?: any, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  async delete<T>(endpoint: string, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options })
  }

  // File upload
  async upload<T>(endpoint: string, file: File, options?: RequestConfig): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const headers = { ...this.getHeaders() }
    delete headers['Content-Type'] // Remove Content-Type for FormData

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers,
      ...options,
    })
  }

  // Download file
  async download(endpoint: string, filename?: string): Promise<void> {
    const headers = { ...this.getHeaders() }
    delete headers['Content-Type'] // Remove Content-Type for file download

    const response = await this.request<Blob>(endpoint, {
      headers,
    })

    const url = window.URL.createObjectURL(response)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

// Create and export HTTP client instance
export const http = new HttpClient()

// Utility functions for common API patterns
export const apiUtils = {
  // Handle API responses with proper typing
  async handleApiResponse<T>(response: any): Promise<T> {
    if (response.success === false) {
      throw new HttpError(
        response.message || ERROR_MESSAGES.unknownError,
        response.statusCode || 500,
        response.code || 'API_ERROR'
      )
    }
    return response.data || response
  },

  // Create query string from object
  createQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, String(item)))
        } else {
          searchParams.append(key, String(value))
        }
      }
    })
    
    return searchParams.toString()
  },

  // Add query parameters to URL
  addQueryParams(url: string, params: Record<string, any>): string {
    const queryString = this.createQueryString(params)
    return queryString ? `${url}?${queryString}` : url
  },
} 