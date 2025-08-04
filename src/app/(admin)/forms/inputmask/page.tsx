'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

const InputmaskPage = () => {
  const [value, setValue] = useState<string>('')

  return (
    <>
      <PageTitle title="Form Inputmask" subTitle="Forms" />
      <ComponentContainerCard title="Form Inputmask" description={<>A Java-Script Plugin to make masks on form fields and HTML elements.</>}>
        <Row>
          <Col md={6}>
            <form action="">
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Date
                </label>
                <InputMask
                  className="form-control"
                  value={value}
                  onChange={(e: InputMaskChangeEvent) => setValue(e.target.null)}
                  mask="99/99/9999"
                  slotChar="__/__/____"
                />
                <span className="fs-13 text-muted">e.g &quot;DD/MM/YYYY&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00/00/0000&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label">Hour</label>
                <InputMask
                  type="text"
                  className="form-control"
                  onChange={(e: InputMaskChangeEvent) => setValue(e.target.null)}
                  mask="99:99:99"
                  slotChar="__:__:__"
                />
                <span className="fs-13 text-muted">e.g &quot;HH:MM:SS&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00:00:00&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label">Date &amp; Hour</label>
                <InputMask
                  type="text"
                  className="form-control"
                  onChange={(e: InputMaskChangeEvent) => setValue(e.target.null)}
                  mask="99/99/9999 99:99:99"
                  slotChar="__/__/__ __:__:__"
                />
                <span className="fs-13 text-muted">e.g &quot;DD/MM/YYYY HH:MM:SS&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00/00/0000 00:00:00&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label">ZIP Code</label>
                <InputMask className="form-control" id="zipcode" mask="9999-999"></InputMask>
                <span className="fs-13 text-muted">e.g &quot;xxxxx-xxx&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00000-000&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label">Crazy Zip Code</label>
                <InputMask className="form-control" id="phone" mask="9-99.99.99"></InputMask>
                <span className="fs-13 text-muted">e.g &quot;x-xx-xx-xx&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;0-00-00-00&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label">Money</label>
                <InputMask className="form-control" id="phone" mask="999.999.999.999.999,99"></InputMask>
                <span className="fs-13 text-muted">e.g &quot;Your money&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-mask-format=&quot;000.000.000.000.000,00&quot; data-reverse=&quot;true&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label">Money 2</label>
                <InputMask className="form-control" id="phone" mask="9.999,99"></InputMask>
                <span className="fs-13 text-muted">e.g &quot;#.##0,00&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;#.##0,00&quot; data-reverse=&quot;true&quot;</code>
                </p>
              </div>
            </form>
          </Col>
          <Col md={6}>
            <form action="">
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Telephone
                </label>
                <InputMask className="form-control" id="phone" mask="9999-9999"></InputMask>

                <span className="fs-13 text-muted">e.g &quot;xxxx-xxxx&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;0000-0000&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Telephone with Code Area
                </label>
                <InputMask className="form-control" id="phone" mask="(99) 9999-9999"></InputMask>
                <span className="fs-13 text-muted">e.g &quot;(xx) xxxx-xxxx&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;(00) 0000-0000&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  US Telephone
                </label>
                <InputMask className="form-control" id="phone" mask="(999) 999-9999"></InputMask>
                <span className="fs-13 text-muted">e.g &quot;(xxx) xxx-xxxx&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;(000) 000-0000&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  São Paulo Celphones
                </label>
                <InputMask className="form-control" id="phone" mask="(99) 99999-9999"></InputMask>
                <span className="fs-13 text-muted">e.g &quot;(xx) xxxxx-xxxx&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;(00) 00000-0000&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  CPF
                </label>
                <InputMask className="form-control" id="phone" mask="999.999.999-99"></InputMask>
                <span className="fs-13 text-muted">e.g &quot;xxx.xxx.xxxx-xx&quot;</span>
                <p className="mt-1">
                  Add attribute <code>data-mask-format=&quot;000.000.000-00&quot; data-reverse=&quot;true&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  CNPJ
                </label>
                <InputMask className="form-control" id="phone" mask="99.999.999/9999-99"></InputMask>
                <span className="fs-13 text-muted">e.g &quot;xx.xxx.xxx/xxxx-xx&quot;</span>
                <p className="mt-1">
                  Add attribute
                  <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00.000.000/0000-00&quot; data-reverse=&quot;true&quot;</code>
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="ip address" className="form-label">
                  IP Address
                </label>
                <InputMask className="form-control" id="phone" mask="999.999.999.999"></InputMask>
                <span className="fs-13 text-muted">e.g &quot;xxx.xxx.xxx.xxx&quot;</span>
                <p className="mt-1">
                  Add attribute
                  <code>data-toggle=&quot;input-mask&quot; data-mask-format=&quot;099.099.099.099&quot; data-reverse=&quot;true&quot;</code>
                </p>
              </div>
            </form>
          </Col>
        </Row>
      </ComponentContainerCard>
    </>
  )
}

export default InputmaskPage
