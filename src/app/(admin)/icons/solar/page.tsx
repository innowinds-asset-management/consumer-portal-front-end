import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Link from 'next/link'
import { Card, CardBody, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { solarIconData } from './data'

const SolarIconPage = () => {
  return (
    <>
      <PageTitle title="Solar Icons" subTitle="Icons" />
      <div className="d-flex flex-wrap gap-3 justify-content-center icon-box">
        {solarIconData.map((item, idx) => (
          <OverlayTrigger trigger={['hover', 'focus']} key={idx} placement="top" overlay={<Tooltip>{item.title}</Tooltip>}>
            <Card>
              <CardBody
                className="d-flex flex-column align-items-center justify-content-center"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="4k">
                <IconifyIcon icon={item.icon} className="fs-2" />
              </CardBody>
            </Card>
          </OverlayTrigger>
        ))}
      </div>
      <div className="my-3 text-center">
        <Link href="https://icon-sets.iconify.design/solar/" target="_blank" className="btn btn-danger">
          View All Icons
        </Link>
      </div>
    </>
  )
}

export default SolarIconPage
