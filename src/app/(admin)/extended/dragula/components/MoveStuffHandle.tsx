import avatar10 from '@/assets/images/users/avatar-10.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import avatar7 from '@/assets/images/users/avatar-7.jpg'
import avatar8 from '@/assets/images/users/avatar-8.jpg'
import avatar9 from '@/assets/images/users/avatar-9.jpg'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { ReactSortable } from 'react-sortablejs'

interface TeamMemberType {
  id: number
  name: string
  avatar: StaticImageData
  position: string
  desc?: string
}

const MovableCard = ({ item }: { item: TeamMemberType }) => {
  return (
    <Card className="mb-0 mt-2">
      <CardBody>
        <div className="d-flex align-items-center">
          <Image src={item.avatar} alt="image" className="me-3 d-none d-sm-block avatar-sm rounded-circle" />
          <div className="w-100 overflow-hidden">
            <h5 className="mb-1">{item.name}</h5>
            <p className="mb-0"> {item.position} </p>
          </div>
          <span className="dragula-handle">
            <IconifyIcon icon="tabler:arrows-move" />
          </span>
        </div>
      </CardBody>
    </Card>
  )
}

const MoveStuffHandle = () => {
  const [part1, setPart1] = useState<TeamMemberType[]>([
    {
      id: 1,
      name: 'Louis K. Bond',
      avatar: avatar7,
      position: 'Founder & CEO',
    },
    {
      id: 2,
      name: 'Dennis N. Cloutier',
      avatar: avatar8,
      position: 'Software Engineer',
    },
    {
      id: 3,
      name: 'Susan J. Sander',
      avatar: avatar9,
      position: 'Web Designer',
    },
  ])

  const [part2, setPart2] = useState<TeamMemberType[]>([
    {
      id: 1,
      name: 'James M. Short',
      avatar: avatar10,
      position: 'Web Developer',
    },
    {
      id: 2,
      name: 'Gabriel J. Snyder',
      avatar: avatar5,
      position: 'Business Analyst',
    },
    {
      id: 3,
      name: 'Louie C. Mason',
      avatar: avatar3,
      position: 'Human Resources',
    },
  ])
  return (
    <>
      <ComponentContainerCard
        title="Move stuff between containers using handle"
        description={
          <>
            Just specify the data attribute&nbsp;
            <code>data-plugin=&apos;dragula&apos;</code>,&nbsp;
            <code>data-containers=&apos;[&quot;first-container-id&quot;, &quot;second-container-id&quot;]&apos;</code> and
            <code>data-handle-class=&apos;dragula-handle&apos;</code>.
          </>
        }>
        <Row data-plugin="dragula" data-containers='["handle-dragula-left", "handle-dragula-right"]' data-handleclass="dragula-handle">
          <Col md={6}>
            <div className="bg-light bg-opacity-50 p-2 p-lg-4">
              <h5 className="mt-0">Part 1</h5>
              <ReactSortable group="teamList2" handle=".dragula-handle" list={part1} setList={setPart1} id="handle-dragula-left" className="py-2">
                {part1.map((item, idx) => (
                  <MovableCard key={idx} item={item} />
                ))}
              </ReactSortable>
            </div>
          </Col>
          <Col md={6}>
            <div className="bg-light bg-opacity-50 p-2 p-lg-4">
              <h5 className="mt-0">Part 2</h5>
              <ReactSortable group="teamList2" handle=".dragula-handle" list={part2} setList={setPart2} id="handle-dragula-right" className="py-2">
                {part2.map((item, idx) => (
                  <MovableCard key={idx} item={item} />
                ))}
              </ReactSortable>
            </div>
          </Col>
        </Row>
      </ComponentContainerCard>
    </>
  )
}

export default MoveStuffHandle
