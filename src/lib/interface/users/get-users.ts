export interface GetUserResponse {
  status: boolean
  message: string
  activeId: number
  data: DataUsers[]
}

export interface DataUsers {
  id: number
  username: string
  email: string
  password: string
  role: number
}
