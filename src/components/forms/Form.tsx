import React from 'react'
import { useForm } from '@/hooks/useForm'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

// Form field interface
export interface FormField {
  name: string
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'file'
  placeholder?: string
  required?: boolean
  helpText?: string
  validation?: any // Yup schema
  options?: Array<{ value: string; label: string }> // For select fields
}

// Form props interface
export interface FormProps<T extends Record<string, any>> {
  fields: FormField[]
  initialValues: T
  validationSchema?: any // Yup schema
  onSubmit: (values: T) => Promise<void>
  submitText?: string
  loadingText?: string
  className?: string
  children?: React.ReactNode
}

// Form component
export function Form<T extends Record<string, any>>({
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  submitText = 'Submit',
  loadingText = 'Submitting...',
  className = '',
  children,
}: FormProps<T>) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: true,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {fields.map((field) => (
        <Input
          key={field.name}
          type={field.type || 'text'}
          label={field.label}
          placeholder={field.placeholder}
          value={values[field.name] || ''}
          onChange={(e) => {
            setValue(field.name as keyof T, e.target.value)
            handleChange(field.name as keyof T)(e.target.value)
          }}
          onBlur={handleBlur(field.name as keyof T)}
          error={touched[field.name as keyof T] ? errors[field.name as keyof T] : undefined}
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
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? loadingText : submitText}
        </Button>
      </div>
    </form>
  )
}

// Login form component
export interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => Promise<void>
  loading?: boolean
  error?: string
}

export function LoginForm({ onSubmit, loading = false, error }: LoginFormProps) {
  const fields: FormField[] = [
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
    <Form
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
    </Form>
  )
}

// Register form component
export interface RegisterFormProps {
  onSubmit: (values: { name: string; email: string; password: string; confirmPassword: string }) => Promise<void>
  loading?: boolean
  error?: string
}

export function RegisterForm({ onSubmit, loading = false, error }: RegisterFormProps) {
  const fields: FormField[] = [
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
    <Form
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
    </Form>
  )
} 