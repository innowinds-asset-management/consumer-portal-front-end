import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import { Col, ProgressBar, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Progress' }

const Example = () => {
  return (
    <ComponentContainerCard title="Examples" description={<>A progress bar can be used to show a user how far along he/she is in a process.</>}>
      <ProgressBar className="mb-2" now={0} />
      <ProgressBar className="mb-2" now={25} />
      <ProgressBar className="mb-2" now={50} />
      <ProgressBar className="mb-2" now={75} />
      <ProgressBar className="progress" now={100} />
    </ComponentContainerCard>
  )
}

const HeightProgressBar = () => {
  return (
    <ComponentContainerCard
      title="Height"
      description={
        <>
          We only set a <code>height</code> value on the <code>.progress</code>, so if you change that value the inner <code>.progress-bar</code> will
          automatically resize accordingly. Use <code>.progress-sm</code>,<code>.progress-md</code>,<code>.progress-lg</code>,
          <code>.progress-xl</code> classes.
        </>
      }>
      <ProgressBar now={25} variant="danger" className="mb-2" style={{ height: 1 }} />
      <ProgressBar now={25} variant="primary" className="mb-2" style={{ height: 3 }} />
      <ProgressBar now={25} variant="success" className="mb-2 progress-sm" />
      <ProgressBar now={50} variant="info" className="mb-2 progress-md" />
      <ProgressBar now={75} variant="warning" className="progress-lg mb-2" />
      <ProgressBar now={38} variant="success" className="progress-xl" />
    </ComponentContainerCard>
  )
}

const MultipleBars = () => {
  return (
    <ComponentContainerCard title="Multiple bars" description={<>Include multiple progress bars in a progress component if you need.</>}>
      <ProgressBar className="progress">
        <ProgressBar now={15}></ProgressBar>
        <ProgressBar now={30} variant="success" className="bg-success" />
        <ProgressBar now={20} variant="info" className="bg-info" />
      </ProgressBar>
    </ComponentContainerCard>
  )
}

const AnimatedStripes = () => {
  return (
    <ComponentContainerCard
      title="Animated stripes"
      description={
        <>
          The striped gradient can also be animated. Add <code>.progress-bar-animated</code> to <code>.progress-bar</code> to animate the stripes
          right to left via CSS3 animations.
        </>
      }>
      <ProgressBar now={75} animated className="progress" />
    </ComponentContainerCard>
  )
}

const StepsProgressBar = () => {
  return (
    <ComponentContainerCard
      title="Steps"
      description={
        <>
          Add <code>.progress-bar-striped</code> to any <code>.progress-bar</code> to apply a stripe via CSS gradient over the progress bar’s
          background color.
        </>
      }>
      <div className="position-relative m-4">
        <ProgressBar now={50} style={{ height: 2 }} className="bg-light" />
        <button type="button" className="position-absolute top-0 start-0 translate-middle btn btn-icon btn-primary rounded-pill">
          1
        </button>
        <button type="button" className="position-absolute top-0 start-50 translate-middle btn btn-icon btn-primary rounded-pill">
          2
        </button>
        <button type="button" className="position-absolute top-0 start-100 translate-middle btn btn-icon btn-light rounded-pill">
          3
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const LabelsBar = () => {
  return (
    <ComponentContainerCard
      title="Labels"
      description={
        <>
          Add labels to your progress bars by placing text within the <code>.progress-bar</code>.
        </>
      }>
      <ProgressBar now={25} className="mb-3" label="25%" />
      <ProgressBar now={10} className="text-dark" label="Long label text for the progress bar, set to a dark color" />
    </ComponentContainerCard>
  )
}

const BackgroundBar = () => {
  return (
    <ComponentContainerCard
      title="Backgrounds"
      description={<>Use background utility classes to change the appearance of individual progress bars.</>}>
      <ProgressBar now={25} variant="success" className="mb-2" />
      <ProgressBar now={50} variant="info" className="mb-2" />
      <ProgressBar now={75} variant="warning" className="mb-2" />
      <ProgressBar now={100} variant="danger" className="mb-2" />
      <ProgressBar now={65} variant="dark" className="mb-2" />
      <ProgressBar now={50} variant="secondary" />
    </ComponentContainerCard>
  )
}

const CustomBackgroundBar = () => {
  return (
    <ComponentContainerCard
      title="Backgrounds (Custom)"
      description={<>Use background utility classes to change the appearance of individual progress bars.</>}>
      <ProgressBar now={25} variant="success" className="mb-2 progress-soft" />
      <ProgressBar now={50} variant="info" className="mb-2 progress-soft" />
      <ProgressBar now={75} variant="warning" className="mb-2 progress-soft" />
      <ProgressBar now={100} variant="danger" className="mb-2 progress-soft" />
      <ProgressBar now={65} variant="dark" className="mb-2 progress-soft" />
      <ProgressBar now={50} variant="secondary" className="progress-soft" />
    </ComponentContainerCard>
  )
}

const StripedBar = () => {
  return (
    <ComponentContainerCard
      title="Striped"
      description={
        <>
          Add <code>.progress-bar-striped</code> to any <code>.progress-bar</code> to apply a stripe via CSS gradient over the progress bar’s
          background color.
        </>
      }>
      <ProgressBar now={10} striped className="mb-2" />
      <ProgressBar now={25} striped variant="success" className="mb-2" />
      <ProgressBar now={50} striped variant="info" className="mb-2" />
      <ProgressBar now={75} striped variant="warning" className="mb-2" />
      <ProgressBar now={100} striped variant="danger" className="mb-2" />
    </ComponentContainerCard>
  )
}

const Progress = () => {
  return (
    <>
      <PageTitle title="Progress" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <Example />
          <HeightProgressBar />
          <MultipleBars />
          <AnimatedStripes />
          <StepsProgressBar />
        </Col>
        <Col xl={6}>
          <LabelsBar />
          <BackgroundBar />
          <CustomBackgroundBar />
          <StripedBar />
        </Col>
      </Row>
    </>
  )
}

export default Progress
