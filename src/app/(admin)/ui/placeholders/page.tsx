import small1 from '@/assets/images/small/small-1.jpg'
import small2 from '@/assets/images/small/small-2.jpg'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import Image from 'next/image'
import { Button, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Placeholders' }

const DefaultPlaceholders = () => {
  return (
    <ComponentContainerCard
      title="Placeholders"
      description={
        <>
          In the example below, we take a typical card component and recreate it with placeholders applied to create a “loading card”. Size and
          proportions are the same between the two.
        </>
      }>
      <Row>
        <Col md={6}>
          <Card className="border shadow-none mb-md-0">
            <Image src={small1} width={355} height={236} className="card-img-top img-fluid" alt="..." />
            <CardBody>
              <CardTitle as={'h5'}>Card title</CardTitle>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
              <Button variant="primary">Go somewhere</Button>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border shadow-none mb-0" aria-hidden="true">
            <Image src={small2} width={355} height={236} className="card-img-top img-fluid" alt="..." />
            <CardBody>
              <h5 className="header-title placeholder-glow">
                <span className="placeholder col-6" />
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7" />
                &nbsp;
                <span className="placeholder col-4" />
                <span className="placeholder col-4" />
                &nbsp;
                <span className="placeholder col-6" />
              </p>
              <Button variant="primary" className="disabled placeholder col-6" aria-disabled="true">
                <span className="invisible">Read Only</span>
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const ColorPlaceholders = () => {
  return (
    <ComponentContainerCard
      title="Color"
      description={
        <>
          By default, the <code>placeholder</code> uses <code>currentColor</code>. This can be overriden with a custom color or utility class.
        </>
      }>
      <span className="placeholder col-12" />
      <span className="placeholder col-12 bg-primary" />
      <span className="placeholder col-12 bg-secondary" />
      <span className="placeholder col-12 bg-success" />
      <span className="placeholder col-12 bg-danger" />
      <span className="placeholder col-12 bg-warning" />
      <span className="placeholder col-12 bg-info" />
      <span className="placeholder col-12 bg-light" />
      <span className="placeholder col-12 bg-dark" />
    </ComponentContainerCard>
  )
}

const WidthPlaceholders = () => {
  return (
    <ComponentContainerCard
      title="Width"
      description={
        <>
          You can change the <code>width</code> through grid column classes, width utilities, or inline styles.
        </>
      }>
      <span className="placeholder col-6" />
      <span className="placeholder w-75" />
      <span className="placeholder" style={{ width: '25%' }} /> <br />
      <span className="placeholder" style={{ width: '10%' }} />
    </ComponentContainerCard>
  )
}

const SizingPlaceholders = () => {
  return (
    <ComponentContainerCard
      title="Sizing"
      description={
        <>
          The size of <code>.placeholder</code>s are based on the typographic style of the parent element. Customize them with sizing modifiers:
          <code>.placeholder-lg</code>, <code>.placeholder-sm</code>, or <code>.placeholder-xs</code>.
        </>
      }>
      <span className="placeholder col-12 placeholder-lg" />
      <span className="placeholder col-12" />
      <span className="placeholder col-12 placeholder-sm" />
      <span className="placeholder col-12 placeholder-xs" />
    </ComponentContainerCard>
  )
}

const WorksPlaceholder = () => {
  return (
    <ComponentContainerCard
      title="How it works"
      description={
        <>
          Create placeholders with the <code>.placeholder</code> class and a grid column class (e.g., <code>.col-6</code>) to set the
          <code>width</code>. They can replace the text inside an element or as be added as a modifier class to an existing component.
        </>
      }>
      <p aria-hidden="true">
        <span className="placeholder col-6" />
      </p>
      <Button variant="primary" className="disabled placeholder col-4" aria-hidden="true" />
    </ComponentContainerCard>
  )
}

const AnimationPlaceholder = () => {
  return (
    <ComponentContainerCard
      title="Animation"
      description={
        <>
          Animate placehodlers with <code>.placeholder-glow</code> or <code>.placeholder-wave</code> to better convey the perception of something
          being <em>actively</em> loaded.
        </>
      }>
      <p className="placeholder-glow">
        <span className="placeholder col-12" />
      </p>
      <p className="placeholder-wave mb-0">
        <span className="placeholder col-12" />
      </p>
    </ComponentContainerCard>
  )
}

const Placeholders = () => {
  return (
    <div>
      <PageTitle title="Placeholders" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <DefaultPlaceholders />
        </Col>
        <Col xl={6}>
          <ColorPlaceholders />
          <WidthPlaceholders />
        </Col>
        <Col xl={6}>
          <SizingPlaceholders />
        </Col>
        <Col xl={6}>
          <WorksPlaceholder />
        </Col>
        <Col xl={6}>
          <AnimationPlaceholder />
        </Col>
      </Row>
    </div>
  )
}

export default Placeholders
