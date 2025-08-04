'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Col, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.bubble.css'
import 'react-quill-new/dist/quill.snow.css'

let valueBubble = ''
let valueSnow = ''
valueSnow = valueBubble = `<h3><span class="ql-size-large">Hello World!</span></h3>
    <p><br/></p>
    <h3>This is a simple editable area.</h3>
    <p><br/></p>
    <ul>
      <li>Select a text to reveal the toolbar.</li>
      <li>Edit rich document on-the-fly, so elastic!</li>
    </ul>
<p><br/></p>
<p>End of simple area</p>`

const SnowEditor = () => {
  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'super' }, { script: 'sub' }],
      [{ header: [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['direction', { align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }
  return (
    <ComponentContainerCard title="Quill Editor" description={<>Snow is a clean, flat toolbar theme.</>}>
      <ul className="list-group list-group-flush">
        <li className="list-group-item m-0 p-0">
          <div className="mb-2" >
            <ReactQuill id="snow-editor" modules={modules} defaultValue={valueSnow} theme="snow" />
          </div>
        </li>
      </ul>
    </ComponentContainerCard>
  )
}

const BubbleEditor = () => {
  return (
    <ComponentContainerCard title="Bubble Editor" description={<>Bubble is a simple tooltip based theme.</>}>
      <ul className="list-group list-group-flush">
        <li className="list-group-item m-0 p-0">
          <div className="mb-2">
            <div id="snow-editor">
              <ReactQuill id="bubble-editor" defaultValue={valueBubble} theme="bubble" />
            </div>
          </div>
        </li>
      </ul>
    </ComponentContainerCard>
  )
}

const AllEditors = () => {
  return (
    <Row>
      <Col xs={12}>
        <SnowEditor />
        <BubbleEditor />
      </Col>
    </Row>
  )
}
export default AllEditors
