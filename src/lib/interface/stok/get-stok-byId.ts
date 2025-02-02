export interface GetStokByIdResponse {
  status: boolean
  message: string
  data: DataStokById
}

export interface DataStokById {
  id: number
  name: string
  price: number
  stok: number
}
