
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"
import { Link } from "lucide-react"


const data = [
  {
    name: "Total Transaction",
    value: "Rp5.000.000"
  },
  {
    name: "Total Transaction",
    value: "Rp5.000.000"
  },
  {
    name: "Total Transaction",
    value: "Rp5.000.000"
  },
  {
    name: "Total Transaction",
    value: "Rp5.000.000"
  },
]

const DashboardPage = () => {
  return (
    <ContentLayout title="Dashboard">

      <section>
        <div className="container">

          <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {
              data.map((item, index) => (
                <div
                  key={index} /* Pindahkan key ke div luar */
                  className="border border-primary rounded-3xl p-5 shadow-lg overflow-hidden"
                >
                  <div className="flex flex-col gap-5">
                    <p className="truncate">{item.name}</p> {/* Gunakan truncate jika teks panjang */}
                    <div className="text-2xl font-bold break-words">
                      {item.value} {/* Tambahkan break-words agar teks panjang terputus */}
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </section>
    </ContentLayout>
  )
}

export default DashboardPage