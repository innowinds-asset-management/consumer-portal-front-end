import React, { Suspense } from 'react'
import FallbackLoading from '../FallbackLoading'
import VerticalNavigationBar from './VerticalNavigationBar/page'
import Footer from './Footer'
import { ChildrenType } from '@/types/component-props'
import TopNavigationBar from './TopNavigationBar/page'

const VerticalLayout = ({ children }: ChildrenType) => {
  return (
    <div className="wrapper">
    <Suspense>
      <TopNavigationBar />
    </Suspense>

    <Suspense fallback={<FallbackLoading />}>
      <VerticalNavigationBar />
    </Suspense>

    <div className="page-content">
      <div className="page-container">
        {children}
      </div>
      <Footer />
    </div>
  </div>
  )
}

export default VerticalLayout