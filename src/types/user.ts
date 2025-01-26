export type TuserData = {
  username: string;
  access_token: string;
};

export interface Root {
  status: boolean
  message: string
  data: Data
}

export interface Data {
  id: number
  username: string
  email: string
  password: string
  role: number
  id_user: number
}
