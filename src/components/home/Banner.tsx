"use client";
import Image from "next/image";
import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Banner: React.FC = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const images = [
    "/assets/image/carousel/crousal1.png",
    "/assets/image/carousel/crousal2.png",
    "/assets/image/carousel/crousal3.png",
    "/assets/image/carousel/crousal4.png",
  ];

  return (
    <div className="pt-5 md:pt-0">
      <Carousel plugins={[plugin.current]}>
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem className="basis-[100%]" key={index}>
              <Image
                src={item}
                width={5000}
                height={5000}
                quality={100}
                className="w-full h-[130px] md:h-[350px] px-[20px]"
                alt="banner"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Banner;
