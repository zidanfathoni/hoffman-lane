import { Utensils, Coffee, Home } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 pb-24">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Why Choose Us?</h2>
        <p className="text-muted-foreground mb-12">Where Every Visit Feels Special</p>

        <div className="grid gap-8 md:grid-cols-3">
          <Feature
            icon={<Utensils className="w-8 h-8" />}
            title="Exquisite Menu"
            description="From savory dishes to sweet indulgences, we serve a range of handcrafted meals prepared with the finest ingredients."
          />
          <Feature
            icon={<Coffee className="w-8 h-8" />}
            title="Specialty Beverages"
            description="Enjoy expertly brewed coffees, refreshing teas, and unique signature drinks."
          />
          <Feature
            icon={<Home className="w-8 h-8" />}
            title="Relaxing Atmosphere"
            description="Designed for comfort, our space is perfect for work, relaxation, or celebrations."
          />
        </div>
      </div>
    </section>
  )
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-[#C2C1B4] flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm">{description}</p>
    </div>
  )
}

