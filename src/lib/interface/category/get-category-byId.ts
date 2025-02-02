export interface GetCategoryByIdResponse {
  status: boolean
  message: string
  data: DataCategoryById
}

export interface DataCategoryById {
  id: number
  name: string
  description: string
}
