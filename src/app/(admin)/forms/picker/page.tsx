import CustomFlatpickr from '@/components/CustomFlatpickr'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Form Picker' }

const Flatpickr = () => {
  return (
    <>
      <PageTitle title="Form Picker" subTitle="Forms" />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'} className="mb-0">
                Flatpickr - Datepicker
              </CardTitle>
            </CardHeader>
            <CardBody>
              <form action="">
                <Row className="gy-3">
                  <Col lg={6}>
                    <div>
                      <label className="form-label mb-0">Basic</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;flatpickr&quot; data-date-format=&quot;d M, Y&quot;</code>
                        attribute.
                      </p>
                      <CustomFlatpickr className="form-control" options={{ enableTime: false }} />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div>
                      <label className="form-label mb-0">DateTime</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;flatpickr&quot; data-date-format=&quot;d.m.y&quot; data-enable-time</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        placeholder="Date and Time"
                        options={{
                          enableTime: true,
                          dateFormat: 'Y-m-d H:i',
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">Human-Friendly Dates</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;flatpickr&quot; data-altFormat=&quot;F j, Y&quot;</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        value={new Date()}
                        options={{
                          altInput: true,
                          enableTime: false,
                          altFormat: 'F j, Y',
                          dateFormat: 'Y-m-d',
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">MinDate and MaxDate</label>
                      <p className="text-muted">
                        Set
                        <code>
                          data-provider=&quot;flatpickr&quot; data-date-format=&quot;d M, Y&quot; data-minDate=&quot;Your Min. Date&quot;
                          data-maxDate=&quot;Your Max. date&quot;
                        </code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        placeholder="mindate - maxdate"
                        options={{
                          enableTime: false,
                          minDate: '2020-01-01',
                          maxDate: '2020-03-05',
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">Default Date</label>
                      <p className="text-muted">
                        Set
                        <code>
                          data-provider=&quot;flatpickr&quot; data-date-format=&quot;d M, Y&quot; data-deafult-date=&quot;Your Default Date&quot;
                        </code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        placeholder="25 jan, 2024"
                        className="form-control"
                        options={{
                          dateFormat: 'd M, Y',
                          enableTime: false,
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">Disabling Dates</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;flatpickr&quot; data-disable=&quot;true&quot;</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        options={{
                          disable: ['2025-01-10', '2025-01-21', '2025-01-30'],
                          enableTime: false,
                          defaultDate: '2025-01',
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">Selecting Multiple Dates</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;flatpickr&quot; data-date-format=&quot;d M, Y&quot; data-multiple-date=&quot;true&quot;</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        placeholder="Multiple dates"
                        options={{
                          enableTime: false,
                          mode: 'multiple',
                          dateFormat: 'Y-m-d',
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">Range</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;flatpickr&quot; data-date-format=&quot;d M, Y&quot; data-range-date=&quot;true&quot;</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        placeholder="2018-10-03 to 2018-10-10"
                        options={{
                          mode: 'range',
                          enableTime: false,
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">Inline</label>
                      <p className="text-muted">
                        Set
                        <code>
                          data-provider=&quot;flatpickr&quot; data-date-format=&quot;d M, Y&quot; data-deafult-date=&quot;today&quot;
                          data-inline-date=&quot;true&quot;
                        </code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        placeholder="Inline Calender"
                        options={{
                          inline: true,
                          enableTime: false,
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">Week Numbers</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;flatpickr&quot; data-date-format=&quot;d M, Y&quot; data-week-number</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        options={{
                          weekNumbers: true,
                          enableTime: false,
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'} className="mb-0">
                Flatpickr - Timepicker
              </CardTitle>
            </CardHeader>
            <CardBody>
              <form action="">
                <Row className="gy-3">
                  <Col lg={6}>
                    <div>
                      <label className="form-label mb-0">Timepicker</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;timepickr&quot; data-time-basic=&quot;true&quot;</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        options={{
                          noCalendar: true,
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div>
                      <label className="form-label mb-0">24-hour Time Picker</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;timepickr&quot; data-time-hrs=&quot;true&quot;</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        options={{
                          noCalendar: true,
                          dateFormat: 'H:i',
                          time_24hr: true,
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">Time Picker w/ Limits</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;timepickr&quot; data-min-time=&quot;Min.Time&quot; data-max-time=&quot;Max.Time&quot;</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        options={{
                          noCalendar: true,
                          dateFormat: 'H:i',
                          minTime: '16:00',
                          maxTime: '22:30',
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">Preloading Time</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;timepickr&quot; data-default-time=&quot;Your Default Time&quot;</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        placeholder="16:45"
                        options={{
                          noCalendar: true,
                          enableTime: true,
                          dateFormat: 'H:i',
                          defaultDate: '13:45',
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="mt-3">
                      <label className="form-label mb-0">Inline</label>
                      <p className="text-muted">
                        Set
                        <code>data-provider=&quot;timepickr&quot; data-time-inline=&quot;Your Default Time&quot;</code>
                        attribute.
                      </p>
                      <CustomFlatpickr
                        className="form-control"
                        placeholder="16:45"
                        options={{
                          noCalendar: true,
                          enableTime: true,
                          inline: true,
                          dateFormat: 'H:i',
                          defaultDate: '13:45',
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Flatpickr
