export interface GetChartResponse {
  status: boolean
  message: string
  data: DataChart[]
}

export interface DataChart {
  month: string
  total_orders: number
<<<<<<< HEAD
  total_amount: any
=======
  total_amount: string
>>>>>>> 83461a0 (update fix)
}
