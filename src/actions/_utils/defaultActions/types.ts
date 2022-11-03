export type DefaultActionsProps = {
  pageSlug?: string
  limitSlug?: string

  requestUrl: string
  requestUrlPostText?: string
  useRemoveIdAsParam?: true
  useGetAllIdAsQuery?: true
  getAllDefaultQuery?: QueryType
}

export type GetAllProps = {
  query?: QueryType
  id?: number
}

export type GetOneProps = {
  id: number | string
}

export type SaveOneProps = {
  id: string | number | null
  data: DataType | FormData
  media?: Record<string, MediaType> | null
  query?: QueryType | null
  isUpdate?: boolean
}

export type RemoveByIdsProps = {
  ids: number[]
}

export type GeneralRequestReturnType = Promise<any>

export type GetAllType = ({
  query, id,
}: GetAllProps) => GeneralRequestReturnType
export type GetOneType = ({ id }: GetOneProps) => GeneralRequestReturnType
export type SaveOneType = ({
  id, data, media, isUpdate,
}: SaveOneProps) => GeneralRequestReturnType
export type RemoveByIdsType = ({ ids }: RemoveByIdsProps) => GeneralRequestReturnType

export type DefaultActionsReturnType = {
  getAll: GetAllType
  getOne: GetOneType
  saveOne: SaveOneType
  removeByIds: RemoveByIdsType
}
