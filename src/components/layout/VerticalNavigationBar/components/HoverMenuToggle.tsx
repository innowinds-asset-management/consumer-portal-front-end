'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useLayoutContext } from '@/context/useLayoutContext'

const HoverMenuToggle = () => {
  const {
    menu: { size },
    changeMenu: { size: changeMenuSize },
  } = useLayoutContext()

  const handleHoverMenu = () => {
    if (size === 'sm-hover-active') changeMenuSize('sm-hover')
    else changeMenuSize('sm-hover-active')
  }

  return (
    <>
      <button onClick={handleHoverMenu} className="sidenav-toggle-button px-2">
        <IconifyIcon icon="ri:menu-2-line" className=" fs-24"></IconifyIcon>
      </button>
    </>
  )
}

export default HoverMenuToggle
