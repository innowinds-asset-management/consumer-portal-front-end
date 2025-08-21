import ThemeCustomizeToggle from '@/components/layout/TopNavigationBar/components/ThemeCustomizeToggle'
import LogoBox from '@/components/LogoBox'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Apps from './components/Apps'
import Flags from './components/Country'
import LeftSideBarToggle from './components/LeftSideBarToggle'
import Notifications from './components/Notifications'
import ProfileDropdown from './components/ProfileDropdown'
import ThemeModeToggle from './components/ThemeModeToggle'
import SearchBox from './components/SearchBox'

const TopNavigationBar = () => {
  return (
    <header className="app-topbar">
      <div className="page-container topbar-menu">
        <div className="d-flex align-items-center gap-2">
          <LogoBox />
          <LeftSideBarToggle />
          <SearchBox />
        </div>
        <div className="d-flex align-items-center gap-2">
          {/* <Flags /> */}
          {/* <Notifications /> */}
          {/* <Apps /> */}
          {/* <ThemeCustomizeToggle /> */}
          {/* <ThemeModeToggle /> */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}

export default TopNavigationBar
