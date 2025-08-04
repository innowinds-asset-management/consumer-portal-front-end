'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React from 'react'
import { Pagination } from 'react-bootstrap'

const CustomPagination = () => {
  return (
    <Pagination className="mb-0 justify-content-center">
      <Pagination.Item className=" disabled">
        <IconifyIcon icon="ri:arrow-left-double-line" />
      </Pagination.Item>
      <Pagination.Item>
        1
      </Pagination.Item>
      <Pagination.Item className=" active">
        2
      </Pagination.Item>
      <Pagination.Item>
        3
      </Pagination.Item>
      <Pagination.Item>
        <IconifyIcon icon="ri:arrow-right-double-line" />
      </Pagination.Item>
    </Pagination>
  )
}

export default CustomPagination