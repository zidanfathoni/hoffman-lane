
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"
import TableCategory from "@/modules/dashboard/category"
import { Link } from "lucide-react"


const DashboardCategoryPage = () => {
  return (
    <ContentLayout title="Category">

      <div className="container">

        <TableCategory />
      </div>
    </ContentLayout>
  )
}

export default DashboardCategoryPage