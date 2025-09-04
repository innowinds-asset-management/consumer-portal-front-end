"use client";

import React from 'react'
import { useSearchParams } from 'next/navigation'
import AmcCmcForm from '../components/amcCms'

const CreateAmcCmcPage = () => {
  const searchParams = useSearchParams();
  
  // Get returnUrl from URL parameters
  const returnUrl = searchParams.get('returnUrl');
  const fullPath = returnUrl ? decodeURIComponent(returnUrl) : undefined;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <AmcCmcForm fullPath={fullPath} />
        </div>
      </div>
    </div>
  )
}

export default CreateAmcCmcPage