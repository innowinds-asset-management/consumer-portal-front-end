'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import useToggle from '@/hooks/useToggle'
import Link from 'next/link'
import { Button, Card, Col, Collapse, Row } from 'react-bootstrap'

const DefaultCollapse = () => {
  const { isTrue, toggle } = useToggle()
  return (
    <ComponentContainerCard
      title="Collapse"
      description={
        <>
          Bootstrap&apos;s collapse provides the way to toggle the visibility of any content or element. Please read the official
          <Link href="https://getbootstrap.com/docs/5.2/components/collapse/" target="_blank">
            Bootstrap
          </Link>
          &nbsp; documentation for a full list of options.
        </>
      }>
      <p>
        <Button variant="primary" onClick={toggle} data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseExample">
          Link with href
        </Button>
      </p>
      <Collapse in={isTrue}>
        <div>
          <Card className="card-body mb-0">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </Card>
        </div>
      </Collapse>
    </ComponentContainerCard>
  )
}

const CollapseHorizontal = () => {
  const { isTrue, toggle } = useToggle()
  return (
    <ComponentContainerCard
      title="Collapse Horizontal"
      description={
        <>
          The collapse plugin also supports horizontal collapsing. Add the <code>.collapse-horizontal</code> modifier class to transition the
          <code>width</code> instead of <code>height</code> and set a <code>width</code> on the immediate child element.
        </>
      }>
      <p>
        <button onClick={toggle} className="btn btn-primary" type="button">
          Toggle width collapse
        </button>
      </p>
      <div style={{ minHeight: 105 }}>
        <Collapse dimension="width" in={isTrue}>
          <div>
            <Card className="card-body mb-0" style={{ width: 300 }}>
              This is some placeholder content for a horizontal collapse. It&apos;s hidden by default and shown when triggered.
            </Card>
          </div>
        </Collapse>
      </div>
    </ComponentContainerCard>
  )
}

const MultipleCollapse = () => {
  const { isTrue: isOpenFirst, toggle: toggleFirst } = useToggle(false)
  const { isTrue: isOpenSecond, toggle: toggleSecond } = useToggle(false)
  const toggleBoth = () => {
    toggleFirst()
    toggleSecond()
  }
  return (
    <ComponentContainerCard
      title="Multiple Targets"
      description={
        <>
          Multiple <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> can show and hide an element if they each reference it with their
          <code>href</code> or <code>data-bs-target</code> attribute
        </>
      }>
      <p>
        <a
          className="btn btn-primary"
          onClick={toggleFirst}
          data-bs-toggle="collapse"
          href="#multiCollapseExample1"
          role="button"
          aria-expanded="false"
          aria-controls="multiCollapseExample1">
          Toggle first element
        </a>
        &nbsp;
        <button
          className="btn btn-primary"
          onClick={toggleSecond}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#multiCollapseExample2"
          aria-expanded="false"
          aria-controls="multiCollapseExample2">
          Toggle second element
        </button>
        &nbsp;
        <button
          className="btn btn-primary"
          onClick={toggleBoth}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".multi-collapse"
          aria-expanded="false"
          aria-controls="multiCollapseExample1 multiCollapseExample2">
          Toggle both elements
        </button>
        &nbsp;
      </p>
      <Row>
        <Col>
          <Collapse className="multi-collapse" in={isOpenFirst}>
            <div>
              <Card className="card-body mb-0">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft
                beer labore wes anderson cred nesciunt sapiente ea proident.
              </Card>
            </div>
          </Collapse>
        </Col>
        <Col>
          <Collapse className="multi-collapse" in={isOpenSecond}>
            <div>
              <Card className="card-body mb-0">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft
                beer labore wes anderson cred nesciunt sapiente ea proident.
              </Card>
            </div>
          </Collapse>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const AllCollapse = () => {
  return (
    <div>
      <Row>
        <Col xl={6}>
          <DefaultCollapse />
        </Col>
        <Col xl={6}>
          <CollapseHorizontal />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <MultipleCollapse />
        </Col>
      </Row>
    </div>
  )
}

export default AllCollapse
