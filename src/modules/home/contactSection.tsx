import { ArrowDownRight } from "lucide-react";

import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import Header from "@/components/atoms/headers";
import { FaClock, FaLocationDot, FaPhone } from "react-icons/fa6";

const ContactSection = () => {
  return (
    <section id="contact" key={'contact'} className="pb-32 rounded-b-[20px] shadow-lg bg-white">
      <div className="container">
        <Header
          title="Get in Touch"
          description="Let's connect with Hoffmann Lane!"
        />
        {/* <MenuModules /> */}
        <div className="grid items-center gap-4 lg:grid-cols-[1fr_2fr]">
          <div className="items-center">
            <img
              src="/images/logo.svg"
              alt="placeholder hero"
              className="w-full object-cover items-center mx-auto"
            />
            <h3 className="text-pretty text-lg font-bold lg:text-xl text-center">
              “Human Habitat”
            </h3>
            <h4 className="text-pretty text-base lg:text-lg text-center">
              at Karel Satsuitubun
            </h4>
          </div>
          <div className="container justify-center items-center text-center lg:items-start lg:text-left">
            <div>
              <h4 className="my-6 text-pretty text-lg font-bold lg:text-xl text-justify">
                Looking to enjoy the meal in town, or have a question about our menu? We’d love to hear from you! Our team is ready to provide information, take reservations, or even listen to any suggestions you may have.
              </h4>
            </div>
            <div className="flex items-center space-x-6 py-5">
              <div className="text-center">
                <FaLocationDot className="h-10 w-10 text-lg text-primary" />
              </div>
              <h5 className="text-[18px]  font-medium">Jl. KS. Tubun No.27, Rw. Laut, Kec. Tanjungkarang Timur, Kota Bandar Lampung, Lampung 35128</h5>
            </div>
            <div className="flex items-center space-x-6 py-5">
              <div className="text-center">
                <FaClock className="h-10 w-10 text-lg text-primary" />
              </div>
              <h5 className="text-[18px]  font-medium">10 AM - 10 PM</h5>
            </div>
            <div className="flex items-center space-x-6 py-5">
              <div className="text-center">
                <FaPhone className="h-10 w-10 text-lg text-primary" />
              </div>

              <a
                href="tel:+6281229743400"
              >
                <h5 className="text-[18px]  font-medium">0812-2974-3400</h5>
              </a>
            </div>


          </div>
        </div>
      </div>
    </section>

  );
};

export default ContactSection;
