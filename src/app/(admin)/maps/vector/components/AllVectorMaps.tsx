'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { CanadaVectorMap, IraqVectorMap, RussiaVectorMap, SpainVectorMap, UsaVectorMap } from '@/components/VectorMap'
import { Col, Row } from 'react-bootstrap'
import {
  CanadaVectorMapOpts,
  IraqVectorMapOpts,
  RussiaVectorMapOpts,
  SpainVectorMapOpts,
  UsaVectorMapOpts,
  worldLineMapOpts,
  worldMapOpts,
} from '../data'
import dynamic from 'next/dynamic'

const WorldVectorMap = dynamic(() => import('@/components/VectorMap/WorldMap'), {
  ssr: false,
})

const GlobalWorldVectorMap = () => {
  return (
    <ComponentContainerCard title="World Vector Map">
      <WorldVectorMap height="360px" width="100%" options={worldMapOpts} />
    </ComponentContainerCard>
  )
}

const WorldVectorMap2 = () => {
  return (
    <ComponentContainerCard title="World Vector Map">
      <WorldVectorMap height="360px" width="100%" options={worldLineMapOpts} />
    </ComponentContainerCard>
  )
}

const CanadaVectorMaps = () => {
  return (
    <ComponentContainerCard title="Canada Vector Map">
      <CanadaVectorMap height="360px" width="100%" options={CanadaVectorMapOpts} />
    </ComponentContainerCard>
  )
}

const RussiaVectorMaps = () => {
  return (
    <ComponentContainerCard title="Russia Vector Map">
      <RussiaVectorMap height="360px" width="100%" options={RussiaVectorMapOpts} />
    </ComponentContainerCard>
  )
}

const USVectorMaps = () => {
  return (
    <ComponentContainerCard title="US Vector Map">
      <UsaVectorMap height="360px" width="100%" options={UsaVectorMapOpts} />
    </ComponentContainerCard>
  )
}
const IraqVectorMaps = () => {
  return (
    <ComponentContainerCard title="Iraq Vector Map">
      <IraqVectorMap height="360px" width="100%" options={IraqVectorMapOpts} />
    </ComponentContainerCard>
  )
}
const SpainVectorMaps = () => {
  return (
    <ComponentContainerCard title="Spain Vector Map">
      <SpainVectorMap height="360px" width="100%" options={SpainVectorMapOpts} />
    </ComponentContainerCard>
  )
}

const AllVectorMaps = () => {
  return (
    <Row>
      <Col lg={6}>
        <GlobalWorldVectorMap />
      </Col>
      <Col lg={6}>
        <WorldVectorMap2 />
      </Col>
      <Col lg={6}>
        <CanadaVectorMaps />
      </Col>
      <Col lg={6}>
        <RussiaVectorMaps />
      </Col>
      <Col lg={6}>
        <USVectorMaps />
      </Col>
      <Col lg={6}>
        <IraqVectorMaps />
      </Col>
      <Col lg={6}>
        <SpainVectorMaps />
      </Col>
    </Row>
  )
}

export default AllVectorMaps
