export interface GetMenuResponse {
  status: boolean
  message: string
  active: number | 0
  data: DataMenu[]
}

export interface DataMenu {
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
