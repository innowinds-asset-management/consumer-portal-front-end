import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Metadata } from 'next'
import { ListGroup as BSListGroup, Col, ListGroupItem, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'List Group' }

const BasicExample = () => {
  return (
    <ComponentContainerCard
      title="Basic example"
      description={
        <>
          The most basic list group is an unordered list with list items and the proper classes. Build upon it with the options that follow, or with
          your own CSS as needed.
        </>
      }>
      <BSListGroup>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-google-drive" className="me-1 align-middle fs-18" /> Google Drive
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-messenger" className="me-1 align-middle fs-18" /> Facebook Messenger
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-apple" className="me-1 align-middle fs-18" /> Apple Technology Company
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-intercom" className="me-1 align-middle fs-18" /> Intercom Support System
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-paypal" className="me-1 align-middle fs-18" /> Paypal Payment Gateway
        </ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const ActiveItems = () => {
  return (
    <ComponentContainerCard
      title="Active items"
      description={
        <>
          Add <code>.active</code> to a&nbsp;
          <code>.list-group-item</code> to indicate the current active selection.
        </>
      }>
      <BSListGroup>
        <ListGroupItem className=" active">
          <IconifyIcon icon="tabler:brand-google-drive" className="me-1 align-middle fs-18" /> Google Drive
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-messenger" className="me-1 align-middle fs-18" /> Facebook Messenger
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-apple" className="me-1 align-middle fs-18" /> Apple Technology Company
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-intercom" className="me-1 align-middle fs-18" /> Intercom Support System
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-paypal" className="me-1 align-middle fs-18" /> Paypal Payment Gateway
        </ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const DisabledItems = () => {
  return (
    <ComponentContainerCard
      title="Disabled items"
      description={
        <>
          Add <code>.disabled</code> to a <code>.list-group-item</code> to make it
          <em>appear</em> disabled.
        </>
      }>
      <BSListGroup>
        <ListGroupItem className=" disabled" aria-disabled="true">
          <IconifyIcon icon="tabler:brand-google-drive" className="me-1 align-middle fs-18" /> Google Drive
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-messenger" className="me-1 align-middle fs-18" /> Facebook Messenger
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-apple" className="me-1 align-middle fs-18" /> Apple Technology Company
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-intercom" className="me-1 align-middle fs-18" /> Intercom Support System
        </ListGroupItem>
        <ListGroupItem>
          <IconifyIcon icon="tabler:brand-paypal" className="me-1 align-middle fs-18" /> Paypal Payment Gateway
        </ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const LinksAndButtons = () => {
  return (
    <ComponentContainerCard
      title="Links and Buttons"
      description={
        <>
          Use <code>&lt;a&gt;</code>s or&nbsp;
          <code>&lt;button&gt;</code>s to create <em>actionable</em> list group items with hover, disabled, and active states by adding&nbsp;
          <code>.list-group-item-action</code>.
        </>
      }>
      <BSListGroup>
        <ListGroupItem className="list-group-item list-group-item-action active">Paypal Payment Gateway</ListGroupItem>
        <ListGroupItem className="list-group-item list-group-item-action">Google Drive</ListGroupItem>
        <button type="button" className="list-group-item list-group-item-action">
          Facebook Messenger
        </button>
        <button type="button" className="list-group-item list-group-item-action">
          Apple Technology Company
        </button>
        <ListGroupItem className="list-group-item list-group-item-action disabled" tabIndex={-1} aria-disabled="true">
          Intercom Support System
        </ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const Flush = () => {
  return (
    <ComponentContainerCard
      title="Flush"
      description={
        <>
          Add <code>.list-group-flush</code> to remove some borders and rounded corners to render list group items edge-to-edge in a parent container
          (e.g., cards).
        </>
      }>
      <BSListGroup className=" list-group-flush">
        <ListGroupItem>Google Drive</ListGroupItem>
        <ListGroupItem>Facebook Messenger</ListGroupItem>
        <ListGroupItem>Apple Technology Company</ListGroupItem>
        <ListGroupItem>Intercom Support System</ListGroupItem>
        <ListGroupItem>Paypal Payment Gateway</ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const Horizontal = () => {
  return (
    <ComponentContainerCard
      title="Horizontal"
      description={
        <>
          Add <code>.list-group-horizontal</code> to change the layout of list group items from vertical to horizontal across all breakpoints.
          Alternatively, choose a responsive variant&nbsp;
          <code>
            .list-group-horizontal-{'{'}sm|md|lg|xl{'}'}
          </code>
          to make a list group horizontal starting at that breakpoint’s <code>min-width</code>.
        </>
      }>
      <BSListGroup className="list-group-horizontal mb-3">
        <ListGroupItem>Google</ListGroupItem>
        <ListGroupItem>Whatsapp</ListGroupItem>
        <ListGroupItem>Facebook</ListGroupItem>
      </BSListGroup>
      <BSListGroup className="list-group-horizontal-sm mb-3">
        <ListGroupItem>Apple</ListGroupItem>
        <ListGroupItem>PayPal</ListGroupItem>
        <ListGroupItem>Intercom</ListGroupItem>
      </BSListGroup>
      <BSListGroup className="list-group-horizontal-md">
        <ListGroupItem>Google</ListGroupItem>
        <ListGroupItem>Whatsapp</ListGroupItem>
        <ListGroupItem>Facebook</ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const ContextualClasses = () => {
  return (
    <ComponentContainerCard
      title="Contextual classes"
      description={<>Use contextual classes to style list items with a stateful background and color.</>}>
      <BSListGroup className="list-group">
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem className="list-group-item-primary">A simple primary list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-secondary">A simple secondary list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-success">A simple success list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-danger">A simple danger list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-warning">A simple warning list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-info">A simple info list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-light">A simple light list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-dark">A simple dark list group item</ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const ContextualClassesWithLink = () => {
  return (
    <ComponentContainerCard
      title="Contextual classes with Link"
      description={<>Use contextual classes to style list items with a stateful background and color.</>}>
      <BSListGroup>
        <ListGroupItem className="list-group-item-action">Darius ac facilities in</ListGroupItem>
        <ListGroupItem className="list-group-item-action list-group-item-primary">A simple primary list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-action list-group-item-secondary">A simple secondary list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-action list-group-item-success">A simple success list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-action list-group-item-danger">A simple danger list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-action list-group-item-warning">A simple warning list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-action list-group-item-info">A simple info list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-action list-group-item-light">A simple light list group item</ListGroupItem>
        <ListGroupItem className="list-group-item-action list-group-item-dark">A simple dark list group item</ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const CustomContent = () => {
  return (
    <ComponentContainerCard
      title="Custom content"
      description={<>Add nearly any HTML within, even for linked list groups like the one below, with the help of flexbox utilities.</>}>
      <BSListGroup>
        <ListGroupItem className="list-group-item-action active">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small>3 days ago</small>
          </div>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small>Donec id elit non mi porta.</small>
        </ListGroupItem>
        <ListGroupItem className="list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small className="text-muted">Donec id elit non mi porta.</small>
        </ListGroupItem>
        <ListGroupItem className="list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small className="text-muted">Donec id elit non mi porta.</small>
        </ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const WithBadges = () => {
  return (
    <ComponentContainerCard
      title="With badges"
      description={<>Add badges to any list group item to show unread counts, activity, and more with the help of some utilities.</>}>
      <BSListGroup>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          Gmail Emails
          <span className="badge bg-primary rounded-pill">14</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          Pending Payments
          <span className="badge bg-success rounded-pill">2</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          Action Needed
          <span className="badge bg-danger rounded-pill">99+</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          Payments Done
          <span className="badge bg-success rounded-pill">20+</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          Pending Payments
          <span className="badge bg-warning rounded-pill">12</span>
        </ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const CheckboxesAndRadios = () => {
  return (
    <ComponentContainerCard
      title="Checkboxes and radios"
      description={
        <>
          Place Bootstrap’s checkboxes and radios within list group items and customize as needed. You can use them without&nbsp;
          <code>&lt;label&gt;</code>s, but please remember to include an&nbsp;
          <code>aria-label</code> attribute and value for accessibility.
        </>
      }>
      <BSListGroup>
        <ListGroupItem>
          <input className="form-check-input me-1" type="checkbox" id="firstCheckbox" />
          &nbsp;
          <label className="form-check-label" htmlFor="firstCheckbox">
            First checkbox
          </label>
        </ListGroupItem>
        <ListGroupItem>
          <input className="form-check-input me-1" type="checkbox" id="secondCheckbox" />
          &nbsp;
          <label className="form-check-label" htmlFor="secondCheckbox">
            Second checkbox
          </label>
        </ListGroupItem>
      </BSListGroup>
      <ul className="list-group mt-2">
        <ListGroupItem>
          <input className="form-check-input me-1" type="radio" name="listGroupRadio" id="firstRadio" defaultChecked />
          &nbsp;
          <label className="form-check-label" htmlFor="firstRadio">
            First radio
          </label>
        </ListGroupItem>
        <ListGroupItem>
          <input className="form-check-input me-1" type="radio" name="listGroupRadio" id="secondRadio" />
          &nbsp;
          <label className="form-check-label" htmlFor="secondRadio">
            Second radio
          </label>
        </ListGroupItem>
      </ul>
    </ComponentContainerCard>
  )
}

const Numbered = () => {
  return (
    <ComponentContainerCard
      title="Numbered"
      description={
        <>
          Numbers are generated by <code>counter-reset</code> on the <code>&lt;ol&gt;</code>, and then styled and placed with a&nbsp;
          <code>::before</code> psuedo-element on the <code>&lt;li&gt;</code> with&nbsp;
          <code>counter-increment</code> and <code>content</code>.
        </>
      }>
      <BSListGroup as={'ol'} className="list-group-numbered">
        <ListGroupItem className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Abstack Admin</div>
            Abstack Admin
          </div>
          <span className="badge bg-primary rounded-pill">865</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Abstack React Admin</div>
            Abstack React Admin
          </div>
          <span className="badge bg-primary rounded-pill">140</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Angular Version</div>
            Angular Version
          </div>
          <span className="badge bg-primary rounded-pill">85</span>
        </ListGroupItem>
      </BSListGroup>
    </ComponentContainerCard>
  )
}

const ListGroup = () => {
  return (
    <>
      <PageTitle title="List Group" subTitle="Base UI" />
      <Row>
        <Col xl={4}>
          <BasicExample />
        </Col>
        <Col xl={4}>
          <ActiveItems />
        </Col>
        <Col xl={4}>
          <DisabledItems />
        </Col>
      </Row>
      <Row>
        <Col xl={4}>
          <LinksAndButtons />
        </Col>
        <Col xl={4}>
          <Flush />
        </Col>
        <Col xl={4}>
          <Horizontal />
        </Col>
      </Row>
      <Row>
        <Col xl={4}>
          <ContextualClasses />
        </Col>
        <Col xl={4}>
          <ContextualClassesWithLink />
        </Col>
        <Col xl={4}>
          <CustomContent />
        </Col>
      </Row>
      <Row>
        <Col xl={4}>
          <WithBadges />
        </Col>
        <Col xl={4}>
          <CheckboxesAndRadios />
        </Col>
        <Col xl={4}>
          <Numbered />
        </Col>
      </Row>
    </>
  )
}

export default ListGroup
