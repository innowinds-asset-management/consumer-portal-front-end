'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Col, Row } from 'react-bootstrap'
import logoImage from '@/assets/images/logo-sm.png'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ReactSwal = withReactContent(Swal)
const openAlert = (options: SweetAlertOptions) => {
  ReactSwal.fire(options)
}

const AllAlert = (props: any) => {
  const { swal } = props

  let timerInterval: NodeJS.Timeout
  return (
    <>
      <Row>
        <Col lg={6}>
          <ComponentContainerCard title="A Basic Message" description={<>Here&apos;s a basic example of SweetAlert.</>}>
            <button
              type="button"
              className="btn btn-primary"
              id="sweetalert-basic"
              onClick={() =>
                openAlert({
                  title: 'Any fool can use a computer',
                  customClass: {
                    confirmButton: `btn btn-primary w-xs mt-2`,
                  },
                })
              }>
              Click me
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard title="Title" description={<>A Title with a Text Under.</>}>
            <button
              type="button"
              className="btn btn-primary"
              id="sweetalert-title"
              onClick={() =>
                openAlert({
                  title: 'The Internet?',
                  text: 'That thing is still around?',
                  icon: 'question',
                  customClass: {
                    confirmButton: `btn btn-primary w-xs mt-2`,
                  },
                })
              }>
              Click Me
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard title="HTML" description={<>Here&apos;s an example of SweetAlert with HTML content.</>}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                openAlert({
                  title: '<i>HTML</i> <u>example</u>',
                  icon: 'info',
                  html: 'You can use <b>bold text</b>, ' + '<a href="#">links</a> ' + 'and other HTML tags',
                  showCloseButton: true,
                  showCancelButton: true,
                  customClass: {
                    confirmButton: 'btn btn-success me-2',
                    cancelButton: 'btn btn-danger',
                  },
                  buttonsStyling: false,
                  confirmButtonText: ` Great!`,
                })
              }
              id="custom-html-alert">
              Toggle HTML SweetAlert
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard title="All States" description={<>Here are examples for each of SweetAlert&apos;s states.</>}>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                id="sweetalert-info"
                onClick={() =>
                  openAlert({
                    text: "Here's an example of an info SweetAlert!",
                    icon: 'info',
                    buttonsStyling: false,
                    confirmButtonText: 'Ok, got it!',
                    customClass: {
                      confirmButton: 'btn btn-info',
                    },
                  })
                }
                className="btn btn-info">
                Toggle Info
              </button>
              <button
                type="button"
                id="sweetalert-warning"
                onClick={() =>
                  openAlert({
                    text: "Here's an example of a warning SweetAlert!",
                    icon: 'warning',
                    buttonsStyling: false,
                    confirmButtonText: 'Ok, got it!',
                    customClass: {
                      confirmButton: 'btn btn-warning',
                    },
                  })
                }
                className="btn btn-warning">
                Toggle Warning
              </button>
              <button
                type="button"
                id="sweetalert-error"
                onClick={() =>
                  openAlert({
                    text: "Here's an example of an error SweetAlert!",
                    icon: 'error',
                    buttonsStyling: false,
                    confirmButtonText: 'Ok, got it!',
                    customClass: {
                      confirmButton: 'btn btn-danger',
                    },
                  })
                }
                className="btn btn-danger">
                Toggle Error
              </button>
              <button
                type="button"
                id="sweetalert-success"
                onClick={() =>
                  openAlert({
                    text: "Here's an example of a success SweetAlert!",
                    icon: 'success',
                    buttonsStyling: false,
                    confirmButtonText: 'Ok, got it!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                }
                className="btn btn-success">
                Toggle Success
              </button>
              <button
                type="button"
                id="sweetalert-question"
                onClick={() =>
                  openAlert({
                    text: "Here's an example of a question SweetAlert!",
                    icon: 'question',
                    buttonsStyling: false,
                    confirmButtonText: 'Ok, got it!',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                  })
                }
                className="btn btn-primary">
                Toggle Question
              </button>
            </div>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard title="Long Content" description={<>A modal window with a long content inside.</>}>
            <button
              type="button"
              id="sweetalert-longcontent"
              onClick={() =>
                openAlert({
                  imageUrl: 'https://placeholder.pics/svg/300x1500',
                  imageHeight: 1500,
                  imageAlt: 'A tall image',
                  customClass: {
                    confirmButton: 'btn btn-primary mt-2',
                  },
                  buttonsStyling: false,
                  showCloseButton: true,
                })
              }
              className="btn btn-secondary">
              Click Me
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="With Confirm Button"
            description={<>A warning message, with a function attached to the &quot;Confirm&quot;-button...</>}>
            <button
              type="button"
              id="sweetalert-confirm-button"
              onClick={() =>
                ReactSwal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  customClass: {
                    confirmButton: 'btn btn-primary me-2 mt-2',
                    cancelButton: 'btn btn-danger mt-2',
                  },
                  confirmButtonText: 'Yes, delete it!',
                  buttonsStyling: false,
                  showCloseButton: true,
                }).then(function (result: any) {
                  if (result.value) {
                    openAlert({
                      title: 'Deleted!',
                      text: 'Your file has been deleted.',
                      icon: 'success',
                      customClass: {
                        confirmButton: 'btn btn-primary mt-2',
                      },
                      buttonsStyling: false,
                    })
                  }
                })
              }
              className="btn btn-secondary">
              Click Me
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="With Cancel Button"
            description={<>By passing a parameter, you can execute something else for &quot;Cancel&quot;.</>}>
            <button
              type="button"
              id="sweetalert-params"
              onClick={() =>
                ReactSwal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  customClass: {
                    confirmButton: 'btn btn-primary me-2 mt-2',
                    cancelButton: 'btn btn-danger mt-2',
                  },
                  buttonsStyling: false,
                  showCloseButton: true,
                }).then(function (result) {
                  if (result.value) {
                    openAlert({
                      title: 'Deleted!',
                      text: 'Your file has been deleted.',
                      icon: 'success',
                      customClass: {
                        confirmButton: 'btn btn-primary mt-2',
                      },
                      buttonsStyling: false,
                    })
                  } else if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.cancel
                  ) {
                    openAlert({
                      title: 'Cancelled',
                      text: 'Your imaginary file is safe :)',
                      icon: 'error',
                      customClass: {
                        confirmButton: 'btn btn-primary mt-2',
                      },
                      buttonsStyling: false,
                    })
                  }
                })
              }
              className="btn btn-secondary">
              Click Me
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard title="With Image Header (Logo)" description={<>A message with custom Image Header.</>}>
            <button
              type="button"
              id="sweetalert-image"
              onClick={() =>
                openAlert({
                  title: 'Sweet!',
                  text: 'Modal with a custom image.',
                  imageUrl: logoImage.src,
                  imageHeight: 40,
                  customClass: {
                    confirmButton: 'btn btn-primary mt-2',
                  },
                  buttonsStyling: false,
                  showCloseButton: true,
                })
              }
              className="btn btn-secondary">
              Click Me
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard title="Auto Close" description={<>A message with auto close timer.</>}>
            <button
              type="button"
              id="sweetalert-close"
              onClick={() =>
                ReactSwal.fire({
                  title: 'Auto close alert!',
                  html: 'I will close in <strong></strong> seconds.',
                  timer: 2000,
                  timerProgressBar: true,
                  showCloseButton: true,
                  didOpen: function () {
                    swal.showLoading()
                    timerInterval = setInterval(function () {
                      const content = swal.getHtmlContainer()
                      if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                          b.textContent = swal.getTimerLeft()
                        }
                      }
                    }, 100)
                  },
                }).then(function (result) {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                  }
                })
              }
              className="btn btn-secondary">
              Click Me
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard title="Position" description={<>A custom positioned dialog.</>}>
            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-primary"
                onClick={() =>
                  openAlert({
                    position: 'top-start',
                    icon: 'success',
                    text: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
                id="position-top-start">
                Top Start
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  openAlert({
                    position: 'top-end',
                    icon: 'success',
                    text: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
                id="position-top-end">
                Top End
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  openAlert({
                    position: 'bottom-start',
                    icon: 'success',
                    text: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
                id="position-bottom-start">
                Bottom Starts
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  openAlert({
                    position: 'bottom-end',
                    icon: 'success',
                    text: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
                id="position-bottom-end">
                Bottom End
              </button>
            </div>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard title="With Custom Padding, Background" description={<>A message with custom width, padding and background.</>}>
            <button
              type="button"
              id="custom-padding-width-alert"
              onClick={() =>
                openAlert({
                  title: 'Custom width, padding, background.',
                  width: 600,
                  padding: 100,
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                  background: 'var(--osen-secondary-bg) url(assets/images/small/small-5.jpg) no-repeat center',
                })
              }
              className="btn btn-secondary">
              Click Me
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard title="Ajax Request" description={<>Ajax request example.</>}>
            <button
              type="button"
              id="ajax-alert"
              onClick={() =>
                ReactSwal.fire({
                  title: 'Submit email to run ajax request',
                  input: 'email',
                  showCancelButton: true,
                  confirmButtonText: 'Submit',
                  showLoaderOnConfirm: true,
                  customClass: {
                    confirmButton: 'btn btn-primary me-2',
                    cancelButton: 'btn btn-danger',
                  },
                  buttonsStyling: false,
                  showCloseButton: true,
                  preConfirm: function (email: string) {
                    return new Promise<void>(function (resolve, reject) {
                      setTimeout(function () {
                        if (email === 'taken@example.com') {
                          reject('This email is already taken.')
                        } else {
                          resolve()
                        }
                      }, 2000)
                    })
                  },
                  allowOutsideClick: false,
                }).then(function (email) {
                  openAlert({
                    icon: 'success',
                    title: 'Ajax request finished!',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                    html: 'Submitted email: ' + email,
                  })
                })
              }
              className="btn btn-secondary">
              Click Me
            </button>
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  )
}

export default AllAlert
