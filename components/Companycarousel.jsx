"use client";

import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import companies from "@/data/companies";
import Image from "next/image";

const Companycarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2200,
          stopOnInteraction: false,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full py-6"
    >
      <CarouselContent className="flex gap-8 sm:gap-16 items-center">
        {companies.map(({ name, img, id }) => {
          return (
            <CarouselItem key={id} className="basis-1/3 sm:basis-1/4 lg:basis-1/6 flex justify-center">
              <div className="h-10 sm:h-12 w-32 relative flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={img}
                  alt={name}
                  width={140}
                  height={44}
                  className="max-h-8 sm:max-h-10 w-auto object-contain brightness-125"
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default Companycarousel;
