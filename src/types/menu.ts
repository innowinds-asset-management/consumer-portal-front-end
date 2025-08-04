import { HTMLAttributeAnchorTarget } from 'react'

export type MenuItemType = {
  key: string
  label: string
  isTitle?: boolean
  icon?: any
  url?: string
  badge?: {
    variant: string
    text?: string
  }
  badgeIcon?: string
  parentKey?: string
  target?: HTMLAttributeAnchorTarget
  isDisabled?: boolean
  children?: MenuItemType[]
}

export type SubMenus = {
  item: MenuItemType
  tag?: string
  linkClassName?: string
  subMenuClassName?: string
  activeMenuItems?: Array<string>
  toggleMenu?: (item: MenuItemType, status: boolean) => void
  className?: string
  level: number
}
