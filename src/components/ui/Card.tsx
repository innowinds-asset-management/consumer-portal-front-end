import React from 'react'

// Card props interface
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info'
  border?: boolean
  shadow?: boolean
}

// Card component
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  header,
  footer,
  children,
  variant = 'default',
  border = true,
  shadow = false,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'card'
  
  // Variant classes
  const variantClasses = {
    'default': '',
    'primary': 'border-primary',
    'success': 'border-success',
    'danger': 'border-danger',
    'warning': 'border-warning',
    'info': 'border-info',
  }

  // Border classes
  const borderClasses = border ? '' : 'border-0'

  // Shadow classes
  const shadowClasses = shadow ? 'shadow' : ''

  // Combine classes
  const cardClasses = [
    baseClasses,
    variantClasses[variant],
    borderClasses,
    shadowClasses,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClasses} {...props}>
      {header && (
        <div className="card-header">
          {header}
        </div>
      )}
      
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h5 className="card-title mb-0">{title}</h5>}
          {subtitle && <h6 className="card-subtitle mb-0 text-muted">{subtitle}</h6>}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

// Card Header component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  )
}

// Card Body component
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  )
}

// Card Footer component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`card-footer ${className}`} {...props}>
      {children}
    </div>
  )
} 