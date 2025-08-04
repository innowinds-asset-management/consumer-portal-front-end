import logoDark from '@/assets/images/logo-dark.png'
import logoSm from '@/assets/images/logo-sm.png'
import logo from '@/assets/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'

const LogoBox = () => {
  return (
    <Link href="/" className="logo">
      <span className="logo-light">
        <span className="logo-lg">
          <Image width={132} height={22} src={logo} alt="logo" />
        </span>
        <span className="logo-sm">
          <Image width={29} height={28} src={logoSm} alt="small logo" />
        </span>
      </span>
      <span className="logo-dark">
        <span className="logo-lg">
          <Image width={132} height={22} src={logoDark} alt="dark logo" />
        </span>
        <span className="logo-sm">
          <Image width={29} height={28} src={logoSm} alt="small logo" />
        </span>
      </span>
    </Link>
  )
}

export default LogoBox
