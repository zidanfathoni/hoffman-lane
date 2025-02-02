import ContactSection from "./contactSection";
import FeaturesSection from "./featuresSection";
import HeroSection from "./heroSection"
import MenuSection from "./menuSection";
import MenuRecommendationSection from "./recommendationSection";
import ReservationSection from "./reservationSection";


const HomeModules: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ReservationSection />
      <FeaturesSection />
      <ContactSection />
    </>
  )
}

export default HomeModules;