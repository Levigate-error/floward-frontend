import {
  GetAllType, RemoveByIdsType, SaveOneProps, SaveOneType,
} from 'actions/_utils/defaultActions/types';
import { ReactNode } from 'react';
import { TableType } from 'components/Table/types';
import { ButtonProps } from 'components/Button/types';
import { Filtration } from 'components/Filtration/types';

export type ParserObject = {
  title?: string
  render?: (text: any, record: any) => ReactNode
  width?: number | string
  maxWidth?: number | string
  minWidth?: number | string
  ellipsis?: boolean
  switchable?: boolean
  onSwitch?: (id: number, checked: boolean) => (void | Promise<void>)
}

export type ParserObjectAlterableTypes = 'number' | 'text'

export type ParserObjectAlterable = ParserObject & {
  type?: ParserObjectAlterableTypes
}

export type ParserObjectAlterableWithId = ParserObjectAlterable & { id: number | string }

export type TableActionsButton = {
  key: string
  content: string
  showOnEdit?: false
  onClick?: (...args: any) => void
  buttonProps?: ButtonProps | ((record: any) => ButtonProps)
}

export type TableActionsBase = {
  buttons?: TableActionsButton[]
}

export type TableActionsAlterable = TableActionsBase & {
  presets?: { remove?: true, edit?: true }
  alterable: true
}

export type TableActionsEditable = TableActionsBase & {
  presets?: { remove?: true, edit: true }
  editUrl: string | ((id: number) => string)
}

export type TableActionsNonEditable = TableActionsBase & {
  presets?: { remove?: true, edit?: false }
}

export type UseTableBaseProps = {
  id?: number,
  filtration?: Omit<Filtration, 'setFilters'>
  defaultPerPage?: number
  sortBySlug?: string
  defaultFilter?: QueryType
  parseSaveDataProp?: (data: SaveOneProps['data']) => SaveOneProps['data']
}

export type ParseLoadedDataProps = {
  res: any
  setData: (data: any[]) => void
}

export type UseTableEditProps = UseTableBaseProps & {
  apiActions: {
    getAll: GetAllType,
    saveOne?: SaveOneType,
    removeByIds?: RemoveByIdsType,
  },
  parseLoadedData?: (props: ParseLoadedDataProps) => void,
  parserObject: Record<string, string | ParserObject>
  tableActions?: TableActionsEditable | TableActionsNonEditable
}

export type UseTableAlterProps = UseTableBaseProps & {
  apiActions: {
    getAll: GetAllType,
    saveOne: SaveOneType,
    removeByIds?: RemoveByIdsType,
  },
  parseLoadedData?: (props: ParseLoadedDataProps) => void,
  parserObject: Record<string, ParserObjectAlterable>
  tableActions?: TableActionsAlterable
}

export type UseTableProps = UseTableEditProps | UseTableAlterProps

export type UseTableReturnType =
  Pick<
  TableType,
  | 'loading'
  | 'filtration'
  > & {
  setLoading: (loading: boolean) => void
  tableData: any[]
  tableColumns: any[]
  onRemove: (ids: number[]) => void
  loadData: (useFilters?: boolean) => Promise<void>
  data: any[]
  unsortedData: any[]
  setData: (data: any[]) => void
  selectedRows: number[]
  setSelectedRows: (selectedRows: number[]) => void
  onCreate: () => void
}
