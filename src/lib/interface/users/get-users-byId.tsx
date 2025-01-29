export interface GetUserByIdResponse {
  status: boolean
  message: string
  data: DataUsersById
}

export interface DataUsersById {
  id: number
  username: string
  email: string
  password: string
  role: number
}

export interface OpenDataUsersById {
  isOpen: boolean
}