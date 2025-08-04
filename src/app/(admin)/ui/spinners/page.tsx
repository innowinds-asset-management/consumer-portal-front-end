import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import Spinner from '@/components/Spinner'
import { colorVariants } from '@/context/constants'
import type { Metadata } from 'next'
import { Button, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Spinners' }

const BorderedSpinners = () => {
  return (
    <ComponentContainerCard title="Border Spinner" description={<>Use the border spinners for a lightweight loading indicator.</>}>
      <Spinner className="m-2" />
    </ComponentContainerCard>
  )
}

const ColorsSpinners = () => {
  return (
    <ComponentContainerCard title="Colors" description={<>You can use any of our text color utilities on the standard spinner.</>}>
      {colorVariants.slice(0, 10).map((color, idx) => {
        return <Spinner key={idx} className="m-2" color={color} />
      })}
    </ComponentContainerCard>
  )
}

const AlignmentSpinner = () => {
  return (
    <ComponentContainerCard
      title="Alignment"
      description={
        <>Use flexbox utilities, float utilities, or text alignment utilities to place spinners exactly where you need them in any situation.</>
      }>
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    </ComponentContainerCard>
  )
}

const SpinnersSizes = () => {
  const sizes: ('lg' | 'md' | 'sm')[] = ['lg', 'md', 'sm']

  return (
    <ComponentContainerCard
      title="Size"
      description={
        <>
          Add <code>.spinner-border-sm</code> and&nbsp;
          <code>.spinner-border.avatar-**</code> to make a smaller spinner that can quickly be used within other components.
        </>
      }>
      <Row>
        {(sizes || []).map((size, idx) => {
          return (
            <Col lg={6} key={idx}>
              <Spinner className="text-primary m-2" color="primary" size={size} />
              <Spinner color="secondary" className="text-secondary m-2" type="grow" size={size} />
            </Col>
          )
        })}
        <Col lg={6}>
          <Spinner className="spinner-border-sm m-2"></Spinner>
          <Spinner type="grow" className="spinner-grow-sm m-2"></Spinner>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const GrowingSpinners = () => {
  return (
    <ComponentContainerCard
      title="Growing Spinner"
      description={
        <>If you don&apos;t fancy a border spinner, switch to the grow spinner. While it doesn’t technically spin, it does repeatedly grow!</>
      }>
      <Spinner type="grow" className="m-2" />
    </ComponentContainerCard>
  )
}

const ColorGrowingSpinners = () => {
  return (
    <ComponentContainerCard title="Color Growing Spinner" description={<>You can use any of our text color utilities on the standard spinner.</>}>
      {colorVariants.slice(0, 10).map((color, idx) => {
        return <Spinner key={idx} className="m-2" type="grow" color={color} />
      })}
    </ComponentContainerCard>
  )
}

const PlacementSpinners = () => {
  return (
    <ComponentContainerCard
      title="Placement"
      description={
        <>
          Use <code>flexbox utilities</code>, <code>float utilities</code>, or <code>text alignment</code> utilities to place spinners exactly where
          you need them in any situation.
        </>
      }>
      <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <Spinner className="ms-auto" />
      </div>
    </ComponentContainerCard>
  )
}

const ButtonSpinners = () => {
  return (
    <ComponentContainerCard
      title="Buttons Spinner"
      description={
        <>
          Use spinners within buttons to indicate an action is currently processing or taking place. You may also swap the text out of the spinner
          element and utilize button text as needed.
        </>
      }>
      <Row>
        <Col lg={6}>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="primary" disabled>
              <Spinner className="spinner-border-sm" tag="span" color="white" /> <span className="visually-hidden">Loading...</span>
            </Button>

            <Button variant="primary" disabled>
              <Spinner className="spinner-border-sm me-1" tag="span" color="white" />
              Loading...
            </Button>
          </div>
        </Col>

        <Col lg={6}>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="primary" disabled>
              <Spinner className="spinner-grow-sm" tag="span" color="white" type="grow" /> <span className="visually-hidden">Loading...</span>
            </Button>

            <Button variant="primary" disabled>
              <Spinner className="spinner-grow-sm me-1" tag="span" color="white" type="grow"></Spinner>
              Loading...
            </Button>
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const Spinners = () => {
  return (
    <>
      <PageTitle title="Spinners" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <BorderedSpinners />
          <ColorsSpinners />
          <AlignmentSpinner />
          <SpinnersSizes />
        </Col>
        <Col xl={6}>
          <GrowingSpinners />
          <ColorGrowingSpinners />
          <PlacementSpinners />
          <ButtonSpinners />
        </Col>
      </Row>
    </>
  )
}
export default Spinners
