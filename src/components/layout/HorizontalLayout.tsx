import React, { Suspense, useEffect } from 'react'
import TopNavigationBar from './TopNavigationBar/page'
import FallbackLoading from '../FallbackLoading'
import HorizontalNavBar from './HorizontalNav/page'
import Footer from './Footer'
import { getHorizontalMenuItems } from '@/helpers/Manu'
import { ChildrenType } from '@/types/component-props'
import { toggleDocumentAttribute } from '@/utils/layout'
import { useLayoutContext } from '@/context/useLayoutContext'
import { Offcanvas } from 'react-bootstrap'
import VerticalNavigationBar from './VerticalNavigationBar/page'

const HorizontalLayout = ({ children }: ChildrenType) => {
  const menuItems = getHorizontalMenuItems()

  const { layoutOrientation,menu,horizontalMenu } = useLayoutContext()

  useEffect(() => {
    toggleDocumentAttribute('data-layout', layoutOrientation === 'vertical' ? '' : 'topnav')

    return () => {
      toggleDocumentAttribute('data-layout', layoutOrientation === 'vertical' ? '' : 'topnav', true)
    }
  })
  return (
    <div className="wrapper">
      {/* {
        menu.size != 'default'  &&
        <Offcanvas show={horizontalMenu.open} className="custom-offcanvas w-0 bg-transparent" onHide={horizontalMenu.toggle}>
        <VerticalNavigationBar />
      </Offcanvas>
      } */}
      <Suspense>
        <TopNavigationBar />
      </Suspense>

      <Suspense fallback={<FallbackLoading />}>
        {/* {
          menu.size == 'default' && */}
            <HorizontalNavBar menuItems={menuItems} />
        {/* } */}
      </Suspense>

      <div className="page-content">
        <div className="page-container">{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default HorizontalLayout