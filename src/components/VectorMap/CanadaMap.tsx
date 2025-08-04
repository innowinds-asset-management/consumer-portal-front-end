'use client'
import 'jsvectormap'
import 'jsvectormap/dist/maps/canada'

//components
import BaseVectorMap from './BaseVectorMap'

interface CanadaVectorMapProps {
  width?: string
  height?: string
  options?: any
}

const CanadaVectorMap = ({ width, height, options }: CanadaVectorMapProps) => {
  return (
    <>
      <BaseVectorMap width={width} height={height} options={options} />
    </>
  )
}

export default CanadaVectorMap
