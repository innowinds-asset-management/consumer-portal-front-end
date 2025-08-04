import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button } from 'react-bootstrap'

const SidePanel = ({ createNewEvent }: { createNewEvent: () => void }) => {
  const externalEvents = [
    {
      id: 1,
      variant: 'success',
      title: 'New Event Planning',
    },
    {
      id: 2,
      variant: 'info',
      title: 'Meeting',
    },
    {
      id: 3,
      variant: 'warning',
      title: 'Generating Reports',
    },
    {
      id: 4,
      variant: 'danger',
      title: 'Create New theme',
    },
  ]

  return (
    <>
      <div className="d-grid">
        <Button variant="primary" type="button" onClick={createNewEvent}>
          <IconifyIcon icon="bx:plus" className="fs-18 me-2" />
          &nbsp;Create New Event
        </Button>
      </div>
      <div id="external-events">
        <br />
        <p className="text-muted">Drag and drop your event or click in the calendar</p>

        {externalEvents.map(({ id, variant, title }) => (
          <div key={id} className={`external-event pb-1 bg-soft-${variant} text-${variant}`} title={title} data-class={`bg-${variant}`}>
            <span className="icons-center">
              <IconifyIcon icon="bxs:circle" className="me-2 vertical-middle" />
              {title}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

export default SidePanel
