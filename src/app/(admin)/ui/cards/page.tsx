import small1Img from '@/assets/images/small/small-1.jpg'
import small2Img from '@/assets/images/small/small-2.jpg'
import small3Img from '@/assets/images/small/small-3.jpg'
import small4Img from '@/assets/images/small/small-4.jpg'
import PageTitle from '@/components/PageTitle'
import { colorVariants } from '@/context/constants'
import { Metadata } from 'next'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Cards' }

type CardGroupType = {
  id: number
  image: StaticImageData
  title: string
  text: string
  subtext: string
}

const CardWithImage = () => {
  return (
    <Card className="d-block">
      <Image className="card-img-top img-fluid" width={381} height={254} src={small1Img} alt="Card image cap" />
      <CardBody>
        <CardTitle as={'h5'}>Card title</CardTitle>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card&apos;s content. Some quick example text to build on the
          card title and make up.
        </p>
        <Button variant="primary">Button</Button>
      </CardBody>
    </Card>
  )
}

const CardWithImage2 = () => {
  return (
    <Card className="d-block">
      <Image className="card-img-top img-fluid" width={381} height={254} src={small2Img} alt="Card image cap" />
      <CardBody>
        <CardTitle as={'h5'}>Card title</CardTitle>
        <p className="card-text">Some quick example text to build on the card..</p>
      </CardBody>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Cras justo odio</li>
      </ul>
      <CardBody>
        <Link href="" className="card-link text-custom">
          Card link
        </Link>
        &nbsp;
        <Link href="" className="card-link text-custom">
          Another link
        </Link>
      </CardBody>
    </Card>
  )
}

const CardWithImage3 = () => {
  return (
    <Card className="d-block">
      <Image className="card-img-top img-fluid" width={381} height={254} src={small3Img} alt="Card image cap" />
      <CardBody>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card&apos;s content. Some quick example text to build on the
          card title and make up.
        </p>
        <Button variant="primary">Button</Button>
      </CardBody>
    </Card>
  )
}

const CardWithTitleAndImage = () => {
  return (
    <Card className="d-block">
      <CardBody>
        <CardTitle as={'h5'}>Card title</CardTitle>
        <h6 className="card-subtitle text-muted">Support card subtitle</h6>
      </CardBody>
      <Image className="img-fluid" src={small4Img} alt="Card image cap" />
      <CardBody>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
        <Link href="" className="card-link text-custom">
          Card link
        </Link>
        &nbsp;
        <Link href="" className="card-link text-custom">
          Another link
        </Link>
      </CardBody>
    </Card>
  )
}

const CardWithSpecialTitle = () => {
  return (
    <Card className="card-body">
      <CardTitle as={'h5'}>Special title treatment</CardTitle>
      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <Button variant="primary">Go somewhere</Button>
    </Card>
  )
}

const CardWithHeader = () => {
  return (
    <Card>
      <h5 className="card-header bg-light">Featured</h5>
      <CardBody>
        <CardTitle as={'h5'}>Special title treatment</CardTitle>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <Button variant="primary">Go somewhere</Button>
      </CardBody>
    </Card>
  )
}

const CardWithHeaderAndQuote = () => {
  return (
    <Card>
      <CardHeader className="bg-light">Quote</CardHeader>
      <CardBody>
        <blockquote className="card-bodyquote">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer>
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </CardBody>
    </Card>
  )
}

const CardWithHeaderAndFooter = () => {
  return (
    <Card>
      <CardHeader className="bg-light">Featured</CardHeader>
      <CardBody>
        <Button variant="primary">Go somewhere</Button>
      </CardBody>
      <CardFooter className="border-top border-light text-muted">2 days ago</CardFooter>
    </Card>
  )
}

const ColorCards = () => {
  return (
    <Row>
      <Col lg={4} sm={6}>
        <Card className="text-bg-secondary">
          <CardBody>
            <CardTitle as={'h5'}>Special title treatment</CardTitle>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <Button variant="primary" size="sm">
              Button
            </Button>
          </CardBody>
        </Card>
      </Col>
      {colorVariants.slice(1, 6).map((item, idx) => (
        <Col lg={4} sm={6} key={idx}>
          <Card className={`text-bg-${item}`}>
            <CardBody>
              <blockquote className="card-bodyquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

const ColorCards2 = () => {
  return (
    <Row>
      {colorVariants.slice(0, 6).map((item, idx) => (
        <Col lg={4} sm={6} key={idx}>
          <Card className={`text-bg-${item} bg-gradient`}>
            <CardBody>
              <blockquote className="card-bodyquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer>
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

const BorderedCards = () => {
  return (
    <>
      <Col md={4}>
        <Card className="border-secondary border">
          <CardBody>
            <CardTitle as={'h5'}>Special title treatment</CardTitle>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <Button variant="secondary" size="sm">
              Button
            </Button>
          </CardBody>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="border-primary border border-dashed">
          <CardBody>
            <CardTitle as={'h5'} className="text-primary">
              Special title treatment
            </CardTitle>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <Button variant="primary" size="sm">
              Button
            </Button>
          </CardBody>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="border-success border">
          <CardBody>
            <h5 className="card-title text-success">Special title treatment</h5>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <Button variant="success" size="sm">
              Button
            </Button>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

const CardWithStretchedLink = () => {
  return (
    <>
      <Col sm={6} lg={3}>
        <Card>
          <Image src={small2Img} height={254} width={381} className="card-img-top img-fluid" alt="..." />
          <CardBody>
            <CardTitle as={'h5'}>Card with stretched link</CardTitle>
            <Button variant="primary" className="mt-2 stretched-link">
              Go somewhere
            </Button>
          </CardBody>
        </Card>
      </Col>
      <Col sm={6} lg={3}>
        <Card>
          <Image src={small3Img} height={254} width={381} className="card-img-top img-fluid" alt="..." />
          <CardBody>
            <CardTitle as={'h5'}>
              <Link href="" className="text-success stretched-link">
                Card with stretched link
              </Link>
            </CardTitle>
            <p className="card-text">Some quick example text to build on the card up the bulk of the card&apos;s content.</p>
          </CardBody>
        </Card>
      </Col>
      <Col sm={6} lg={3}>
        <Card>
          <Image src={small4Img} height={254} width={381} className="card-img-top img-fluid" alt="..." />
          <CardBody>
            <CardTitle as={'h5'}>Card with stretched link</CardTitle>
            <Button variant="info" className="mt-2 stretched-link">
              Go somewhere
            </Button>
          </CardBody>
        </Card>
      </Col>
      <Col sm={6} lg={3}>
        <Card>
          <Image src={small1Img} height={254} width={381} className="card-img-top img-fluid" alt="..." />
          <CardBody>
            <CardTitle as={'h5'}>
              <Link href="" className="stretched-link">
                Card with stretched link
              </Link>
            </CardTitle>
            <p className="card-text">Some quick example text to build on the card up the bulk of the card&apos;s content.</p>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

const HorizontalCard = () => {
  return (
    <>
      <Col lg={6}>
        <Card>
          <Row className="g-0 align-items-center">
            <Col md={4}>
              <Image src={small4Img} className="img-fluid rounded-start" alt="..." />
            </Col>
            <Col md={8}>
              <CardBody>
                <CardTitle as={'h5'}>Card title</CardTitle>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </CardBody>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col lg={6}>
        <Card>
          <Row className="g-0 align-items-center">
            <Col md={8}>
              <CardBody>
                <CardTitle as={'h5'}>Card title</CardTitle>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </CardBody>
            </Col>
            <Col md={4}>
              <Image src={small1Img} className="img-fluid rounded-end" alt="..." />
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  )
}

const CardWithGroup = ({ item }: { item: CardGroupType }) => {
  return (
    <Card className="d-block">
      <Image className="card-img-top img-fluid" height={354} width={532} src={item.image} alt="Card image cap" />
      <CardBody>
        <CardTitle as={'h5'}>{item.title}</CardTitle>
        <p className="card-text">{item.text}</p>
        <p className="card-text">
          <small className="text-muted">{item.subtext}</small>
        </p>
      </CardBody>
    </Card>
  )
}

const CardsPage = () => {
  const CardGroupDetails: CardGroupType[] = [
    {
      id: 1,
      image: small1Img,
      title: 'Card title',
      text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      subtext: 'Last updated 3 mins ago',
    },
    {
      id: 2,
      image: small2Img,
      title: 'Card title',
      text: 'This card has supporting text below as a natural lead-in to additional content.',
      subtext: 'Last updated 3 mins ago',
    },
    {
      id: 3,
      image: small3Img,
      title: 'Card title',
      text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
      subtext: 'Last updated 3 mins ago',
    },
  ]
  return (
    <>
      <PageTitle title="Cards" subTitle="Base UI" />
      <Row>
        <Col sm={6} lg={3}>
          <CardWithImage />
        </Col>
        <Col sm={6} lg={3}>
          <CardWithImage2 />
        </Col>
        <Col sm={6} lg={3}>
          <CardWithImage3 />
        </Col>
        <Col sm={6} lg={3}>
          <CardWithTitleAndImage />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <CardWithSpecialTitle />
        </Col>
        <Col sm={6}>
          <CardWithSpecialTitle />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <CardWithHeader />
        </Col>
        <Col md={4}>
          <CardWithHeaderAndQuote />
        </Col>
        <Col md={4}>
          <CardWithHeaderAndFooter />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h4 className="mb-4 mt-3">Card Colored</h4>
        </Col>
      </Row>
      <ColorCards />
      <ColorCards2 />

      <Row>
        <Col xs={12}>
          <h4 className="mb-4 mt-3">Card Bordered</h4>
        </Col>
      </Row>
      <Row>
        <BorderedCards />
      </Row>
      <Row>
        <Col xs={12}>
          <h4 className="mb-4 mt-3">Horizontal Card</h4>
        </Col>
      </Row>
      <Row>
        <HorizontalCard />
      </Row>
      <Row>
        <Col xs={12}>
          <h4 className="mb-4 mt-3">Stretched link</h4>
        </Col>
      </Row>
      <Row>
        <CardWithStretchedLink />
      </Row>
      <Row>
        <Col xs={12}>
          <h4 className="mb-4 mt-3">Card Group</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="card-group">
            {CardGroupDetails.map((item, idx) => (
              <CardWithGroup item={item} key={idx} />
            ))}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CardsPage
