import { InnerSelectProps, SelectOption } from 'components/Select/types';

export type Filter = {
  label: string
} & ({
  type: 'text'
  value?: string
  defaultValue?: string
} | {
  type: 'date'
  value?: string
  defaultValue?: string
  format?: string
} | {
  type: 'number'
  value?: number
  defaultValue?: number
} | {
  label: string
  value?: string | number
  defaultValue?: string | number
  type: 'select'
  options: SelectOption[]
  selectProps?: InnerSelectProps
})

export type Filters = Record<string, Filter>

export type Filtration = {
  buttonPresets?: ('search' | 'reset')[]
  filters: Filters
  setFilters: (filters: Filters) => void
  filterSlugs?: string[]
  onFilterSearch?: () => void
}

export type FiltrationProps = Filtration
