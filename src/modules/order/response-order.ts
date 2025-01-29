export interface ResponseOrder {
  status: boolean
  message: string
  data: DataResponseOrder
}

export interface DataResponseOrder {
  order: Order
  snapToken: string
}

export interface Order {
  id_order: number
  gross_amount: string
  order_status: string
  qty: number
  table: number
  items: Item[]
}

export interface Item {
  id_menu: number
  qty: number
  total: number
}
