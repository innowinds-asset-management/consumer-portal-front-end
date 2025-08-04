'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap'

type TabContentItem = {
  id: string
  title: string
  variant: string
  subTitle: string
  text: string
  icon: string
}

const text1 =
  "Welcome to our website! We are dedicated to providing you with the best products and services to enhance your home. Whether you're looking to spruce up your living space with stylish furniture, create a cozy atmosphere with our selection of home decor, or tackle those DIY projects with our range of tools and supplies."
const text2 =
  "Hi there! I'm a passionate individual who loves to explore new ideas and connect with like-minded people. My interests span a wide range of topics including technology, literature, travel, and fitness. I believe in the power of continuous learning and enjoy challenging myself to grow both personally and professionally."
const text3 =
  'In the heart of a bustling city lies a quaint little cafe, nestled between towering skyscrapers and historic buildings. Its cozy interior boasts warm, earthy tones accented with splashes of vibrant colors, creating a welcoming atmosphere that beckons passersby to step inside.'

const tabContents: TabContentItem[] = [
  {
    id: '1',
    title: 'Home',
    text: text1,
    variant: 'info',
    subTitle: 'H',
    icon: 'tabler:home',
  },
  {
    id: '2',
    title: 'Profile',
    text: text2,
    variant: 'danger',
    subTitle: 'P',
    icon: 'tabler:user-circle',
  },
  {
    id: '3',
    title: 'Settings',
    text: text3,
    variant: 'secondary',
    subTitle: 'S',
    icon: 'tabler:settings',
  },
]

const DefaultTabs = () => {
  return (
    <ComponentContainerCard title="Default Tabs" description={<>Simple widget of tabbable panes of local content.</>}>
      <TabContainer defaultActiveKey="Profile">
        <Nav variant="tabs" role="tablist" className="mb-3">
          {(tabContents || []).map((tab, idx) => {
            return (
              <NavItem as="li" role="presentation" key={idx}>
                <NavLink eventKey={tab.title}>
                  <span className="d-none d-md-block">{tab.title}</span>
                </NavLink>
              </NavItem>
            )
          })}
        </Nav>
        <TabContent>
          {(tabContents || []).map((tab, idx) => {
            return (
              <TabPane eventKey={tab.title} id={tab.id} key={idx}>
                <Row>
                  <Col sm="12">
                    <span className={`px-1 rounded me-1 fw-semibold d-inline-block bg-${tab.variant}-subtle text-${tab.variant} float-start`}>
                      {tab.subTitle}
                    </span>
                    {tab.text}
                  </Col>
                </Row>
              </TabPane>
            )
          })}
        </TabContent>
      </TabContainer>
    </ComponentContainerCard>
  )
}

const TabsJustified = () => {
  return (
    <ComponentContainerCard
      title="Tabs Justified"
      description={
        <>
          Using class <code>.nav-justified</code>, you can force your <code>tab menu items</code> to use the full available width.
        </>
      }>
      <TabContainer defaultActiveKey="Profile">
        <Nav as={'ul'} variant="pills" role="tablist" className="bg-nav-pills nav-justified mb-3">
          {(tabContents || []).map((tab, idx) => {
            return (
              <NavItem as="li" key={idx}>
                <NavLink eventKey={tab.title}>
                  <span className="d-none d-md-block">{tab.title}</span>
                </NavLink>
              </NavItem>
            )
          })}
        </Nav>
        <TabContent>
          {(tabContents || []).map((tab, idx) => {
            return (
              <TabPane eventKey={tab.title} id={tab.id} key={idx}>
                <Row>
                  <Col sm="12">
                    <span className={`px-1 rounded me-1 fw-semibold d-inline-block bg-${tab.variant}-subtle text-${tab.variant} float-start`}>
                      {tab.subTitle}
                    </span>
                    {tab.text}
                  </Col>
                </Row>
              </TabPane>
            )
          })}
        </TabContent>
      </TabContainer>
    </ComponentContainerCard>
  )
}

const TabsVerticalLeft = () => {
  return (
    <ComponentContainerCard
      title="Tabs Vertical Left"
      description={
        <>
          You can stack your navigation by changing the flex item direction with the <code>.flex-column</code> utility.
        </>
      }>
      <Row>
        <TabContainer defaultActiveKey="Profile">
          <Col sm={3} className="mb-2 mb-sm-0">
            <Nav role="tablist" className="flex-column nav-pills">
              {(tabContents || []).map((tab, idx) => {
                return (
                  <NavItem as="li" role="presentation" key={idx}>
                    <NavLink eventKey={tab.title}>
                      <IconifyIcon icon={tab.icon} className="fs-18 me-1" />
                      {tab.title}
                    </NavLink>
                  </NavItem>
                )
              })}
            </Nav>
          </Col>
          <Col sm={9}>
            <TabContent>
              {(tabContents || []).map((tab, idx) => {
                return (
                  <TabPane eventKey={tab.title} id={tab.id} key={idx}>
                    <Row>
                      <Col sm="12">
                        <span className={`px-1 rounded me-1 fw-semibold d-inline-block bg-${tab.variant}-subtle text-${tab.variant} float-start`}>
                          {tab.subTitle}
                        </span>
                        {tab.text}
                      </Col>
                    </Row>
                  </TabPane>
                )
              })}
            </TabContent>
          </Col>
        </TabContainer>
      </Row>
    </ComponentContainerCard>
  )
}

const TabsVerticalRight = () => {
  return (
    <ComponentContainerCard
      title="Tabs Vertical Right"
      description={
        <>
          You can stack your navigation by changing the flex item direction with the <code>.flex-column</code> utility.
        </>
      }>
      <Row>
        <TabContainer defaultActiveKey="Profile">
          <Col sm={9}>
            <TabContent>
              {(tabContents || []).map((tab, idx) => {
                return (
                  <TabPane className="fade" eventKey={tab.title} id={tab.id} key={idx}>
                    <Row>
                      <Col sm="12">
                        <span className={`px-1 rounded me-1 fw-semibold d-inline-block bg-${tab.variant}-subtle text-${tab.variant} float-start`}>
                          {tab.subTitle}
                        </span>
                        {tab.text}
                      </Col>
                    </Row>
                  </TabPane>
                )
              })}
            </TabContent>
          </Col>
          <Col sm={3} className="mt-2 mt-sm-0">
            <Nav role="tablist" className="flex-column nav-pills nav-pills-secondary">
              {(tabContents || []).map((tab, idx) => {
                return (
                  <NavItem as="li" role="presentation" key={idx}>
                    <NavLink eventKey={tab.title}>
                      <IconifyIcon icon={tab.icon} className="fs-18 me-1" />
                      {tab.title}
                    </NavLink>
                  </NavItem>
                )
              })}
            </Nav>
          </Col>
        </TabContainer>
      </Row>
    </ComponentContainerCard>
  )
}

const TabsBordered = () => {
  return (
    <ComponentContainerCard
      title="Tabs Bordered"
      description={
        <>
          The navigation item can have a simple bottom border as well. Just specify the class <code>.nav-bordered</code>.
        </>
      }>
      <TabContainer defaultActiveKey="Profile">
        <Nav role="tablist" className="nav-tabs nav-bordered mb-3">
          {(tabContents || []).map((tab, idx) => {
            return (
              <NavItem as="li" role="presentation" key={idx}>
                <NavLink eventKey={tab.title}>
                  <IconifyIcon icon={tab.icon} className="fs-18 me-1" />
                  {tab.title}
                </NavLink>
              </NavItem>
            )
          })}
        </Nav>
        <TabContent>
          {(tabContents || []).map((tab, idx) => {
            return (
              <TabPane eventKey={tab.title} id={tab.id} key={idx}>
                <Row>
                  <Col sm="12">
                    <span className={`px-1 rounded me-1 fw-semibold d-inline-block bg-${tab.variant}-subtle text-${tab.variant} float-start`}>
                      {tab.subTitle}
                    </span>
                    {tab.text}
                  </Col>
                </Row>
              </TabPane>
            )
          })}
        </TabContent>
      </TabContainer>
    </ComponentContainerCard>
  )
}

const TabsBorderedJustified = () => {
  return (
    <ComponentContainerCard title="Tabs Bordered Justified" description={<>The navigation item with a simple bottom border and justified</>}>
      <TabContainer defaultActiveKey="Profile">
        <Nav role="tablist" className="nav-tabs nav-justified nav-bordered nav-bordered-danger mb-3">
          {(tabContents || []).map((tab, idx) => {
            return (
              <NavItem as="li" role="presentation" key={idx}>
                <NavLink eventKey={tab.title}>
                  <IconifyIcon icon={tab.icon} className="fs-18 me-1" />
                  {tab.title}
                </NavLink>
              </NavItem>
            )
          })}
        </Nav>
        <TabContent>
          {(tabContents || []).map((tab, idx) => {
            return (
              <TabPane eventKey={tab.title} id={tab.id} key={idx}>
                <Row>
                  <Col sm="12">
                    <span className={`px-1 rounded me-1 fw-semibold d-inline-block bg-${tab.variant}-subtle text-${tab.variant} float-start`}>
                      {tab.subTitle}
                    </span>
                    {tab.text}
                  </Col>
                </Row>
              </TabPane>
            )
          })}
        </TabContent>
      </TabContainer>
    </ComponentContainerCard>
  )
}

const IconsTabs = () => {
  return (
    <ComponentContainerCard
      title="Icons Tabs"
      description={
        <>
          The navigation item can have a simple bottom border as well. Just specify the class <code>.nav-bordered</code>.
        </>
      }>
      <TabContainer defaultActiveKey={'2'}>
        <Nav role="tablist" className="nav-tabs nav-bordered nav-bordered-success mb-3">
          <NavItem>
            <NavLink eventKey={'1'} data-bs-toggle="tab" aria-expanded="false">
              <IconifyIcon icon="solar:home-2-bold-duotone" className="fs-24 align-middle" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey={'2'} data-bs-toggle="tab" aria-expanded="true">
              <IconifyIcon icon="solar:user-id-bold-duotone" className="fs-24 align-middle" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey={'3'} data-bs-toggle="tab" aria-expanded="false">
              <IconifyIcon icon="solar:settings-bold-duotone" className="fs-24 align-middle" />
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane eventKey={'1'}>
            <p className="mb-0">
              <span className="px-1 rounded me-1 fw-semibold d-inline-block bg-info-subtle text-info float-start">H</span>Welcome to our website! We
              are dedicated to providing you with the best products and services to enhance your home. Whether you&apos;re looking to spruce up your
              living space with stylish furniture, create a cozy atmosphere with our selection of home decor, or tackle those DIY projects with our
              range of tools and supplies.
            </p>
          </TabPane>
          <TabPane eventKey={'2'}>
            <p className="mb-0">
              <span className="px-1 rounded me-1 fw-semibold d-inline-block bg-danger-subtle text-danger float-start">P</span> &quot;Hi there!
              I&apos;m a passionate individual who loves to explore new ideas and connect with like-minded people. My interests span a wide range of
              topics including technology, literature, travel, and fitness. I believe in the power of continuous learning and enjoy challenging myself
              to grow both personally and professionally.
            </p>
          </TabPane>
          <TabPane eventKey={'3'}>
            <p className="mb-0">
              <span className="px-1 rounded me-1 fw-semibold d-inline-block bg-secondary-subtle text-secondary float-start">S</span>In the heart of a
              bustling city lies a quaint little cafe, nestled between towering skyscrapers and historic buildings. Its cozy interior boasts warm,
              earthy tones accented with splashes of vibrant colors, creating a welcoming atmosphere that beckons passersby to step inside.
            </p>
          </TabPane>
        </TabContent>
      </TabContainer>
    </ComponentContainerCard>
  )
}

const CardWithTabs = () => {
  return (
    <Card>
      <TabContainer defaultActiveKey={'2'}>
        <CardHeader className="card-tabs d-flex align-items-center">
          <div className="flex-grow-1">
            <h4 className="header-title">Card with Tabs</h4>
          </div>
          <Nav role="tablist" className="nav-tabs nav-justified card-header-tabs nav-bordered">
            <NavItem>
              <NavLink eventKey={'1'} href="#home-ct" data-bs-toggle="tab" aria-expanded="false">
                <IconifyIcon icon="ti-home" className="ti  d-md-none d-block" />
                <span className="d-none d-md-block">Home</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey={'2'} href="#profile-ct" data-bs-toggle="tab" aria-expanded="true">
                <IconifyIcon icon="ti-user-circle" className="ti  d-md-none d-block" />
                <span className="d-none d-md-block">Profile</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey={'3'} href="#settings-ct" data-bs-toggle="tab" aria-expanded="false">
                <IconifyIcon icon="ti-settings" className="ti  d-md-none d-block" />
                <span className="d-none d-md-block">Settings</span>
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent>
            <TabPane eventKey={'1'} id="home-ct">
              <p className="mb-0">
                <span className="px-1 rounded me-1 fw-semibold d-inline-block bg-info-subtle text-info float-start">H</span>Welcome to our website! We
                are dedicated to providing you with the best products and services to enhance your home. Whether you&apos;re looking to spruce up your
                living space with stylish furniture, create a cozy atmosphere with our selection of home decor, or tackle those DIY projects with our
                range of tools and supplies.
              </p>
            </TabPane>
            <TabPane eventKey={'2'} id="profile-ct">
              <p className="mb-0">
                <span className="px-1 rounded me-1 fw-semibold d-inline-block bg-danger-subtle text-danger float-start">P</span> &quot;Hi there!
                I&apos;m a passionate individual who loves to explore new ideas and connect with like-minded people. My interests span a wide range of
                topics including technology, literature, travel, and fitness. I believe in the power of continuous learning and enjoy challenging
                myself to grow both personally and professionally.
              </p>
            </TabPane>
            <TabPane eventKey={'3'} id="settings-ct">
              <p className="mb-0">
                <span className="px-1 rounded me-1 fw-semibold d-inline-block bg-secondary-subtle text-secondary float-start">S</span>In the heart of
                a bustling city lies a quaint little cafe, nestled between towering skyscrapers and historic buildings. Its cozy interior boasts warm,
                earthy tones accented with splashes of vibrant colors, creating a welcoming atmosphere that beckons passersby to step inside.
              </p>
            </TabPane>
          </TabContent>
        </CardBody>
      </TabContainer>
    </Card>
  )
}

const AllTabs = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <DefaultTabs />
        </Col>
        <Col xl={6}>
          <TabsJustified />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <TabsVerticalLeft />
        </Col>
        <Col xl={6}>
          <TabsVerticalRight />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <TabsBordered />
        </Col>
        <Col xl={6}>
          <TabsBorderedJustified />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <IconsTabs />
        </Col>
        <Col xl={6}>
          <CardWithTabs />
        </Col>
      </Row>
    </>
  )
}

export default AllTabs
