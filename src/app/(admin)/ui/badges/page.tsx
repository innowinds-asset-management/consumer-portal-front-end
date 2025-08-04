import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'badges' }

const DefaultBadges = () => {
  return (
    <ComponentContainerCard
      title="Default"
      description={
        <>
          A simple labeling component. Badges scale to match the size of the immediate parent element by using relative font sizing and
          <code>em</code> units.
        </>
      }>
      <h1>
        h1.Example heading <span className="badge bg-secondary-subtle text-secondary">New</span>
      </h1>
      <h2>
        h2.Example heading <span className="badge badge-soft-success">New</span>
      </h2>
      <h3>
        h2.Example heading <span className="badge bg-primary">New</span>
      </h3>
      <h4>
        h4.Example heading
        <Link href="" className="badge badge-soft-info">
          Info Link
        </Link>
      </h4>
      <h5>
        h5.Example heading <span className="badge badge-outline-warning">New</span>
      </h5>
      <h6>
        h6.Example heading <span className="badge bg-danger">New</span>
      </h6>
    </ComponentContainerCard>
  )
}

const ContextualVariations = () => {
  return (
    <ComponentContainerCard
      title="Pill Badges"
      description={
        <>
          Use the <code>.rounded-pill</code> modifier class to make badges more rounded.
        </>
      }>
      <span className="badge me-1 bg-primary rounded-pill">Primary</span>
      <span className="badge me-1 text-bg-secondary rounded-pill">Secondary</span>
      <span className="badge me-1 bg-success rounded-pill">Success</span>
      <span className="badge me-1 bg-danger rounded-pill">Danger</span>
      <span className="badge me-1 bg-warning rounded-pill">Warning</span>
      <span className="badge me-1 bg-info rounded-pill">Info</span>
      <span className="badge me-1 bg-light text-dark rounded-pill">Light</span>
      <span className="badge me-1 bg-dark text-light rounded-pill">Dark</span>
      <h5 className="mt-4">Lighten Badges</h5>
      <p className="text-muted">
        Use the <code>.badgesoft--*</code> modifier class to make badges lighten.
      </p>
      <span className="badge me-1 badge-soft-primary rounded-pill">Primary</span>
      <span className="badge me-1 badge-soft-secondary rounded-pill">Secondary</span>
      <span className="badge me-1 badge-soft-success rounded-pill">Success</span>
      <span className="badge me-1 badge-soft-danger rounded-pill">Danger</span>
      <span className="badge me-1 badge-soft-warning rounded-pill">Warning</span>
      <span className="badge me-1 badge-soft-info rounded-pill">Info</span>
      <span className="badge me-1 badge-soft-dark rounded-pill">Dark</span>
      <h5 className="mt-4">Outline Badges</h5>
      <p className="text-muted">
        Using the <code>.badge-outline-*</code> to quickly create a bordered badges.
      </p>
      <span className="badge me-1 badge-outline-primary rounded-pill">Primary</span>
      <span className="badge me-1 badge-outline-secondary rounded-pill">Secondary</span>
      <span className="badge me-1 badge-outline-success rounded-pill">Success</span>
      <span className="badge me-1 badge-outline-danger rounded-pill">Danger</span>
      <span className="badge me-1 badge-outline-warning rounded-pill">Warning</span>
      <span className="badge me-1 badge-outline-info rounded-pill">Info</span>
      <span className="badge me-1 badge-outline-dark rounded-pill">Dark</span>
    </ComponentContainerCard>
  )
}

const PillBadges = () => {
  return (
    <ComponentContainerCard
      title="Contextual variations"
      description={
        <>
          Add any of the below mentioned modifier classes to change the appearance of a badge. Badge can be more contextual as well. Just use regular
          convention e.g. <code>badge-*color</code>, <code>bg-primary</code>
          to have badge with different background.
        </>
      }>
      <span className="badge me-1 bg-primary">Primary</span>
      <span className="badge me-1 text-bg-secondary">Secondary</span>
      <span className="badge me-1 bg-success">Success</span>
      <span className="badge me-1 bg-danger">Danger</span>
      <span className="badge me-1 bg-warning">Warning</span>
      <span className="badge me-1 bg-info">Info</span>
      <span className="badge me-1 bg-light text-dark">Light</span>
      <span className="badge me-1 bg-dark text-light">Dark</span>
      <h5 className="mt-4">Lighten Badges</h5>
      <p className="text-muted">
        Using the <code>.badgesoft--*</code> modifier class, you can have more soften variation.
      </p>
      <span className="badge me-1 badge-soft-primary">Primary</span>
      <span className="badge me-1 badge-soft-secondary">Secondary</span>
      <span className="badge me-1 badge-soft-success">Success</span>
      <span className="badge me-1 badge-soft-danger">Danger</span>
      <span className="badge me-1 badge-soft-warning">Warning</span>
      <span className="badge me-1 badge-soft-info">Info</span>
      <span className="badge me-1 badge-soft-dark">Dark</span>
      <h5 className="mt-4">Outline Badges</h5>
      <p className="text-muted">
        Using the <code>.badge-outline-*</code> to quickly create a bordered badges.
      </p>
      <span className="badge me-1 badge-outline-primary">Primary</span>
      <span className="badge me-1 badge-outline-secondary">Secondary</span>
      <span className="badge me-1 badge-outline-success">Success</span>
      <span className="badge me-1 badge-outline-danger">Danger</span>
      <span className="badge me-1 badge-outline-warning">Warning</span>
      <span className="badge me-1 badge-outline-info">Info</span>
      <span className="badge me-1 badge-outline-dark">Dark</span>
    </ComponentContainerCard>
  )
}

const BadgePositioned = () => {
  return (
    <ComponentContainerCard
      title="Badge Positioned"
      description={
        <>
          Use utilities to modify a <code>.badge</code> and position it in the corner of a link or button.
        </>
      }>
      <Row>
        <Col xs={6}>
          <button type="button" className="btn btn-primary position-relative">
            Inbox
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              99+
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </Col>
        <Col xs={6}>
          <button type="button" className="btn btn-primary position-relative">
            Profile
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </button>
        </Col>
        <Col xs={6}>
          <button type="button" className="btn btn-success mt-4">
            Notifications <span className="badge bg-light text-dark ms-1">4</span>
          </button>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const BadgesPage = () => {
  return (
    <>
      <PageTitle title="Badges" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <DefaultBadges />
          <ContextualVariations />
        </Col>
        <Col xl={6}>
          <PillBadges />
          <BadgePositioned />
        </Col>
      </Row>
    </>
  )
}

export default BadgesPage
