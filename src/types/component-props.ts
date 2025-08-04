import { EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core/index.js'
import { ReactNode } from 'react'
import { OffcanvasControlType } from './context'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { DateClickArg, DropArg } from '@fullcalendar/interaction/index.js'

export type ChildrenType = Readonly<{ children: ReactNode }>

export type BootstrapVariantType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'

export type CalendarFormType = {
  isEditable: boolean
  eventData?: EventInput
  onUpdateEvent: (data: any) => void
  onRemoveEvent: () => void
  onAddEvent: (data: any) => void
} & OffcanvasControlType

export type FormInputProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  control: Control<TFieldValues>
  name: TName
  id?: string
  containerClassName?: string
  label?: string | ReactNode
  placeholder?: string
  noValidate?: boolean
  labelClassName?: string
}
export type CalendarProps = {
  onDateClick: (arg: DateClickArg) => void
  onEventClick: (arg: EventClickArg) => void
  onDrop: (arg: DropArg) => void
  onEventDrop: (arg: EventDropArg) => void
  events: EventInput[]
}
