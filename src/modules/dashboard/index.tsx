import { BarChartUsers } from "./bar-chart"



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

const DashboardModules = () => {
  const chartData = [
    { month: "January", count: 186 },
    { month: "February", count: 305 },
    { month: "March", count: 237 },
    { month: "April", count: 73 },
    { month: "May", count: 209 },
    { month: "June", count: 214 },
  ]

  return (

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
        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-2">
          <BarChartUsers
            title="Total Users"
            description="Total users in the last 6 months"
            items={chartData}
            footer={{
              title: "Increased by 20%",
              description: "Compared to the previous period",
            }}
          />
          <BarChartUsers
            title="Total Users"
            description="Total users in the last 6 months"
            items={chartData}
            footer={{
              title: "Increased by 20%",
              description: "Compared to the previous period",
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default DashboardModules