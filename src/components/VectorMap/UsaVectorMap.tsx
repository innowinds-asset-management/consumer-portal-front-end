'use client'
import 'jsvectormap'
import 'jsvectormap/dist/maps/us-mill-en'
import 'jsvectormap/dist/maps/us-aea-en'
import 'jsvectormap/dist/maps/us-merc-en'
import 'jsvectormap/dist/maps/us-lcc-en'

//components
import BaseVectorMap from './BaseVectorMap'

interface UsaVectorMapProps {
    width?: string
    height?: string
    options?: any
}

const UsaVectorMap = ({width, height, options}: UsaVectorMapProps) => {
    return (
        <>
            <BaseVectorMap width={width} height={height} options={options}/>
        </>
    )
}

export default UsaVectorMap
