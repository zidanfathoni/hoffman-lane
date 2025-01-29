
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"
import TableReservation from "@/modules/dashboard/reservation"
import { Link } from "lucide-react"


const DashboardReservationPage = () => {
  return (
    <ContentLayout title="Reservation">

      <div className="container">

        <TableReservation />
      </div>
    </ContentLayout>
  )
}

export default DashboardReservationPage