import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { colorVariants } from '@/context/constants'
import { Metadata } from 'next'
import { Col, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Dropdowns' }

const SingleButtonDropdowns = () => {
  return (
    <ComponentContainerCard
      title="Single button dropdowns"
      description={
        <>
          Any single <code>.btn</code> can be turned into a dropdown toggle with some markup changes. Here’s how you can put them to work with either
          <code>&lt;button&gt;</code>&nbsp; elements:
        </>
      }>
      <Row>
        <Col xs={'auto'}>
          <Dropdown>
            <DropdownToggle
              as={'button'}
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Dropdown button
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuButton">
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col xs={'auto'}>
          <Dropdown>
            <DropdownToggle
              className="btn btn-secondary"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Dropdown link
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuLink">
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const CustomDropdownArrow = () => {
  return (
    <ComponentContainerCard
      title="Custom Dropdown Arrow"
      description={
        <>
          Any single <code>.btn</code> can be turned into a dropdown toggle with some markup changes. Here’s how you can put them to work with either
          <code>&lt;button&gt;</code>
          elements:
        </>
      }>
      <Row>
        <Col xs={'auto'}>
          <Dropdown>
            <DropdownToggle
              className="btn btn-primary dropdown-toggle drop-arrow-none"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Without Arrow
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuButton">
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col xs={'auto'}>
          <Dropdown>
            <DropdownToggle
              as={'button'}
              className="btn btn-outline-info dropdown-toggle drop-arrow-none"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Tabler Icon <IconifyIcon icon="tabler:chevron-down" className="align-middle ms-1" />
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuButton">
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col xs={'auto'}>
          <Dropdown>
            <DropdownToggle
              className="btn btn-secondary bg-gradient dropdown-toggle drop-arrow-none"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Lucid Icon <IconifyIcon icon="lucide:square-chevron-down" className="avatar-xxs ms-2" />
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuButton">
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col xs={'auto'}>
          <Dropdown>
            <DropdownToggle
              as={'button'}
              className="btn btn-soft-success dropdown-toggle drop-arrow-none"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Solar Icon <IconifyIcon icon="solar:album-bold-duotone" className="fs-20 ms-2" />
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuButton">
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

const VariantDropdown = () => {
  return (
    <ComponentContainerCard title="Variant" description={<>The best part is you can do this with any button variant, too:</>}>
      {colorVariants.slice(0, 6).map((item, idx) => {
        return (
          <Dropdown className="btn-group mb-2" key={idx}>
            <DropdownToggle
              as={'button'}
              type="button"
              className={`btn btn-${item}`}
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              {item}
            </DropdownToggle>
            &nbsp;
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Separated link</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      })}
    </ComponentContainerCard>
  )
}

const DropupVariation = () => {
  return (
    <ComponentContainerCard
      title="Dropup variation"
      description={
        <>
          Trigger dropdown menus above elements by adding <code>.dropup</code> to the parent element.
        </>
      }>
      <Dropdown drop="up" className="btn-group dropup">
        <DropdownToggle type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropup
        </DropdownToggle>
        &nbsp;
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown drop="up" className="btn-group dropup">
        <button type="button" className="btn btn-light">
          Split dropup
        </button>
        <DropdownToggle
          type="button"
          className="btn btn-light dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          <span className="visually-hidden">Toggle Dropdown</span>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const DropendVariation = () => {
  return (
    <ComponentContainerCard
      title="Dropend variation"
      description={
        <>
          Trigger dropdown menus at the right of the elements by adding
          <code>.dropend</code> to the parent element.
        </>
      }>
      <Dropdown drop="end" className="btn-group mb-2 dropend">
        <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropend
        </DropdownToggle>
        &nbsp;
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown drop="end" className="btn-group mb-2 dropend">
        <button type="button" className="btn btn-primary">
          Split Dropend
        </button>
        <DropdownToggle
          type="button"
          className="btn btn-primary dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          <span className="visually-hidden">Toggle Dropright</span>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const DisabledItem = () => {
  return (
    <ComponentContainerCard
      title="Disabled Item"
      description={
        <>
          Add <code>.disabled</code> to items in the dropdown to
          <strong>style them as disabled</strong>.
        </>
      }>
      <Dropdown className="btn-group">
        <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Disabled
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Regular link</DropdownItem>
          <DropdownItem disabled tabIndex={-1} aria-disabled="true">
            Disabled link
          </DropdownItem>
          <DropdownItem>Another link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const DarkDropdowns = () => {
  return (
    <ComponentContainerCard
      title="Dark dropdowns"
      description={
        <>
          Opt into darker dropdowns to match a dark navbar or custom style by adding <code>.dropdown-menu-dark</code> onto an existing
          <code>.dropdown-menu</code>. No changes are required to the dropdown items.
        </>
      }>
      <Dropdown>
        <DropdownToggle className="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown button
        </DropdownToggle>
        <DropdownMenu data-bs-theme="dark">
          <li>
            <DropdownItem className="active">Action</DropdownItem>
          </li>
          <li>
            <DropdownItem>Another action</DropdownItem>
          </li>
          <li>
            <DropdownItem>Something else here</DropdownItem>
          </li>
          <li>
            <DropdownDivider />
          </li>
          <li>
            <DropdownItem>Separated link</DropdownItem>
          </li>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const Text = () => {
  return (
    <ComponentContainerCard
      title="Text"
      description={
        <>
          Place any freeform text within a dropdown menu with text and use spacing utilities. Note that you’ll likely need additional sizing styles to
          constrain the menu width.
        </>
      }>
      <Dropdown className="btn-group">
        <DropdownToggle type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Text Dropdown
        </DropdownToggle>
        <DropdownMenu className="p-3 text-muted" style={{ maxWidth: 200 }}>
          <p>Some example text that&apos;s free-flowing within the dropdown menu.</p>
          <p className="mb-0">And this is more example text.</p>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const MenuAlignment = () => {
  return (
    <ComponentContainerCard
      title="Menu alignment"
      description={
        <>
          Add <code>.dropdown-menu-end</code>
          to a <code>.dropdown-menu</code> to right align the dropdown menu.
        </>
      }>
      <Dropdown align={'end'}>
        <DropdownToggle type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Right-aligned menu
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const SplitButtonDropdowns = () => {
  return (
    <ComponentContainerCard
      title="Split button dropdowns"
      description={
        <>
          Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the addition of
          <code>.dropdown-toggle-split</code> for proper spacing around the dropdown caret.
        </>
      }>
      {colorVariants.slice(0, 6).map((item, idx) => {
        return (
          <Dropdown className="btn-group mb-2" key={idx}>
            <button type="button" className={`btn btn-${item}`}>
              {item}
            </button>
            <DropdownToggle
              type="button"
              className={`btn btn-${item} dropdown-toggle-split drop-arrow-none`}
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <IconifyIcon icon="tabler:chevron-down" className="align-middle" />
            </DropdownToggle>
            &nbsp;
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Separated link</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      })}
    </ComponentContainerCard>
  )
}

const Sizing = () => {
  return (
    <ComponentContainerCard
      title="Sizing"
      description={<>Button dropdowns work with buttons of all sizes, including default and split dropdown buttons.</>}>
      <Dropdown className="btn-group">
        <DropdownToggle className="btn btn-light btn-lg" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Large button
        </DropdownToggle>
        &nbsp;
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="btn-group">
        <button className="btn btn-light btn-lg" type="button">
          Large button
        </button>
        <DropdownToggle
          type="button"
          className="btn btn-lg btn-light dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          <span className="visually-hidden">Toggle Dropdown</span>
        </DropdownToggle>
        &nbsp;
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="btn-group">
        <DropdownToggle className="btn btn-light btn-sm " type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Small button
        </DropdownToggle>
        &nbsp;
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="btn-group">
        <button className="btn btn-light btn-sm" type="button">
          Small button
        </button>
        <DropdownToggle
          type="button"
          className="btn btn-sm btn-light dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          <span className="visually-hidden">Toggle Dropdown</span>
        </DropdownToggle>
        &nbsp;
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const DropstartVariation = () => {
  return (
    <ComponentContainerCard
      title="Dropstart variation"
      description={
        <>
          Trigger dropdown menus at the right of the elements by adding
          <code>.dropleft</code> to the parent element.
        </>
      }>
      <Dropdown drop="start" className="btn-group dropstart ">
        <DropdownToggle type="button" className="btn btn-secondary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropstart
        </DropdownToggle>
        &nbsp;
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Separated link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown drop="start" className="btn-group">
        <div className="btn-group dropstart" role="group">
          <DropdownToggle
            type="button"
            className="btn btn-secondary dropdown-split dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            <span className="visually-hidden">Toggle Dropstart</span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated link</DropdownItem>
          </DropdownMenu>
        </div>
        <button type="button" className="btn btn-secondary">
          Split dropstart
        </button>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const ActiveItem = () => {
  return (
    <ComponentContainerCard
      title="Active Item"
      description={
        <>
          Add <code>.active</code> to item in the dropdown to <strong>style them as active</strong>.
        </>
      }>
      <Dropdown className="btn-group">
        <DropdownToggle type="button" className="btn btn-secondary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Active Item
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Regular link</DropdownItem>
          <DropdownItem className="active">Active link</DropdownItem>
          <DropdownItem>Another link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const Headers = () => {
  return (
    <ComponentContainerCard title="Headers" description={<>Add a header to label sections of actions in any dropdown menu.</>}>
      <Dropdown className="btn-group">
        <DropdownToggle type="button" className="btn btn-secondary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Header
        </DropdownToggle>
        <DropdownMenu>
          <DropdownHeader as={'h6'} className="dropdown-header">
            Dropdown header
          </DropdownHeader>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const CenteredDropdowns = () => {
  return (
    <ComponentContainerCard
      title="Centered dropdowns"
      description={
        <>
          Make the dropdown menu centered below the toggle with
          <code>.dropdown-center</code> on the parent element.
        </>
      }>
      <div className="hstack gap-2">
        <Dropdown drop="down-centered" className="dropdown-center">
          <DropdownToggle className="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Centered dropdown
          </DropdownToggle>
          <DropdownMenu>
            <li>
              <DropdownItem>Action</DropdownItem>
            </li>
            <li>
              <DropdownItem>Action two</DropdownItem>
            </li>
            <li>
              <DropdownItem>Action three</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
        <Dropdown drop="up-centered" className="dropup-center dropup">
          <DropdownToggle className="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Centered dropup
          </DropdownToggle>
          <DropdownMenu>
            <li>
              <DropdownItem>Action</DropdownItem>
            </li>
            <li>
              <DropdownItem>Action two</DropdownItem>
            </li>
            <li>
              <DropdownItem>Action three</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
      </div>
    </ComponentContainerCard>
  )
}

const AutoCloseBehavior = () => {
  return (
    <ComponentContainerCard
      title="Auto close behavior"
      description={
        <>
          By default, the dropdown menu is closed when clicking inside or outside the dropdown menu. You can use the <code>autoClose</code> option to
          change this behavior of the dropdown.
        </>
      }>
      <div className="hstack gap-2 flex-wrap">
        <Dropdown autoClose className="btn-group">
          <DropdownToggle className="btn btn-secondary" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
            Default dropdown
          </DropdownToggle>
          <DropdownMenu>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
        <Dropdown autoClose="outside" className="btn-group">
          <DropdownToggle className="btn btn-secondary" type="button" data-bs-toggle="dropdown" data-bs-auto-close="inside" aria-expanded="false">
            Clickable inside
          </DropdownToggle>
          <DropdownMenu>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
        <Dropdown autoClose="inside" className="btn-group">
          <DropdownToggle className="btn btn-secondary" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            Clickable outside
          </DropdownToggle>
          <DropdownMenu>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
        <Dropdown autoClose="inside" className="btn-group">
          <DropdownToggle className="btn btn-secondary" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
            Manual close
          </DropdownToggle>
          <DropdownMenu>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
            <li>
              <DropdownItem>Menu item</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
      </div>
    </ComponentContainerCard>
  )
}

const FormsDropdown = () => {
  return (
    <ComponentContainerCard
      title="Forms"
      description={
        <>
          Put a form within a dropdown menu, or make it into a dropdown menu, and use margin or padding utilities to give it the negative space you
          require.
        </>
      }>
      <Dropdown>
        <DropdownToggle type="button" className="btn btn-secondary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Form
        </DropdownToggle>
        <DropdownMenu>
          <form className="px-4 py-3">
            <div className="mb-3">
              <label htmlFor="exampleDropdownFormEmail1" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleDropdownFormPassword1" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
            </div>
            <div className="mb-2">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                <label className="form-check-label" htmlFor="dropdownCheck">
                  Remember me
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
          <DropdownDivider className="dropdown-divider" />
          <DropdownItem>New around here? Sign up</DropdownItem>
          <DropdownItem>Forgot password?</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ComponentContainerCard>
  )
}

const DropdownsPage = () => {
  return (
    <>
      <PageTitle title="Dropdowns" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <SingleButtonDropdowns />
          <CustomDropdownArrow />
          <VariantDropdown />
          <DropupVariation />
          <DropendVariation />
          <DisabledItem />
          <DarkDropdowns />
          <Text />
          <MenuAlignment />
        </Col>
        <Col xl={6}>
          <SplitButtonDropdowns />
          <Sizing />
          <DropstartVariation />
          <ActiveItem />
          <Headers />
          <CenteredDropdowns />
          <AutoCloseBehavior />
          <FormsDropdown />
        </Col>
      </Row>
    </>
  )
}

export default DropdownsPage
