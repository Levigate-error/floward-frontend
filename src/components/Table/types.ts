import { TableProps } from 'antd/es/table/Table';
import { Filtration } from 'components/Filtration/types';
import { ReactNode } from 'react';

export type TableType = {
  page?: number
  perPage?: number
  setPage?: (page: number) => void
  setPerPage?: (perPage: number) => void
  total?: number
  havePagination?: boolean
  loading?: boolean
  filtration?: Filtration
  tableProps: TableProps<any>
  onRemoveSelected?: () => void
  availablePerPages?: number[]
  title?: string
  description?: string
  additionalHeaderContent?: ReactNode
}
