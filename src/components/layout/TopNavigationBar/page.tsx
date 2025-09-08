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
        background: 'linear-gradient(135deg, #2c2c2c, #1a1a1a, #0d0d0d)',
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
      <style jsx>{`
        .app-topbar .topbar-item,
        .app-topbar .topbar-link,
        .app-topbar .sidenav-toggle-button,
        .app-topbar .topnav-toggle-button {
          color: white !important;
        }
        
        .app-topbar .topbar-item:hover,
        .app-topbar .topbar-link:hover,
        .app-topbar .sidenav-toggle-button:hover,
        .app-topbar .topnav-toggle-button:hover {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        
        .app-topbar .nav-user {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
    </header>
  )
}

export default TopNavigationBar
