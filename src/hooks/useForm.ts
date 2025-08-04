import { useState, useCallback, useRef } from 'react'
import { ValidationError } from 'yup'

// Form state interface
interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
  isDirty: boolean
}

// Form actions interface
interface FormActions<T> {
  setValue: (field: keyof T, value: any) => void
  setValues: (values: Partial<T>) => void
  setError: (field: keyof T, error: string) => void
  setErrors: (errors: Partial<Record<keyof T, string>>) => void
  setTouched: (field: keyof T, touched: boolean) => void
  setTouchedAll: (touched: boolean) => void
  reset: () => void
  validate: () => Promise<boolean>
  validateField: (field: keyof T) => Promise<boolean>
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => (e: React.FormEvent) => Promise<void>
  handleChange: (field: keyof T) => (value: any) => void
  handleBlur: (field: keyof T) => () => void
}

// Hook options
interface UseFormOptions<T> {
  initialValues: T
  validationSchema?: any // Yup schema
  onSubmit?: (values: T) => Promise<void>
  validateOnChange?: boolean
  validateOnBlur?: boolean
}

// Custom form hook
export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
): FormState<T> & FormActions<T> {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange = false,
    validateOnBlur = true,
  } = options

  // State
  const [values, setValuesState] = useState<T>(initialValues)
  const [errors, setErrorsState] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  // Refs
  const initialValuesRef = useRef(initialValues)

  // Computed values
  const isValid = Object.keys(errors).length === 0 && Object.keys(touched).length > 0

  // Validation function
  const validate = useCallback(async (): Promise<boolean> => {
    if (!validationSchema) return true

    try {
      await validationSchema.validate(values, { abortEarly: false })
      setErrorsState({})
      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: Partial<Record<keyof T, string>> = {}
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path as keyof T] = err.message
          }
        })
        setErrorsState(newErrors)
      }
      return false
    }
  }, [validationSchema, values])

  // Field validation
  const validateField = useCallback(async (field: keyof T): Promise<boolean> => {
    if (!validationSchema) return true

    try {
      await validationSchema.validateAt(field as string, values)
      setErrorsState(prev => ({ ...prev, [field]: undefined }))
      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrorsState(prev => ({ ...prev, [field]: error.message }))
      }
      return false
    }
  }, [validationSchema, values])

  // Set single value
  const setValue = useCallback((field: keyof T, value: any) => {
    setValuesState(prev => ({ ...prev, [field]: value }))
    setIsDirty(true)
    
    if (validateOnChange) {
      validateField(field)
    }
  }, [validateOnChange, validateField])

  // Set multiple values
  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(prev => ({ ...prev, ...newValues }))
    setIsDirty(true)
  }, [])

  // Set single error
  const setError = useCallback((field: keyof T, error: string) => {
    setErrorsState(prev => ({ ...prev, [field]: error }))
  }, [])

  // Set multiple errors
  const setErrors = useCallback((newErrors: Partial<Record<keyof T, string>>) => {
    setErrorsState(prev => ({ ...prev, ...newErrors }))
  }, [])

  // Set touched state
  const setTouched = useCallback((field: keyof T, touchedState: boolean) => {
    setTouchedState(prev => ({ ...prev, [field]: touchedState }))
  }, [])

  // Set all fields as touched
  const setTouchedAll = useCallback((touchedState: boolean) => {
    const allTouched: Partial<Record<keyof T, boolean>> = {}
    Object.keys(values).forEach(key => {
      allTouched[key as keyof T] = touchedState
    })
    setTouchedState(allTouched)
  }, [values])

  // Reset form
  const reset = useCallback(() => {
    setValuesState(initialValuesRef.current)
    setErrorsState({})
    setTouchedState({})
    setIsSubmitting(false)
    setIsDirty(false)
  }, [])

  // Handle change
  const handleChange = useCallback((field: keyof T) => (value: any) => {
    setValue(field, value)
  }, [setValue])

  // Handle blur
  const handleBlur = useCallback((field: keyof T) => () => {
    setTouched(field, true)
    if (validateOnBlur) {
      validateField(field)
    }
  }, [setTouched, validateOnBlur, validateField])

  // Handle submit
  const handleSubmit = useCallback((onSubmitFn?: (values: T) => Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault()
      
      setIsSubmitting(true)
      
      try {
        // Mark all fields as touched
        setTouchedAll(true)
        
        // Validate form
        const isValid = await validate()
        
        if (isValid) {
          const submitFn = onSubmitFn || onSubmit
          if (submitFn) {
            await submitFn(values)
          }
        }
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }, [validate, setTouchedAll, values, onSubmit])

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    
    // Actions
    setValue,
    setValues,
    setError,
    setErrors,
    setTouched,
    setTouchedAll,
    reset,
    validate,
    validateField,
    handleSubmit,
    handleChange,
    handleBlur,
  }
} 