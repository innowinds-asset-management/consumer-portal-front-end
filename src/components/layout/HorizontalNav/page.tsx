import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useLayoutContext } from '@/context/useLayoutContext'
import { findAllParent, findMenuItem, getMenuItemFromURL } from '@/helpers/Manu'
import { MenuItemType, SubMenus } from '@/types/menu'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'

const MenuItemWithChildren = ({ item, className, activeMenuItems, toggleMenu, level, tag }: SubMenus) => {
  const Tag: any = tag

  const [open, setOpen] = useState(false);

  const getActiveClass = useCallback(
    (item: MenuItemType) => {
      return activeMenuItems?.includes(item.key) ? 'active' : ''
    },
    [activeMenuItems],
  )

  const toggleMenuItem = () => {
    setOpen(!open)
  };

  console.log(open)

  return (
    <Tag className={`${className} dropdown ${activeMenuItems!.includes(item.key) ? 'active' : ''}`}>
      <Link
        href={''}
        className={` ${tag === 'div' ? 'dropdown-item' : 'nav-link'} drop-arrow-none`}
        id="topnav-dashboards"
        data-bs-toggle="dropdown"
        onClick={toggleMenuItem}
        role="button"
        aria-haspopup="true"
        aria-expanded="false">
        {item.icon && (
          <span className="menu-icon">
            <IconifyIcon icon={item.icon} />
          </span>
        )}
        <div className="d-flex w-100 justify-content-between align-items-center">
          <span className="menu-text"> {item.label} </span>
          <span className="menu-arrow  content-none me-2">
            <IconifyIcon icon="ri:arrow-right-s-line" width={16} height={16} />
          </span>
        </div>
      </Link>
      <div className={`dropdown-menu ${open && 'show'}`} data-bs-popper="static" aria-labelledby="topnav-dashboards">
        {(item.children || []).map((child, idx) => {
          return (
            <Fragment key={child.key + idx}>
              {child.children ? (
                <MenuItemWithChildren
                  item={child}
                  tag={'div'}
                  linkClassName={clsx('nav-link', getActiveClass(child))}
                  activeMenuItems={activeMenuItems}
                  className="dropdown"
                  level={level + 1}
                  subMenuClassName="sub-menu"
                  toggleMenu={toggleMenu}
                />
              ) : (
                <MenuItem level={level + 1} item={child} linkClassName={clsx('dropdown-item', getActiveClass(child))} />
              )}
            </Fragment>
          )
        })}
      </div>
    </Tag>
  )
}


const MenuItem = ({ item, linkClassName, className, level }: SubMenus) => {
  return (
    <li className={className}>
      <MenuItemLink level={level + 1} item={item} className={linkClassName} />
    </li>
  )
}

const MenuItemLink = ({ item, className }: SubMenus) => {

  return (
    <Link href={item.url ?? ''} target={item.target} className={clsx(className, { disabled: item.isDisabled })}>
      {item.icon && (
        <span className="menu-icon">
          <IconifyIcon icon={item.icon} />
        </span>
      )}

      <span className="menu-text">{item.label}</span>
      {item.badge && <span className={`badge badge-pill text-end bg-${item.badge.variant}`}>{item.badge.text}</span>}
    </Link>
  )
}

type AppMenuProps = {
  menuItems: Array<MenuItemType>
}

const HorizontalNavBar = ({ menuItems }: AppMenuProps) => {
  const pathname = usePathname()

  const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([])
  const toggleMenu = (menuItem: MenuItemType, show: boolean) => {
    if (show) setActiveMenuItems([menuItem.key, ...findAllParent(menuItems, menuItem)])
  }

  const getActiveClass = useCallback(
    (item: MenuItemType) => {
      return activeMenuItems?.includes(item.key) ? 'active' : ''
    },
    [activeMenuItems],
  )

  const activeMenu = useCallback(() => {
    const trimmedURL = pathname
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL)

    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key)
      if (activeMt) {
        setActiveMenuItems([activeMt.key, ...findAllParent(menuItems, activeMt)])
      }
    }
  }, [pathname, menuItems])

  useEffect(() => {
    if (menuItems && menuItems.length > 0) activeMenu()
  }, [activeMenu, menuItems])

  const { horizontalMenu } = useLayoutContext()

  return (
    <>
      <header className="topnav">
        <nav className="navbar navbar-expand-lg active">
          <nav className="page-container">
            <Collapse in={horizontalMenu.open} className="navbar-collapse">
              <div>
                <ul className="navbar-nav dropdown-hover">
                  {(menuItems || []).map((item, idx) => {
                    return (
                      <Fragment key={idx}>
                        {item.children ? (
                          <MenuItemWithChildren
                            item={item}
                            toggleMenu={toggleMenu}
                            className="nav-item"
                            level={1}
                            linkClassName={clsx('nav-link', getActiveClass(item))}
                            subMenuClassName="sub-menu"
                            tag="li"
                            activeMenuItems={activeMenuItems}
                          />
                        ) : (
                          <MenuItem item={item} level={1} linkClassName={clsx('dropdown-item nav-link', getActiveClass(item))} className="nav-item" />
                        )}
                      </Fragment>
                    )
                  })}
                </ul>
              </div>
            </Collapse>
          </nav>
        </nav>
      </header>
    </>
  )
}

export default HorizontalNavBar