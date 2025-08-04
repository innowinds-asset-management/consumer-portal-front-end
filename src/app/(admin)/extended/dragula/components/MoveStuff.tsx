'use client'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import avatar6 from '@/assets/images/users/avatar-6.jpg'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { ReactSortable } from 'react-sortablejs'

type TeamMemberType = {
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
        <div className="d-flex align-items-start">
          <Image src={item.avatar} alt="image" className="me-3 d-none d-sm-block avatar-sm rounded-circle" />
          <div className="w-100 overflow-hidden">
            <h5 className="mb-1 mt-0">{item.name}</h5>
            <p> {item.position} </p>
            <p className="mb-0 text-muted">
              <span className="fst-italic">
                <b>&quot;</b>
                {item.desc}
              </span>
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

const MoveStuff = () => {
  const [team1, setTeam1] = useState<TeamMemberType[]>([
    {
      id: 1,
      name: 'Louis K. Bond',
      avatar: avatar1,
      position: 'Founder & CEO',
      desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
    },
    {
      id: 2,
      name: 'Dennis N. Cloutier',
      avatar: avatar2,
      position: 'Software Engineer',
      desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
    },
    {
      id: 3,
      name: 'Susan J. Sander',
      avatar: avatar3,
      position: 'Web Designer',
      desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
    },
  ])

  const [team2, setTeam2] = useState<TeamMemberType[]>([
    {
      id: 1,
      name: 'James M. Short',
      avatar: avatar4,
      position: 'Web Developer',
      desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
    },
    {
      id: 2,
      name: 'Gabriel J. Snyder',
      avatar: avatar5,
      position: 'Business Analyst',
      desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
    },
    {
      id: 3,
      name: 'Louie C. Mason',
      avatar: avatar6,
      position: 'Human Resources',
      desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
    },
  ])

  return (
    <>
      <ComponentContainerCard
        title="Move stuff between containers"
        description={
          <>
            Just specify the data attribute&nbsp;
            <code>data-plugin=&apos;dragula&apos;</code> and&nbsp;
            <code>data-containers=&apos;[&quot;first-container-id&quot;, &quot;second-container-id&quot;]&apos;</code>.
          </>
        }>
        <Row data-plugin="dragula" data-containers='["company-list-left", "company-list-right"]'>
          <Col md={6}>
            <div className="bg-light bg-opacity-50 p-2 p-lg-4">
              <h5 className="mt-0">Part 1</h5>
              <ReactSortable group="teamList" list={team1} setList={setTeam1} id="company-list-left" className="py-2">
                {team1.map((item, idx) => (
                  <MovableCard key={idx} item={item} />
                ))}
              </ReactSortable>
            </div>
          </Col>
          <Col md={6}>
            <div className="bg-light bg-opacity-50 p-2 p-lg-4">
              <h5 className="mt-0">Part 2</h5>
              <ReactSortable group="teamList" list={team2} setList={setTeam2} id="company-list-right" className="py-2">
                {team2.map((item, idx) => (
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

export default MoveStuff
