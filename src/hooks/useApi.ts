import { useState, useEffect, useCallback, useRef } from 'react'
import { ApiError } from '@/types/admin'

// API state interface
interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
  isSuccess: boolean
  isError: boolean
}

// API actions interface
interface ApiActions<T> {
  refetch: () => Promise<void>
  reset: () => void
  setData: (data: T) => void
  setError: (error: string) => void
}

// Hook options
interface UseApiOptions<T> {
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: any
  headers?: Record<string, string>
  immediate?: boolean
  cacheTime?: number
  retryCount?: number
  retryDelay?: number
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
  onFinally?: () => void
}

// Cache interface
interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
}

// Cache storage
const cache = new Map<string, CacheEntry<any>>()

// Custom API hook
export function useApi<T = any>(
  options: UseApiOptions<T> = {}
): ApiState<T> & ApiActions<T> {
  const {
    url,
    method = 'GET',
    body,
    headers = {},
    immediate = true,
    cacheTime = 5 * 60 * 1000, // 5 minutes
    retryCount = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
    onFinally,
  } = options

  // State
  const [data, setDataState] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setErrorState] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  // Refs
  const abortControllerRef = useRef<AbortController | null>(null)
  const retryCountRef = useRef(0)

  // Generate cache key
  const cacheKey = useCallback(() => {
    if (!url) return null
    return `${method}:${url}:${JSON.stringify(body)}:${JSON.stringify(headers)}`
  }, [url, method, body, headers])

  // Check cache
  const getCachedData = useCallback((): T | null => {
    const key = cacheKey()
    if (!key) return null

    const entry = cache.get(key)
    if (!entry) return null

    if (Date.now() > entry.expiresAt) {
      cache.delete(key)
      return null
    }

    return entry.data
  }, [cacheKey])

  // Set cache
  const setCachedData = useCallback((data: T) => {
    const key = cacheKey()
    if (!key) return

    cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + cacheTime,
    })
  }, [cacheKey, cacheTime])

  // Clear cache
  const clearCache = useCallback(() => {
    const key = cacheKey()
    if (key) {
      cache.delete(key)
    }
  }, [cacheKey])

  // Make API request
  const makeRequest = useCallback(async (): Promise<void> => {
    if (!url) {
      setErrorState('URL is required')
      return
    }

    // Check cache first for GET requests
    if (method === 'GET') {
      const cachedData = getCachedData()
      if (cachedData) {
        setDataState(cachedData)
        setIsSuccess(true)
        setIsError(false)
        setErrorState(null)
        return
      }
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    setLoading(true)
    setErrorState(null)
    setIsSuccess(false)
    setIsError(false)

    try {
      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        signal: abortControllerRef.current.signal,
      }

      if (body && method !== 'GET') {
        requestOptions.body = JSON.stringify(body)
      }

      const response = await fetch(url, requestOptions)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = await response.json()
          if (errorData.message) {
            errorMessage = errorData.message
          }
        } catch {
          // Ignore JSON parsing errors
        }

        throw new Error(errorMessage)
      }

      const responseData = await response.json()
      
      setDataState(responseData)
      setIsSuccess(true)
      setIsError(false)
      setErrorState(null)

      // Cache successful GET requests
      if (method === 'GET') {
        setCachedData(responseData)
      }

      onSuccess?.(responseData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      
      // Retry logic
      if (retryCountRef.current < retryCount && !abortControllerRef.current?.signal.aborted) {
        retryCountRef.current++
        setTimeout(() => {
          makeRequest()
        }, retryDelay)
        return
      }

      setErrorState(errorMessage)
      setIsError(true)
      setIsSuccess(false)
      onError?.(errorMessage)
    } finally {
      setLoading(false)
      retryCountRef.current = 0
      onFinally?.()
    }
  }, [url, method, body, headers, retryCount, retryDelay, onSuccess, onError, onFinally, getCachedData, setCachedData])

  // Refetch function
  const refetch = useCallback(async () => {
    clearCache()
    await makeRequest()
  }, [clearCache, makeRequest])

  // Reset function
  const reset = useCallback(() => {
    setDataState(null)
    setLoading(false)
    setErrorState(null)
    setIsSuccess(false)
    setIsError(false)
    retryCountRef.current = 0
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }, [])

  // Set data manually
  const setData = useCallback((newData: T) => {
    setDataState(newData)
    setIsSuccess(true)
    setIsError(false)
    setErrorState(null)
  }, [])

  // Set error manually
  const setError = useCallback((errorMessage: string) => {
    setErrorState(errorMessage)
    setIsError(true)
    setIsSuccess(false)
  }, [])

  // Effect for immediate execution
  useEffect(() => {
    if (immediate && url) {
      makeRequest()
    }

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [immediate, url, makeRequest])

  return {
    // State
    data,
    loading,
    error,
    isSuccess,
    isError,
    
    // Actions
    refetch,
    reset,
    setData,
    setError,
  }
}

// Specialized hooks for common HTTP methods
export function useGet<T = any>(url: string, options?: Omit<UseApiOptions<T>, 'url' | 'method'>) {
  return useApi<T>({ ...options, url, method: 'GET' })
}

export function usePost<T = any>(url: string, options?: Omit<UseApiOptions<T>, 'url' | 'method'>) {
  return useApi<T>({ ...options, url, method: 'POST' })
}

export function usePut<T = any>(url: string, options?: Omit<UseApiOptions<T>, 'url' | 'method'>) {
  return useApi<T>({ ...options, url, method: 'PUT' })
}

export function useDelete<T = any>(url: string, options?: Omit<UseApiOptions<T>, 'url' | 'method'>) {
  return useApi<T>({ ...options, url, method: 'DELETE' })
} 