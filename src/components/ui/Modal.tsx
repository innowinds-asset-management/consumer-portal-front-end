import React, { useEffect } from 'react'

// Modal props interface
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
  scrollable?: boolean
  backdrop?: boolean | 'static'
  keyboard?: boolean
  className?: string
}

// Modal component
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  centered = false,
  scrollable = false,
  backdrop = true,
  keyboard = true,
  className = '',
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && keyboard && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      // Restore body scroll
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, keyboard])

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && backdrop !== 'static') {
      onClose()
    }
  }

  // Size classes
  const sizeClasses = {
    'sm': 'modal-sm',
    'md': '',
    'lg': 'modal-lg',
    'xl': 'modal-xl',
  }

  // Centered classes
  const centeredClasses = centered ? 'modal-dialog-centered' : ''

  // Scrollable classes
  const scrollableClasses = scrollable ? 'modal-dialog-scrollable' : ''

  // Combine modal dialog classes
  const modalDialogClasses = [
    'modal-dialog',
    sizeClasses[size],
    centeredClasses,
    scrollableClasses,
    className
  ].filter(Boolean).join(' ')

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      {backdrop && (
        <div 
          className="modal-backdrop fade show" 
          onClick={handleBackdropClick}
        />
      )}
      
      {/* Modal */}
      <div 
        className="modal fade show d-block" 
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        onClick={handleBackdropClick}
      >
        <div className={modalDialogClasses} role="document">
          <div className="modal-content">
            {/* Header */}
            {(title || onClose !== undefined) && (
              <div className="modal-header">
                {title && (
                  <h5 className="modal-title">
                    {title}
                  </h5>
                )}
                {onClose && (
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={onClose}
                  />
                )}
              </div>
            )}
            
            {/* Body */}
            <div className="modal-body">
              {children}
            </div>
            
            {/* Footer */}
            {footer && (
              <div className="modal-footer">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// Modal Header component
export interface ModalHeaderProps {
  title?: string
  onClose?: () => void
  children?: React.ReactNode
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  children,
}) => {
  return (
    <div className="modal-header">
      {title && <h5 className="modal-title">{title}</h5>}
      {children}
      {onClose && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      )}
    </div>
  )
}

// Modal Body component
export interface ModalBodyProps {
  children: React.ReactNode
  className?: string
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`modal-body ${className}`}>
      {children}
    </div>
  )
}

// Modal Footer component
export interface ModalFooterProps {
  children: React.ReactNode
  className?: string
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`modal-footer ${className}`}>
      {children}
    </div>
  )
} 