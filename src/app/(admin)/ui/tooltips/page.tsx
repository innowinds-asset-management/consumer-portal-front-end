import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { colorVariants } from '@/context/constants'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Tooltips' }

const ExamplesTooltips = () => {
  return (
    <ComponentContainerCard title="Examples" description={<>Hover over the links below to see tooltips.</>}>
      <p className="muted mb-0">
        Tight pants next level keffiyeh &nbsp;
        <OverlayTrigger placement="top" overlay={<Tooltip className="danger-tooltip">Default tooltip</Tooltip>} trigger={['hover', 'focus']}>
          <Link href="" data-bs-toggle="tooltip" data-bs-title="Default tooltip">
            you probably
          </Link>
        </OverlayTrigger>
        &nbsp; haven&apos;t heard of them. Photo booth beard raw denim letterpress vegan messenger bag stumptown. Farm-to-table Photo booth beard
        seitan, mcsweeney&apos;s fixie sustainable quinoa 8-bit american apparel &nbsp;
        <OverlayTrigger placement="top" overlay={<Tooltip className="danger-tooltip">Another tooltip</Tooltip>} trigger={['hover', 'focus']}>
          <Link href="" data-bs-toggle="tooltip" data-bs-title="danger tooltip">
            have a
          </Link>
        </OverlayTrigger>
        &nbsp; terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo thundercats. Tofu biodiesel williamsburg marfa, four loko
        mcsweeney&apos;s cleanse vegan chambray. A really ironic artisan &nbsp;
        <OverlayTrigger placement="top" overlay={<Tooltip className="danger-tooltip">Another one here too</Tooltip>} trigger={['hover', 'focus']}>
          <Link href="" data-bs-toggle="tooltip">
            whatever
          </Link>
        </OverlayTrigger>
        &nbsp; keytar, scenester farm-to-table banksy Austin &nbsp;
        <OverlayTrigger placement="top" overlay={<Tooltip className="danger-tooltip">The last tip!</Tooltip>} trigger={['hover', 'focus']}>
          <Link href="" data-bs-toggle="tooltip" data-bs-title="">
            twitter handle
          </Link>
        </OverlayTrigger>
        &nbsp; freegan cred raw denim single-origin coffee viral.
      </p>
    </ComponentContainerCard>
  )
}

const DisabledElements = () => {
  return (
    <ComponentContainerCard
      title="Disabled Elements"
      description={
        <>
          Elements with the <code>disabled</code> attribute aren’t interactive, meaning users cannot focus, hover, or click them to trigger a tooltip
          (or popover). As a workaround, you’ll want to trigger the tooltip from a wrapper <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code>,
          ideally made keyboard-focusable using <code>tabindex=&quot;0&quot;</code>, and override the
          <code>pointer-events</code> on the disabled element.
        </>
      }>
      <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={<Tooltip>Disabled tooltip</Tooltip>}>
        <span className="d-inline-block" tabIndex={0} data-bs-toggle="tooltip" data-bs-title="Disabled tooltip">
          <button className="btn btn-primary pe-none z-4" type="button" disabled>
            Disabled button
          </button>
        </span>
      </OverlayTrigger>
    </ComponentContainerCard>
  )
}

const HoverElements = () => {
  return (
    <ComponentContainerCard
      title="Hover Elements"
      description={
        <>
          Elements with the <code>disabled</code> attribute aren’t interactive, meaning users cannot focus, hover, or click them to trigger a tooltip
          (or popover). As a workaround, you’ll want to trigger the tooltip from a wrapper <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code>,
          ideally made keyboard-focusable using <code>tabindex=&quot;0&quot;</code>, and override the
          <code>pointer-events</code> on the disabled element.
        </>
      }>
      <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={<Tooltip>Hover Only, Not a Focus</Tooltip>}>
        <button className="btn btn-primary" type="button" data-bs-toggle="tooltip" data-bs-trigger="hover">
          Hover
        </button>
      </OverlayTrigger>
    </ComponentContainerCard>
  )
}

const FourDirections = () => {
  return (
    <ComponentContainerCard
      title="Four Directions"
      description={<>Hover over the buttons below to see the four tooltips directions: top, right, bottom, and left.</>}>
      <div className="d-flex flex-wrap gap-2">
        <OverlayTrigger overlay={<Tooltip className="primary-tooltip">Tooltip on top</Tooltip>}>
          <button type="button" className="btn btn-info" data-bs-toggle="tooltip" data-bs-placement="top">
            Tooltip on top
          </button>
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={<Tooltip className="danger-tooltip">Tooltip on bottom</Tooltip>}>
          <button type="button" className="btn btn-info" data-bs-toggle="tooltip" data-bs-placement="bottom">
            Tooltip on bottom
          </button>
        </OverlayTrigger>
        <OverlayTrigger placement="left" overlay={<Tooltip className="danger-tooltip">Tooltip on left</Tooltip>}>
          <button type="button" className="btn btn-info" data-bs-toggle="tooltip" data-bs-placement="left">
            Tooltip on left
          </button>
        </OverlayTrigger>
        <OverlayTrigger placement="right" overlay={<Tooltip className="danger-tooltip">Tooltip on right</Tooltip>}>
          <button type="button" className="btn btn-info" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Tooltip on right">
            Tooltip on right
          </button>
        </OverlayTrigger>
      </div>
    </ComponentContainerCard>
  )
}

const HTMLTags = () => {
  return (
    <ComponentContainerCard title="HTML Tags" description={<>And with custom HTML added:</>}>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip className="danger-tooltip">
            <em>Tooltip</em> <u>with</u> <b>HTML</b>
          </Tooltip>
        }>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-html="true"
          data-bs-title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
          Tooltip with HTML
        </button>
      </OverlayTrigger>
    </ComponentContainerCard>
  )
}

const ColorTooltips = () => {
  return (
    <ComponentContainerCard
      title="Color Tooltips"
      description={
        <p className="text-muted fs-14 mb-0">
          We set a custom class with ex. <code>data-bs-custom-class=&quot;primary-tooltip&quot;</code> to scope our background-color primary
          appearance and use it to override a local CSS variable.
        </p>
      }>
      <div className="d-flex flex-wrap gap-2">
        {colorVariants.slice(0, 7).map((color, idx) => {
          return (
            <OverlayTrigger
              placement="top"
              key={idx}
              overlay={<Tooltip className={`tooltip-${color}`}>This top tooltip is themed via CSS variables.</Tooltip>}>
              <Button variant={color} type="button">
                Primary tooltip
              </Button>
            </OverlayTrigger>
          )
        })}
      </div>
    </ComponentContainerCard>
  )
}

const Tooltips = () => {
  return (
    <>
      <PageTitle title="Tooltips" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <ExamplesTooltips />
          <DisabledElements />
          <HoverElements />
        </Col>
        <Col xl={6}>
          <FourDirections />
          <HTMLTags />
          <ColorTooltips />
        </Col>
      </Row>
    </>
  )
}

export default Tooltips
