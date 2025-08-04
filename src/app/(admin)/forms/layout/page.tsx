import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import { Col, Form, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Form Picker' }

const BasicForm = () => {
  return (
    <ComponentContainerCard
      title="Basic Example"
      description={
        <>Here’s a quick example to demonstrate Bootstrap’s form styles. Keep reading for documentation on required classes, form layout, and more.</>
      }>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">
            We&apos;ll never share your email with anyone else.
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className=" mb-3">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="checkmeout0" />
            <label className="form-check-label" htmlFor="checkmeout0">
              Check me out !
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </ComponentContainerCard>
  )
}

const HorizontalForm = () => {
  return (
    <ComponentContainerCard
      title="Horizontal form"
      description={
        <>
          Create horizontal forms with the grid by adding the <code>.row</code> class to form groups and using the <code>.col-*-*</code> classes to
          specify the width of your labels and controls. Be sure to add <code>.col-form-label</code> to your <code>&lt;label&gt;</code>s as well so
          they’re vertically centered with their associated form controls.
        </>
      }>
      <Form className="form-horizontal">
        <Row className="mb-3">
          <label htmlFor="inputEmail3" className="col-3 col-form-label">
            Email
          </label>
          <Col xs={9}>
            <Form.Control type="email" id="inputEmail3" placeholder="Email" />
          </Col>
        </Row>
        <Row className="mb-3">
          <label htmlFor="inputPassword3" className="col-3 col-form-label">
            Password
          </label>
          <Col xs={9}>
            <Form.Control type="password" id="inputPassword3" placeholder="Password" />
          </Col>
        </Row>
        <Row className="mb-3">
          <label htmlFor="inputPassword5" className="col-3 col-form-label">
            Re Password
          </label>
          <Col xs={9}>
            <Form.Control type="password" id="inputPassword5" placeholder="Retype Password" />
          </Col>
        </Row>
        <Row className="mb-3 justify-content-end">
          <Col xs={9}>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="checkmeout" />
              <label className="form-check-label" htmlFor="checkmeout">
                Check me out !
              </label>
            </div>
          </Col>
        </Row>
        <div className="justify-content-end row">
          <Col xs={9}>
            <button type="submit" className="btn btn-info">
              Sign in
            </button>
          </Col>
        </div>
      </Form>
    </ComponentContainerCard>
  )
}

const InlineForm = () => {
  return (
    <ComponentContainerCard
      title="Inline Form"
      description={
        <>
          Use the <code>.row-cols-lg-auto</code>, <code>.g-3</code> &amp; <code>.align-items-center</code> class to display a series of labels, form
          controls, and buttons on a single horizontal row. Form controls within inline forms vary slightly from their default states. Controls only
          appear inline in viewports that are at least 576px wide to account for narrow viewports on mobile devices.
        </>
      }>
      <Form className="row row-cols-lg-auto g-3 align-items-center">
        <Col xs={12}>
          <label htmlFor="staticEmail2" className="visually-hidden">
            Email
          </label>
          <input type="text" readOnly className="form-control-plaintext" id="staticEmail2" defaultValue="email@example.com" />
        </Col>
        <Col xs={12}>
          <label htmlFor="inputPassword2" className="visually-hidden">
            Password
          </label>
          <Form.Control type="password" id="inputPassword2" placeholder="Password" />
        </Col>
        <Col xs={12}>
          <button type="submit" className="btn btn-primary">
            Confirm identity
          </button>
        </Col>
      </Form>
      <h6 className="fs-13 mt-3">Auto-sizing</h6>
      <Form>
        <Row className="gy-2 gx-2 align-items-center">
          <Col xs={'auto'}>
            <label className="visually-hidden" htmlFor="inlineFormInput">
              Name
            </label>
            <Form.Control type="text" className="mb-2" id="inlineFormInput" placeholder="Jane Doe" />
          </Col>
          <Col xs={'auto'}>
            <label className="visually-hidden" htmlFor="inlineFormInputGroup">
              Username
            </label>
            <div className="input-group mb-2">
              <div className="input-group-text">@</div>
              <Form.Control type="text"  id="inlineFormInputGroup" placeholder="Username" />
            </div>
          </Col>
          <Col xs={'auto'}>
            <div className="form-check mb-2">
              <input type="checkbox" className="form-check-input" id="autoSizingCheck" />
              <label className="form-check-label" htmlFor="autoSizingCheck">
                Remember me
              </label>
            </div>
          </Col>
          <Col xs={'auto'}>
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </ComponentContainerCard>
  )
}

const HorizontalSizingForm = () => {
  return (
    <ComponentContainerCard
      title="Horizontal form label sizing"
      description={
        <>
          Be sure to use <code>.col-form-label-sm</code> or <code>.col-form-label-lg</code> to your <code>&lt;label&gt;</code>s or
          <code>&lt;legend&gt;</code>s to correctly follow the size of <code>.form-control-lg</code> and <code>.form-control-sm</code>.
        </>
      }>
      <Form>
        <Row className="mb-2">
          <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">
            Email
          </label>
          <Col sm={12}>
            <Form.Control type="email" className=" form-control-sm" id="colFormLabelSm" placeholder="col-form-label-sm" />
          </Col>
        </Row>
        <Row className="mb-2">
          <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
            Email
          </label>
          <Col sm={12}>
            <Form.Control type="email" className="" id="colFormLabel" placeholder="col-form-label" />
          </Col>
        </Row>
        <Row>
          <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">
            Email
          </label>
          <Col sm={10}>
            <Form.Control type="email" className=" form-control-lg" id="colFormLabelLg" placeholder="col-form-label-lg" />
          </Col>
        </Row>
      </Form>
    </ComponentContainerCard>
  )
}

const FormRow = () => {
  return (
    <ComponentContainerCard
      title="Form Row"
      description={
        <>
          By adding <code>.row</code> &amp; <code>.g-2</code>, you can have control over the gutter width in as well the inline as block direction.
        </>
      }>
      <Form>
        <Row className="g-2">
          <Col md={6} className="mb-3">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <Form.Control type="email" id="inputEmail4" placeholder="Email" />
          </Col>
          <Col md={6} className="mb-3">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <Form.Control type="password" id="inputPassword4" placeholder="Password" />
          </Col>
        </Row>
        <div className="mb-3">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <Form.Control type="text" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputAddress2" className="form-label">
            Address 2
          </label>
          <Form.Control type="text" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <Row className="g-2">
          <Col md={6} className="mb-3">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <Form.Control type="text" id="inputCity" />
          </Col>
          <Col md={4} className="mb-3">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <select id="inputState" className="form-select">
              <option>Choose</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </Col>
          <Col md={2} className="mb-3">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input type="text" className="form-control" id="inputZip" />
          </Col>
        </Row>
        <div className="mb-2">
          <div className="form-check">
            <input type="checkbox" className="form-check-input fs-15" id="customCheck11" />
            <label className="form-check-label" htmlFor="customCheck11">
              Check this custom checkbox
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </Form>
    </ComponentContainerCard>
  )
}

const LayoutPages = () => {
  return (
    <>
      <PageTitle title="Form Picker" subTitle="Forms" />
      <Row>
        <Col lg={6}>
          <BasicForm />
        </Col>
        <Col lg={6}>
          <HorizontalForm />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <InlineForm />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <HorizontalSizingForm />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FormRow />
        </Col>
      </Row>
    </>
  )
}

export default LayoutPages
