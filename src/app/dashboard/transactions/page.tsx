
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"
import TableOrder from "@/modules/dashboard/transaction"
import { Link } from "lucide-react"


const TransactionPage = () => {
  return (
    <ContentLayout title="Transactions">

      <div className="container">

        <TableOrder />
      </div>
    </ContentLayout>
  )
}

export default TransactionPage