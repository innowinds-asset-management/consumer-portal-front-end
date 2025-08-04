import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

// Simple form field interface
export interface SimpleFormField {
  name: string
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'file'
  placeholder?: string
  required?: boolean
  helpText?: string
}

// Simple form props interface
export interface SimpleFormProps<T extends Record<string, any>> {
  fields: SimpleFormField[]
  initialValues: T
  onSubmit: (values: T) => Promise<void>
  submitText?: string
  loadingText?: string
  className?: string
  children?: React.ReactNode
}

// Simple form component
export function SimpleForm<T extends Record<string, any>>({
  fields,
  initialValues,
  onSubmit,
  submitText = 'Submit',
  loadingText = 'Submitting...',
  className = '',
  children,
}: SimpleFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(values)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {fields.map((field) => (
        <Input
          key={field.name}
          type={field.type || 'text'}
          label={field.label}
          placeholder={field.placeholder}
          value={values[field.name] || ''}
          onChange={(e) => handleChange(field.name as keyof T, e.target.value)}
          error={errors[field.name as keyof T]}
          helpText={field.helpText}
          required={field.required}
        />
      ))}

      {children}

      <div className="mt-3">
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? loadingText : submitText}
        </Button>
      </div>
    </form>
  )
}

// Simple login form component
export interface SimpleLoginFormProps {
  onSubmit: (values: { email: string; password: string }) => Promise<void>
  loading?: boolean
  error?: string
}

export function SimpleLoginForm({ onSubmit, loading = false, error }: SimpleLoginFormProps) {
  const fields: SimpleFormField[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true,
    },
  ]

  return (
    <SimpleForm
      fields={fields}
      initialValues={{ email: '', password: '' }}
      onSubmit={onSubmit}
      submitText="Login"
      loadingText="Logging in..."
    >
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </SimpleForm>
  )
}

// Simple register form component
export interface SimpleRegisterFormProps {
  onSubmit: (values: { name: string; email: string; password: string; confirmPassword: string }) => Promise<void>
  loading?: boolean
  error?: string
}

export function SimpleRegisterForm({ onSubmit, loading = false, error }: SimpleRegisterFormProps) {
  const fields: SimpleFormField[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      required: true,
    },
  ]

  return (
    <SimpleForm
      fields={fields}
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      onSubmit={onSubmit}
      submitText="Register"
      loadingText="Registering..."
    >
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </SimpleForm>
  )
} 