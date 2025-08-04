'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React from 'react'
import { Button } from 'react-bootstrap'

const PrintButton = () => {
  return (
    <Button variant="primary" onClick={() => window.print()}>
      <IconifyIcon icon="tabler:printer" className="me-1" /> Print
    </Button>
  )
}

export default PrintButton
