import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import React from 'react'
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Form Elements' }

const InputTypes = () => {
  return (
    <ComponentContainerCard title='Input Types' description={<>Most common form control, text-based input fields. Includes support for all HTML5 types: <code>text</code>, <code>password</code>, <code>datetime</code>, <code>datetime-local</code>, <code>date</code>, <code>month</code>, <code>time</code>, <code>week</code>, <code>number</code>, <code>email</code>, <code>url</code>, <code>search</code>, <code>tel</code>, and <code>color</code>.</>}>
      <Row>
        <Col lg={6}>
          <Form>
            <div className="mb-3">
              <label htmlFor="simpleinput" className="form-label">Text</label>
              <Form.Control type="text" id="simpleinput" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-email" className="form-label">Email</label>
              <Form.Control type="email" id="example-email" name="example-email" placeholder="Email" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-password" className="form-label">Password</label>
              <Form.Control type="password" id="example-password" defaultValue="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-palaceholder" className="form-label">Placeholder</label>
              <Form.Control type="text" id="example-palaceholder" placeholder="placeholder" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-textarea" className="form-label">Text area</label>
              <Form.Control as={'textarea'} id="example-textarea" rows={5} defaultValue={""} />
            </div>
            <div className="mb-3">
              <label htmlFor="example-readonly" className="form-label">Readonly</label>
              <Form.Control type="text" id="example-readonly" readOnly defaultValue="Readonly value" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-disable" className="form-label">Disabled</label>
              <Form.Control type="text" id="example-disable" disabled defaultValue="Disabled value" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-static" className="form-label">Static control</label>
              <Form.Control type="text" readOnly className="form-control-plaintext" id="example-static" defaultValue="email@example.com" />
            </div>
            <div className="mb-0">
              <label htmlFor="example-helping" className="form-label">Helping text</label>
              <Form.Control type="text" id="example-helping" className="mb-1" placeholder="Helping text" />
              <span className="help-block"><small>A block of help text that breaks onto a new line and may extend beyond one line.</small></span>
            </div>
          </Form>
        </Col>
        <Col lg={6}>
          <form>
            <div className="mb-3">
              <label htmlFor="example-select" className="form-label">Input Select</label>
              <Form.Select id="example-select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Select>
            </div>
            <div className="mb-3">
              <label htmlFor="example-multiselect" className="form-label">Multiple Select</label>
              <Form.Select id="example-multiselect" multiple >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Select>
            </div>
            <div className="mb-3">
              <label htmlFor="example-fileinput" className="form-label">Default file input</label>
              <Form.Control type="file" id="example-fileinput" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-date" className="form-label">Date</label>
              <Form.Control id="example-date" type="date" name="date" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-month" className="form-label">Month</label>
              <Form.Control id="example-month" type="month" name="month" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-time" className="form-label">Time</label>
              <Form.Control id="example-time" type="time" name="time" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-week" className="form-label">Week</label>
              <Form.Control id="example-week" type="week" name="week" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-number" className="form-label">Number</label>
              <Form.Control id="example-number" type="number" name="number" />
            </div>
            <div className="mb-3">
              <label htmlFor="example-color" className="form-label">Color</label>
              <Form.Control id="example-color" type="color" className='w-100' name="color" defaultValue="#727cf5" />
            </div>
            <div className="mb-0">
              <label htmlFor="example-range" className="form-label">Range</label>
              <Form.Range id="example-range" name="range" min={0} max={100} />
            </div>
          </form>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const FloatingLabels = () => {
  return (
    <ComponentContainerCard title='Floating Labels' description={<>Wrap a pair of <code>&lt;input class=&quot;form-control&quot;&gt;</code> and <code>&lt;label&gt;</code> elements in <code>.form-floating</code> to enable floating labels with Bootstrap’s textual form fields. A <code>placeholder</code> is required on each <code>&lt;input&gt;</code> as our method of CSS-only floating labels uses the <code>:placeholder-shown</code> pseudo-element. Also note that the <code>&lt;input&gt;</code> must come first so we can utilize a sibling selector (e.g., <code>~</code>).</>}>
      <Row>
        <Col lg={6}>
          <h5 className="mb-3">Example</h5>
          <div className="form-floating mb-3">
            <Form.Control type="email" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <Form.Control type="password" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <h5 className="mb-3 mt-4">Textareas</h5>
          <div className="form-floating">
            <Form.Control as={'textarea'} placeholder="Leave a comment here" id="floatingTextarea" style={{ height: 100 }} defaultValue={""} />
            <label htmlFor="floatingTextarea">Comments</label>
          </div>
        </Col>
        <Col lg={6}>
          <h5 className="mb-3">Selects</h5>
          <div className="form-floating">
            <Form.Select id="floatingSelect" aria-label="Floating label select example">
              <option>Open this select menu</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </Form.Select>
            <label htmlFor="floatingSelect">Works with selects</label>
          </div>
          <h5 className="mb-3 mt-4">Layout</h5>
          <Row className="g-2">
            <div className="col-md">
              <div className="form-floating">
                <Form.Control type="email" id="floatingInputGrid" placeholder="name@example.com" defaultValue="mdo@example.com" />
                <label htmlFor="floatingInputGrid">Email address</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <Form.Select id="floatingSelectGrid" aria-label="Floating label select example">
                  <option>Open this select menu</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </Form.Select>
                <label htmlFor="floatingSelectGrid">Works with selects</label>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const SelectForm = () => {
  return (
    <ComponentContainerCard title='Select' description={<><code>&lt;select&gt;</code> menus need only a custom class, <code>.form-select</code> to trigger the custom styles.</>}>
      <Form.Select className="mb-3">
        <option >Open this select menu</option>
        <option value={1}>One</option>
        <option value={2}>Two</option>
        <option value={3}>Three</option>
      </Form.Select>
      <Form.Select className="form-select-lg mb-3">
        <option >Open this select menu</option>
        <option value={1}>One</option>
        <option value={2}>Two</option>
        <option value={3}>Three</option>
      </Form.Select>
      <Form.Select className="form-select-sm mb-3">
        <option >Open this select menu</option>
        <option value={1}>One</option>
        <option value={2}>Two</option>
        <option value={3}>Three</option>
      </Form.Select>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
        <Form.Select id="inputGroupSelect01">
          <option>Choose...</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </Form.Select>
      </div>
      <div className="input-group">
        <Form.Select id="inputGroupSelect04" aria-label="Example select with button addon">
          <option>Choose...</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </Form.Select>
        <button className="btn btn-outline-secondary" type="button">Button</button>
      </div>
    </ComponentContainerCard>
  )
}

const SwitchesForm = () => {
  return (
    <ComponentContainerCard title='Switches' description={<>A switch has the markup of a custom checkbox but uses the <code>.form-switch</code> class to render a toggle switch. Switches also support the <code>disabled</code> attribute.</>}>
      <div className="form-check form-switch">
        <input type="checkbox" className="form-check-input" id="customSwitch1" />
        <label className="form-check-label" htmlFor="customSwitch1">Toggle this switch element</label>
      </div>
      <div className="form-check form-switch mt-1">
        <input type="checkbox" className="form-check-input" disabled id="customSwitch2" />
        <label className="form-check-label" htmlFor="customSwitch2">Disabled switch element</label>
      </div>
    </ComponentContainerCard>
  )
}

const CheckboxesForm = () => {
  return (
    <ComponentContainerCard title='Checkboxes' description={<>Each checkbox and radio <code>&lt;input&gt;</code> and <code>&lt;label&gt;</code> pairing is wrapped in a <code>&lt;div&gt;</code> to create our custom control. Structurally, this is the same approach as our default <code>.form-check</code>.</>}>
      <div className="mt-3">
        <div className="form-check mb-1">
          <input type="checkbox" className="form-check-input" id="customCheck1" />
          <label className="form-check-label" htmlFor="customCheck1">Check this custom checkbox</label>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="customCheck2" />
          <label className="form-check-label" htmlFor="customCheck2">Check this custom checkbox</label>
        </div>
      </div>
      <h6 className="fs-15 mt-3">Inline</h6>
      <div className="mt-2">
        <div className="form-check form-check-inline">
          <input type="checkbox" className="form-check-input" id="customCheck3" />
          <label className="form-check-label" htmlFor="customCheck3">Check this custom checkbox</label>
        </div>
        <div className="form-check form-check-inline">
          <input type="checkbox" className="form-check-input" id="customCheck4" />
          <label className="form-check-label" htmlFor="customCheck4">Check this custom checkbox</label>
        </div>
      </div>
      <h6 className="fs-15 mt-3">Disabled</h6>
      <div className="mt-2">
        <div className="form-check form-check-inline">
          <input type="checkbox" className="form-check-input" id="customCheck5" defaultChecked disabled />
          <label className="form-check-label" htmlFor="customCheck5">Check this custom checkbox</label>
        </div>
        <div className="form-check form-check-inline">
          <input type="checkbox" className="form-check-input" id="customCheck6" disabled />
          <label className="form-check-label" htmlFor="customCheck6">Check this custom checkbox</label>
        </div>
      </div>
      <h6 className="fs-15 mt-3">Colors</h6>
      <div className="form-check mb-2">
        <input type="checkbox" className="form-check-input" id="customCheckcolor1" defaultChecked />
        <label className="form-check-label" htmlFor="customCheckcolor1">Default Checkbox</label>
      </div>
      <div className="form-check form-checkbox-success mb-2">
        <input type="checkbox" className="form-check-input" id="customCheckcolor2" defaultChecked />
        <label className="form-check-label" htmlFor="customCheckcolor2">Success Checkbox</label>
      </div>
      <div className="form-check form-checkbox-info mb-2">
        <input type="checkbox" className="form-check-input" id="customCheckcolor3" defaultChecked />
        <label className="form-check-label" htmlFor="customCheckcolor3">Info Checkbox</label>
      </div>
      <div className="form-check form-checkbox-secondary mb-2">
        <input type="checkbox" className="form-check-input" id="customCheckcolor6" defaultChecked />
        <label className="form-check-label" htmlFor="customCheckcolor6">Secondary Checkbox</label>
      </div>
      <div className="form-check  form-checkbox-warning mb-2">
        <input type="checkbox" className="form-check-input" id="customCheckcolor4" defaultChecked />
        <label className="form-check-label" htmlFor="customCheckcolor4">Warning Checkbox</label>
      </div>
      <div className="form-check form-checkbox-danger mb-2">
        <input type="checkbox" className="form-check-input" id="customCheckcolor5" defaultChecked />
        <label className="form-check-label" htmlFor="customCheckcolor5">Danger Checkbox</label>
      </div>
      <div className="form-check form-checkbox-dark">
        <input type="checkbox" className="form-check-input" id="customCheckcolor7" defaultChecked />
        <label className="form-check-label" htmlFor="customCheckcolor7">Dark Checkbox</label>
      </div>
    </ComponentContainerCard>
  )
}

const Radios = () => {
  return (
    <ComponentContainerCard title='Radios' description={<>Each checkbox and radio <code>&lt;input&gt;</code> and <code>&lt;label&gt;</code> pairing is wrapped in a <code>&lt;div&gt;</code> to create our custom control. Structurally, this is the same approach as our default <code>.form-check</code>.</>}>
      <div className="mt-3">
        <div className="form-check mb-1">
          <input type="radio" id="customRadio1" name="customRadio" className="form-check-input" />
          <label className="form-check-label" htmlFor="customRadio1">Toggle this custom radio</label>
        </div>
        <div className="form-check">
          <input type="radio" id="customRadio2" name="customRadio" className="form-check-input" />
          <label className="form-check-label" htmlFor="customRadio2">Or toggle this other custom radio</label>
        </div>
      </div>
      <h6 className="fs-15 mt-3">Inline</h6>
      <div className="mt-2">
        <div className="form-check form-check-inline">
          <input type="radio" id="customRadio3" name="customRadio1" className="form-check-input" />
          <label className="form-check-label" htmlFor="customRadio3">Toggle this custom radio</label>
        </div>
        <div className="form-check form-check-inline">
          <input type="radio" id="customRadio4" name="customRadio1" className="form-check-input" />
          <label className="form-check-label" htmlFor="customRadio4">Or toggle this other custom radio</label>
        </div>
      </div>
      <h6 className="fs-15 mt-3">Disabled</h6>
      <div className="mt-2">
        <div className="form-check form-check-inline">
          <input type="radio" id="customRadio5" name="customRadio2" className="form-check-input" disabled />
          <label className="form-check-label" htmlFor="customRadio5">Toggle this custom radio</label>
        </div>
        <div className="form-check form-check-inline">
          <input type="radio" id="customRadio6" name="customRadio2" className="form-check-input" defaultChecked disabled />
          <label className="form-check-label" htmlFor="customRadio6">Or toggle this other custom radio</label>
        </div>
      </div>
      <h6 className="fs-15 mt-3">Colors</h6>
      <div className="form-check mb-2">
        <input type="radio" id="customRadiocolor1" name="customRadiocolor1" className="form-check-input" defaultChecked />
        <label className="form-check-label" htmlFor="customRadiocolor1">Default Radio</label>
      </div>
      <div className="form-check form-radio-success mb-2">
        <input type="radio" id="customRadiocolor2" name="customRadiocolor2" className="form-check-input" defaultChecked />
        <label className="form-check-label" htmlFor="customRadiocolor2">Success Radio</label>
      </div>
      <div className="form-check form-radio-info mb-2">
        <input type="radio" id="customRadiocolor3" name="customRadiocolor3" className="form-check-input" defaultChecked />
        <label className="form-check-label" htmlFor="customRadiocolor3">Info Radio</label>
      </div>
      <div className="form-check form-radio-secondary mb-2">
        <input type="radio" id="customRadiocolor6" name="customRadiocolor6" className="form-check-input" defaultChecked />
        <label className="form-check-label" htmlFor="customRadiocolor6">Secondary Radio</label>
      </div>
      <div className="form-check form-radio-warning mb-2">
        <input type="radio" id="customRadiocolor4" name="customRadiocolor4" className="form-check-input" defaultChecked />
        <label className="form-check-label" htmlFor="customRadiocolor4">Warning Radio</label>
      </div>
      <div className="form-check form-radio-danger mb-2">
        <input type="radio" id="customRadiocolor5" name="customRadiocolor5" className="form-check-input" defaultChecked />
        <label className="form-check-label" htmlFor="customRadiocolor5">Danger Radio</label>
      </div>
      <div className="form-check form-radio-dark">
        <input type="radio" id="customRadiocolor7" name="customRadiocolor7" className="form-check-input" defaultChecked />
        <label className="form-check-label" htmlFor="customRadiocolor7">Dark Radio</label>
      </div>
    </ComponentContainerCard>
  )
}

const InputSizes = () => {
  return (
    <ComponentContainerCard title='Input Sizes' description={<> Set heights using classes like <code>.input-lg</code>, and set widths using grid column classes like <code>.col-lg-*</code>.</>}>
      <form>
        <div className="mb-3">
          <label htmlFor="example-input-small" className="form-label">Small</label>
          <input type="text" id="example-input-small" name="example-input-small" className="form-control form-control-sm" placeholder=".input-sm" />
        </div>
        <div className="mb-3">
          <label htmlFor="example-input-normal" className="form-label">Normal</label>
          <input type="text" id="example-input-normal" name="example-input-normal" className="form-control" placeholder="Normal" />
        </div>
        <div className="mb-3">
          <label htmlFor="example-input-large" className="form-label">Large</label>
          <input type="text" id="example-input-large" name="example-input-large" className="form-control form-control-lg" placeholder=".input-lg" />
        </div>
        <div className="mb-2">
          <label htmlFor="example-gridsize" className="form-label">Grid Sizes</label>
          <Row>
            <Col sm={4}>
              <input type="text" id="example-gridsize" className="form-control" placeholder=".col-sm-4" />
            </Col>
          </Row>
        </div>
      </form>
    </ComponentContainerCard>
  )
}

const InputGroup = () => {
  return (
    <ComponentContainerCard title='Input Group' description={<> Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects, and custom file inputs</>}>
      <form>
        <div className="mb-3">
          <label className="form-label">Static</label>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="basic-addon1">@</span>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Dropdowns</label>
          <Dropdown className="input-group">
            <DropdownToggle as={'button'} className="btn btn-primary" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
            <input type="text" placeholder='' className="form-control" aria-describedby="basic-addon1" />
          </Dropdown>
        </div>
        <div className="mb-3">
          <label className="form-label">Buttons</label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" />
            <button className="btn btn-dark" type="button">Button</button>
          </div>
        </div>
        <Row className="g-2">
          <Col sm={6}>
            <label className="form-label">File input</label>
            <input className="form-control" type="file" id="inputGroupFile04" />
          </Col>
          <Col sm={6}>
            <label htmlFor="formFileMultiple01" className="form-label">Multiple files input</label>
            <input className="form-control" type="file" id="formFileMultiple01" multiple />
          </Col>
        </Row>
      </form>
    </ComponentContainerCard>
  )
}

const CustomSwitch = () => {
  return (
    <ComponentContainerCard title='Custom Switch' description={<>Here are a few types of switches.</>}>
      <input type="checkbox" id="switch0" data-switch="none" />&nbsp;
      <label htmlFor="switch0" data-on-label data-off-label />&nbsp;
      <input type="checkbox" id="switch1" defaultChecked data-switch="bool" />&nbsp;
      <label htmlFor="switch1" data-on-label="On" data-off-label="Off" />&nbsp;
      <input type="checkbox" id="switch2" defaultChecked data-switch="primary" />&nbsp;
      <label htmlFor="switch2" data-on-label="On" data-off-label="Off" />&nbsp;
      <input type="checkbox" id="switch3" defaultChecked data-switch="success" />&nbsp;
      <label htmlFor="switch3" data-on-label="Yes" data-off-label="No" />&nbsp;
      <input type="checkbox" id="switch4" defaultChecked data-switch="info" />&nbsp;
      <label htmlFor="switch4" data-on-label="On" data-off-label="Off" />&nbsp;
      <input type="checkbox" id="switch5" defaultChecked data-switch="warning" />&nbsp;
      <label htmlFor="switch5" data-on-label="Yes" data-off-label="No" />&nbsp;
      <input type="checkbox" id="switch6" defaultChecked data-switch="danger" />&nbsp;
      <label htmlFor="switch6" data-on-label="On" data-off-label="Off" />&nbsp;
      <input type="checkbox" id="switch7" defaultChecked data-switch="secondary" />&nbsp;
      <label htmlFor="switch7" data-on-label="Yes" data-off-label="No" />&nbsp;
      <input type="checkbox" id="switchdis" data-switch="primary" defaultChecked disabled />&nbsp;
      <label htmlFor="switchdis" data-on-label="On" data-off-label="Off" />
    </ComponentContainerCard>
  )
}

const BasicForms = () => {
  return (
    <>
      <PageTitle title="Form Elements" subTitle="Forms" />
      <Row>
        <Col xs={12}>
          <InputTypes />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FloatingLabels />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <SelectForm />
        </Col>
        <Col lg={6}>
          <SwitchesForm />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <CheckboxesForm />
        </Col>
        <Col lg={6}>
          <Radios />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <InputSizes />
        </Col>
        <Col lg={6}>
          <InputGroup />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CustomSwitch />
        </Col>
      </Row>
    </>

  )
}

export default BasicForms