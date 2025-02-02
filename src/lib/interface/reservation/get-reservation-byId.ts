export interface GetReservationByIdResponse {
  status: boolean
  message: string
  data: DataReservationById
}

export interface DataReservationById {
  id: number
  name: string
  date: string
  time: string
  phone: number
  manyPeople: string
<<<<<<< HEAD
=======
  room: string
>>>>>>> 83461a0 (update fix)
}
