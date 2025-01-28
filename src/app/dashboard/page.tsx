
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"
import DashboardModules from "@/modules/dashboard"
import { Link } from "lucide-react"


const data = [
  {
    name: "Total Transaction",
    value: "Rp5.000.000"
  },
  {
    name: "Total Users",
    value: "200"
  },
  {
    name: "Total Menu",
    value: "14"
  },
  {
    name: "Total Reservation",
    value: "3"
  },
]

const DashboardPage = () => {
  return (
    <ContentLayout title="Dashboard">
      <DashboardModules />
    </ContentLayout>
  )
}

export default DashboardPage