export interface GetMenuByIdResponse {
  status: boolean
  message: string
  active: number | 0
  data: DataMenuById
}

export interface DataMenuById {
  id: number
  name: string
  description: string
  price: number
  upload_menu: string
  status: boolean
  category: Category
}

export interface Category {
  idKategori: number
  name: string
  description: string
}
