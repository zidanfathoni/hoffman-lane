export interface GetChartResponse {
  status: boolean
  message: string
  data: DataChart[]
}

export interface DataChart {
  month: string
  total_orders: number
  total_amount: any
}
