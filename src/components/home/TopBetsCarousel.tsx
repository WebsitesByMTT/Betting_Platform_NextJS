"use client"
import React, { useRef } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';

const TopBetsCarousel: React.FC = () => {

    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <div className='pt-10 pb-5'>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
                plugins={[plugin.current]}
            >
                <CarouselContent className='space-x-5'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="md:w-[25px] basis-[90%] md:basis-[49%] lg:basis-[32.5%]">
                            <div className="xl:flex justify-between p-3 bg-[#292D2E] rounded-lg">
                                <div>
                                    <div className='p-4 flex w-[60px] mx-auto xl:flex-none xl:w-auto relative rounded-2xl bg-[#343434]'>
                                        <Image src={'/assets/image/categoryicon12.png'} alt='Image' width={500} height={500} quality={100} className='w-[30px]' />
                                        <span className='inline-block h-[7px] w-[7px] bg-red-600 rounded-full absolute top-3 left-2'></span>
                                    </div>
                                    <div className='text-white text-center text-[.9rem] pt-1.5'>Live</div>
                                </div>
                                <div>
                                    <div className='text-white text-[1.2rem]'>Wilson Kenter</div>
                                    <div className='text-white text-[1rem] text-opacity-60'>To Win Match</div>
                                    <div className='text-white text-[1rem]  text-opacity-60'>Wilson Kenter Vs Allison Vetrovs</div>
                                    <span className='w-full inline-block -translate-y-2.5 rounded-3xl h-[1px] bg-gradient-to-tr from-[#D6A250] via-[#FFE500] to-[#ECB800]'></span>
                                    <div className='flex items-center space-x-3'>
                                        <Image src={'/assets/image/topbets.svg'} alt='Image' width={500} height={500} quality={100} className='w-[25px]' />
                                        <div className='text-white text-[.9rem]'>#1</div>
                                        <div className='font-normal text-[.9rem] text-yellow-400'>most popular in Betfeed</div>
                                    </div>
                                </div>
                                <div>
                                  <div className='bg-[#343434] text-[1rem] xl:text-start text-center mt-2 xl:mt-0 p-4 rounded-2xl text-white'>3.567</div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default TopBetsCarousel;