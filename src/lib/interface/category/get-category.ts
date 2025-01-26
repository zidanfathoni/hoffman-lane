export interface GetCategoryResponse {
  status: boolean
  message: string
  data: DataCategory[]
}

export interface DataCategory {
  id: number
  name: string
  description: string
}
