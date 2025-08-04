'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Employee } from '@/types/data'
import { Grid } from 'gridjs-react'
import { Col, Row } from 'react-bootstrap'

const AllDataTable = ({ dataTableRecords }: { dataTableRecords: Employee[] }) => {
  return (
    <>
      <Row>
        <Col lg={12}>
          <ComponentContainerCard title="Base Example">
            <Grid data={dataTableRecords} search={true} pagination={{ limit: 5 }} sort />
          </ComponentContainerCard>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <ComponentContainerCard title="Pagination">
            <Grid data={dataTableRecords} pagination={{ limit: 3 }} />
          </ComponentContainerCard>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <ComponentContainerCard title="Search">
            <Grid data={dataTableRecords} pagination={{ limit: 5 }} search={true} />
          </ComponentContainerCard>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <ComponentContainerCard title="Sorting">
            <Grid data={dataTableRecords} pagination={{ limit: 5 }} sort />
          </ComponentContainerCard>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <ComponentContainerCard title="Loading State">
            <Grid
              columns={['Name', 'Email', 'Phone Number']}
              sort={true}
              pagination={{ limit: 5 }}
              data={() => {
                return new Promise((resolve) => {
                  setTimeout(
                    () =>
                      resolve([
                        ['John', 'john@example.com', '(353) 01 222 3333'],
                        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
                      ]),
                    4000,
                  )
                })
              }}
            />
          </ComponentContainerCard>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <ComponentContainerCard title="Fixed Header">
            <Grid
              data={dataTableRecords}
              columns={['id', 'name', 'email', 'position', 'company', 'country']}
              height="320px"
              fixedHeader={true}
              pagination={{ limit: 10 }}
            />
          </ComponentContainerCard>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <ComponentContainerCard title="Hidden Columns">
            <Grid
              data={dataTableRecords}
              columns={[
                {
                  id: 'id',
                  hidden: true,
                },
                'name',
                'email',
                'position',
                'company',
              ]}
              sort={true}
              pagination={{ limit: 5 }}
            />
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  )
}

export default AllDataTable
