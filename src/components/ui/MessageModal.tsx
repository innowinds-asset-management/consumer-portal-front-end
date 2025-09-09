import React from 'react'
import { Modal, ModalBody, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

export interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
  message?: string
  buttonText?: string
  variant?: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary'
  icon?: string
  size?: 'sm' | 'lg' | 'xl'
  centered?: boolean
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  message,
  buttonText,
  variant,
  icon,
  size,
  centered = true
}) => {
  // Default icons for each variant to match SweetAlert
  const getDefaultIcon = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'ri:check-line'
      case 'info':
        return 'ri:information-line'
      case 'warning':
        return 'ri:alert-line'
      case 'danger':
        return 'ri:close-line'
      case 'primary':
        return 'ri:question-line'
      default:
        return 'ri:information-line'
    }
  }

  const defaultIcon = icon || getDefaultIcon(variant || 'success')

  return (
    <Modal 
      className="fade sweet-alert-modal" 
      show={isOpen} 
      onHide={onClose} 
      size={size}
      centered={centered}
      backdrop="static"
      keyboard={false}
    >
      <ModalBody className="p-4 text-center">
        {/* SweetAlert-style icon container */}
        <div className={`sweet-alert-icon sweet-alert-icon-${variant} mb-3`}>
          {variant === 'success' ? (
            <div className="sweet-alert-success-animation">
              <div className="sweet-alert-success-ring"></div>
              <div className="sweet-alert-success-line-tip"></div>
              <div className="sweet-alert-success-line-long"></div>
            </div>
          ) : variant === 'danger' ? (
            <div className="sweet-alert-error-animation">
              <div className="sweet-alert-error-x-mark">
                <div className="sweet-alert-error-x-mark-line-left"></div>
                <div className="sweet-alert-error-x-mark-line-right"></div>
              </div>
            </div>
          ) : (
            <IconifyIcon 
              icon={defaultIcon} 
              className="sweet-alert-icon-content"
            />
          )}
        </div>        
       
        {/* Message */}
        {message && (
          <p className="sweet-alert-message mb-4">{message}</p>
        )}
        
        {/* Action Button */}
        <Button 
          variant={variant}
          className="sweet-alert-button"
          onClick={onClose}
        >
          {buttonText || 'Ok'}
        </Button>
      </ModalBody>
      
      <style jsx>{`
        .sweet-alert-modal .modal-dialog {
          max-width: 28rem;
        }
        
        .sweet-alert-modal .modal-content {
          border: none;
          border-radius: 0.5rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
        
        .sweet-alert-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          border: 0.25rem solid;
          position: relative;
        }
        
        .sweet-alert-icon-success {
          border-color: #10b981;
          background-color: white;
          color: #10b981;
        }
        
        .sweet-alert-icon-info {
          border-color: #3b82f6;
          color: #3b82f6;
        }
        
        .sweet-alert-icon-warning {
          border-color: #f59e0b;
          color: #f59e0b;
        }
        
        .sweet-alert-icon-danger {
          border-color: #ef4444;
          color: #ef4444;
        }
        
        .sweet-alert-icon-primary {
          border-color: #8b5cf6;
          color: #8b5cf6;
        }
        
        .sweet-alert-icon-content {
          font-size: 2rem;
        }
        
        .sweet-alert-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }
        
        .sweet-alert-message {
          font-size: 1rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.5;
        }
        
        .sweet-alert-button {
          border-radius: 0.375rem;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          border: none;
          min-width: 6rem;
        }
        
        .sweet-alert-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
        }
        
        /* SweetAlert2 Success Animation - Exact Copy */
        .sweet-alert-success-animation {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .sweet-alert-success-ring {
          position: absolute;
          z-index: 2;
          top: -4px;
          left: -4px;
          width: 100%;
          height: 100%;
          border: 4px solid #10b981;
          border-radius: 50%;
          border-left-color: transparent;
          border-right-color: transparent;
          transform: rotate(-45deg);
          animation: sweet-alert-rotate 4.25s ease-in;
        }
        
        .sweet-alert-success-line-tip {
          position: absolute;
          z-index: 2;
          top: 1.5rem;
          left: 0.8rem;
          width: 0;
          height: 0.25rem;
          background-color: #10b981;
          border-radius: 0.125rem;
          transform: rotate(45deg);
          transform-origin: left center;
          animation: sweet-alert-line-tip 0.75s;
        }
        
        .sweet-alert-success-line-long {
          position: absolute;
          z-index: 2;
          top: 1.8rem;
          right: 0.8rem;
          width: 0;
          height: 0.25rem;
          background-color: #10b981;
          border-radius: 0.125rem;
          transform: rotate(-45deg);
          transform-origin: right center;
          animation: sweet-alert-line-long 0.75s 0.75s;
        }
        
        @keyframes sweet-alert-rotate {
          0% {
            transform: rotate(-45deg);
          }
          5% {
            transform: rotate(-45deg);
          }
          12% {
            transform: rotate(-405deg);
          }
          100% {
            transform: rotate(-405deg);
          }
        }
        
        @keyframes sweet-alert-line-tip {
          0% {
            width: 0;
          }
          50% {
            width: 0;
          }
          100% {
            width: 1rem;
          }
        }
        
        @keyframes sweet-alert-line-long {
          0% {
            width: 0;
          }
          50% {
            width: 0;
          }
          100% {
            width: 1.5rem;
          }
        }
        
        /* SweetAlert2 Error Animation - Exact Copy */
        .sweet-alert-error-animation {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .sweet-alert-error-x-mark {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .sweet-alert-error-x-mark-line-left,
        .sweet-alert-error-x-mark-line-right {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 47px;
          background-color: #ef4444;
          border-radius: 2px;
        }
        
        .sweet-alert-error-x-mark-line-left {
          transform: translate(-50%, -50%) rotate(45deg);
          animation: sweet-alert-x-mark-left 0.75s;
        }
        
        .sweet-alert-error-x-mark-line-right {
          transform: translate(-50%, -50%) rotate(-45deg);
          animation: sweet-alert-x-mark-right 0.75s;
        }
        
        @keyframes sweet-alert-x-mark-left {
          0% {
            transform: translate(-50%, -50%) rotate(45deg) scale(0);
          }
          50% {
            transform: translate(-50%, -50%) rotate(45deg) scale(0);
          }
          100% {
            transform: translate(-50%, -50%) rotate(45deg) scale(1);
          }
        }
        
        @keyframes sweet-alert-x-mark-right {
          0% {
            transform: translate(-50%, -50%) rotate(-45deg) scale(0);
          }
          50% {
            transform: translate(-50%, -50%) rotate(-45deg) scale(0);
          }
          100% {
            transform: translate(-50%, -50%) rotate(-45deg) scale(1);
          }
        }
      `}</style>
    </Modal>
  )
}

export default MessageModal
