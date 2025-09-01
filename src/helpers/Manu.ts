import { HORIZONTAL_MENU_ITEM, MENU_ITEMS } from '../assets/data/menu-items'
import { MenuItemType } from '../types/menu'

export const getMenuItems = (): MenuItemType[] => {
  // Check if we're in production using custom env variable
  const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production'
 
  // console.log('isProduction===>', process.env.NEXT_PUBLIC_APP_ENV);
  
  if (isProduction) {
    // In production, only show Assets and Departments
    return MENU_ITEMS.filter(item => 
      item.key === 'assets' || 
      item.key === 'departments' ||
      item.key === 'navigation' || // Keep the title
      item.key === 'dashboard' ||
      item.key === 'suppliers'
    )
  }
  
  // In development, show all menu items
  return MENU_ITEMS
}
export const getHorizontalMenuItems = (): MenuItemType[] => {
  return HORIZONTAL_MENU_ITEM
}

export const findAllParent = (menuItems: MenuItemType[], menuItem: MenuItemType): string[] => {
  let parents: string[] = []
  const parent = findMenuItem(menuItems, menuItem.parentKey)
  if (parent) {
    parents.push(parent.key)
    if (parent.parentKey) {
      parents = [...parents, ...findAllParent(menuItems, parent)]
    }
  }
  return parents
}

export const getMenuItemFromURL = (items: MenuItemType | MenuItemType[], url: string): MenuItemType | undefined => {
  if (items instanceof Array) {
    for (const item of items) {
      const foundItem = getMenuItemFromURL(item, url)
      if (foundItem) {
        return foundItem
      }
    }
  } else {
    if (items.url == url) return items
    if (items.children != null) {
      for (const item of items.children) {
        if (item.url == url) return item
      }
    }
  }
}

export const findMenuItem = (menuItems: MenuItemType[] | undefined, menuItemKey: MenuItemType['key'] | undefined): MenuItemType | null => {
  if (menuItems && menuItemKey) {
    for (const item of menuItems) {
      if (item.key === menuItemKey) {
        return item
      }
      const found = findMenuItem(item.children, menuItemKey)
      if (found) return found
    }
  }
  return null
}
