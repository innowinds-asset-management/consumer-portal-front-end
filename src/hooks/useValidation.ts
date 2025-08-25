import { useState, useCallback, useRef } from 'react'
import { ValidationError } from 'yup'

// Validation state interface
interface ValidationState {
  errors: Record<string, string>
  isValid: boolean
  isDirty: boolean
  touched: Record<string, boolean>
}

// Validation actions interface
interface ValidationActions {
  validate: (data: any) => Promise<boolean>
  validateField: (field: string, value: any) => Promise<boolean>
  setFieldError: (field: string, error: string) => void
  setFieldTouched: (field: string, touched: boolean) => void
  clearErrors: () => void
  clearFieldError: (field: string) => void
  reset: () => void
}

// Hook options
interface UseValidationOptions {
  schema?: any // Yup schema
  validateOnChange?: boolean
  validateOnBlur?: boolean
  validateOnMount?: boolean
  initialData?: any
}

// Custom validation hook
export function useValidation(options: UseValidationOptions = {}): ValidationState & ValidationActions {
  const {
    schema,
    validateOnChange = false,
    validateOnBlur = true,
    validateOnMount = false,
    initialData = {},
  } = options

  // State
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isDirty, setIsDirty] = useState<boolean>(false)

  // Refs
  const currentDataRef = useRef(initialData)

  // Computed values
  const isValid = Object.keys(errors).length === 0 && Object.keys(touched).length > 0

  // Validate entire form
  const validate = useCallback(async (data: any): Promise<boolean> => {
    if (!schema) return true

    currentDataRef.current = data

    try {
      await schema.validate(data, { abortEarly: false })
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: Record<string, string> = {}
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }, [schema])

  // Validate single field
  const validateField = useCallback(async (field: string, value: any): Promise<boolean> => {
    if (!schema) return true

    try {
      await schema.validateAt(field, { ...currentDataRef.current, [field]: value })
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(prev => ({ ...prev, [field]: error.message }))
      }
      return false
    }
  }, [schema])

  // Set field error manually
  const setFieldError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [])

  // Set field touched state
  const setFieldTouched = useCallback((field: string, touchedState: boolean) => {
    setTouched(prev => ({ ...prev, [field]: touchedState }))
    setIsDirty(true)
  }, [])

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  // Clear specific field error
  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  // Reset validation state
  const reset = useCallback(() => {
    setErrors({})
    setTouched({})
    setIsDirty(false)
    currentDataRef.current = initialData
  }, [initialData])

  // Validate on mount if requested
  if (validateOnMount && schema && Object.keys(initialData).length > 0) {
    validate(initialData)
  }

  return {
    // State
    errors,
    isValid,
    isDirty,
    touched,
    
    // Actions
    validate,
    validateField,
    setFieldError,
    setFieldTouched,
    clearErrors,
    clearFieldError,
    reset,
  }
}

// Field validation hook
export function useFieldValidation(
  field: string,
  value: any,
  schema?: any,
  options: {
    validateOnChange?: boolean
    validateOnBlur?: boolean
  } = {}
) {
  const { validateOnChange = false, validateOnBlur = true } = options
  const [error, setError] = useState<string>('')
  const [touched, setTouched] = useState<boolean>(false)

  // Validate field
  const validateField = useCallback(async (fieldValue?: any) => {
    if (!schema) return true

    const valueToValidate = fieldValue !== undefined ? fieldValue : value

    try {
      await schema.validateAt(field, { [field]: valueToValidate })
      setError('')
      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        setError(error.message)
      }
      return false
    }
  }, [schema, field, value])

  // Handle field change
  const handleChange = useCallback((newValue: any) => {
    if (validateOnChange) {
      validateField(newValue)
    }
  }, [validateOnChange, validateField])

  // Handle field blur
  const handleBlur = useCallback(() => {
    setTouched(true)
    if (validateOnBlur) {
      validateField()
    }
  }, [validateOnBlur, validateField])

  // Validate on value change
  if (validateOnChange) {
    handleChange(value)
  }

  return {
    error,
    touched,
    isValid: !error,
    validate: validateField,
    handleChange,
    handleBlur,
    setError,
    setTouched,
  }
}

// Async validation hook
export function useAsyncValidation<T = any>(
  validator: (value: T) => Promise<string | null>,
  options: {
    debounceMs?: number
    validateOnChange?: boolean
  } = {}
) {
  const { debounceMs = 300, validateOnChange = true } = options
  const [error, setError] = useState<string>('')
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Validate with debounce
  const validate = useCallback(async (value: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(async () => {
      setIsValidating(true)
      try {
        const result = await validator(value)
        setError(result || '')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Validation failed')
      } finally {
        setIsValidating(false)
      }
    }, debounceMs)
  }, [validator, debounceMs])

  // Cleanup timeout on unmount
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    error,
    isValidating,
    isValid: !error && !isValidating,
    validate,
    cleanup,
  }
} 