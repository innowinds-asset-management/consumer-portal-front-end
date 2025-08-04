import small1 from '@/assets/images/small/small-1.jpg'
import small2 from '@/assets/images/small/small-2.jpg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Utilities' }

const BackgroundColor = () => {
  return (
    <ComponentContainerCard
      title="Background Color"
      description={
        <>
          Similar to the contextual text color classes, set the background of an element to any contextual class. Background utilities
          <strong>
            do not set <code>color</code>
          </strong>
          , so in some cases you’ll want to use <code>.text-*</code>color utilities.
        </>
      }>
      <div className="bg-primary text-white p-2 mb-2">.bg-primary</div>
      <div className="bg-secondary text-white p-2 mb-2">.bg-secondary</div>
      <div className="bg-success text-white p-2 mb-2">.bg-success</div>
      <div className="bg-danger text-white p-2 mb-2">.bg-danger</div>
      <div className="bg-warning text-dark p-2 mb-2">.bg-warning</div>
      <div className="bg-info text-dark p-2 mb-2">.bg-info</div>
      <div className="bg-light text-dark p-2 mb-2">.bg-light</div>
      <div className="bg-dark p-2 mb-2">.bg-dark</div>
      <div className="bg-body text-dark p-2 mb-2">.bg-body</div>
      <div className="bg-body-secondary text-dark p-2 mb-2">.bg-body-secondary</div>
      <div className="bg-body-tertiary text-dark p-2 mb-2">.bg-body-tertiary</div>
      <div className="bg-white p-2 mb-2">.bg-white</div>
      <div className="bg-black text-white p-2 mb-2">.bg-black</div>
      <div className="bg-transparent text-dark p-2">.bg-transparent</div>
    </ComponentContainerCard>
  )
}

const BackgroundGradientColor = () => {
  return (
    <ComponentContainerCard
      title="Background Gradient Color"
      description={
        <>
          By adding a <code>.bg-gradient</code> class, a linear gradient is added as background image to the backgrounds. This gradient starts with a
          semi-transparent white which fades out to the bottom.
        </>
      }>
      <div className="p-2 mb-2 bg-primary bg-gradient text-white">.bg-gradient.bg-primary</div>
      <div className="p-2 mb-2 bg-secondary bg-gradient text-white">.bg-secondary.bg-gradient</div>
      <div className="p-2 mb-2 bg-success bg-gradient text-white">.bg-success.bg-gradient</div>
      <div className="p-2 mb-2 bg-danger bg-gradient text-white">.bg-danger.bg-gradient</div>
      <div className="p-2 mb-2 bg-warning bg-gradient text-dark">.bg-warning.bg-gradient</div>
      <div className="p-2 mb-2 bg-info bg-gradient text-dark">.bg-info.bg-gradient</div>
      <div className="p-2 mb-2 bg-light bg-gradient text-dark">.bg-light.bg-gradient</div>
      <div className="p-2 mb-2 bg-dark bg-gradient text-white">.bg-dark.bg-gradient</div>
      <div className="p-2 mb-2 bg-black bg-gradient text-white">.bg-black.bg-gradient</div>
    </ComponentContainerCard>
  )
}

const SoftBackground = () => {
  return (
    <ComponentContainerCard
      title="Soft Background"
      description={
        <>
          Similar to the contextual text color classes, set the background of an element to any contextual class. Background utilities do not set
          <code>color</code>, so in some cases you’ll want to use <code>.text-*</code>
          <Link href="https://getbootstrap.com/docs/5.3/utilities/colors/">color utilities</Link>.
        </>
      }>
      <Row>
        <Col xs={12}>
          <div className="d-flex flex-column gap-2">
            <div className="bg-primary-subtle p-2">
              <code className="text-primary-emphasis">.bg-primary-subtle</code>
            </div>
            <div className="bg-secondary-subtle p-2">
              <code className="text-secondary-emphasis">.bg-secondary-subtle </code>
            </div>
            <div className="bg-success-subtle p-2">
              <code className="text-success-emphasis">.bg-success-subtle</code>
            </div>
            <div className="bg-danger-subtle p-2">
              <code className="text-danger-emphasis">.bg-danger-subtle</code>
            </div>
            <div className="bg-warning-subtle p-2">
              <code className="text-warning-emphasis">.bg-warning-subtle</code>
            </div>
            <div className="bg-info-subtle p-2">
              <code className="text-info-emphasis">.bg-info-subtle</code>
            </div>
            <div className="bg-light-subtle p-2">
              <code className="text-light-emphasis">.bg-light-subtle</code>
            </div>
            <div className="bg-dark-subtle p-2">
              <code className="text-dark-emphasis">.bg-dark-subtle</code>
            </div>
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const BackgroundAndColor = () => {
  return (
    <ComponentContainerCard
      title="Color &amp; Background"
      description={
        <>
          Color and background helpers combine the power of our
          <code>.text-*</code> utilities and <code>.bg-*</code> utilities in one class. Using our Sass <code>color-contrast()</code> function, we
          automatically determine a contrasting <code>color</code> for a particular <code>background-color</code>.
        </>
      }>
      <div className="d-flex flex-column gap-2">
        <div className="text-bg-primary p-2">Primary with contrasting color (.text-bg-primary)</div>
        <div className="text-bg-secondary p-2">Secondary with contrasting color (.text-bg-secondary)</div>
        <div className="text-bg-success p-2">Success with contrasting color (.text-bg-success)</div>
        <div className="text-bg-danger p-2">Danger with contrasting color (.text-bg-danger)</div>
        <div className="text-bg-warning p-2">Warning with contrasting color (.text-bg-warning)</div>
        <div className="text-bg-info p-2">Info with contrasting color (.text-bg-info)</div>
        <div className="text-bg-light p-2">Light with contrasting color (.text-bg-light)</div>
        <div className="text-bg-dark p-2">Dark with contrasting color (.text-bg-dark)</div>
      </div>
    </ComponentContainerCard>
  )
}

const ColoredLinks = () => {
  return (
    <ComponentContainerCard
      title="Colored links"
      description={
        <>
          You can use the <code>.link-*</code> classes to colorize links. Unlike the <code>.text-*</code> classes, these classes have a
          <code>:hover</code> and <code>:focus</code> state.
        </>
      }>
      <div className="d-flex flex-column gap-2">
        <Link href="" className="link-primary">
          Primary link
        </Link>
        <Link href="" className="link-secondary">
          Secondary link
        </Link>
        <Link href="" className="link-success">
          Success link
        </Link>
        <Link href="" className="link-danger">
          Danger link
        </Link>
        <Link href="" className="link-warning">
          Warning link
        </Link>
        <Link href="" className="link-info">
          Info link
        </Link>
        <Link href="" className="link-light">
          Light link
        </Link>
        <Link href="" className="link-dark">
          Dark link
        </Link>
      </div>
    </ComponentContainerCard>
  )
}

const BackgroundOpacity = () => {
  return (
    <ComponentContainerCard
      title="Background Opacity"
      description={
        <>
          <code>background-color</code> utilities are generated with Sass using CSS variables. This allows for real-time color changes without
          compilation and dynamic alpha transparency changes.
        </>
      }>
      <div className="bg-primary p-2 text-white">This is default primary background</div>
      <div className="bg-primary p-2 text-white bg-opacity-75">This is 75% opacity primary background</div>
      <div className="bg-primary p-2 text-dark bg-opacity-50">This is 50% opacity primary background</div>
      <div className="bg-primary p-2 text-dark bg-opacity-25">This is 25% opacity primary background</div>
      <div className="bg-primary p-2 text-dark bg-opacity-10">This is 10% opacity success background</div>
    </ComponentContainerCard>
  )
}

const TextColor = () => {
  return (
    <ComponentContainerCard
      title="Text Color"
      description={
        <>
          Colorize text with color utilities. If you want to colorize links, you can use the <code>.link-*</code> helper classes which have
          <code>:hover</code>&nbsp; and <code>:focus</code> states.
        </>
      }>
      <Row>
        <Col md={6}>
          <p className="text-primary">.text-primary</p>
          <p className="text-primary-emphasis">.text-primary-emphasis</p>
          <p className="text-secondary">.text-secondary</p>
          <p className="text-secondary-emphasis">.text-secondary-emphasis</p>
          <p className="text-success">.text-success</p>
          <p className="text-success-emphasis">.text-success-emphasis</p>
          <p className="text-danger">.text-danger</p>
          <p className="text-danger-emphasis">.text-danger-emphasis</p>
          <p className="text-warning">.text-warning</p>
          <p className="text-warning-emphasis">.text-warning-emphasis</p>
          <p className="text-info">.text-info</p>
          <p className="text-info-emphasis">.text-info-emphasis</p>
          <p className="text-light bg-dark">.text-light</p>
          <p className="text-light-emphasis">.text-light-emphasis</p>
        </Col>
        <Col md={6}>
          <p className="text-dark">.text-dark</p>
          <p className="text-dark-emphasis">.text-dark-emphasis</p>
          <p className="text-muted">.text-muted</p>
          <p className="text-body">.text-body</p>
          <p className="text-body-emphasis">.text-body-emphasis</p>
          <p className="text-body-secondary">.text-body-secondary</p>
          <p className="text-body-tertiary">.text-body-tertiary</p>
          <p className="text-black">.text-black</p>
          <p className="text-white bg-dark">.text-white</p>
          <p className="text-black-50">.text-black-50</p>
          <p className="text-white-50 bg-dark">.text-white-50</p>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const TextOpacityColor = () => {
  return (
    <ComponentContainerCard
      title="Text Opacity Color"
      description={
        <>
          text color utilities are generated with Sass using CSS variables. This allows for real-time color changes without compilation and dynamic
          alpha transparency changes.
        </>
      }>
      <div className="text-primary">This is default primary text</div>
      <div className="text-primary text-opacity-75">This is 75% opacity primary text</div>
      <div className="text-primary text-opacity-50">This is 50% opacity primary text</div>
      <div className="text-primary text-opacity-25">This is 25% opacity primary text</div>
    </ComponentContainerCard>
  )
}

const Opacity = () => {
  return (
    <ComponentContainerCard
      title="Opacity"
      description={
        <>
          The <code>opacity</code> property sets the opacity level for an element. The opacity level describes the transparency level, where
          <code>1</code> is not transparent at all, <code>.5</code> is 50% visible, and <code>0</code> is completely transparent. Set the
          <code>opacity</code> of an element using
          <code>
            .opacity-{'{'}value{'}'}
          </code>
          utilities.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <div className="opacity-100 p-2 bg-primary text-light fw-bold rounded">100%</div>
        <div className="opacity-75 p-2 bg-primary text-light fw-bold rounded">75%</div>
        <div className="opacity-50 p-2 bg-primary text-light fw-bold rounded">50%</div>
        <div className="opacity-25 p-2 bg-primary text-light fw-bold rounded">25%</div>
      </div>
    </ComponentContainerCard>
  )
}

const AdditiveBorder = () => {
  return (
    <ComponentContainerCard
      title="Additive(Add) Border"
      description={
        <>
          Use border utilities to <b>add</b> an element’s borders. Choose from all borders or one at a time.
        </>
      }>
      <div className="d-flex align-items-start flex-wrap gap-4">
        <div className="text-center">
          <div className="border avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border-top avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border-end avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border-bottom avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border-start avatar-md bg-light bg-opacity-50" />
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const SubtractiveBorder = () => {
  return (
    <ComponentContainerCard
      title="Subtractive(Remove) Border"
      description={
        <>
          Use border utilities to <b>remove</b> an element’s borders. Choose from all borders or one at a time.
        </>
      }>
      <div className="d-flex align-items-start flex-wrap gap-4">
        <div className="text-center">
          <div className="border border-0 avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border border-top-0 avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border border-end-0 avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border border-bottom-0 avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-start-0 avatar-md bg-light bg-opacity-50"></div>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const BorderColor = () => {
  return (
    <ComponentContainerCard title="Border Color" description={<>Change the border color using utilities built on our theme colors.</>}>
      <div className="d-flex align-items-start flex-wrap gap-2">
        <div className="text-center">
          <div className="border border-primary avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-secondary avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-success avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-danger avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-warning avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-info avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border border-light avatar-md" />
        </div>
        <div className="text-center">
          <div className="border border-dark avatar-md bg-light bg-opacity-50" />
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const BorderWidthSize = () => {
  return (
    <ComponentContainerCard title="Border Width Size" description={<></>}>
      <div className="d-flex align-items-start flex-wrap gap-2">
        <div className="text-center">
          <div className="border border-1 avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border border-2 avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border border-3 avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border border-4 avatar-md bg-light bg-opacity-50" />
        </div>
        <div className="text-center">
          <div className="border border-5 avatar-md bg-light bg-opacity-50" />
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const BorderOpacity = () => {
  return (
    <ComponentContainerCard
      title="Border Opacity"
      description={
        <>
          choose from any of the <code>.border-opacity</code> utilities:
        </>
      }>
      <div className="border border-success p-2 mb-2">This is default success border</div>
      <div className="border border-success p-2 mb-2 border-opacity-75">This is 75% opacity success border</div>
      <div className="border border-success p-2 mb-2 border-opacity-50">This is 50% opacity success border</div>
      <div className="border border-success p-2 mb-2 border-opacity-25">This is 25% opacity success border</div>
      <div className="border border-success p-2 border-opacity-10">This is 10% opacity success border</div>
    </ComponentContainerCard>
  )
}

const BorderSubtleColor = () => {
  return (
    <ComponentContainerCard title="Border Subtle Color" description={<>Change the border color using utilities built on our theme colors.</>}>
      <div className="d-flex align-items-start flex-wrap gap-2">
        <div className="text-center">
          <div className="border border-primary-subtle avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-secondary-subtle avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-success-subtle avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-danger-subtle avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-warning-subtle avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-info-subtle avatar-md bg-light bg-opacity-50"></div>
        </div>
        <div className="text-center">
          <div className="border border-light-subtle avatar-md" />
        </div>
        <div className="text-center">
          <div className="border border-dark-subtle avatar-md bg-light bg-opacity-50"></div>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const BorderRadius = () => {
  return (
    <ComponentContainerCard title="Border Radius" description={<>Add classes to an element to easily round its corners.</>}>
      <div className="d-flex align-items-start flex-wrap gap-2">
        <Image src={avatar2} className="avatar-lg rounded" alt="rounded" />
        <Image src={avatar2} className="avatar-lg rounded-top" alt="rounded-top" />
        <Image src={avatar2} className="avatar-lg rounded-end" alt="rounded-end" />
        <Image src={avatar2} className="avatar-lg rounded-bottom" alt="rounded-bottom" />
        <Image src={avatar2} className="avatar-lg rounded-start" alt="rounded-start" />
        <Image src={avatar2} className="avatar-lg rounded-circle" alt="rounded-circle" />
        <Image src={small2} className="avatar-lg w-auto rounded-pill" alt="rounded-pill" />
      </div>
    </ComponentContainerCard>
  )
}

const BorderRadiusSize = () => {
  return (
    <ComponentContainerCard
      title="Border Radius Size"
      description={
        <>
          Use the scaling classes for larger or smaller rounded corners. Sizes range from <code>0</code> to <code>5</code>.
        </>
      }>
      <div className="d-flex align-items-start flex-wrap gap-2">
        <Image src={avatar4} className="avatar-lg rounded-0" alt="rounded-0" />
        <Image src={avatar4} className="avatar-lg rounded-1" alt="rounded-1" />
        <Image src={avatar4} className="avatar-lg rounded-2" alt="rounded-2" />
        <Image src={avatar4} className="avatar-lg rounded-3" alt="rounded-3" />
        <Image src={avatar4} className="avatar-lg rounded-4" alt="rounded-4" />
        <Image src={avatar4} className="avatar-lg rounded-5" alt="rounded-5" />
      </div>
    </ComponentContainerCard>
  )
}

const TextSelection = () => {
  return (
    <ComponentContainerCard
      title="Text Selection"
      description={
        <>
          Use <code>user-select-all</code>, <code>user-select-auto</code>, or
          <code>user-select-none</code> class to the content which is selected when the user interacts with it.
        </>
      }>
      <p className="user-select-all">This paragraph will be entirely selected when clicked by the user.</p>
      <p className="user-select-auto">This paragraph has default select behavior.</p>
      <p className="user-select-none mb-0">This paragraph will not be selectable when clicked by the user.</p>
    </ComponentContainerCard>
  )
}

const PointerEvents = () => {
  return (
    <ComponentContainerCard
      title="Pointer Events"
      description={
        <>
          Bootstrap provides <code>.pe-none</code> and <code>.pe-auto</code>
          classes to prevent or add element interactions.
        </>
      }>
      <p>
        <Link href="" className="pe-none" tabIndex={-1} aria-disabled="true">
          This link
        </Link>
        can not be clicked.
      </p>
      <p>
        <Link href="" className="pe-auto">
          This link
        </Link>
        can be clicked (this is default behavior).
      </p>
      <p className="pe-none">
        <Link href="" tabIndex={-1} aria-disabled="true">
          This link
        </Link>
        can not be clicked because the
        <code>pointer-events</code> property is inherited from its parent. However,
        <Link href="" className="pe-auto">
          this link
        </Link>
        has a <code>pe-auto</code> class and can be clicked.
      </p>
    </ComponentContainerCard>
  )
}

const Overflow = () => {
  return (
    <ComponentContainerCard
      title="Overflow"
      description={
        <>
          Adjust the <code>overflow</code> property on the fly with four default values and classes. These classes are not responsive by default.
        </>
      }>
      <div className="d-flex flex-wrap gap-4">
        <div className="overflow-auto p-3 bg-light" style={{ maxWidth: 260, maxHeight: 100 }}>
          This is an example of using <code>.overflow-auto</code> on an element with set width and height dimensions. By design, this content will
          vertically scroll.
        </div>
        <div className="overflow-hidden p-3 bg-light" style={{ maxWidth: 260, maxHeight: 100 }}>
          This is an example of using <code>.overflow-hidden</code> on an element with set width and height dimensions.
        </div>
        <div className="overflow-visible p-3 bg-light" style={{ maxWidth: 260, maxHeight: 100 }}>
          This is an example of using <code>.overflow-visible</code> on an element with set width and height dimensions.
        </div>
        <div className="overflow-scroll p-3 bg-light" style={{ maxWidth: 260, maxHeight: 100 }}>
          This is an example of using <code>.overflow-scroll</code> on an element with set width and height dimensions.
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const PositionInArrange = () => {
  return (
    <ComponentContainerCard
      title="Position in Arrange"
      description={
        <>
          Arrange elements easily with the edge positioning utilities. The format is
          <code>
            {'{'}property{'}'}-{'{'}position{'}'}
          </code>
          .
        </>
      }>
      <div className="position-relative p-5 bg-light bg-opacity-50 m-3 border rounded" style={{ height: 180 }}>
        <div className="position-absolute top-0 start-0 avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-0 end-0 avatar-xs bg-dark rounded" />
        <div className="position-absolute top-50 start-50 avatar-xs bg-dark rounded"></div>
        <div className="position-absolute bottom-50 end-50 avatar-xs bg-dark rounded"></div>
        <div className="position-absolute bottom-0 start-0 avatar-xs bg-dark rounded"></div>
        <div className="position-absolute bottom-0 end-0 avatar-xs bg-dark rounded"></div>
      </div>
    </ComponentContainerCard>
  )
}

const PositionCenter = () => {
  return (
    <ComponentContainerCard
      title="Position in Center"
      description={
        <>
          In addition, you can also center the elements with the transform utility class <code>.translate-middle</code>.
        </>
      }>
      <div className="position-relative m-3 bg-light bg-opacity-50 border rounded" style={{ height: 180 }}>
        <div className="position-absolute top-0 start-0 translate-middle avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-0 start-50 translate-middle avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-0 start-100 translate-middle avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-50 start-0 translate-middle avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-50 start-50 translate-middle avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-50 start-100 translate-middle avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-100 start-0 translate-middle avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-100 start-50 translate-middle avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-100 start-100 translate-middle avatar-xs bg-dark rounded"></div>
      </div>
    </ComponentContainerCard>
  )
}

const PositionAxis = () => {
  return (
    <ComponentContainerCard
      title="Position in Axis"
      description={
        <>
          By adding <code>.translate-middle-x</code> or
          <code>.translate-middle-y</code> classes, elements can be positioned only in horizontal or vertical direction.
        </>
      }>
      <div className="position-relative m-3 bg-light border rounded" style={{ height: 180 }}>
        <div className="position-absolute top-0 start-0 avatar-xs bg-dark rounded "></div>
        <div className="position-absolute top-0 start-50 translate-middle-x avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-0 end-0 avatar-xs bg-dark rounded" />
        <div className="position-absolute top-50 start-0 translate-middle-y avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-50 start-50 translate-middle avatar-xs bg-dark rounded"></div>
        <div className="position-absolute top-50 end-0 translate-middle-y avatar-xs bg-dark rounded"></div>
        <div className="position-absolute bottom-0 start-0 avatar-xs bg-dark rounded"></div>
        <div className="position-absolute bottom-0 start-50 translate-middle-x avatar-xs bg-dark rounded"></div>
        <div className="position-absolute bottom-0 end-0 avatar-xs bg-dark rounded"></div>
      </div>
    </ComponentContainerCard>
  )
}

const Shadows = () => {
  return (
    <ComponentContainerCard
      title="Shadows"
      description={
        <>
          While shadows on components are disabled by default in Bootstrap and can be enabled via
          <code>$enable-shadows</code>, you can also quickly add or remove a shadow with our
          <code>box-shadow</code> utility classes. Includes support for <code>.shadow-none</code> and three default sizes (which have associated
          variables to match).
        </>
      }>
      <div className="shadow-none p-2 mb-2 bg-light rounded">No shadow</div>
      <div className="shadow-sm p-2 mb-2 rounded">Small shadow</div>
      <div className="shadow p-2 mb-2 rounded">Regular shadow</div>
      <div className="shadow-lg p-2 mb-2 rounded">Larger shadow</div>
    </ComponentContainerCard>
  )
}

const Width = () => {
  return (
    <ComponentContainerCard
      title="Width"
      description={
        <>
          Width utilities are generated from the utility API in
          <code>_utilities.scss</code>. Includes support for
          <code>25%</code>, <code>50%</code>, <code>75%</code>, <code>100%</code>, and
          <code>auto</code> by default. Modify those values as you need to generate different utilities here.
        </>
      }>
      <div className="w-25 p-2 bg-light">Width 25%</div>
      <div className="w-50 p-2 bg-light">Width 50%</div>
      <div className="w-75 p-2 bg-light">Width 75%</div>
      <div className="w-100 p-2 bg-light">Width 100%</div>
      <div className="w-auto p-2 bg-light">Width auto</div>
    </ComponentContainerCard>
  )
}

const Height = () => {
  return (
    <ComponentContainerCard
      title="Height"
      description={
        <>
          Height utilities are generated from the utility API in
          <code>_utilities.scss</code>. Includes support for
          <code>25%</code>, <code>50%</code>, <code>75%</code>, <code>100%</code>, and
          <code>auto</code> by default. Modify those values as you need to generate different utilities here.
        </>
      }>
      <div className="d-flex flex-wrap gap-3 align-items-start" style={{ height: 255 }}>
        <div className="h-25 p-2 bg-light">Height25%</div>
        <div className="h-50 p-2 bg-light">Height50%</div>
        <div className="h-75 p-2 bg-light">Height75%</div>
        <div className="h-100 p-2 bg-light">Height100%</div>
        <div className="h-auto p-2 bg-light">Height auto</div>
      </div>
    </ComponentContainerCard>
  )
}

const ObjectFit = () => {
  return (
    <ComponentContainerCard
      title="Object Fit"
      description={
        <>
          Change the value of the
          <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit">
            <code>object-fit</code>
            property
          </Link>
          with our responsive <code>object-fit</code> utility classes. This property tells the content to fill the parent container in a variety of
          ways, such as preserving the aspect ratio or stretching to take up as much space as possible.
        </>
      }>
      <div className="d-flex align-items-start flex-wrap gap-3 text-center">
        <div>
          <Image src={small1} className="object-fit-contain border rounded avatar-xl" alt="..." />
          <p className="mt-1 mb-0">
            <code className="user-select-all">.object-fit-contain</code>
          </p>
        </div>
        <div>
          <Image src={small1} className="object-fit-cover border rounded avatar-xl" alt="..." />
          <p className="mt-1 mb-0">
            <code className="user-select-all">.object-fit-cover</code>
          </p>
        </div>
        <div>
          <Image src={small1} className="object-fit-fill border rounded avatar-xl" alt="..." />
          <p className="mt-1 mb-0">
            <code className="user-select-all">.object-fit-fill</code>
          </p>
        </div>
        <div>
          <Image src={small1} className="object-fit-scale border rounded avatar-xl" alt="..." />
          <p className="mt-1 mb-0">
            <code className="user-select-all">.object-fit-scale</code>
          </p>
        </div>
        <div>
          <Image src={small1} className="object-fit-none border rounded avatar-xl" alt="..." />
          <p className="mt-1 mb-0">
            <code className="user-select-all">.object-fit-none</code>
          </p>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const ZIndex = () => {
  return (
    <ComponentContainerCard
      title="Z-index"
      description={
        <>
          Use <code>z-index</code> utilities to stack elements on top of one another. Requires a <code>position</code> value other than
          <code>static</code>, which can be set with custom styles or using our <Link href="/docs/5.3/utilities/position/">position utilities</Link>.
        </>
      }>
      <div className="position-relative" style={{ height: 220, zIndex: 1 }}>
        <div className="z-3 position-absolute p-5 rounded-3 bg-primary-subtle" />
        <div className="z-2 position-absolute p-5 m-2 rounded-3 bg-success-subtle"></div>
        <div className="z-1 position-absolute p-5 m-3 rounded-3 bg-secondary-subtle"></div>
        <div className="z-0 position-absolute p-5 m-4 rounded-3 bg-danger-subtle" />
        <div className="z-n1 position-absolute p-5 m-5 rounded-3 bg-info-subtle" />
      </div>
    </ComponentContainerCard>
  )
}

const Utilities = () => {
  return (
    <>
      <PageTitle title="Utilities" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <BackgroundColor />
        </Col>
        <Col xl={6}>
          <BackgroundGradientColor />
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <SoftBackground />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <BackgroundAndColor />
        </Col>
        <Col xl={6}>
          <ColoredLinks />
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <BackgroundOpacity />
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <TextColor />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <TextOpacityColor />
        </Col>
        <Col xl={6}>
          <Opacity />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <AdditiveBorder />
        </Col>
        <Col xl={6}>
          <SubtractiveBorder />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <BorderColor />
          <BorderWidthSize />
        </Col>
        <Col xl={6}>
          <BorderOpacity />
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <BorderSubtleColor />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <BorderRadius />
        </Col>
        <Col xl={6}>
          <BorderRadiusSize />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <TextSelection />
        </Col>
        <Col xl={6}>
          <PointerEvents />
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Overflow />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <PositionInArrange />
        </Col>
        <Col xl={6}>
          <PositionCenter />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <PositionAxis />
        </Col>
        <Col xl={6}>
          <Shadows />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <Width />
        </Col>
        <Col xl={6}>
          <Height />
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <ObjectFit />
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <ZIndex />
        </Col>
      </Row>
    </>
  )
}

export default Utilities
