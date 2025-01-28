import { ArrowDownRight } from "lucide-react";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import Header from "@/components/atoms/headers";
import MenuModules from "../menu";

const MenuSection = () => {
  return (
    <section id="menu" key={'menu'} className="pt-14 pb-14 rounded-b-[20px] shadow-lg bg-white">
      <div className="container">
        <Header
          title="Hoffmann Nourishment"
          description="Start your day with a warm cup of coffee and delicious food at Hoffmann Lane!"
        />
        <MenuModules />
      </div>
    </section>

  );
};

export default MenuSection;
