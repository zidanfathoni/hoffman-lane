
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"
import TableStok from "@/modules/dashboard/stok"
import { Link } from "lucide-react"


const DashboardStokPage = () => {
  return (
    <ContentLayout title="Stok">

      <div className="container">

        <TableStok />
      </div>
    </ContentLayout>
  )
}

export default DashboardStokPage