import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Metadata } from 'next'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Accordions' }

const accordionData = ['first', 'second', 'third']

const DefaultAccordions = () => {
  return (
    <ComponentContainerCard title="Default Accordions" description={'Click the accordions below to expand/collapse the accordion content.'}>
      <Accordion defaultActiveKey={'0'} id="accordionExample">
        {accordionData.map((item, idx) => (
          <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader as={'h2'} className="accordion-header" id="headingOne">
              Accordion Item #{idx}
            </AccordionHeader>
            <AccordionBody>
              <strong>This is the {item} item&apos;s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about
              any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </ComponentContainerCard>
  )
}

const FlushAccordions = () => {
  return (
    <ComponentContainerCard
      title="Flush Accordions"
      description={
        <>
          Add <code>.accordion-flush</code> to remove the default <code>background-color</code>, some borders, and some rounded corners to render
          accordions edge-to-edge with their parent container.
        </>
      }>
      <Accordion defaultActiveKey={'0'} className="accordion-flush" id="accordionFlushExample">
        <AccordionItem eventKey="0" className="accordion-item">
          <AccordionHeader as={'h2'} id="flush-headingOne">
            Accordion Item #1
          </AccordionHeader>
          <AccordionBody>
            <p>
              Placeholder content for this accordion, which is intended to demonstrate the
              <code>.accordion-flush</code> class. This is the first item&apos;s accordion body.
            </p>
            <button type="button" className="btn btn-primary btn-sm">
              Click Me
            </button>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="1" className="accordion-item">
          <AccordionHeader as={'h2'} id="flush-headingTwo">
            Accordion Item #2
          </AccordionHeader>
          <AccordionBody>
            Placeholder content for this accordion, which is intended to demonstrate the
            <code>.accordion-flush</code> class. This is the second item&apos;s accordion body. Let&apos;s imagine this being filled with some actual
            content.
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="2" className="accordion-item">
          <AccordionHeader as={'h2'} id="flush-headingThree">
            Accordion Item #3
          </AccordionHeader>
          <AccordionBody>
            Placeholder content for this accordion, which is intended to demonstrate the
            <code>.accordion-flush</code> class. This is the third item&apos;s accordion body. Nothing more exciting happening here in terms of
            content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a
            real-world application.
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </ComponentContainerCard>
  )
}

const BorderedAccordions = () => {
  return (
    <ComponentContainerCard
      title="Bordered Accordions"
      description={
        <>
          Using the card component, you can extend the default collapse behavior to create an accordion. To properly achieve the accordion style, be
          sure to use <code>.accordion</code> as a wrapper.
        </>
      }>
      <Accordion defaultActiveKey={'0'} className="accordion-bordered" id="BorderedaccordionExample">
        {accordionData.map((item, idx) => (
          <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader as={'h2'} id="BorderedheadingOne">
              Accordion Item #{idx}
            </AccordionHeader>
            <AccordionBody>
              <strong>This is the {item} item&apos;s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about
              any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </ComponentContainerCard>
  )
}

const CustomIconAccordion = () => {
  return (
    <ComponentContainerCard
      title="Custom Icon Accordion"
      description={
        <>
          Using the card component, you can extend the default collapse behavior to create an accordion. To properly achieve the accordion style, be
          sure to use <code>.accordion</code> as a wrapper.
        </>
      }>
      <Accordion defaultActiveKey={'0'} className="accordion-bordered accordion-custom-icon accordion-arrow-none" id="CustomIconaccordionExample">
        <AccordionItem eventKey="0">
          <AccordionHeader id="CustomIconheadingOne">
            Accordion item with tabler icons
            <IconifyIcon icon="tabler:plus" className="accordion-icon accordion-icon-on" />
            <IconifyIcon icon="tabler:minus" className="accordion-icon accordion-icon-off" />
          </AccordionHeader>
          <div
            id="CustomIconcollapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="CustomIconheadingOne"
            data-bs-parent="#CustomIconaccordionExample">
            <AccordionBody>
              <strong>This is the first item&apos;s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about
              any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </AccordionBody>
          </div>
        </AccordionItem>
        <AccordionItem eventKey="1">
          <AccordionHeader id="CustomIconheadingTwo">
            Accordion item with lucid icons
            <IconifyIcon icon="lucide:circle-plus" className="accordion-icon accordion-icon-on avatar-xxs me-n1" />
            <IconifyIcon icon="lucide:minus-circle" className="accordion-icon accordion-icon-off avatar-xxs me-n1" />
          </AccordionHeader>
          <AccordionBody>
            <strong>This is the second item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about
            any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </AccordionBody>
        </AccordionItem>
        <AccordionItem eventKey="2">
          <AccordionHeader id="CustomIconheadingThree">
            Accordion item with solar duotone icons
            <IconifyIcon icon="solar:add-square-bold-duotone" className="accordion-icon text-secondary accordion-icon-on fs-24 me-n2" />
            <IconifyIcon icon="solar:minus-square-bold-duotone" className="accordion-icon text-danger accordion-icon-off fs-24 me-n2" />
          </AccordionHeader>
          <AccordionBody>
            <strong>This is the third item&apos;s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about
            any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </ComponentContainerCard>
  )
}

const AlwaysOpenAccordions = () => {
  return (
    <ComponentContainerCard
      title="Always Open Accordions"
      description={
        <>
          Omit the <code>data-bs-parent</code> attribute on each <code>.accordion-collapse</code> to make accordion items stay open when another item
          is opened.
        </>
      }>
      <Accordion alwaysOpen defaultActiveKey={['0']} id="accordionPanelsStayOpenExample">
        {accordionData.map((item, idx) => (
          <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader id="panelsStayOpen-headingOne">Accordion Item #{item}</AccordionHeader>
            <AccordionBody>
              <strong>This is the {item} item&apos;s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about
              any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </ComponentContainerCard>
  )
}

const AccordionWithoutArrow = () => {
  return (
    <ComponentContainerCard
      title="Accordion Without Arrow"
      description={
        <>
          Using the card component, you can extend the default collapse behavior to create an accordion. To properly achieve the accordion style, be
          sure to use <code>.accordion</code> as a wrapper.
        </>
      }>
      <Accordion defaultActiveKey={'0'} className="accordion-arrow-none" id="withoutarrowaccordionExample">
        {accordionData.map((item, idx) => (
          <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader as={'h2'} id="withoutarrowheadingOne">
              Accordion Item #{item}
            </AccordionHeader>
            <AccordionBody>
              <strong>This is the {item} item&apos;s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or overriding our default variables. It&apos;s also worth noting that just about
              any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </ComponentContainerCard>
  )
}

const AccordionsPage = () => {
  return (
    <>
      <PageTitle title="Accordions" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <DefaultAccordions />
        </Col>
        <Col xl={6}>
          <FlushAccordions />
        </Col>
        <Col xl={6}>
          <BorderedAccordions />
        </Col>
        <Col xl={6}>
          <CustomIconAccordion />
        </Col>
        <Col xl={6}>
          <AlwaysOpenAccordions />
        </Col>
        <Col xl={6}>
          <AccordionWithoutArrow />
        </Col>
      </Row>
    </>
  )
}

export default AccordionsPage
