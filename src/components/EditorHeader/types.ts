import { PageHeaderProps } from 'components/PageHeader/types';
import { ReactNode } from 'react';

export type EditorHeaderProps = Omit<PageHeaderProps, 'double'> & {
  goBackPath?: string
  needsSave?: boolean
  onSave?: () => void
  goBackFunction?: () => void
  additionalRightContent?: ReactNode
}
