export interface GetCategoryResponse {
  status: boolean
  message: string
  active: number
  data: DataCategory[]
}

export interface DataCategory {
  id: number
  name: string
  description: string
}
