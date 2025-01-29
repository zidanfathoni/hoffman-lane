export interface GetStokResponse {
  status: boolean
  message: string
  active: number
  data: DataStok[]
}

export interface DataStok {
  id: number
  name: string
  price: number
  stok: number
}
