import { ArrowDownRight } from "lucide-react";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import Header from "@/components/atoms/headers";
import MenuRecommendationModules from "../recommendation";

const MenuRecommendationSection = () => {
  return (
    <section id="recommendation" key={'recommendation'} className="pt-10 pb-24 rounded-b-[20px] shadow-lg bg-white">
      <div className="container">
        <Header
          title="Hoffmann Recomendation"
          description="See our best seller menu and recomendation for you!"
        />
        <MenuRecommendationModules />
      </div>
    </section>

  );
};

export default MenuRecommendationSection;
