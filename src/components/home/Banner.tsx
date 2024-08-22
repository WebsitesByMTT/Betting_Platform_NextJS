"use client";
import Image from "next/image";
import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useAppSelector } from "@/lib/store/hooks";

const Banner: React.FC = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const images = [
    "/assets/image/carousel/crousal1.png",
    "/assets/image/carousel/crousal2.png",
    "/assets/image/carousel/crousal3.png",
    "/assets/image/carousel/crousal4.png",
  ];
  const currentCategory = useAppSelector(
    (state) => state.sports.selectedCategory
  );

  return (
    <>
      {currentCategory === "All" && (
        <div className="py-5 md:pt-0">
          <Carousel plugins={[plugin.current]}>
            <CarouselContent>
              {images.map((item, index) => (
                <CarouselItem className="basis-[100%]" key={index}>
                  <div className="relative h-[23vw] aspect-auto">
                    <Image
                      src={item}
                      fill
                      quality={100}
                      className="w-full"
                      alt="banner"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Banner;
