export interface GetQrCodeResponse {
  status: boolean
  message: string
  data: DataQrCode
}

export interface DataQrCode {
  id: number
  table: string
  imageQr: string
}
