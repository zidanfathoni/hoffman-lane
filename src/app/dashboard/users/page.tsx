
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"
import { Link } from "lucide-react"
import TableUsers from "../../../modules/users"


const UsersPage = () => {
  return (
    <ContentLayout title="Users">

      <div className="container">

        <TableUsers />
      </div>
    </ContentLayout>
  )
}

export default UsersPage