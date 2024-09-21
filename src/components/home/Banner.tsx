"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useAppSelector } from "@/lib/store/hooks";
import { getCategoryBanners } from "@/utils/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Banner: React.FC = () => {
  const router=useRouter()
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [banners, setBanners] = useState<any[]>([]);
  const currentCategory = useAppSelector(
    (state) => state.sports.selectedCategory
  );

  useEffect(() => {
    const fetchBanner = async (currentCategory: string) => {
      const data = await getCategoryBanners(currentCategory);
      if (data?.error) {
         router.push('/logout')
      } else {
        setBanners(data.banners);        
      }
    };
    fetchBanner(currentCategory);
  }, [currentCategory]);

  return (
    <>
      <div className="">
        <Carousel plugins={[plugin.current]}>
          <CarouselContent>
            {banners.length > 0 &&
              banners?.map((item, index) => (
                <CarouselItem className="basis-[100%]" key={index}>
                  <div className="relative min-h-[150px] h-[23vw]">
                    <Image
                      src={item.url}
                      fill
                      quality={100}
                      className="w-full rounded-[2vw]"
                      alt={item.title}
                      priority
                    />
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
