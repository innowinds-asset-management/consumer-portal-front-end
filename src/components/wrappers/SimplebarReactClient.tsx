'use client'
import type { ChildrenType } from '@/types/component-props'
import React from 'react'
import type SimpleBarCore from 'simplebar-core'
import SimpleBar, { type Props } from 'simplebar-react'

type SimplebarReactClientProps = Props & ChildrenType

const SimplebarReactClient = React.forwardRef<SimpleBarCore | null, SimplebarReactClientProps>(({ children, ...options }, ref) => {
  return (
    <SimpleBar {...options} ref={ref}>
      {children}
    </SimpleBar>
  )
})

SimplebarReactClient.displayName = 'SimplebarReactClient'

export default SimplebarReactClient
