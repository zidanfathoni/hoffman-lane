import { ArrowDownRight } from "lucide-react";
import Link from 'next/link';
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";

const HeroSection = () => {
  return (
    <section id="home" key={'home'} className="pt-32 pb-10">
      <div className="rounded-b-[20px] shadow-lg pb-32">
        <div className="container">
          <div className="grid items-center gap-4 lg:grid-cols-[1fr_2fr]">
            <div className="flex items-center">
              <img
                src="/images/hero-images.svg"
                alt="placeholder hero"
                className="max-h-96 object-cover items-center mx-auto"
              />
            </div>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="grid items-center gap-4 lg:grid-cols-[1fr_2fr]">
                <div>
                  <h1 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
                    Savor Special Moments in Every Bite!
                  </h1>
                </div>
              </div>
              <p className="mb-8 text-muted-foreground lg:text-xl">
                Visit us today and discover an unforgettable experience.<br />
                Because life’s too short to delay happiness, especially the one on your plate!
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                 <Link href="/menu" passHref>
                    <Button className="w-full sm:w-auto rounded-2xl px-10">Our Menu</Button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default HeroSection;
