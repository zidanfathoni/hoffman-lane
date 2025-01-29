export interface GetOrdersResponse {
  status: boolean
  message: string
  active: number
  data: DataOrder[]
}

export interface DataOrder {
  id: number
  order_status: string
  order_time: string
  qty: number
  gross_amount: number
  table: number
}
