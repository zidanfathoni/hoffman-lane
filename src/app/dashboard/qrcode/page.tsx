
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"
import TableQrCode from "@/modules/dashboard/qrcode"
import { Link } from "lucide-react"


const DashboardQrCodePage = () => {
  return (
    <ContentLayout title="Qr Code">

      <div className="container">

        <TableQrCode />
      </div>
    </ContentLayout>
  )
}

export default DashboardQrCodePage