export interface PostLoginResponse {
  status: boolean
  message: string
  data: DataPostLogin
}

export interface DataPostLogin {
  id: number
  username: string
  email: string
  password: string
  role: number
  id_user: number
}
