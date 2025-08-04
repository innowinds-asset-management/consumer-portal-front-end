import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Link from 'next/link'
import { Card, CardBody, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { RemixIcons, remixIconsData } from './data'
import PageTitle from '@/components/PageTitle'

const RemixCard = ({title, iconName }: RemixIcons) => {
  return (
    <Card>
      <CardBody className="d-flex flex-column align-items-center justify-content-center" data-bs-toggle="tooltip" data-bs-placement="top" title={title}>
        <IconifyIcon icon={iconName} className='fs-32 lh-1'/>
      </CardBody>
    </Card>
  )
}

const RemixPage = () => {
  return (
    <>
     <PageTitle title="Remixicon" subTitle="Icons" />
      <div className="d-flex flex-wrap gap-3 justify-content-center icon-box">
        {
          remixIconsData.map((item, idx) => (
            <OverlayTrigger key={idx} placement="top" overlay={<Tooltip>{item.title}</Tooltip>}>
              <RemixCard {...item} key={idx} />
            </OverlayTrigger>
          ))
        }

      </div>
      <div className="my-3 text-center">
        <Link href="https://remixicon.com/" target="_blank" className="btn btn-danger">
          View All Icons
        </Link>
      </div>
    </>
  )
}

export default RemixPage
