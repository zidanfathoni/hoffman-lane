export interface GetSummaryResponse {
  status: boolean
  message: string
  data: DataSummary
}

export interface DataSummary {
  transaction: Transaction
  stok: Stok
  menu: Menu
  reservation: Reservation
}

export interface Transaction {
  name: string
  total: string
}

export interface Stok {
  name: string
  total: number
}

export interface Menu {
  name: string
  total: number
}

export interface Reservation {
  name: string
  total: number
}
