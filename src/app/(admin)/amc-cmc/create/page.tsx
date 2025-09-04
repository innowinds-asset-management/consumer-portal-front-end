"use client";

import React from 'react'
import { useSearchParams } from 'next/navigation'
import AmcCmcForm from '../components/amcCms'

const CreateAmcCmcPage = () => {
  const searchParams = useSearchParams();
  
  // Get returnUrl from URL parameters
  const fullPath = searchParams.get('returnUrl');
  const returnUrl = fullPath ? decodeURIComponent(fullPath) : undefined;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <AmcCmcForm returnUrl={returnUrl} />
        </div>
      </div>
    </div>
  )
}

export default CreateAmcCmcPage