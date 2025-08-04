import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Metadata } from 'next'
import { ButtonGroup as BSButtonGroup, Button, Card, CardBody, CardHeader, Col, DropdownButton, DropdownItem, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Buttons' }

const DefaultButtons = () => {
  return (
    <ComponentContainerCard
      title="Default Buttons"
      description={
        <>
          Use the button classes on an <code>&lt;a&gt;</code>, <code>&lt;button&gt;</code>, or <code>&lt;input&gt;</code> element.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary">
          Primary
        </button>
        <button type="button" className="btn btn-secondary">
          Secondary
        </button>
        <button type="button" className="btn btn-success">
          Success
        </button>
        <button type="button" className="btn btn-danger">
          Danger
        </button>
        <button type="button" className="btn btn-warning">
          Warning
        </button>
        <button type="button" className="btn btn-info">
          Info
        </button>
        <button type="button" className="btn btn-light">
          Light
        </button>
        <button type="button" className="btn btn-dark">
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const ButtonOutline = () => {
  return (
    <ComponentContainerCard
      title="Button Outline"
      description={
        <>
          Use a classes <code>.btn-outline-**</code> to quickly create a bordered buttons.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-outline-primary">
          Primary
        </button>
        <button type="button" className="btn btn-outline-secondary">
          Secondary
        </button>
        <button type="button" className="btn btn-outline-success">
          Success
        </button>
        <button type="button" className="btn btn-outline-danger">
          Danger
        </button>
        <button type="button" className="btn btn-outline-warning">
          Warning
        </button>
        <button type="button" className="btn btn-outline-info">
          Info
        </button>
        <button type="button" className="btn btn-outline-light">
          Light
        </button>
        <button type="button" className="btn btn-outline-dark">
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const ButtonRounded = () => {
  return (
    <ComponentContainerCard
      title="Button-Rounded"
      description={
        <>
          Add <code>.rounded-pill</code> to default button to get rounded corners.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary rounded-pill">
          Primary
        </button>
        <button type="button" className="btn btn-secondary rounded-pill">
          Secondary
        </button>
        <button type="button" className="btn btn-success rounded-pill">
          Success
        </button>
        <button type="button" className="btn btn-danger rounded-pill">
          Danger
        </button>
        <button type="button" className="btn btn-warning rounded-pill">
          Warning
        </button>
        <button type="button" className="btn btn-info rounded-pill">
          Info
        </button>
        <button type="button" className="btn btn-light rounded-pill">
          Light
        </button>
        <button type="button" className="btn btn-dark rounded-pill">
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const ButtonOutlineRounded = () => {
  return (
    <ComponentContainerCard
      title="Button Outline Rounded"
      description={
        <>
          Use a classes <code>.btn-outline-**</code> to quickly create a bordered buttons.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-outline-primary rounded-pill">
          Primary
        </button>
        <button type="button" className="btn btn-outline-secondary rounded-pill">
          Secondary
        </button>
        <button type="button" className="btn btn-outline-success rounded-pill">
          Success
        </button>
        <button type="button" className="btn btn-outline-danger rounded-pill">
          Danger
        </button>
        <button type="button" className="btn btn-outline-warning rounded-pill">
          Warning
        </button>
        <button type="button" className="btn btn-outline-info rounded-pill">
          Info
        </button>
        <button type="button" className="btn btn-outline-dark rounded-pill">
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const SoftButtons = () => {
  return (
    <ComponentContainerCard
      title="Soft Buttons"
      description={
        <>
          Use a classes <code>.btn-soft-**</code> to quickly create a soft background color buttons.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-soft-primary">
          Primary
        </button>
        <button type="button" className="btn btn-soft-secondary">
          Secondary
        </button>
        <button type="button" className="btn btn-soft-success">
          Success
        </button>
        <button type="button" className="btn btn-soft-danger">
          Danger
        </button>
        <button type="button" className="btn btn-soft-warning">
          Warning
        </button>
        <button type="button" className="btn btn-soft-info">
          Info
        </button>
        <button type="button" className="btn btn-soft-dark">
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const SoftRoundedButtons = () => {
  return (
    <ComponentContainerCard
      title="Soft Rounded Buttons"
      description={
        <>
          Use a classes <code>.btn-soft-**</code> <code>.rounded-pill</code> to quickly create a soft background color buttons with rounded.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-soft-primary rounded-pill">
          Primary
        </button>
        <button type="button" className="btn btn-soft-secondary rounded-pill">
          Secondary
        </button>
        <button type="button" className="btn btn-soft-success rounded-pill">
          Success
        </button>
        <button type="button" className="btn btn-soft-danger rounded-pill">
          Danger
        </button>
        <button type="button" className="btn btn-soft-warning rounded-pill">
          Warning
        </button>
        <button type="button" className="btn btn-soft-info rounded-pill">
          Info
        </button>
        <button type="button" className="btn btn-soft-dark rounded-pill">
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const GradientButtons = () => {
  return (
    <ComponentContainerCard
      title="Gradient Buttons"
      description={
        <>
          Use the button classes on an <code>&lt;a&gt;</code>, <code>&lt;button&gt;</code>, or <code>&lt;input&gt;</code> element.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary bg-gradient">
          Primary
        </button>
        <button type="button" className="btn btn-secondary bg-gradient">
          Secondary
        </button>
        <button type="button" className="btn btn-success bg-gradient">
          Success
        </button>
        <button type="button" className="btn btn-danger bg-gradient">
          Danger
        </button>
        <button type="button" className="btn btn-soft-warning bg-gradient">
          Warning
        </button>
        <button type="button" className="btn btn-soft-info bg-gradient">
          Info
        </button>
        <button type="button" className="btn btn-soft-dark bg-gradient">
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const GradientRoundedButtons = () => {
  return (
    <ComponentContainerCard
      title="Gradient Rounded Buttons"
      description={
        <>
          Use a classes <code>.btn-outline-**</code> to quickly create a bordered buttons.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary bg-gradient rounded-pill">
          Primary
        </button>
        <button type="button" className="btn btn-secondary bg-gradient rounded-pill">
          Secondary
        </button>
        <button type="button" className="btn btn-soft-success bg-gradient rounded-pill">
          Success
        </button>
        <button type="button" className="btn btn-soft-danger bg-gradient rounded-pill">
          Danger
        </button>
        <button type="button" className="btn btn-soft-warning bg-gradient rounded-pill">
          Warning
        </button>
        <button type="button" className="btn btn-info bg-gradient rounded-pill">
          Info
        </button>
        <button type="button" className="btn btn-dark bg-gradient rounded-pill">
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const GhostButtons = () => {
  return (
    <ComponentContainerCard
      title="Ghost Buttons"
      description={
        <>
          Use a classes <code>.btn-ghost-**</code> to quickly create a ghost background color buttons.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-ghost-primary">
          Primary
        </button>
        <button type="button" className="btn btn-ghost-secondary">
          Secondary
        </button>
        <button type="button" className="btn btn-ghost-success">
          Success
        </button>
        <button type="button" className="btn btn-ghost-danger">
          Danger
        </button>
        <button type="button" className="btn btn-ghost-warning">
          Warning
        </button>
        <button type="button" className="btn btn-ghost-info">
          Info
        </button>
        <button type="button" className="btn btn-ghost-dark">
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const GhostRoundedButtons = () => {
  return (
    <ComponentContainerCard
      title="Ghost Rounded Buttons"
      description={
        <>
          Use a classes <code>.btn-ghost-**</code> <code>.rounded-pill</code> to quickly create a ghost background color buttons with rounded.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-ghost-primary rounded-pill">
          Primary
        </button>
        <button type="button" className="btn btn-ghost-secondary rounded-pill">
          Secondary
        </button>
        <button type="button" className="btn btn-ghost-success rounded-pill">
          Success
        </button>
        <button type="button" className="btn btn-ghost-danger rounded-pill">
          Danger
        </button>
        <button type="button" className="btn btn-ghost-warning rounded-pill">
          Warning
        </button>
        <button type="button" className="btn btn-ghost-info rounded-pill">
          Info
        </button>
        <button type="button" className="btn btn-ghost-dark rounded-pill">
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const ButtonSizes = () => {
  return (
    <ComponentContainerCard
      title="Button-Sizes"
      description={
        <>
          Add <code>.btn-lg</code>, <code>.btn-sm</code> for additional sizes.
        </>
      }>
      <div className="d-flex flex-wrap align-items-center gap-2">
        <button type="button" className="btn btn-primary btn-lg">
          Large
        </button>
        <button type="button" className="btn btn-info">
          Normal
        </button>
        <button type="button" className="btn btn-success btn-sm">
          Small
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const ButtonDisabled = () => {
  return (
    <ComponentContainerCard
      title="Button-Disabled"
      description={
        <>
          Add the <code>disabled</code> attribute to <code>&lt;button&gt;</code> buttons.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-info" disabled>
          Info
        </button>
        <button type="button" className="btn btn-success" disabled>
          Success
        </button>
        <button type="button" className="btn btn-danger" disabled>
          Danger
        </button>
        <button type="button" className="btn btn-dark" disabled>
          Dark
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const IconButtons = () => {
  return (
    <ComponentContainerCard title="Icon Buttons" description={<>Icon only button.</>}>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-light btn-icon">
          <IconifyIcon icon="tabler:heart" className="fs-16" />
        </button>
        <button type="button" className="btn btn-danger btn-icon">
          <IconifyIcon icon="lucide:apple" className="avatar-xxs" />
        </button>
        <button type="button" className="btn btn-dark btn-icon">
          <IconifyIcon icon="tabler:adjustments-alt" className="fs-18" />
        </button>
        <button type="button" className="btn btn-soft-primary btn-icon">
          <IconifyIcon icon="solar:add-circle-bold-duotone" className="fs-20" />
        </button>
        <button type="button" className="btn btn-soft-success btn-icon">
          <IconifyIcon icon="tabler:alert-hexagon" className="fs-20" />
        </button>
        <button type="button" className="btn btn-info btn-icon">
          <IconifyIcon icon="tabler:ambulance" className="fs-18" />
        </button>
        <button type="button" className="btn btn-soft-warning btn-icon">
          <IconifyIcon icon="tabler:music" className="fs-18" />
        </button>
        <button type="button" className="btn btn-light">
          <IconifyIcon icon="tabler:thumb-up" className="align-middle me-1 fs-18" /> Like
        </button>
        <button type="button" className="btn btn-warning">
          <IconifyIcon icon="lucide:activity" className="avatar-xxs me-1" /> Launch
        </button>
        <button type="button" className="btn btn-outline-success">
          <IconifyIcon icon="tabler:pig-money" className="align-middle me-1 fs-18" /> Money
        </button>
        <button type="button" className="btn btn-outline-primary">
          <IconifyIcon icon="tabler:brand-paypal" className="align-middle me-1 fs-18" /> PayPal
        </button>
        <button type="button" className="btn btn-soft-danger">
          <IconifyIcon icon="solar:settings-bold-duotone" className="fs-18 align-middle me-1" /> <span>Settings</span>
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const BlockButton = () => {
  return (
    <ComponentContainerCard
      title="Block Button"
      description={
        <>
          Create block level buttons by adding class <code>.d-grid</code> to parent div.
        </>
      }>
      <div className="d-grid gap-2">
        <button type="button" className="btn btn-sm btn-primary">
          Block Button
        </button>
        <button type="button" className="btn btn-lg btn-success">
          Block Button
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const ButtonGroup = () => {
  return (
    <ComponentContainerCard
      title="Button Group"
      description={
        <>
          Wrap a series of buttons with <code>.btn</code> in <code>.btn-group</code>.
        </>
      }>
      <div className="btn-group mb-2">
        <button type="button" className="btn btn-light">
          Left
        </button>
        <button type="button" className="btn btn-light">
          Middle
        </button>
        <button type="button" className="btn btn-light">
          Right
        </button>
      </div>
      <br />
      <div className="btn-group mb-2">
        <button type="button" className="btn btn-light">
          1
        </button>
        <button type="button" className="btn btn-light">
          2
        </button>
        <button type="button" className="btn btn-light">
          3
        </button>
        <button type="button" className="btn btn-light">
          4
        </button>
      </div>
      &nbsp;
      <div className="btn-group mb-2">
        <button type="button" className="btn btn-light">
          5
        </button>
        <button type="button" className="btn btn-light">
          6
        </button>
        <button type="button" className="btn btn-light">
          7
        </button>
      </div>
      &nbsp;
      <div className="btn-group mb-2">
        <button type="button" className="btn btn-light">
          8
        </button>
      </div>
      <br />
      <div className="btn-group mb-2">
        <button type="button" className="btn btn-light">
          1
        </button>
        <button type="button" className="btn btn-primary">
          2
        </button>
        <button type="button" className="btn btn-light">
          3
        </button>
        <DropdownButton as={BSButtonGroup} title="Dropdown" variant="light">
          <DropdownItem>Dropdown link</DropdownItem>
          <DropdownItem>Dropdown link</DropdownItem>
        </DropdownButton>
      </div>
      <Row>
        <Col md={3}>
          <div className="btn-group-vertical mb-2">
            <button type="button" className="btn btn-light">
              Top
            </button>
            <button type="button" className="btn btn-light">
              Middle
            </button>
            <button type="button" className="btn btn-light">
              Bottom
            </button>
          </div>
        </Col>
        <Col md={3}>
          <div className="btn-group-vertical mb-2">
            <button type="button" className="btn btn-light">
              Button 1
            </button>
            <button type="button" className="btn btn-light">
              Button 2
            </button>
            <DropdownButton as={BSButtonGroup} title="Button 3" variant="light">
              <DropdownItem>Dropdown link</DropdownItem>
              <DropdownItem>Dropdown link</DropdownItem>
            </DropdownButton>
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const ToggleButton = () => {
  return (
    <ComponentContainerCard
      title="Toggle Button"
      description={
        <>
          Add <code>data-bs-toggle=&quot;button&quot;</code> to toggle a button&apos;s <code>active</code> state. If you’re pre-toggling a button, you
          must manually add the <code>.active</code> class <strong>and</strong> <code>aria-pressed=&quot;true&quot;</code> to ensure that it is
          conveyed appropriately to assistive technologies.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" data-bs-toggle="button">
          Toggle button
        </button>
        <button type="button" className="btn btn-primary active" data-bs-toggle="button" aria-pressed="true">
          Active toggle button
        </button>
        <button type="button" className="btn btn-primary" disabled data-bs-toggle="button">
          Disabled toggle button
        </button>
      </div>
    </ComponentContainerCard>
  )
}

const ButtonTags = () => {
  return (
    <ComponentContainerCard
      title="Button tags"
      description={
        <>
          The <code>.btn</code> classes are designed to be used with the <code>&lt;button&gt;</code> element. However, you can also use these classes
          on <code>&lt;a&gt;</code> or <code>&lt;input&gt;</code> elements (though some browsers may apply a slightly different rendering).
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" role="button">
          Link
        </Button>
        <button className="btn btn-primary" type="submit">
          Button
        </button>
        <input className="btn btn-primary" type="button" defaultValue="Input" />
        <input className="btn btn-primary" type="submit" defaultValue="Submit" />
        <input className="btn btn-primary" type="reset" defaultValue="Reset" />
      </div>
    </ComponentContainerCard>
  )
}

const BasicButton = () => {
  return (
    <Card>
      <CardHeader className="border-bottom border-dashed d-flex align-items-center">
        <h4 className="header-title">Basic Button</h4>
      </CardHeader>
      <CardBody>
        <p className="text-muted">
          Bootstrap has a base <code>.btn</code> class that sets up basic styles such as padding and content alignment. By default, <code>.btn</code>
          controls have a transparent border and background color, and lack any explicit focus and hover styles.
        </p>
        <button type="button" className="btn">
          Base class
        </button>
      </CardBody>
    </Card>
  )
}

const ButtonsPage = () => {
  return (
    <>
      <PageTitle title="Buttons" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <DefaultButtons />
        </Col>
        <Col xl={6}>
          <ButtonOutline />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ButtonRounded />
        </Col>
        <Col xl={6}>
          <ButtonOutlineRounded />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <SoftButtons />
        </Col>
        <Col xl={6}>
          <SoftRoundedButtons />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <GradientButtons />
        </Col>
        <Col xl={6}>
          <GradientRoundedButtons />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <GhostButtons />
        </Col>
        <Col xl={6}>
          <GhostRoundedButtons />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ButtonSizes />
        </Col>
        <Col xl={6}>
          <ButtonDisabled />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <IconButtons />
        </Col>
        <Col xl={6}>
          <BlockButton />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ButtonGroup />
        </Col>
        <Col xl={6}>
          <Row>
            <Col xl={12}>
              <ToggleButton />
            </Col>
            <Col xl={12}>
              <ButtonTags />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <BasicButton />
        </Col>
      </Row>
    </>
  )
}

export default ButtonsPage
