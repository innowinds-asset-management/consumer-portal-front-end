import small1Img from '@/assets/images/small/small-1.jpg'
import small2Img from '@/assets/images/small/small-2.jpg'
import small3Img from '@/assets/images/small/small-3.jpg'
import small4Img from '@/assets/images/small/small-4.jpg'
import small5Img from '@/assets/images/small/small-5.jpg'
import small6Img from '@/assets/images/small/small-6.jpg'
import small7Img from '@/assets/images/small/small-7.jpg'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import Image from 'next/image'
import { Carousel, CarouselItem, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Carousel' }

const SlidesOnly = () => {
  return (
    <ComponentContainerCard
      title="Slides Only"
      description={
        <>
          Here’s a carousel with slides only. Note the presence of the <code className="me-1">.d-block</code>
          and <code>.img-fluid</code> on carousel images to prevent browser default image alignment.
        </>
      }>
      <Carousel controls={false} indicators={false} id="carouselExampleSlidesOnly" className="slide" data-bs-ride="carousel">
        <CarouselItem className=" active">
          <Image className="d-block img-fluid" src={small1Img} alt="First slide" />
        </CarouselItem>
        <CarouselItem className="">
          <Image className="d-block img-fluid" src={small2Img} alt="Second slide" />
        </CarouselItem>
        <CarouselItem className="">
          <Image className="d-block img-fluid" src={small3Img} alt="Third slide" />
        </CarouselItem>
      </Carousel>
    </ComponentContainerCard>
  )
}

const SlidesWithControls = () => {
  return (
    <ComponentContainerCard title="With Controls" description={<>Adding in the previous and next controls:</>}>
      <Carousel indicators={false} id="carouselExampleControls" className="slide" data-bs-ride="carousel">
        <CarouselItem className="carousel-item active">
          <Image className="d-block img-fluid" src={small4Img} alt="First slide" />
        </CarouselItem>
        <CarouselItem className="carousel-item">
          <Image className="d-block img-fluid" src={small1Img} alt="Second slide" />
        </CarouselItem>
        <CarouselItem className="carousel-item">
          <Image className="d-block img-fluid" src={small2Img} alt="Third slide" />
        </CarouselItem>
      </Carousel>
    </ComponentContainerCard>
  )
}

const SlidesWithIndicators = () => {
  return (
    <ComponentContainerCard title="With Indicators" description={<>You can also add the indicators to the carousel, alongside the controls, too.</>}>
      <Carousel controls={true} indicators={true} id="carouselExampleIndicators">
        <CarouselItem className=" active">
          <Image className="d-block img-fluid" src={small3Img} alt="First slide" />
        </CarouselItem>
        <CarouselItem className="">
          <Image className="d-block img-fluid" src={small2Img} alt="Second slide" />
        </CarouselItem>
        <CarouselItem className="">
          <Image className="d-block img-fluid" src={small1Img} alt="Third slide" />
        </CarouselItem>
      </Carousel>
    </ComponentContainerCard>
  )
}

const SlidesWithCaptions = () => {
  return (
    <ComponentContainerCard
      title="With Captions"
      description={
        <>
          Add captions to your slides easily with the <code>.carousel-caption</code> element within any <code>.carousel-item</code>.
        </>
      }>
      <Carousel indicators={false} id="carouselExampleCaption" className="slide" data-bs-ride="carousel">
        <CarouselItem className=" active">
          <Image src={small1Img} alt="..." className="d-block img-fluid" />
          <div className="carousel-caption d-none d-md-block">
            <h3 className="text-white">First slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <Image src={small3Img} alt="..." className="d-block img-fluid" />
          <div className="carousel-caption d-none d-md-block">
            <h3 className="text-white">Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <Image src={small2Img} alt="..." className="d-block img-fluid" />
          <div className="carousel-caption d-none d-md-block">
            <h3 className="text-white">Third slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </CarouselItem>
      </Carousel>
    </ComponentContainerCard>
  )
}

const CrossFade = () => {
  return (
    <ComponentContainerCard
      title="Crossfade"
      description={
        <>
          Add <code>.carousel-fade</code> to your carousel to animate slides with a fade transition instead of a slide.
        </>
      }>
      <Carousel indicators={false} id="carouselExampleFade" className="slide carousel-fade" data-bs-ride="carousel">
        <CarouselItem className=" active">
          <Image className="d-block img-fluid" src={small1Img} alt="First slide" />
        </CarouselItem>
        <CarouselItem className="">
          <Image className="d-block img-fluid" src={small2Img} alt="Second slide" />
        </CarouselItem>
        <CarouselItem className="">
          <Image className="d-block img-fluid" src={small3Img} alt="Third slide" />
        </CarouselItem>
      </Carousel>
    </ComponentContainerCard>
  )
}

const IndividualInterval = () => {
  return (
    <ComponentContainerCard
      title="Individual Interval"
      description={
        <>
          Add <code>data-bs-interval=</code> to a <code>.carousel-item</code> to change the amount of time to delay between automatically cycling to
          the next item.
        </>
      }>
      <Carousel indicators={false} id="carouselExampleInterval" className="slide" data-bs-ride="carousel">
        <CarouselItem className=" active" data-bs-interval={1000}>
          <Image src={small4Img} className="img-fluid d-block w-100" alt="First slide" />
        </CarouselItem>
        <CarouselItem data-bs-interval={2000}>
          <Image src={small2Img} className="img-fluid d-block w-100" alt="Second slide" />
        </CarouselItem>
        <CarouselItem>
          <Image src={small1Img} className="img-fluid d-block w-100" alt="Third slide" />
        </CarouselItem>
      </Carousel>
    </ComponentContainerCard>
  )
}

const DarkVariant = () => {
  return (
    <ComponentContainerCard
      title="Dark Variant"
      description={
        <>
          Add <code>.carousel-dark</code> to the <code>.carousel</code> for darker controls, indicators, and captions. Controls are inverted compared
          to their default white fill with the <code>filter</code> CSS property. Captions and controls have additional Sass variables that customize
          the <code>color</code> and <code>background-color</code>.
        </>
      }>
      <Carousel id="carouselExampleDark" className="carousel-dark slide">
        <CarouselItem className=" active" data-bs-interval={10000}>
          <Image src={small5Img} className="img-fluid" alt="Images" />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </CarouselItem>
        <CarouselItem data-bs-interval={2000}>
          <Image src={small6Img} className="img-fluid" alt="Images" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <Image src={small7Img} className="img-fluid" alt="Images" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </CarouselItem>
      </Carousel>
    </ComponentContainerCard>
  )
}

const CarouselPage = () => {
  return (
    <>
      <PageTitle title="Carousel" subTitle="Base UI" />
      <Row>
        <Col lg={6}>
          <SlidesOnly />
        </Col>
        <Col lg={6}>
          <SlidesWithControls />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <SlidesWithIndicators />
        </Col>
        <Col lg={6}>
          <SlidesWithCaptions />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <CrossFade />
        </Col>
        <Col lg={6}>
          <IndividualInterval />
        </Col>
        <Col lg={6}>
          <DarkVariant />
        </Col>
      </Row>
    </>
  )
}

export default CarouselPage
