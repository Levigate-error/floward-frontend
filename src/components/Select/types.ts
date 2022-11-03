import { ReactNode } from 'react';

export type SelectOption = {
  id: string | number
  label: string
  value: any
}

export type InnerSelectProps = {
  allowClear?: boolean
  mode?: 'multiple'
}

export type SelectProps = {
  value: string | number
  onChange?: (value: any) => void
  label?: string
  disabled?: boolean
  options: SelectOption[]
  selectProps?: InnerSelectProps
  postContent?: ReactNode
}
