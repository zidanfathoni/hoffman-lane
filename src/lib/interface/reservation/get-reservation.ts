export interface GetReservationResponse {
  status: boolean
  message: string
  data: DataReservation[]
}

export interface DataReservation {
  id: number
  name: string
  date: string
  time: string
  phone: number
  manyPeople: string
}
