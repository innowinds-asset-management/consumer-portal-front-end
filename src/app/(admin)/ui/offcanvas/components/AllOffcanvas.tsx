'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import useToggle from '@/hooks/useToggle'
import { Button, Col, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Row } from 'react-bootstrap'
import { BackdropOption, backdropOptions, PlacementOption, placementOptions } from '../data'

const DefaultOffcanvas = () => {
  const { isTrue, toggle } = useToggle()
  return (
    <ComponentContainerCard
      title="Offcanvas"
      description={
        <>
          You can use a link with the <code>href</code> attribute, or a button with the <code>data-bs-target</code> attribute. In both cases, the
          <code>data-bs-toggle=&quot;offcanvas&quot;</code> is required.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={toggle} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          Link with href
        </Button>
      </div>
      <Offcanvas
        show={isTrue}
        onHide={toggle}
        className="offcanvas-start"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel">
        <OffcanvasHeader>
          <OffcanvasTitle as={'h4'} id="offcanvasExampleLabel">
            Offcanvas
          </OffcanvasTitle>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
        </OffcanvasHeader>
        <OffcanvasBody>
          <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
          <h5 className="mt-3">List</h5>
          <ul className="ps-3">
            <li>Nemo enim ipsam voluptatem quia aspernatur</li>
            <li>Neque porro quisquam est, qui dolorem</li>
            <li>Quis autem vel eum iure qui in ea</li>
          </ul>
          <ul className="ps-3">
            <li>At vero eos et accusamus et iusto odio dignissimos</li>
            <li>Et harum quidem rerum facilis</li>
            <li>Temporibus autem quibusdam et aut officiis</li>
          </ul>
        </OffcanvasBody>
      </Offcanvas>
    </ComponentContainerCard>
  )
}

const OffcanvasBackdrop = () => {
  const OffCanvasWithBackdrop = ({ name, ...props }: BackdropOption) => {
    const { isTrue, toggle } = useToggle()
    return (
      <>
        <Button onClick={toggle} type="button" className="mt-2 me-1 mt-md-0">
          {name}
        </Button>
        &nbsp;
        <Offcanvas placement="start" show={isTrue} onHide={toggle} {...props}>
          <OffcanvasHeader closeButton>
            <OffcanvasTitle as="h5" className="mt-0" id="offcanvasScrollingLabel">
              {name}
            </OffcanvasTitle>
          </OffcanvasHeader>
          <OffcanvasBody>
            <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
            <h5 className="mt-3">List</h5>
            <ul className="ps-3">
              <li>Nemo enim ipsam voluptatem quia aspernatur</li>
              <li>Neque porro quisquam est, qui dolorem</li>
              <li>Quis autem vel eum iure qui in ea</li>
            </ul>
            <ul className="ps-3">
              <li>At vero eos et accusamus et iusto odio dignissimos</li>
              <li>Et harum quidem rerum facilis</li>
              <li>Temporibus autem quibusdam et aut officiis</li>
            </ul>
          </OffcanvasBody>
        </Offcanvas>
      </>
    )
  }
  return (
    <ComponentContainerCard
      title="Offcanvas Backdrop"
      description={
        <>
          Scrolling the <code>&lt;body&gt;</code> element is disabled when an offcanvas and its backdrop are visible. Use the
          <code>data-bs-scroll</code> attribute to toggle <code>&lt;body&gt;</code> scrolling and <code>data-bs-backdrop</code> to toggle the
          backdrop.
        </>
      }>
      {backdropOptions.map((offcanvas, idx) => (
        <OffCanvasWithBackdrop {...offcanvas} key={idx} />
      ))}
    </ComponentContainerCard>
  )
}

const OffcanvasPlacement = () => {
  const OffcanvasPlacement = ({ name, ...props }: PlacementOption) => {
    const { isTrue, toggle } = useToggle()

    return (
      <>
        <Button onClick={toggle} className="mt-2 me-1 mt-md-0">
          Toggle {name} offcanvas
        </Button>
        <Offcanvas show={isTrue} onHide={toggle} {...props}>
          <OffcanvasHeader closeButton>
            <OffcanvasTitle as={'h5'} className="mt-0">
              Offcanvas {name}
            </OffcanvasTitle>
          </OffcanvasHeader>
          <OffcanvasBody>
            <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
            <h5 className="mt-3">List</h5>
            <ul className="ps-3">
              <li>Nemo enim ipsam voluptatem quia aspernatur</li>
              <li>Neque porro quisquam est, qui dolorem</li>
              <li>Quis autem vel eum iure qui in ea</li>
            </ul>
          </OffcanvasBody>
        </Offcanvas>
      </>
    )
  }

  return (
    <ComponentContainerCard
      title="Offcanvas Placement"
      description={
        <>
          <p className="text-muted">Try the right and bottom examples out below.</p>
          <ul className="text-muted">
            <li>
              <code>.offcanvas-start</code> places offcanvas on the left of the viewport (shown above)
            </li>
            <li>
              <code>.offcanvas-end</code> places offcanvas on the right of the viewport
            </li>
            <li>
              <code>.offcanvas-top</code> places offcanvas on the top of the viewport
            </li>
            <li>
              <code>.offcanvas-bottom</code> places offcanvas on the bottom of the viewport
            </li>
          </ul>
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        {placementOptions.map((props, idx) => (
          <OffcanvasPlacement {...props} key={idx} />
        ))}
      </div>
    </ComponentContainerCard>
  )
}

const DarkOffcanvas = () => {
  const { isTrue, toggle } = useToggle()
  return (
    <ComponentContainerCard
      title="Dark Offcanvas"
      description={
        <>
          Change the appearance of offcanvases with utilities to better match them to different contexts like dark navbars. Here we add
          <code>.text-bg-dark</code> to the <code>.offcanvas</code> and <code>.btn-close-white</code> to
          <code>.btn-close</code> for proper styling with a dark offcanvas. If you have dropdowns within, consider also adding
          <code>.dropdown-menu-dark</code> to <code>.dropdown-menu</code>.
        </>
      }>
      <div>
        <button
          onClick={toggle}
          className="btn btn-primary mt-2 mt-md-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDark"
          aria-controls="offcanvasDark">
          Dark offcanvas
        </button>
        <Offcanvas
          show={isTrue}
          onHide={toggle}
          className="offcanvas-start text-bg-dark"
          tabIndex={-1}
          id="offcanvasDark"
          aria-labelledby="offcanvasDarkLabel">
          <OffcanvasHeader>
            <h5 id="offcanvasDarkLabel">Dark Offcanvas</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
          </OffcanvasHeader>
          <OffcanvasBody>
            <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
            <h5 className="mt-3">List</h5>
            <ul className="ps-3">
              <li>Nemo enim ipsam voluptatem quia aspernatur</li>
              <li>Neque porro quisquam est, qui dolorem</li>
              <li>Quis autem vel eum iure qui in ea</li>
            </ul>
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </ComponentContainerCard>
  )
}

const AllOffcanvas = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <DefaultOffcanvas />
          <OffcanvasBackdrop />
        </Col>
        <Col xl={6}>
          <OffcanvasPlacement />
          <DarkOffcanvas />
        </Col>
      </Row>
    </>
  )
}

export default AllOffcanvas
