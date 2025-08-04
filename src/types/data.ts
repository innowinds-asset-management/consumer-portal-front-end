import { StaticImageData } from 'next/image'

export type IdType = string

export type BrandListType = {
  id: IdType
  name: string
  stores: number
  year: number
  products: string
  status: 'Active' | 'Pending' | 'Inactive'
  image: StaticImageData
}

export type UserType = {
  id: IdType
  name: string
  avatar: StaticImageData
  email: string
  role: string
  status: 'Active' | 'Pending' | 'Inactive'
}

export type EmailType = {
  id: IdType
  isStar?: boolean
  image: StaticImageData
  name: string
  subTitle: string
  description: string
  IsAttachment?: number
  date: Date
  variant?: string
}

export type FilesType = {
  id: IdType
  icon: string
  title: string
  fileVariant: string
  file: string
  date: Date
  userId: UserType['id']
  user?: UserType
  size: number
  members: {
    text: string
    variant: string
  }[]
}

export type ProductType = {
  id: IdType
  category: string
  amount: string
  date: Date
  status: 'Paid' | 'Pending' | 'Cancelled' | 'Overdue'
}

export type InvoicesType = {
  id: IdType
  userId: UserType['id']
  users?: UserType
  productId: ProductType['id']
  products?: ProductType
  amount: string
  date: Date
  invoicesStatus: 'Paid' | 'Cancelled' | 'Pending'
}

export type Employee = {
  id: IdType
  name: string
  email?: string
  position?: string
  company: string
  country: string
  office: string
  age: number
  startDate: string
  salary: string
}

export type EmailLabelType = 'Primary' | 'Social' | 'Promotions' | 'Updates' | 'Forums'
