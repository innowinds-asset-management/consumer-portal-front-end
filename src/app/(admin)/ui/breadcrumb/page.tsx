import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Breadcrumb' }

const ExampleBreadcrumb = () => {
  return (
    <>
      <Card>
        <CardHeader className="border-bottom border-dashed d-flex align-items-center">
          <h4 className="header-title">Example</h4>
        </CardHeader>
        <CardBody>
          <p className="text-muted">
            Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS. Please read the official{' '}
            <Link target="_blank" href="https://getbootstrap.com/docs/5.3/components/breadcrumb/">
              Bootstrap
            </Link>
            documentation for more options.
          </p>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 py-2">
              <li className="breadcrumb-item active" aria-current="page">
                Home
              </li>
            </ol>
          </nav>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 py-2">
              <li className="breadcrumb-item">
                <Link href="#">Home</Link>
              </li>
              <div className="mx-1" style={{ height: 24 }}>
                <IconifyIcon icon="tabler:chevron-right" height={16} width={16} />
              </div>
              <li className="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 py-2">
              <li className="breadcrumb-item">
                <Link href="#">Home</Link>
              </li>
              <div className="mx-1" style={{ height: 24 }}>
                <IconifyIcon icon="tabler:chevron-right" height={16} width={16} />
              </div>
              <li className="breadcrumb-item">
                <Link href="#">Library</Link>
              </li>
              <div className="mx-1" style={{ height: 24 }}>
                <IconifyIcon icon="tabler:chevron-right" height={16} width={16} />
              </div>
              <li className="breadcrumb-item active" aria-current="page">
                Data
              </li>
            </ol>
          </nav>
        </CardBody>
      </Card>
    </>
  )
}

const BreadcrumbWithIcons = () => {
  return (
    <Card>
      <CardHeader className="border-bottom border-dashed d-flex align-items-center">
        <h4 className="header-title">With Icons</h4>
      </CardHeader>
      <CardBody>
        <p className="text-muted">Optionally you can also specify the icon with your breadcrumb item.</p>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light bg-opacity-50 p-2 mb-2">
            <li className="breadcrumb-item active" aria-current="page">
              <IconifyIcon icon="tabler:smart-home" className="fs-16 me-1" />
              Home
            </li>
          </ol>
        </nav>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light bg-opacity-50 p-2 mb-2">
            <li className="breadcrumb-item">
              <Link href="#">
                <IconifyIcon icon="tabler:smart-home" className="fs-16 me-1" />
                Home
              </Link>
            </li>
            <div className="mx-1" style={{ height: 24 }}>
              <IconifyIcon icon="tabler:chevron-right" height={16} width={16} />
            </div>
            <li className="breadcrumb-item active" aria-current="page">
              Library
            </li>
          </ol>
        </nav>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light bg-opacity-50 p-2 mb-0">
            <li className="breadcrumb-item">
              <Link href="#">
                <IconifyIcon icon="tabler:smart-home" className="fs-16 me-1" />
                Home
              </Link>
            </li>
            <div className="mx-1" style={{ height: 24 }}>
              <IconifyIcon icon="tabler:chevron-right" height={16} width={16} />
            </div>
            <li className="breadcrumb-item">
              <Link href="#">Library</Link>
            </li>
            <div className="mx-1" style={{ height: 24 }}>
              <IconifyIcon icon="tabler:chevron-right" height={16} width={16} />
            </div>
            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </nav>
      </CardBody>
    </Card>
  )
}

const DividersBreadcrumb = () => {
  return (
    <Card>
      <CardHeader className="border-bottom border-dashed d-flex align-items-center">
        <h4 className="header-title">Dividers</h4>
      </CardHeader>
      <CardBody>
        <p className="text-muted">
          Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS. Please read the official{' '}
          <Link target="_blank" href="https://getbootstrap.com/docs/5.3/components/breadcrumb/">
            Bootstrap
          </Link>
          documentation for more options.
        </p>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 py-2 d-flex align-items-center gap-1">
            <li className="breadcrumb-item">
              <Link href="">Home</Link>
            </li>
            <IconifyIcon icon="tabler:chevron-right" />
            <li className="breadcrumb-item">
              <Link href="">Library</Link>
            </li>
            <IconifyIcon icon="tabler:chevron-right" />
            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </nav>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 py-2 d-flex align-items-center gap-1">
            <li className="breadcrumb-item">
              <Link href="">Home</Link>
            </li>
            <IconifyIcon icon='ri:arrow-drop-right-line' width={25} height={25} />
            <li className="breadcrumb-item content-none">
              <Link href="">Library</Link>
            </li>
            <IconifyIcon icon='ri:arrow-drop-right-line' width={25} height={25}/>
            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </nav>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 py-2 d-flex align-items-center gap-1">
            <li className="breadcrumb-item">
              <Link href="">Home</Link>
            </li>
            <IconifyIcon icon="tabler:chevron-right" />
            <li className="breadcrumb-item">
              <Link href="">Library</Link>
            </li>
            <IconifyIcon icon="tabler:chevron-right" />

            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </nav>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 py-2 d-flex align-items-center gap-1">
            <li className="breadcrumb-item">
              <Link href="">Home</Link>
            </li>
            <IconifyIcon icon="tabler:chevron-right" />
            <li className="breadcrumb-item">
              <Link href="">Library</Link>
            </li>
            <IconifyIcon icon="tabler:chevron-right" />

            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </nav>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 py-2 d-flex align-items-center gap-1">
            <li className="breadcrumb-item">
              <Link href="">Home</Link>
            </li>
            <IconifyIcon icon="tabler:chevron-right" />
            <li className="breadcrumb-item">
              <Link href="">Library</Link>
            </li>
            <IconifyIcon icon="tabler:chevron-right" />
            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </nav>
      </CardBody>
    </Card>
  )
}

const BreadcrumbPage = () => {
  return (
    <>
      <PageTitle title="Breadcrumb" subTitle="Base UI" />
      <div>
        <Row>
          <Col xl={6}>
            <ExampleBreadcrumb />
          </Col>
          <Col xl={6}>
            <BreadcrumbWithIcons />
          </Col>
        </Row>
        <Row>
          <Col xl={6}>
            <DividersBreadcrumb />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default BreadcrumbPage
