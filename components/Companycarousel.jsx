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
          delay: 2000,
        }),
      ]}
      className="w-full py-10"
    >
      <CarouselContent className="flex gap-5 sm:gap-20 items-center">
        {companies.map(({ name, img, id }) => {
          return (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <Image
                src={img}
                alt={name}
                width={200}
                height={56}
                className="h-9 sm:h-14 w-auto object-contain"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default Companycarousel;
