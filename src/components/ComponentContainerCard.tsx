import { ReactNode } from 'react'
import { Card, CardBody, CardHeader } from 'react-bootstrap'

type ContainerCardProps = {
  title: ReactNode
  description?: ReactNode
  children: ReactNode
}

const ComponentContainerCard = ({ title, description, children }: ContainerCardProps) => {
  return (
    <Card>
      <CardHeader className="border-0 border-bottom border-dashed">
        <h4 className="header-title">{title}</h4>
      </CardHeader>
      <CardBody>
        {description && <p className="text-muted">{description}</p>}
        {children}
      </CardBody>
    </Card>
  )
}

export default ComponentContainerCard
