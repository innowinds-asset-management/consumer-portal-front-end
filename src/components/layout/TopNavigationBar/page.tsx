import ThemeCustomizeToggle from '@/components/layout/TopNavigationBar/components/ThemeCustomizeToggle'
import LogoBox from '@/components/LogoBox'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Apps from './components/Apps'
import Flags from './components/Country'
import LeftSideBarToggle from './components/LeftSideBarToggle'
import Notifications from './components/Notifications'
import ProfileDropdown from './components/ProfileDropdown'
import ScannerIcon from './components/ScannerIcon'
import ThemeModeToggle from './components/ThemeModeToggle'
import SearchBox from './components/SearchBox'

const TopNavigationBar = () => {
  const isAppProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';
  
  return (
    <header 
      className="app-topbar"
      style={{ 
        background: 'linear-gradient(135deg, #0932c1, #1286ae, #082a71)',
        color: 'white'
      }}
    >
      <div className="page-container topbar-menu">
        <div className="d-flex align-items-center gap-2">
          <LogoBox />
          <LeftSideBarToggle />
          {!isAppProduction && <SearchBox />}
        </div>
        <div className="d-flex align-items-center gap-2">
          {/* <Flags /> */}
          {/* <Notifications /> */}
          {/* <Apps /> */}
          {/* <ThemeCustomizeToggle /> */}
          {/* <ThemeModeToggle /> */}
          {!isAppProduction && <ScannerIcon />}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}

export default TopNavigationBar
