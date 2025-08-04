import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Scrollbar' }

const DefaultScrollBar = () => {
  return (
    <ComponentContainerCard
      title="Default Scroll"
      description={
        <>
          Just use data attribute <code>data-simplebar</code>&nbsp; and add
          <code>max-height: **px</code> oh fix height
        </>
      }>
      <SimplebarReactClient className="card-body p-0 py-0 mb-3" style={{ maxHeight: 250 }}>
        SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
        some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
        awesomeness of native scrolling...with a custom scrollbar!
        <p>
          SimpleBar
          <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the <strong>native</strong>&nbsp;
          <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar visual appearance.
        </p>
        <h5>Design it as you want</h5>
        <p>
          SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
          just keep the default style (&quot;Mac OS&quot; scrollbar style).
        </p>
        <h5>Lightweight and performant</h5>
        <p>
          Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
        </p>
        <h5>Supported everywhere</h5>
        <p className="mb-0">SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
      </SimplebarReactClient>
    </ComponentContainerCard>
  )
}

const PositionScrollBar = () => {
  return (
    <ComponentContainerCard
      title="RTL Position"
      description={
        <>
          Just use data attribute
          <code>data-simplebar data-simplebar-direction=&apos;rtl&apos;</code>
          and add <code>max-height: **px</code> oh fix height
        </>
      }>
      <SimplebarReactClient className="card-body  py-0 mb-3" data-simplebar-direction="rtl" style={{ maxHeight: 250 }}>
        SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
        some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
        awesomeness of native scrolling...with a custom scrollbar!
        <p>
          SimpleBar
          <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the <strong>native</strong>&nbsp;
          <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar visual appearance.
        </p>
        <h5>Design it as you want</h5>
        <p>
          SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
          just keep the default style (&quot;Mac OS&quot; scrollbar style).
        </p>
        <h5>Lightweight and performant</h5>
        <p>
          Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
        </p>
        <h5>Supported everywhere</h5>
        <p className="mb-0">SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
      </SimplebarReactClient>
    </ComponentContainerCard>
  )
}

const SizeScrollBar = () => {
  return (
    <ComponentContainerCard
      title="Scroll Size"
      description={
        <>
          Just use data attribute <code>data-simplebar</code>
          and add <code>max-height: **px</code> oh fix height
        </>
      }>
      <SimplebarReactClient className="card-body p-0 py-0 mb-3" data-simplebar-lg style={{ maxHeight: 250 }}>
        SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
        some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
        awesomeness of native scrolling...with a custom scrollbar!
        <p>
          SimpleBar
          <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the <strong>native</strong>&nbsp;
          <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar visual appearance.
        </p>
        <h5>Design it as you want</h5>
        <p>
          SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
          just keep the default style (&quot;Mac OS&quot; scrollbar style).
        </p>
        <h5>Lightweight and performant</h5>
        <p>
          Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
        </p>
        <h5>Supported everywhere</h5>
        <p className="mb-0">SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
      </SimplebarReactClient>
    </ComponentContainerCard>
  )
}

const ScrollColor = () => {
  return (
    <ComponentContainerCard
      title="Scroll Color"
      description={
        <>
          Just use data attribute
          <code>data-simplebar data-simplebar-primary</code>
          and add <code>max-height: **px</code> oh fix height
        </>
      }>
      <SimplebarReactClient className="card-body p-0 py-0 mb-3" data-simplebar-primary style={{ maxHeight: 250 }}>
        SimpleBar does only one thing: replace the browser&apos;s default scrollbar with a custom CSS-styled one without losing performances. Unlike
        some popular plugins, SimpleBar doesn&apos;t mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep the
        awesomeness of native scrolling...with a custom scrollbar!
        <p>
          SimpleBar
          <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the <strong>native</strong>&nbsp;
          <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar visual appearance.
        </p>
        <h5>Design it as you want</h5>
        <p>
          SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or
          just keep the default style (&quot;Mac OS&quot; scrollbar style).
        </p>
        <h5>Lightweight and performant</h5>
        <p>
          Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.
        </p>
        <h5>Supported everywhere</h5>
        <p className="mb-0">SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</p>
      </SimplebarReactClient>
    </ComponentContainerCard>
  )
}

const Scrollbar = () => {
  return (
    <>
      <PageTitle title="Scrollbar" subTitle="Extended UI" />
      <Row>
        <Col xl={6}>
          <DefaultScrollBar />
        </Col>
        <Col xl={6}>
          <PositionScrollBar />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <SizeScrollBar />
        </Col>
        <Col xl={6}>
          <ScrollColor />
        </Col>
      </Row>
    </>
  )
}

export default Scrollbar
