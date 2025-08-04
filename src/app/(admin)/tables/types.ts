import type { StaticImageData } from 'next/image'

export type Employee = {
  id: number
  name: string
  position: string
  office: string
  date?: string
  age: number
  startDate: string
  salary: string
}

export type TableRecord = {
  id: number
  name: string
  phoneNo: string
  dob: string
  activeClass?: string
  country: string
  accountNo: string
  image: StaticImageData
  cell: string
  active?: boolean
}

export type ExpandableRecord = {
  product: string
  courier: string
  variant: string
  now: number
  status: string
  price: string
  Quantity: string
  Amount: string
}

export type NestedRecords = {
  name: string
  phoneNo: string
  dob: string
  active?: boolean
  children?: NestedRecords[]
}

export type ResponsiveTableType = {
  companyName: string
  lastTrade: number
  tradeTime: string
  change: string
  prevClose: number
  open: number
  bid: string
  ask: string
  target: number
}
