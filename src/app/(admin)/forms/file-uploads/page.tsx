import ComponentContainerCard from '@/components/ComponentContainerCard'
import { FileUploader } from '@/components/FileUploader'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'File UpLoads' }

const FileUploads = () => {
  return (
    <>
      <PageTitle title="File Uploads" subTitle="Forms" />
      <ComponentContainerCard
        title="Dropzone File Upload"
        description={<>DropzoneJS is an open source library that provides drag’n’drop file uploads with image previews.</>}>
        <FileUploader
          icon="ri:upload-cloud-2-line"
          text="Drop files here or click to upload."
          extraText="(This is just a demo dropzone. Selected files are not actually uploaded.)"
        />
      </ComponentContainerCard>
      <div className="d-none" id="uploadPreviewTemplate">
        <Card className="mt-1 mb-0 shadow-none border">
          <div className="p-2">
            <Row className="align-items-center">
              <Col xs={'auto'}>
                <img data-dz-thumbnail src="#" className="avatar-sm rounded bg-light" alt="avatar" />
              </Col>
              <Col className="ps-0">
                <Link href="" className="text-muted fw-bold" data-dz-name />
                <p className="mb-0" data-dz-size />
              </Col>
              <Col xs="auto">
                <Link href="" className="btn btn-link btn-lg text-muted" data-dz-remove>
                  <IconifyIcon icon="tabler:x" />
                </Link>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </>
  )
}

export default FileUploads
