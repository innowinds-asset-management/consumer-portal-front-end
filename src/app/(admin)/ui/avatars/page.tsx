import small1 from '@/assets/images/small/small-1.jpg'
import small2 from '@/assets/images/small/small-2.jpg'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import avatar10 from '@/assets/images/users/avatar-10.jpg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import avatar6 from '@/assets/images/users/avatar-6.jpg'
import avatar7 from '@/assets/images/users/avatar-7.jpg'
import avatar8 from '@/assets/images/users/avatar-8.jpg'
import avatar9 from '@/assets/images/users/avatar-9.jpg'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import Image from 'next/image'
import { Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Avatars' }

const SizingImages = () => {
  return (
    <ComponentContainerCard
      title="Sizing - Images"
      description={
        <>
          Create and group avatars of different sizes and shapes with the css classes. Using Bootstrap&apos;s naming convention, you can control size
          of avatar including standard avatar, or scale it up to different sizes.
        </>
      }>
      <Row>
        <Col md={3}>
          <Image src={avatar2} alt="image" className="img-fluid avatar-xs rounded" />
          <p>
            <code>.avatar-xs</code>
          </p>
          <Image src={avatar3} alt="image" className="img-fluid avatar-sm rounded mt-2" />
          <p className="mb-2 mb-sm-0">
            <code>.avatar-sm</code>
          </p>
        </Col>
        <Col md={3}>
          <Image src={avatar4} alt="image" className="img-fluid avatar-md rounded" />
          <p>
            <code>.avatar-md</code>
          </p>
        </Col>
        <Col md={3}>
          <Image src={avatar5} alt="image" className="img-fluid avatar-lg rounded" />
          <p>
            <code>.avatar-lg</code>
          </p>
        </Col>
        <Col md={3}>
          <Image src={avatar6} alt="image" className="img-fluid avatar-xl rounded" />
          <p className="mb-0">
            <code>.avatar-xl</code>
          </p>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const SizingBackgroundColor = () => {
  return (
    <ComponentContainerCard
      title="Sizing - Background Color"
      description={
        <>
          Using utilities classes of background e.g. <code>bg-*</code> allows you to have any background color as well.
        </>
      }>
      <Row>
        <Col md={3}>
          <div className="avatar-xs">
            <span className="avatar-title bg-primary rounded">xs</span>
          </div>
          <p className="mb-2 mt-1">
            Using <code>.avatar-xs</code>
          </p>
          <div className="avatar-sm mt-3">
            <span className="avatar-title bg-success rounded">sm</span>
          </div>
          <p className="mb-0 mt-1">
            Using <code>.avatar-sm</code>
          </p>
        </Col>
        <Col md={3}>
          <div className="avatar-md">
            <span className="avatar-title bg-danger-subtle text-danger fs-18 rounded">MD</span>
          </div>
          <p className="mb-0 mt-1">
            Using <code>.avatar-md</code>
          </p>
        </Col>
        <Col md={3}>
          <div className="avatar-lg">
            <span className="avatar-title bg-info fs-22 rounded">LG</span>
          </div>
          <p className="mb-0 fs-14 mt-1">
            Using <code>.avatar-lg</code>
          </p>
        </Col>
        <Col md={3}>
          <div className="avatar-xl">
            <span className="avatar-title bg-warning-subtle text-warning fs-24 rounded">XL</span>
          </div>
          <p className="mb-0 mt-1">
            Using <code>.avatar-xl</code>
          </p>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const RoundedCircle = () => {
  return (
    <ComponentContainerCard
      title="Rounded Circle"
      description={
        <>
          Using an additional class <code>.rounded-circle</code> in <code className="me-1">&lt;img&gt;</code>
          element creates the rounded avatar.
        </>
      }>
      <Row>
        <Col md={4}>
          <Image src={avatar7} alt="image" className="img-fluid avatar-md rounded-circle" />
          <p className="mt-1">
            <code>.avatar-md .rounded-circle</code>
          </p>
        </Col>
        <Col md={4}>
          <Image src={avatar8} alt="image" className="img-fluid avatar-lg rounded-circle" />
          <p>
            <code>.avatar-lg .rounded-circle</code>
          </p>
        </Col>
        <Col md={4}>
          <Image src={avatar9} alt="image" className="img-fluid avatar-xl rounded-circle" />
          <p className="mb-0">
            <code>.avatar-xl .rounded-circle</code>
          </p>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const RoundedCircleBackground = () => {
  return (
    <ComponentContainerCard
      title="Rounded Circle Background"
      description={
        <>
          Using an additional class <code>.rounded-circle</code> in <code className="me-1">&lt;img&gt;</code>
          element creates the rounded avatar.
        </>
      }>
      <Row>
        <Col md={4}>
          <div className="avatar-md">
            <span className="avatar-title bg-secondary-subtle text-secondary fs-16 rounded-circle">MD</span>
          </div>
          <p className="mb-0 mt-1">
            <code>.avatar-md .rounded-circle</code>
          </p>
        </Col>
        <Col md={4}>
          <div className="avatar-lg">
            <span className="avatar-title bg-light text-dark fs-22 rounded-circle">LG</span>
          </div>
          <p className="mb-0 mt-1">
            <code>.avatar-lg .rounded-circle</code>
          </p>
        </Col>
        <Col md={4}>
          <div className="avatar-xl">
            <span className="avatar-title bg-primary-subtle text-primary fs-24 rounded-circle">XL</span>
          </div>
          <p className="mb-0">
            <code>.avatar-xl .rounded-circle</code>
          </p>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const AvatarGroup = () => {
  return (
    <ComponentContainerCard
      title="Avatar Group"
      description={
        <>
          Create and group avatars of different sizes and shapes with the css classes. Using Bootstrap&apos;s naming convention, you can control size
          of avatar including standard avatar, or scale it up to different sizes.
        </>
      }>
      <Row>
        <Col xl={3}>
          <div className="avatar-group">
            <div className="avatar">
              <Image src={avatar4} alt="avatar" className="rounded-circle avatar-sm" />
            </div>
            <div className="avatar">
              <Image src={avatar5} alt="avatar" className="rounded-circle avatar-sm" />
            </div>
            <div className="avatar">
              <Image src={avatar3} alt="avatar" className="rounded-circle avatar-sm" />
            </div>
            <div className="avatar">
              <Image src={avatar8} alt="avatar" className="rounded-circle avatar-sm" />
            </div>
            <div className="avatar">
              <Image src={avatar2} alt="avatar" className="rounded-circle avatar-sm" />
            </div>
          </div>
        </Col>
        <Col xl={3}>
          <div className="avatar-group">
            <div className="avatar avatar-sm">
              <span className="avatar-title bg-success rounded-circle fw-bold">D</span>
            </div>
            <div className="avatar avatar-sm">
              <span className="avatar-title bg-primary rounded-circle fw-bold">K</span>
            </div>
            <div className="avatar avatar-sm">
              <span className="avatar-title bg-secondary rounded-circle fw-bold">H</span>
            </div>
            <div className="avatar avatar-sm">
              <span className="avatar-title bg-warning rounded-circle fw-bold">L</span>
            </div>
            <div className="avatar avatar-sm">
              <span className="avatar-title bg-info rounded-circle fw-bold">G</span>
            </div>
          </div>
        </Col>
        <Col xl={3}>
          <div className="avatar-group">
            <div className="avatar avatar-sm">
              <span className="avatar-title bg-success-subtle text-success rounded-circle fw-bold shadow">D</span>
            </div>
            <div className="avatar avatar-sm">
              <span className="avatar-title bg-primary-subtle text-primary rounded-circle fw-bold shadow">K</span>
            </div>
            <div className="avatar avatar-sm">
              <span className="avatar-title bg-secondary-subtle text-secondary rounded-circle fw-bold shadow">H</span>
            </div>
            <div className="avatar avatar-sm">
              <span className="avatar-title bg-warning-subtle text-warning rounded-circle fw-bold shadow">L</span>
            </div>
            <div className="avatar avatar-sm">
              <span className="avatar-title bg-info-subtle text-info rounded-circle fw-bold shadow">G</span>
            </div>
          </div>
        </Col>
        <Col xl={3}>
          <div className="avatar-group">
            <div className="avatar" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-secondary" data-bs-placement="top" title="Vicki">
              <Image src={avatar10} alt="avatar" className="rounded-circle avatar-sm" />
            </div>
            <div className="avatar avatar-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Thomas">
              <span className="avatar-title bg-dark rounded-circle fw-bold">T</span>
            </div>
            <div className="avatar" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-warning" data-bs-placement="top" title="Kevin">
              <Image src={avatar7} alt="avatar" className="rounded-circle avatar-sm" />
            </div>
            <div className="avatar" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-info" data-bs-placement="top" title="Chris">
              <Image src={avatar1} alt="avatar" className="rounded-circle avatar-sm" />
            </div>
            <div
              className="avatar avatar-sm"
              data-bs-toggle="tooltip"
              data-bs-custom-class="tooltip-danger"
              data-bs-placement="top"
              title="15 more Users">
              <span className="avatar-title bg-danger rounded-circle fw-bold">9+</span>
            </div>
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const ImagesShapes = () => {
  return (
    <ComponentContainerCard title="Images Shapes" description={<>Avatars with different sizes and shapes.</>}>
      <Row>
        <Col sm={2}>
          <Image src={small2} alt="image" className="img-fluid rounded" width={200} />
          <p className="mb-0">
            <code>.rounded</code>
          </p>
        </Col>
        <Col sm={2} className="text-center">
          <Image src={avatar2} alt="image" className="img-fluid rounded" width={120} />
          <p className="mb-0">
            <code>.rounded</code>
          </p>
        </Col>
        <Col sm={2} className="text-center">
          <Image src={avatar7} alt="image" className="img-fluid rounded-circle" width={120} />
          <p className="mb-0">
            <code>.rounded-circle</code>
          </p>
        </Col>
        <Col sm={2}>
          <Image src={small1} alt="image" className="img-fluid img-thumbnail" width={200} />
          <p className="mb-0">
            <code>.img-thumbnail</code>
          </p>
        </Col>
        <Col sm={2}>
          <Image src={avatar8} alt="image" className="img-fluid rounded-circle img-thumbnail" width={120} />
          <p className="mb-0">
            <code>.rounded-circle .img-thumbnail</code>
          </p>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const AvatarsPage = () => {
  return (
    <>
      <PageTitle title="Avatars" subTitle="Base UI" />
      <Row>
        <Col xxl={6}>
          <SizingImages />
        </Col>
        <Col xxl={6}>
          <SizingBackgroundColor />
        </Col>
      </Row>
      <Row>
        <Col xxl={6}>
          <RoundedCircle />
        </Col>
        <Col xxl={6}>
          <RoundedCircleBackground />
        </Col>
      </Row>
      <Row>
        <Col xxl={12}>
          <AvatarGroup />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ImagesShapes />
        </Col>
      </Row>
    </>
  )
}

export default AvatarsPage
