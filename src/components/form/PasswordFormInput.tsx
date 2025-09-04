import { useState, type InputHTMLAttributes } from 'react'
import { FormControl, FormGroup, FormLabel, InputGroup, type FormControlProps } from 'react-bootstrap'
import Feedback from 'react-bootstrap/esm/Feedback'
import { Controller, type FieldPath, type FieldValues, type PathValue } from 'react-hook-form'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

import type { FormInputProps } from '@/types/component-props'

const PasswordFormInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  name,
  containerClassName: containerClass,
  control,
  id,
  label,
  noValidate,
  labelClassName: labelClass,
  ...other
}: FormInputProps<TFieldValues> & FormControlProps & InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Controller<TFieldValues, TName>
      name={name as TName}
      defaultValue={'' as PathValue<TFieldValues, TName>}
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClass}>
          {label &&
            (typeof label === 'string' ? (
              <FormLabel htmlFor={id ?? name} className={labelClass}>
                {label}
              </FormLabel>
            ) : (
              <>{label}</>
            ))}
          <InputGroup>
            <FormControl 
              id={id ?? name} 
              type={showPassword ? 'text' : 'password'}
              {...other} 
              {...field} 
              isInvalid={Boolean(fieldState.error?.message)} 
            />
            <InputGroup.Text 
              style={{ cursor: 'pointer' }}
              onClick={togglePasswordVisibility}
              className="bg-light bg-opacity-50 border-light py-2"
            >
              <IconifyIcon 
                icon={showPassword ? 'tabler:eye-off' : 'tabler:eye'} 
                className="text-muted" 
              />
            </InputGroup.Text>
          </InputGroup>
          {!noValidate && fieldState.error?.message && <Feedback type="invalid">{fieldState.error?.message}</Feedback>}
        </FormGroup>
      )}
    />
  )
}

export default PasswordFormInput

