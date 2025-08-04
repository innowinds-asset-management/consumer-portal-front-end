'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import useToggle from '@/hooks/useToggle'
import React from 'react'
import { Card, Modal, ModalDialog } from 'react-bootstrap'

const SearchBox = () => {
  const { isTrue, toggle } = useToggle()
  return (
    <>
      <div onClick={toggle} className="topbar-search d-none d-xl-flex gap-2 me-2 align-items-center" data-bs-toggle="modal" data-bs-target="#searchModal">
        <IconifyIcon icon="ri:search-line" className="fs-18" />
        <span className="me-2">Search something..</span>
      </div>
      <Modal onHide={toggle} show={isTrue} className="modal-lg" id="searchModal" tabIndex={-1} aria-labelledby="searchModalLabel" aria-hidden="true">
        <ModalDialog className="m-0">
          <form>
            <Card className="mb-0">
              <div className="px-3 py-2 d-flex flex-row align-items-center" id="top-search">
                <IconifyIcon icon='ri:search-line' className="fs-22" />
                <input type="search" className="form-control border-0" id="search-modal-input" placeholder="Search for actions, people," />
                <a onClick={toggle} type="submit" className="btn p-0" data-bs-dismiss="modal" aria-label="Close">[esc]</a>
              </div>
            </Card>
          </form>
        </ModalDialog>
      </Modal>

    </>
  )
}

export default SearchBox