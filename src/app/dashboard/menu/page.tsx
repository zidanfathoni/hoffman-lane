
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"
import TableMenu from "@/modules/dashboard/menu"
import { Link } from "lucide-react"


const DashboardMenuPage = () => {
  return (
    <ContentLayout title="Menu">

      <div className="container">

        <TableMenu />
      </div>
    </ContentLayout>
  )
}

export default DashboardMenuPage