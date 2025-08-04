'use client'
import ChoicesFormInput from '@/components/form/ChoicesFormInput'
import { options } from '@/components/form/data'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Select from 'react-select'

const AllSelect = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="border-bottom border-dashed">
              <CardTitle as={'h4'} className="mb-2">
                Select2
              </CardTitle>
              <p className="text-muted fs-14 mb-0">
                Select2 gives you a customizable select box with support for searching, tagging, remote data sets, infinite scrolling, and many other
                highly used options.
              </p>
            </CardHeader>
            <CardBody>
              <Row className="g-3">
                <Col lg={6}>
                  <p className="mb-1 fw-bold text-muted">Single Select</p>
                  <p className="text-muted fs-14">Select2 can take a regular select box like this...</p>
                  <Select className=" select2" options={options} isMulti={false} />
                </Col>
                <Col lg={6}>
                  <p className="mb-1 fw-bold text-muted">Multiple Select</p>
                  <p className="text-muted fs-14">Select2 can take a regular select box like this...</p>
                  <Select className=" select2" options={options} isMulti={true} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader className="border-bottom border-dashed">
              <CardTitle as={'h4'} className="mb-0">
                Choices
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div>
                <h5 className="fs-14 mb-2">Single select input Example</h5>
                <Row>
                  <Col lg={4} md={6}>
                    <div className="mb-3">
                      <label htmlFor="choices-single-default" className="form-label text-muted">
                        Default
                      </label>
                      <p className="text-muted">
                        Set <code>data-choices</code> attribute to set a default single select.
                      </p>
                      <ChoicesFormInput className="form-control" data-choices id="choices-single-default">
                        <option>This is a placeholder</option>
                        <option value="Choice 1">Choice 1</option>
                        <option value="Choice 2">Choice 2</option>
                        <option value="Choice 3">Choice 3</option>
                      </ChoicesFormInput>
                    </div>
                  </Col>
                  <Col lg={4} md={6}>
                    <div className="mb-3">
                      <label htmlFor="choices-single-groups" className="form-label text-muted">
                        Option Groups
                      </label>
                      <p className="text-muted">
                        Set <code>data-choices data-choices-groups</code> attribute to set option group
                      </p>
                      <ChoicesFormInput
                        className="form-control"
                        id="choices-single-groups"
                        data-choices
                        data-choices-groups
                        data-placeholder="Select City">
                        <option>Choose a city</option>
                        <optgroup label="UK">
                          <option value="London">London</option>
                          <option value="Manchester">Manchester</option>
                          <option value="Liverpool">Liverpool</option>
                        </optgroup>
                        <optgroup label="FR">
                          <option value="Paris">Paris</option>
                          <option value="Lyon">Lyon</option>
                          <option value="Marseille">Marseille</option>
                        </optgroup>
                        <optgroup label="DE" disabled>
                          <option value="Hamburg">Hamburg</option>
                          <option value="Munich">Munich</option>
                          <option value="Berlin">Berlin</option>
                        </optgroup>
                        <optgroup label="US">
                          <option value="New York">New York</option>
                          <option value="Washington" disabled>
                            Washington
                          </option>
                          <option value="Michigan">Michigan</option>
                        </optgroup>
                        <optgroup label="SP">
                          <option value="Madrid">Madrid</option>
                          <option value="Barcelona">Barcelona</option>
                          <option value="Malaga">Malaga</option>
                        </optgroup>
                        <optgroup label="CA">
                          <option value="Montreal">Montreal</option>
                          <option value="Toronto">Toronto</option>
                          <option value="Vancouver">Vancouver</option>
                        </optgroup>
                      </ChoicesFormInput>
                    </div>
                  </Col>
                  <Col lg={4} md={6}>
                    <div className="mb-3">
                      <label htmlFor="choices-single-no-search" className="form-label text-muted">
                        Options added via config with no search
                      </label>
                      <p className="text-muted">
                        Set <code>data-choices data-choices-search-false data-choices-removeItem</code>
                      </p>
                      <ChoicesFormInput className="form-control" id="choices-single-no-search" options={{ removeItemButton: true }}>
                        <option value="Zero">Zero</option>
                        <option value="One">One</option>
                        <option value="Two">Two</option>
                        <option value="Three">Three</option>
                        <option value="Four">Four</option>
                        <option value="Five">Five</option>
                        <option value="Six">Six</option>
                      </ChoicesFormInput>
                    </div>
                  </Col>
                  <Col lg={4} md={6}>
                    <div className="mb-3">
                      <label htmlFor="choices-single-no-sorting" className="form-label text-muted">
                        Options added via config with no sorting
                      </label>
                      <p className="text-muted">
                        Set <code>data-choices data-choices-sorting-false</code> attribute.
                      </p>
                      <ChoicesFormInput className="form-control" id="choices-single-no-sorting" data-choices data-choices-sorting-false>
                        <option value="Madrid">Madrid</option>
                        <option value="Toronto">Toronto</option>
                        <option value="Vancouver">Vancouver</option>
                        <option value="London">London</option>
                        <option value="Manchester">Manchester</option>
                        <option value="Liverpool">Liverpool</option>
                        <option value="Paris">Paris</option>
                        <option value="Malaga">Malaga</option>
                        <option value="Washington" disabled>
                          Washington
                        </option>
                        <option value="Lyon">Lyon</option>
                        <option value="Marseille">Marseille</option>
                        <option value="Hamburg">Hamburg</option>
                        <option value="Munich">Munich</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Montreal">Montreal</option>
                        <option value="New York">New York</option>
                        <option value="Michigan">Michigan</option>
                      </ChoicesFormInput>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="mt-4">
                <h5 className="fs-14 mb-3">Multiple select input</h5>
                <Row>
                  <Col lg={4} md={6}>
                    <div className="mb-3">
                      <label htmlFor="choices-multiple-default" className="form-label text-muted">
                        Default
                      </label>
                      <p className="text-muted">
                        Set <code>data-choices multiple</code> attribute.
                      </p>
                      <ChoicesFormInput className="form-control" id="choices-multiple-default" data-choices multiple>
                        <option value="Choice 1">Choice 1</option>
                        <option value="Choice 2">Choice 2</option>
                        <option value="Choice 3">Choice 3</option>
                        <option value="Choice 4" disabled>
                          Choice 4
                        </option>
                      </ChoicesFormInput>
                    </div>
                  </Col>
                  <Col lg={4} md={6}>
                    <div className="mb-3">
                      <label htmlFor="choices-multiple-remove-button" className="form-label text-muted">
                        With remove button
                      </label>
                      <p className="text-muted">
                        Set <code>data-choices data-choices-removeItem multiple</code> attribute.
                      </p>
                      <ChoicesFormInput
                        className="form-control"
                        options={{ removeItemButton: true }}
                        id="choices-multiple-remove-button"
                        data-choices
                        data-choices-removeitem
                        multiple>
                        <option value="Choice 1">Choice 1</option>
                        <option value="Choice 2">Choice 2</option>
                        <option value="Choice 3">Choice 3</option>
                        <option value="Choice 4">Choice 4</option>
                      </ChoicesFormInput>
                    </div>
                  </Col>
                  <Col lg={4} md={6}>
                    <div className="mb-3">
                      <label htmlFor="choices-multiple-groups" className="form-label text-muted">
                        Option groups
                      </label>
                      <p className="text-muted">
                        Set <code>data-choices data-choices-multiple-groups=&quot;true&quot; multiple</code> attribute.
                      </p>
                      <ChoicesFormInput
                        className="form-control"
                        id="choices-multiple-groups"
                        data-choices
                        data-choices-multiple-groups="true"
                        multiple>
                        <option>Choose a city</option>
                        <optgroup label="UK">
                          <option value="London">London</option>
                          <option value="Manchester">Manchester</option>
                          <option value="Liverpool">Liverpool</option>
                        </optgroup>
                        <optgroup label="FR">
                          <option value="Paris">Paris</option>
                          <option value="Lyon">Lyon</option>
                          <option value="Marseille">Marseille</option>
                        </optgroup>
                        <optgroup label="DE" disabled>
                          <option value="Hamburg">Hamburg</option>
                          <option value="Munich">Munich</option>
                          <option value="Berlin">Berlin</option>
                        </optgroup>
                        <optgroup label="US">
                          <option value="New York">New York</option>
                          <option value="Washington" disabled>
                            Washington
                          </option>
                          <option value="Michigan">Michigan</option>
                        </optgroup>
                        <optgroup label="SP">
                          <option value="Madrid">Madrid</option>
                          <option value="Barcelona">Barcelona</option>
                          <option value="Malaga">Malaga</option>
                        </optgroup>
                        <optgroup label="CA">
                          <option value="Montreal">Montreal</option>
                          <option value="Toronto">Toronto</option>
                          <option value="Vancouver">Vancouver</option>
                        </optgroup>
                      </ChoicesFormInput>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="mt-4">
                <h5 className="fs-14 mb-3">Text inputs</h5>
                <Row>
                  <Col lg={4} md={6}>
                    <div className="mb-3">
                      <label htmlFor="choices-text-remove-button" className="form-label text-muted">
                        Set limit values with remove button
                      </label>
                      <p className="text-muted">
                        Set <code>data-choices data-choices-limit=&quot;Required Limit&quot; data-choices-removeItem</code> attribute.
                      </p>
                      <ChoicesFormInput
                        options={{ removeItemButton: true, maxItemCount: 3 }}
                        allowInput
                        className="form-control"
                        data-choices
                        data-choices-limit={3}
                        data-choices-removeitem
                        defaultValue="Task-1"
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={6}>
                    <div className="mb-3">
                      <label htmlFor="choices-text-unique-values" className="form-label text-muted">
                        Unique values only, no pasting
                      </label>
                      <p className="text-muted">
                        Set <code>data-choices data-choices-text-unique-true</code> attribute.
                      </p>
                      <ChoicesFormInput
                        options={{ duplicateItemsAllowed: false, paste: false }}
                        allowInput
                        className="form-control"
                        id="choices-text-unique-values"
                        data-choices
                        data-choices-text-unique-true
                        defaultValue="Project-A, Project-B"
                      />
                    </div>
                  </Col>
                </Row>
                <div>
                  <label htmlFor="choices-text-disabled" className="form-label text-muted">
                    Disabled
                  </label>
                  <p className="text-muted">
                    Set <code>data-choices data-choices-text-disabled-true</code> attribute.
                  </p>
                  <input
                    disabled
                    className="form-control"
                    id="choices-text-disabled"
                    data-choices
                    data-choices-text-disabled-true
                    type="text"
                    defaultValue="josh@joshuajohnson.co.uk, joe@bloggs.co.uk"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default AllSelect
