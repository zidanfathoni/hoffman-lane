export interface GetOrdersByIdResponse {
  status: boolean
  message: string
  data: DataOrderById
}

export interface DataOrderById {
  id: number
  order_status: string
  order_time: string
  qty: number
  gross_amount: number
  table: number
  items: DataOrderByIdItem[]
}

export interface DataOrderByIdItem {
  qty: number
  name: string
  total: number
  id_menu: number
  description: string
}
