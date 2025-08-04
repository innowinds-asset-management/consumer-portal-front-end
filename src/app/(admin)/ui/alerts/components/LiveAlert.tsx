'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'

const LiveAlert = () => {
  const [show, setShow] = useState(true)
  return (
    <ComponentContainerCard
      title="Live Alert"
      description={
        <>
          Click the button below to show an alert (hidden with inline styles to start), then dismiss (and destroy) it with the built-in close button.
        </>
      }>
      <Alert className="alert-success" dismissible onClick={() => setShow(false)} id="liveAlertPlaceholder" show={show}>
        Nice, you triggered this alert message!
      </Alert>
      <button type="button" onClick={() => setShow(true)} className="btn btn-primary" id="liveAlertBtn">
        Show live alert
      </button>
    </ComponentContainerCard>
  )
}

export default LiveAlert
