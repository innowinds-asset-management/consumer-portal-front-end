import React from 'react'

// Input types
export type InputType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'search' 
  | 'date' 
  | 'time' 
  | 'datetime-local'
  | 'file'

// Input sizes
export type InputSize = 'sm' | 'md' | 'lg'

// Input props interface
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: InputType
  size?: InputSize
  label?: string
  error?: string
  helpText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  children?: React.ReactNode
}

// Input component
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      size = 'md',
      label,
      error,
      helpText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // Generate ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    // Base classes
    const baseClasses = 'form-control'
    
    // Size classes
    const sizeClasses = {
      'sm': 'form-control-sm',
      'md': '',
      'lg': 'form-control-lg',
    }

    // Width classes
    const widthClasses = fullWidth ? 'w-100' : ''

    // Error classes
    const errorClasses = error ? 'is-invalid' : ''

    // Combine input classes
    const inputClasses = [
      baseClasses,
      sizeClasses[size],
      widthClasses,
      errorClasses,
      className
    ].filter(Boolean).join(' ')

    // Label classes
    const labelClasses = 'form-label'

    // Help text classes
    const helpTextClasses = 'form-text'

    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
        
        <div className="position-relative">
          {leftIcon && (
            <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            id={inputId}
            className={inputClasses}
            style={{
              paddingLeft: leftIcon ? '2.5rem' : undefined,
              paddingRight: rightIcon ? '2.5rem' : undefined,
            }}
            {...props}
          />
          
          {rightIcon && (
            <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <div className="invalid-feedback d-block">
            {error}
          </div>
        )}
        
        {helpText && !error && (
          <div className={helpTextClasses}>
            {helpText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
