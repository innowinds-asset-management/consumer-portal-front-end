'use client'

//components
import BaseVectorMap from './BaseVectorMap'

interface WorldVectorMapProps {
  width?: string
  height?: string
  options?: any
}

const WorldVectorMap = ({ width, height, options }: WorldVectorMapProps) => {
  return (
    <>
      <BaseVectorMap width={width} height={height} options={options} />
    </>
  )
}

export default WorldVectorMap
