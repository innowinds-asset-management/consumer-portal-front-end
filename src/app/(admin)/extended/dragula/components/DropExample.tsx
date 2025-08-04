'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { useState } from 'react'
import { Card, CardBody, Col } from 'react-bootstrap'
import { ReactSortable } from 'react-sortablejs'

type ItemType = {
  id: number
  variant: string
  class?: string
}

const DropExample = () => {
  const [items, setItems] = useState<ItemType[]>([
    {
      id: 1,
      variant: 'primary',
    },
    {
      id: 2,
      variant: 'secondary',
    },
    {
      id: 3,
      variant: 'success',
    },
    {
      id: 4,
      variant: 'info',
      class: 'text-xs-center',
    },
    {
      id: 5,
      variant: 'warning',
      class: 'text-xs-center',
    },
    {
      id: 6,
      variant: 'danger',
      class: 'text-xs-center',
    },
  ])

  return (
    <>
      <ComponentContainerCard
        title="Simple Drag and Drop Example"
        description={
          <>
            Just specify the data attribute <code>data-plugin=&apos;dragula&apos;</code> to have drag and drop support in your container.
          </>
        }>
        <ReactSortable list={items} setList={setItems} className="row" id="simple-dragula" data-plugin="dragula">
          {items.map((variant, idx) => (
            <Col md={4} key={idx}>
              <Card className={`mb-0 mt-3 text-white bg-${variant.variant}`}>
                <CardBody>
                  <blockquote className="card-bodyquote mb-0">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                    <footer>
                      Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                  </blockquote>
                </CardBody>
              </Card>
            </Col>
          ))}
        </ReactSortable>
      </ComponentContainerCard>
    </>
  )
}

export default DropExample
