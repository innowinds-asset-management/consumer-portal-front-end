import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import React from 'react'
import { Button, Col, OverlayProps, OverlayTrigger, Popover, PopoverBody, PopoverHeader, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Popovers' }

interface PopoverDirection {
  placement: OverlayProps['placement']
}

const SimplePopover = () => {
  const basicPopover = (
    <Popover id="popover-basic">
      <PopoverHeader as="h3">Popover title</PopoverHeader>
      <PopoverBody>And here&apos;s some amazing content. It&apos;s very engaging. Right?</PopoverBody>
    </Popover>
  )
  return (
    <ComponentContainerCard
      title="Simple Popover"
      description={
        <>
          Popover is a component which displays a box with a content after a click on an element - similar to the tooltip but can contain more
          content.
        </>
      }>
      <OverlayTrigger trigger={'click'} placement="right" overlay={basicPopover}>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="popover"
          title="Popover title"
          data-bs-content="And here's some amazing content. It's very engaging. Right?">
          Click to toggle popover
        </button>
      </OverlayTrigger>
    </ComponentContainerCard>
  )
}

const DismissOnPopover = () => {
  const dismissiblePopover = (
    <Popover>
      <PopoverHeader as="h3">Dismissible popover</PopoverHeader>
      <PopoverBody>And here&apos;s some amazing content. It&apos;s very engaging. Right?</PopoverBody>
    </Popover>
  )
  return (
    <ComponentContainerCard
      title="Dismiss on Next Click"
      description={
        <>
          Use the <code>focus</code> trigger to dismiss popovers on the user’s next click of a different element than the toggle element.
        </>
      }>
      <OverlayTrigger trigger="focus" placement="right" overlay={dismissiblePopover}>
        <button
          tabIndex={0}
          type="button"
          className="btn btn-success"
          data-bs-toggle="popover"
          data-bs-trigger="focus"
          data-bs-content="And here's some amazing content. It's very engaging. Right?"
          title="Dismissible popover">
          Dismissible popover
        </button>
      </OverlayTrigger>
    </ComponentContainerCard>
  )
}

const HoverPopovers = () => {
  const hoverPopover = (
    <Popover>
      <PopoverHeader as="h3">Ohh Wow !</PopoverHeader>
      <PopoverBody>And here&apos;s some amazing content. It&apos;s very engaging. Right?</PopoverBody>
    </Popover>
  )
  return (
    <ComponentContainerCard
      title="Hover"
      description={
        <>
          Use the attribute <code>data-bs-trigger=&quot;hover&quot;</code>
          to show the popover on hovering the element.
        </>
      }>
      <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={hoverPopover}>
        <button
          type="button"
          tabIndex={0}
          className="btn btn-dark"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-content="And here's some amazing content. It's very engaging. Right?"
          title="Ohh Wow !">
          Please Hover Me
        </button>
      </OverlayTrigger>
    </ComponentContainerCard>
  )
}

const FourDirections = () => {
  const directions: PopoverDirection[] = [{ placement: 'top' }, { placement: 'bottom' }, { placement: 'right' }, { placement: 'left' }]
  return (
    <ComponentContainerCard title="Four Directions" description={<>Four options are available: top, right, bottom, and left aligned.</>}>
      <div className="d-flex flex-wrap gap-2">
        {(directions || []).map((direction, idx) => (
          <OverlayTrigger
            trigger="click"
            key={idx}
            placement={direction.placement}
            overlay={
              <Popover id={`popover-positioned-${direction.placement}`}>
                <PopoverBody>Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</PopoverBody>
              </Popover>
            }>
            <Button variant="primary">Popover on {direction.placement}</Button>
          </OverlayTrigger>
        ))}
      </div>
    </ComponentContainerCard>
  )
}

const CustomPopovers = () => {
  const customPopover = (variant: string) => (
    <Popover className={`popover-${variant}`}>
      <PopoverHeader as="h3">Primary Popover</PopoverHeader>
      <PopoverBody>This popover is themed via CSS variables.</PopoverBody>
    </Popover>
  )

  return (
    <ComponentContainerCard
      title="Custom Popovers"
      description={
        <>
          You can customize the appearance of popovers using CSS variables. We set a custom class with&nbsp;
          <code>data-bs-custom-class=&quot;primary-popover&quot;</code> to scope our custom appearance and use it to override some of the local CSS
          variables.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('primary')}>
          <Button variant="primary">Primary popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('success')}>
          <Button variant="success">Success popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('danger')}>
          <Button variant="danger">Danger popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('info')}>
          <Button variant="info">Info popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('dark')}>
          <Button variant="dark">Dark popover</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={customPopover('secondary')}>
          <Button variant="secondary">Secondary popover</Button>
        </OverlayTrigger>
      </div>
    </ComponentContainerCard>
  )
}

const DisabledPopover = () => {
  const disabledPopover = (
    <Popover>
      <PopoverBody>Disabled popover</PopoverBody>
    </Popover>
  )

  return (
    <ComponentContainerCard
      title="Disabled Elements"
      description={
        <>
          Elements with the <code>disabled</code> attribute aren&apos;t interactive, meaning users cannot hover or click them to trigger a popover (or
          tooltip). As a workaround, you&apos;ll want to trigger the popover from a wrapper <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code> and
          override the <code>pointer-events</code> on the disabled element.
        </>
      }>
      <OverlayTrigger placement="right" overlay={disabledPopover}>
        <span className="d-inline-block">
          <Button disabled style={{ pointerEvents: 'none' }}>
            Disabled button
          </Button>
        </span>
      </OverlayTrigger>
    </ComponentContainerCard>
  )
}

const Popovers = () => {
  return (
    <>
      <PageTitle title="Popovers" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <SimplePopover />
          <DismissOnPopover />
          <HoverPopovers />
        </Col>
        <Col xl={6}>
          <FourDirections />
          <CustomPopovers />
          <DisabledPopover />
        </Col>
      </Row>
    </>
  )
}

export default Popovers
