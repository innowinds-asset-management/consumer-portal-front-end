import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, Button } from 'react-bootstrap'

export interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
  buttonText?: string
  size?: 'sm' | 'lg' | 'xl'
  centered?: boolean
  showCloseButton?: boolean
  allowOutsideClick?: boolean
  allowEscapeKey?: boolean
  customClass?: {
    container?: string
    popup?: string
    title?: string
    closeButton?: string
    icon?: string
    content?: string
    confirmButton?: string
  }
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = 'OK',
  size,
  centered = true,
  showCloseButton = false,
  allowOutsideClick = true,
  allowEscapeKey = true,
  customClass = {}
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && allowEscapeKey) {
      onClose()
    }
  }

  return (
    <Modal 
      className={`fade sweet-alert-modal ${customClass.container || ''}`}
      show={isOpen} 
      onHide={allowOutsideClick ? onClose : undefined}
      size={size}
      centered={centered}
      backdrop={allowOutsideClick ? true : "static"}
      keyboard={allowEscapeKey}
      onKeyDown={handleKeyDown}
    >
      <div className={`modal-content ${customClass.popup || ''}`}>
        {/* Close Button */}
        {showCloseButton && (
          <button
            type="button"
            className={`btn-close sweet-alert-close ${customClass.closeButton || ''}`}
            onClick={onClose}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}

        <ModalBody className={`p-4 text-center ${customClass.content || ''}`}>
          {/* Success Icon Animation */}
          <div className={`sweet-alert-icon sweet-alert-icon-success mb-3 ${customClass.icon || ''}`}>
            <div className="sweet-alert-success-animation">
              <div className="sweet-alert-success-ring"></div>
              <div className="sweet-alert-success-line-tip"></div>
              <div className="sweet-alert-success-line-long"></div>
            </div>
          </div>

          {/* Title */}
          {title && (
            <h3 className={`sweet-alert-title mb-3 ${customClass.title || ''}`}>
              {title}
            </h3>
          )}

          {/* Message */}
          {message && (
            <p className="sweet-alert-message mb-4">{message}</p>
          )}

          {/* Action Button */}
          <Button 
            variant="success"
            className={`sweet-alert-button ${customClass.confirmButton || ''}`}
            onClick={onClose}
          >
            {buttonText}
          </Button>
        </ModalBody>
      </div>
      
      <style jsx>{`
        .sweet-alert-modal .modal-dialog {
          max-width: 28rem;
        }
        
        .sweet-alert-modal .modal-content {
          border: none;
          border-radius: 0.5rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
        
        .sweet-alert-close {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          z-index: 10;
        }
        
        .sweet-alert-close:hover {
          color: #374151;
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
          transition: all 0.2s ease;
        }
        
        .sweet-alert-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
        }
        
        /* SweetAlert2 Success Animation - Correct Implementation */
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
          width: calc(100% + 8px);
          height: calc(100% + 8px);
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
          width: 1rem;
          height: 0.25rem;
          background-color: #10b981;
          border-radius: 0.125rem;
          transform: rotate(45deg);
          transform-origin: left center;
          animation: sweet-alert-line-tip 0.75s ease-in 0.75s forwards;
        }
        
        .sweet-alert-success-line-long {
          position: absolute;
          z-index: 2;
          top: 1.8rem;
          right: 0.8rem;
          width: 1.5rem;
          height: 0.25rem;
          background-color: #10b981;
          border-radius: 0.125rem;
          transform: rotate(-45deg);
          transform-origin: right center;
          animation: sweet-alert-line-long 0.75s ease-in 1.5s forwards;
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
      `}</style>
    </Modal>
  )
}

export default MessageModal

// Utility function for success modal - similar to SweetAlert2
export const showSuccess = (title: string, message?: string, options?: Partial<MessageModalProps>) => {
  return {
    isOpen: true,
    title,
    message,
    buttonText: 'OK',
    ...options
  }
}

// Hook for managing modal state
export const useMessageModal = () => {
  const [modalProps, setModalProps] = useState<MessageModalProps>({
    isOpen: false,
    onClose: () => setModalProps(prev => ({ ...prev, isOpen: false }))
  })

  const openModal = (props: Partial<MessageModalProps>) => {
    setModalProps(prev => ({
      ...prev,
      ...props,
      isOpen: true,
      onClose: props.onClose || (() => setModalProps(prev => ({ ...prev, isOpen: false })))
    }))
  }

  const closeModal = () => {
    setModalProps(prev => ({ ...prev, isOpen: false }))
  }

  return {
    modalProps,
    openModal,
    closeModal,
    showSuccess: (title: string, message?: string, options?: Partial<MessageModalProps>) => 
      openModal(showSuccess(title, message, options))
  }
}
