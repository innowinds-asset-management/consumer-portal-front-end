'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import useRangeSlider from '@/hooks/useRangeSlider'
import Nouislider from 'nouislider-react'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

const BasicSlider = () => {
  return (
    <ComponentContainerCard title="Basic Range Slider">
      <Nouislider range={{ min: 0, max: 255 }} start={127} connect={[true, false]} />
    </ComponentContainerCard>
  )
}

const MultiSlider = () => {
  return (
    <ComponentContainerCard title="Multi Elements Range">
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
    </ComponentContainerCard>
  )
}

const ValueRangeSlider = () => {
  const { selectedRanges2, onSlide3 } = useRangeSlider()
  return (
    <ComponentContainerCard title="Value Range Slider">
      <div>
        <Nouislider behaviour="tap" step={350} range={{ min: 0, max: 10000 }} start={[500, 4000]} connect onSlide={(value) => onSlide3(1, value)} />
        <div className="d-flex justify-content-between mt-3">
          <p>value: {selectedRanges2 ? <span>{selectedRanges2[1]}</span> : null}</p>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const ColorScheme = () => {
  return (
    <ComponentContainerCard title="Color Scheme">
      <div>
        <h5 className="fs-14">Primary</h5>
        <div id="slider-primary" data-slider-color="primary">
          <Nouislider range={{ min: 0, max: 255 }} start={127} connect={[true, false]} />
        </div>
      </div>
      <div className="mt-3">
        <h5 className="fs-14">Secondary</h5>
        <div id="slider-primary" data-slider-color="secondary">
          <Nouislider range={{ min: 0, max: 255 }} start={127} connect={[true, false]} data-slider-color="primary" />
        </div>
      </div>
      <div className="mt-3">
        <h5 className="fs-14">Success</h5>
        <div id="slider-primary" data-slider-color="success">
          <Nouislider range={{ min: 0, max: 255 }} start={127} connect={[true, false]} data-slider-color="success" />
        </div>
      </div>
      <div className="mt-3">
        <h5 className="fs-14">Info</h5>
        <div id="slider-primary" data-slider-color="info">
          <Nouislider range={{ min: 0, max: 255 }} start={127} connect={[true, false]} data-slider-color="info" />
        </div>
      </div>
      <div className="mt-3">
        <h5 className="fs-14">Warning</h5>
        <div id="slider-primary" data-slider-color="warning">
          <Nouislider range={{ min: 0, max: 255 }} start={127} connect={[true, false]} data-slider-color="warning" />
        </div>
      </div>
      <div className="mt-3">
        <h5 className="fs-14">Danger</h5>
        <div id="slider-primary" data-slider-color="danger">
          <Nouislider range={{ min: 0, max: 255 }} start={127} connect={[true, false]} data-slider-color="danger" />
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const TooltipSlider = () => {
  return (
    <ComponentContainerCard title="Tooltip">
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 75]} connect tooltips={[true, true]} />
    </ComponentContainerCard>
  )
}

const SoftLimits = () => {
  return (
    <ComponentContainerCard title="Soft Limits">
      <div className="mb-3 pb-5">
        <Nouislider
          range={{ min: 0, max: 100 }}
          start={50}
          pips={{
            mode: 'values',
            values: [20, 80],
            density: 4,
          }}
        />
      </div>
    </ComponentContainerCard>
  )
}

const ColorPickerSlider = () => {
  const colors = ['red', 'green', 'blue']

  const [state, setState] = useState('rgb(127, 127, 127)')

  const onUpdate = (index: any) => (value: any) => {
    colors[index] = value[0]
    setState(`rgb(${colors.join(',')})`)
  }
  return (
    <ComponentContainerCard title="Color Picker">
      <div>
        {colors.map((color, idx) => (
          <Nouislider
            key={idx}
            id={color}
            connect={[true, false]}
            onUpdate={onUpdate(idx)}
            orientation="vertical"
            style={{ height: '200px' }}
            range={{ min: 0, max: 255 }}
            start={[125]}
          />
        ))}
        <div id="result" style={{ background: state }} />
      </div>
    </ComponentContainerCard>
  )
}

const VerticalRangeSlider = () => {
  return (
    <ComponentContainerCard title="Vertical Range Slider">
      <Nouislider style={{ height: '198px' }} className="mx-auto" range={{ min: 0, max: 200 }} start={[60, 160]} connect orientation="vertical" />
    </ComponentContainerCard>
  )
}

const VerticalRangeSlider2 = () => {
  return (
    <ComponentContainerCard title="Vertical Range Slider">
      <Nouislider
        style={{ height: '198px' }}
        className="mx-auto"
        range={{ min: 0, max: 255 }}
        start={127}
        connect={[false, true]}
        orientation="vertical"
      />
    </ComponentContainerCard>
  )
}

const VerticalRangeSlider3 = () => {
  return (
    <ComponentContainerCard title="Vertical Range Slider">
      <Nouislider style={{ height: '198px' }} className="mx-auto" range={{ min: 0, max: 255 }} start={127} tooltips={true} orientation="vertical" />
    </ComponentContainerCard>
  )
}

const AllSlider = () => {
  return (
    <>
      <Row>
        <Col lg={12}>
          <BasicSlider />
        </Col>
        <Col lg={12}>
          <MultiSlider />
        </Col>
        <Col lg={12}>
          <ValueRangeSlider />
        </Col>
        <Col lg={12}>
          <ColorScheme />
        </Col>
        <Col lg={12}>
          <TooltipSlider />
        </Col>
        <Col lg={12}>
          <SoftLimits />
        </Col>
        <Col lg={4}>
          <ColorPickerSlider />
        </Col>
        <Col lg={4}>
          <VerticalRangeSlider />
        </Col>
        <Col lg={4}>
          <VerticalRangeSlider2 />
        </Col>
        <Col lg={4}>
          <VerticalRangeSlider3 />
        </Col>
      </Row>
    </>
  )
}

export default AllSlider
