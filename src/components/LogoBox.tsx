// // import logoDark from '@/assets/images/logo-dark.png'
// // import logoSm from '@/assets/images/logo-sm.png'
// // import logo from '@/assets/images/logo.png'

import assetnixLogo from '@/assets/images/assetnix-logo.svg'
import Image from 'next/image'
import Link from 'next/link'

const LogoBox = () => {
  return (
    <Link href="/" className="logo">
      <span className="logo-light">
        <span className="logo-lg">
          <Image 
            width={180} 
            height={30} 
            src={assetnixLogo} 
            alt="AssetNix logo" 
            style={{
              transition: 'transform 0.2s ease-in-out',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
              maxWidth: '100%',
              height: 'auto'
            }}
            className="logo-image"
          />
        </span>
        {/* <span className="logo-sm">
          <Image width={29} height={28} src={logoSm} alt="small logo" />
        </span> */}
      </span>
      {/* <span className="logo-dark">
        <span className="logo-lg">
          <Image width={132} height={22} src={logoDark} alt="dark logo" />
        </span>
        <span className="logo-sm">
          <Image width={29} height={28} src={logoSm} alt="small logo" />
        </span>
      </span> */}
      <style jsx>{`
        .logo-image:hover {
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .logo-image {
            width: 140px !important;
            height: 23px !important;
          }
        }
        
        @media (max-width: 480px) {
          .logo-image {
            width: 120px !important;
            height: 20px !important;
          }
        }
      `}</style>
    </Link>
  )
}

export default LogoBox
