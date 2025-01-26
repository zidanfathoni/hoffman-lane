
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"
import { Link } from "lucide-react"
import TableTransaction from "./table"


const TransactionPage = () => {
  return (
    <ContentLayout title="Transactions">

      <div className="container">

        <TableTransaction />
      </div>
    </ContentLayout>
  )
}

export default TransactionPage