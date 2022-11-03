import { GetOneType, SaveOneProps, SaveOneType } from 'actions/_utils/defaultActions/types';
import { SelectOption, SelectProps } from 'components/Select/types';
import { InputProps } from 'components/Input/types';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export type FieldBaseType = {
  setValue: (data: DataValueType) => void
  label: string
  side?: 'left' | 'right'
  slug: string
  hidden?: () => boolean
  prefix?: ReactNode | ((data: DataType | null) => ReactNode)
  suffix?: ReactNode
  spaceDirection?: 'horizontal' | 'vertical'
  spaceSize?: number
}

export type FieldInputType = FieldBaseType & {
  defaultValue: null | string | number
  type: 'input'
  noNewLine?: boolean
  readonly?: boolean
  disabled?: () => boolean
  inputType?: InputProps['type']
}

export type FieldSelectType = FieldBaseType & {
  defaultValue: any
  type: 'select'
  options: SelectOption[]
  selectProps?: SelectProps['selectProps']
  disabled?: () => boolean
  parseValue?: (v: any) => string
  postContent?: ReactNode
}

export type FieldSwitchType = FieldBaseType & {
  defaultValue: boolean
  type: 'switch'
  postContent?: ReactNode
}

export type FieldMediaType = FieldBaseType & {
  defaultValue: null | string
  type: 'media'
  mediaType?: string
  postContent?: ReactNode
  disabled?: () => boolean
}

export type FieldDateType = FieldBaseType & {
  defaultValue: null | string
  format?: string
  type: 'date'
  disabled?: () => boolean
}

export type FieldHtmlEditorType = FieldBaseType & {
  defaultValue: null | string
  type: 'html-editor'
}

export type FieldColorType = FieldBaseType & {
  defaultValue: null | string
  type: 'color'
}

export type FieldTitleType = Omit<FieldBaseType, 'defaultValue' | 'label'> & {
  type: 'title'
  title: string
  defaultValue?: ''
  label?: ''
}

export type FieldType = FieldInputType
  | FieldSelectType
  | FieldSwitchType
  | FieldMediaType
  | FieldDateType
  | FieldColorType
  | FieldHtmlEditorType
  | FieldTitleType

export type FieldSidedType = {
  left: FieldType[]
  right: FieldType[]
}

export type FieldsType = FieldType[] | FieldSidedType

export type DataFieldType = DistributiveOmit<FieldType, 'setValue' | 'slug'>

export type EditorParserObjectType = Record<string, DataFieldType
  | ((data: DataType) => DataFieldType)>

export type UseEditorMediaType = Record<string, MediaType>

export type ParseSaveDataProps = {
  itemId: number | null
  initData: DataType | null
  data: DataType
  media: UseEditorMediaType | null
}

export type UseEditorProps = {
  apiActions?: {
    getOne?: GetOneType
    saveOne?: SaveOneType
  }
  parseLoadedData?: (loadedData: DataType, dataToSet: DataType) => void
  parserObject?: EditorParserObjectType
  title?: {
    slug?: string
    label: string
  }
  editorPagePrefix?: string
  parseSaveData?: (parseSaveDataProps: ParseSaveDataProps) => (SaveOneProps | Promise<SaveOneProps>)
  postLoad?: (loadedData: DataType) => (void | Promise<void>)
  loadTableData?: () => void
  onSaveOne?: ({
    saveId, saveData, saveInitData, saveMedia, saveLoading, saveSetLoading, saveNeedsSave, saveLoadData,
  }: {
    saveId: number | null,
    saveData: DataType,
    saveInitData: DataType | null,
    saveMedia: UseEditorMediaType | null,
    saveLoading: boolean,
    saveSetLoading: Dispatch<SetStateAction<boolean>>,
    saveNeedsSave: boolean,
    saveLoadData: () => Promise<void>,
  }) => Promise<void>
}

export type UseEditorReturnType = {
  itemId: number | null
  loading: boolean
  pageTitle: string
  data: DataType
  setData: (data: DataType) => void
  setInitData: (data: DataType) => void
  initData: DataType | null
  fields: FieldsType
  media: UseEditorMediaType | null
  setMedia: (media: UseEditorMediaType) => void
  needsSave: boolean
  onSave: () => Promise<void>
  setLoading: (loading: boolean) => void
}

export type FieldifyType = {
  parserObject: EditorParserObjectType
  data: DataType
  setData: (data: DataType) => void
}
