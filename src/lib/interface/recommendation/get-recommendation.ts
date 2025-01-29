export interface GetMenuRecommendationResponse {
  status: boolean
  message: string
  active: number | null
  data: DataMenuRecommendation[]
}

export interface DataMenuRecommendation {
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
