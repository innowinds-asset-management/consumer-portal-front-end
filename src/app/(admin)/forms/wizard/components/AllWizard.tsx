'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import TextFormInput from '@/components/form/TextFormInput'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Button, Col, Form, ProgressBar, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import StepWizard from 'react-step-wizard'
import * as yup from 'yup'

const StepOne = () => (
  <div className="tab-pane" id="basictab1">
    <Row className="">
      <Col xs={12}>
        <Row className=" mb-3">
          <label className="col-md-3 col-form-label" htmlFor="userName">
            User name
          </label>
          <Col md={9}>
            <input type="text" className="form-control" id="userName" name={`{...register("lName")}`} defaultValue="johne" />
          </Col>
        </Row>
        <Row className=" mb-3">
          <label className="col-md-3 col-form-label" htmlFor="password">
            Password
          </label>
          <Col md={9}>
            <input type="password" id="password" name="password" className="form-control" defaultValue={123456789} />
          </Col>
        </Row>
        <Row className=" mb-3">
          <label className="col-md-3 col-form-label" htmlFor="confirm">
            Re Password
          </label>
          <Col md={9}>
            <input type="password" id="confirm" name="confirm" className="form-control" defaultValue={123456789} />
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
)

const StepTwo = () => (
  <div className="tab-pane" id="basictab2">
    <Row>
      <Col>
        <Row className=" mb-3">
          <label className="col-md-3 col-form-label" htmlFor="name">
            First name
          </label>
          <Col md={9}>
            <input type="text" id="name" name="name" className="form-control" defaultValue="Francis" />
          </Col>
        </Row>
        <Row className=" mb-3">
          <label className="col-md-3 col-form-label" htmlFor="surname">
            Last name
          </label>
          <Col md={9}>
            <input type="text" id="surname" name="surname" className="form-control" defaultValue="Brinkman" />
          </Col>
        </Row>
        <Row className=" mb-3">
          <label className="col-md-3 col-form-label" htmlFor="email">
            Email
          </label>
          <Col md={9}>
            <input type="email" id="email" name="email" className="form-control" defaultValue="cory1979@hotmail.com" />
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
)

const StepTwoLast = () => {
  return (
    <div className="tab-pane" id="basictab2">
      <Row className="">
        <Col xs={12}>
          <Row className=" mb-3">
            <label className="col-md-3 col-form-label" htmlFor="name">
              First name
            </label>
            <Col md={9}>
              <input type="text" id="name" name="name" className="form-control" />
            </Col>
          </Row>
          <Row className=" mb-3">
            <label className="col-md-3 col-form-label" htmlFor="surname">
              Last name
            </label>
            <Col md={9}>
              <input type="text" id="surname" name="surname" className="form-control" />
            </Col>
          </Row>
          <Row className=" mb-3">
            <label className="col-md-3 col-form-label" htmlFor="email">
              Email
            </label>
            <Col md={9}>
              <input type="email" id="email" name="email" className="form-control" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const StepThree = () => (
  <div className="tab-pane" id="basictab3">
    <Row className="">
      <Col xs={12}>
        <div className="text-center">
          <h2 className="mt-0">
            <IconifyIcon icon="bi:check2-all" className="bi" />
          </h2>
          <h3 className="mt-0">Thank you !</h3>
          <p className="w-75 mb-2 mx-auto">
            Quisque nec turpis at urna dictum luctus. Suspendisse convallis dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis dictum
            aliquet.
          </p>
          <div className="mb-3">
            <div className="form-check d-inline-block">
              <input type="checkbox" className="form-check-input fs-15" id="customCheck1" />
              <label className="form-check-label" htmlFor="customCheck1">
                I agree with the Terms and Conditions
              </label>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </div>
)

type StepWizardInstance = {
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: number) => void
}

const BasicWizard = () => {
  const wizardRef = useRef<StepWizardInstance | null>(null)
  const [activeStep, setActiveStep] = useState(1)

  const nextStep = () => {
    if (wizardRef.current) {
      wizardRef.current.nextStep()
      setActiveStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (wizardRef.current) {
      wizardRef.current.previousStep()
      setActiveStep((prev) => prev - 1)
    }
  }

  const goToStep = (step: any) => {
    if (wizardRef.current) {
      wizardRef.current.goToStep(step)
      setActiveStep(step)
    }
  }

  return (
    <>
      <Col lg={6}>
        <ComponentContainerCard title="A Basic Wizard">
          <ul className="nav nav-pills nav-justified form-wizard-header mb-4">
            <li className="nav-item">
              <Link
                href="#basictab1"
                onClick={() => goToStep(1)}
                data-bs-toggle="tab"
                data-toggle="tab"
                className={`nav-link rounded-0 py-2 ${activeStep === 1 ? 'active' : ''}`}>
                <IconifyIcon icon="bi:person-circle" className="bi fs-18 align-middle me-1" />
                <span className="d-none d-sm-inline">Account</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="#basictab2"
                data-bs-toggle="tab"
                onClick={() => goToStep(2)}
                data-toggle="tab"
                className={`nav-link rounded-0 py-2 ${activeStep === 2 ? 'active' : ''}`}>
                <IconifyIcon icon="bi:emoji-smile" className="bi fs-18 align-middle me-1" />
                <span className="d-none d-sm-inline">Profile</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="#basictab3"
                onClick={() => goToStep(3)}
                data-bs-toggle="tab"
                data-toggle="tab"
                className={`nav-link rounded-0 py-2 ${activeStep === 3 ? 'active' : ''}`}>
                <IconifyIcon icon="bi:check2-circle" className="bi fs-18 align-middle me-1" />
                <span className="d-none d-sm-inline">Finish</span>
              </Link>
            </li>
          </ul>

          <StepWizard
            instance={(wizard: any) => {
              wizardRef.current = wizard
            }}
            onStepChange={(stats) => setActiveStep(stats.activeStep)}>
            <StepOne />
            <StepTwo />
            <StepThree />
          </StepWizard>

          <div className="d-flex wizard justify-content-between flex-wrap gap-2 mt-3">
            <div className="first">
              <Button className="btn btn-primary" onClick={() => goToStep(1)} disabled={activeStep === 1}>
                First
              </Button>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <div className="previous">
                <Button className="btn btn-primary" onClick={prevStep} disabled={activeStep === 1}>
                  <IconifyIcon icon="bx-left-arrow-alt" className="bx me-2" />
                  Back To Previous
                </Button>
              </div>
              <div className="next">
                <Button className="btn btn-primary mt-3 mt-md-0" onClick={nextStep} disabled={activeStep === 3}>
                  Next Step
                  <IconifyIcon icon="bx-right-arrow-alt" className="bx ms-2" />
                </Button>
              </div>
            </div>
            <div className="last">
              <Button className="btn btn-primary mt-3 mt-md-0" onClick={() => goToStep(3)} disabled={activeStep === 3}>
                Finish
              </Button>
            </div>
          </div>
        </ComponentContainerCard>
      </Col>
    </>
  )
}

const WizardWithProgress = () => {
  const wizardRef = useRef<StepWizardInstance | null>(null)
  const [activeStep, setActiveStep] = useState(1)

  const steps = [<StepOne />, <StepTwo />, <StepThree />]

  const nextStep = () => {
    if (wizardRef.current) {
      wizardRef.current.nextStep()
      setActiveStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (wizardRef.current) {
      wizardRef.current.previousStep()
      setActiveStep((prev) => prev - 1)
    }
  }

  const goToStep = (step: any) => {
    if (wizardRef.current) {
      wizardRef.current.goToStep(step)
      setActiveStep(step)
    }
  }
  return (
    <>
      <Col lg={6}>
        <ComponentContainerCard title="Wizard With Progress Bar">
          <ul className="nav nav-pills nav-justified form-wizard-header mb-4">
            <li className="nav-item">
              <Link
                href="#basictab1"
                onClick={() => goToStep(1)}
                data-bs-toggle="tab"
                data-toggle="tab"
                className={`nav-link rounded-0 py-2 ${activeStep === 1 ? 'active' : ''}`}>
                <IconifyIcon icon="bi:person-circle" className="bi fs-18 align-middle me-1" />
                <span className="d-none d-sm-inline">Account</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="#basictab2"
                data-bs-toggle="tab"
                onClick={() => goToStep(2)}
                data-toggle="tab"
                className={`nav-link rounded-0 py-2 ${activeStep === 2 ? 'active' : ''}`}>
                <IconifyIcon icon="bi:emoji-smile" className="bi fs-18 align-middle me-1" />
                <span className="d-none d-sm-inline">Profile</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="#basictab3"
                onClick={() => goToStep(3)}
                data-bs-toggle="tab"
                data-toggle="tab"
                className={`nav-link rounded-0 py-2 ${activeStep === 3 ? 'active' : ''}`}>
                <IconifyIcon icon="bi:check2-circle" className="bi fs-18 align-middle me-1" />
                <span className="d-none d-sm-inline">Finish</span>
              </Link>
            </li>
          </ul>
          <div className="tab-content b-0 mb-0">
            <ProgressBar
              style={{ height: 7 }}
              animated
              striped
              variant="success"
              now={(activeStep / steps.length) * 100} // Calculate progress
              className="mb-3 progress-sm"
            />
            <StepWizard
              instance={(wizard: any) => {
                wizardRef.current = wizard
              }}
              onStepChange={(stats) => setActiveStep(stats.activeStep)}>
              <StepOne />
              <StepTwo />
              <StepThree />
            </StepWizard>

            <div className="d-flex wizard justify-content-between flex-wrap gap-2 mt-3">
              <div className="first">
                <Button className="btn btn-primary" onClick={() => goToStep(1)} disabled={activeStep === 1}>
                  First
                </Button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <div className="previous">
                  <Button className="btn btn-primary" onClick={prevStep} disabled={activeStep === 1}>
                    <IconifyIcon icon="bx-left-arrow-alt" className="bx me-2" />
                    Back To Previous
                  </Button>
                </div>
                <div className="next">
                  <Button className="btn btn-primary mt-3 mt-md-0" onClick={nextStep} disabled={activeStep === 3}>
                    Next Step
                    <IconifyIcon icon="bx-right-arrow-alt" className="bx ms-2" />
                  </Button>
                </div>
              </div>
              <div className="last">
                <Button className="btn btn-primary mt-3 mt-md-0" onClick={() => goToStep(3)} disabled={activeStep === 3}>
                  Finish
                </Button>
              </div>
            </div>
          </div>
        </ComponentContainerCard>
      </Col>
    </>
  )
}

const WizardWithValidation = () => {
  const wizardRef = useRef<StepWizardInstance | null>(null)
  const [activeStep, setActiveStep] = useState(1)

  const messageSchema = yup.object({
    password: yup.string().required('Please enter first name'),
    rePassword: yup.string().required('Please enter first name'),
    userNama: yup.string().required('Please enter first name'),
    fName: yup.string().required('Please enter first name'),
    lName: yup.string().required('Please enter last name'),
    email: yup.string().email().required('Please enter email'),
  })

  const { handleSubmit, control, trigger, register } = useForm({
    resolver: yupResolver(messageSchema),
  })

  const nextStep = async () => {
    const isValid = await trigger()
    if (isValid && wizardRef.current) {
      wizardRef.current.nextStep()
      setActiveStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (wizardRef.current) {
      wizardRef.current.previousStep()
      setActiveStep((prev) => prev - 1)
    }
  }

  const goToStep = (step: any) => {
    if (wizardRef.current) {
      wizardRef.current.goToStep(step)
      setActiveStep(step)
    }
  }
  return (
    <Col lg={6}>
      <ComponentContainerCard title="Wizard With Form Validation">
        <Form onSubmit={handleSubmit(() => {})}>
          <div id="validation-wizard">
            <ul className="nav nav-pills nav-justified form-wizard-header mb-4">
              <li className="nav-item">
                <Link
                  href="#basictab1"
                  onClick={() => goToStep(1)}
                  data-bs-toggle="tab"
                  data-toggle="tab"
                  className={`nav-link rounded-0 py-2 ${activeStep === 1 ? 'active' : ''}`}>
                  <IconifyIcon icon="bi:person-circle" className="bi fs-18 align-middle me-1" />
                  <span className="d-none d-sm-inline">Account</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="#basictab2"
                  data-bs-toggle="tab"
                  onClick={() => goToStep(2)}
                  data-toggle="tab"
                  className={`nav-link rounded-0 py-2 ${activeStep === 2 ? 'active' : ''}`}>
                  <IconifyIcon icon="bi:emoji-smile" className="bi fs-18 align-middle me-1" />
                  <span className="d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="#basictab3"
                  onClick={() => goToStep(3)}
                  data-bs-toggle="tab"
                  data-toggle="tab"
                  className={`nav-link rounded-0 py-2 ${activeStep === 3 ? 'active' : ''}`}>
                  <IconifyIcon icon="bi:check2-circle" className="bi fs-18 align-middle me-1" />
                  <span className="d-none d-sm-inline">Finish</span>
                </Link>
              </li>
            </ul>
            <StepWizard
              instance={(wizard: any) => {
                wizardRef.current = wizard
              }}
              onStepChange={(stats) => setActiveStep(stats.activeStep)}>
              <div className="tab-pane" id="basictab1">
                <Row className="">
                  <Col xs={12}>
                    <Row className=" mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="userName">
                        User name
                      </label>
                      <Col md={9}>
                        <TextFormInput control={control} {...register('userNama')} />
                      </Col>
                    </Row>
                    <Row className=" mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="password">
                        Password
                      </label>
                      <Col md={9}>
                        <TextFormInput control={control} {...register('password')} />
                      </Col>
                    </Row>
                    <Row className=" mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="confirm">
                        Re Password
                      </label>
                      <Col md={9}>
                        <TextFormInput control={control} {...register('rePassword')} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <div className="tab-pane" id="basictab2">
                <Row className="">
                  <Col xs={12}>
                    <Row className=" mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="name">
                        First name
                      </label>
                      <Col md={9}>
                        <TextFormInput control={control} {...register('fName')} />
                      </Col>
                    </Row>
                    <Row className=" mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="surname">
                        Last name
                      </label>
                      <Col md={9}>
                        <TextFormInput control={control} {...register('lName')} />
                      </Col>
                    </Row>
                    <Row className=" mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="email">
                        Email
                      </label>
                      <Col md={9}>
                        <TextFormInput control={control} {...register('email')} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <StepThree />
            </StepWizard>
            <div className="d-flex wizard justify-content-between flex-wrap gap-2 mt-3">
              <div className="first">
                <Button className="btn btn-primary" onClick={() => goToStep(1)} type="submit" disabled={activeStep === 1}>
                  First
                </Button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <div className="previous">
                  <Button className="btn btn-primary" onClick={prevStep} type="submit" disabled={activeStep === 1}>
                    <IconifyIcon icon="bx-left-arrow-alt" className="bx me-2" />
                    Back To Previous
                  </Button>
                </div>
                <div className="next">
                  <Button className="btn btn-primary mt-3 mt-md-0" onClick={nextStep} type="submit" disabled={activeStep === 3}>
                    Next Step
                    <IconifyIcon icon="bx-right-arrow-alt" className="bx ms-2" />
                  </Button>
                </div>
              </div>
              <div className="last">
                <Button className="btn btn-primary mt-3 mt-md-0" onClick={() => goToStep(3)} type="submit" disabled={activeStep === 3}>
                  Finish
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </ComponentContainerCard>
    </Col>
  )
}

const AllWizard = () => {
  return (
    <>
      <Row>
        <BasicWizard />
        <WizardWithProgress />
        <WizardWithValidation />
      </Row>
    </>
  )
}

export default AllWizard
