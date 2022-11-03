import { IconName } from '@fortawesome/free-solid-svg-icons';

export type SidebarNavItemCommonType = {
  title: string
  path: string
  done?: boolean
  notStarted?: boolean
}

export type SidebarNavItemBaseType = SidebarNavItemCommonType & {
  iconName?: IconName
}

export type SidebarNavItemExpandableType = Omit<SidebarNavItemCommonType, 'path'> & {
  children: Omit<SidebarNavItemCommonType, 'iconName'>[]
}

export type SidebarNavItemType = SidebarNavItemBaseType | SidebarNavItemExpandableType
