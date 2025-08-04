'use client'
import Link from 'next/link'
import { Card, Col, Row } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import IconifyIcon from '../wrappers/IconifyIcon'
import useFileUploader from './useFileUploader'

type ChildrenProps = {
  icon?: string
  text?: string
  textClass?: string
  extraText?: string
}

export type FileType = File & {
  path?: string
  preview?: string
  formattedSize?: string
}

type FileUploaderProps = ChildrenProps & {
  onFileUpload?: (files: FileType[]) => void
  showPreview?: boolean
}

const FileUploader = ({ showPreview = true, onFileUpload, icon, extraText, text }: FileUploaderProps) => {
  const { selectedFiles, handleAcceptedFiles, removeFile } = useFileUploader(showPreview)

  return (
    <>
      <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles, onFileUpload)}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone">
            <div className="dz-message needsclick" {...getRootProps()}>
              <input {...getInputProps()} />
              {icon && <IconifyIcon icon={icon} className={'text-muted h1'} />}
              <h3>{text}</h3>
              <span className="text-muted fs-13">{extraText}</span>
            </div>
          </div>
        )}
      </Dropzone>

      <div className="dropzone-previews mt-3">
        {(selectedFiles || []).map((file, idx) => {
          return (
            <Card className="mt-1 mb-0 shadow-none border" key={idx + '-file'}>
              <div className="p-2">
                <Row className="align-items-center">
                  {file.preview && (
                    <Col xs={'auto'}>
                      <img data-dz-thumbnail="" className="avatar-sm rounded bg-light" alt={file.name} src={file.preview} />
                    </Col>
                  )}
                  {!file.preview && (
                    <Col xs={'auto'}>
                      <div className="avatar-sm">
                        <span className="avatar-title bg-primary rounded">
                          {file.path?.split('.')[file.path?.split('.').length - 1]?.toUpperCase()}
                        </span>
                      </div>
                    </Col>
                  )}
                  <Col className="ps-0">
                    <Link href="" className="text-muted fw-bold">
                      {file.name}
                    </Link>
                    <p className="mb-0">
                      <strong>{file.formattedSize}</strong>
                    </p>
                  </Col>
                  <Col className="text-end">
                    <Link href="" className="btn btn-link btn-lg text-muted">
                      <IconifyIcon icon="tabler:x" onClick={() => removeFile(file)} />
                    </Link>
                  </Col>
                </Row>
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export { FileUploader }
