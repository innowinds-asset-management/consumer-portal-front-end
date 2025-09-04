import React from 'react'
import { Modal, ModalBody, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

export interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  buttonText?: string
  variant?: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary'
  icon?: string
  size?: 'sm' | 'lg' | 'xl'
  centered?: boolean
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  title = "Well Done!",
  buttonText = "Continue",
  variant = 'warning',
  icon = 'ri:information-line',
  size = 'sm',
  centered = true
}) => {
  return (
    <Modal 
      className="fade" 
      show={isOpen} 
      onHide={onClose} 
      size={size}
      centered={centered}
    >
      <div className={`modal-filled bg-${variant}`}>
        <ModalBody className="p-4">
          <div className="text-center">
            <IconifyIcon icon={icon} className="h1" />
            <h4 className="mt-2">{title}</h4>
            <Button 
              variant="light" 
              className="my-2" 
              onClick={onClose}
            >
              {buttonText}
            </Button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

export default MessageModal
