import React from 'react'

// Button variants
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'danger' 
  | 'warning' 
  | 'info' 
  | 'light' 
  | 'dark' 
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-light'
  | 'outline-dark'

// Button sizes
export type ButtonSize = 'sm' | 'md' | 'lg'

// Button props interface
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: React.ReactNode
}

// Button component
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses = 'btn'
    
    // Variant classes
    const variantClasses = {
      'primary': 'btn-primary',
      'secondary': 'btn-secondary',
      'success': 'btn-success',
      'danger': 'btn-danger',
      'warning': 'btn-warning',
      'info': 'btn-info',
      'light': 'btn-light',
      'dark': 'btn-dark',
      'outline-primary': 'btn-outline-primary',
      'outline-secondary': 'btn-outline-secondary',
      'outline-success': 'btn-outline-success',
      'outline-danger': 'btn-outline-danger',
      'outline-warning': 'btn-outline-warning',
      'outline-info': 'btn-outline-info',
      'outline-light': 'btn-outline-light',
      'outline-dark': 'btn-outline-dark',
    }

    // Size classes
    const sizeClasses = {
      'sm': 'btn-sm',
      'md': '',
      'lg': 'btn-lg',
    }

    // Width classes
    const widthClasses = fullWidth ? 'w-100' : ''

    // Loading spinner component
    const LoadingSpinner = () => (
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
        <span className="visually-hidden">Loading...</span>
      </span>
    )

    // Icon component
    const IconComponent = () => {
      if (loading) {
        return <LoadingSpinner />
      }
      return icon
    }

    // Combine classes
    const combinedClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClasses,
      className
    ].filter(Boolean).join(' ')

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={disabled || loading}
        {...props}
      >
        {iconPosition === 'left' && IconComponent()}
        {children}
        {iconPosition === 'right' && IconComponent()}
      </button>
    )
  }
)

Button.displayName = 'Button'
