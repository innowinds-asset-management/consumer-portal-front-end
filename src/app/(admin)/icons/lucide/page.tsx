import Link from 'next/link'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { lucideData, LucideType } from './data'
import PageTitle from '@/components/PageTitle'


const LucideCard = ({ icon: Icon, name }: LucideType) => {
  return (
    <Card>
      <div
        className="card-body d-flex flex-column align-items-center justify-content-center"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={name}>
        <Icon className="fs-32 lh-1" />
      </div>
    </Card>
  )
}


const LucideIconPage = () => {
  return (
    <>
    <PageTitle title="Lucide Icons" subTitle="Icons" />
      <div className="d-flex flex-wrap gap-3 justify-content-center icon-box">
        {
          lucideData.map((item, idx) => (
            <OverlayTrigger key={idx} placement="top" overlay={<Tooltip>{item.name}</Tooltip>}>
              <LucideCard {...item} />
            </OverlayTrigger>
          ))
        }
      </div>
      <div className="my-3 text-center">
        <Link href="https://lucide.dev/" target="_blank" className="btn btn-danger">
          View All Icons
        </Link>
      </div>
    </>
  )
}

export default LucideIconPage
