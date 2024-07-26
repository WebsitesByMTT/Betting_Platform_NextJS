"use client"
import Image from 'next/image';
import React, {useRef } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Banner: React.FC = () => {
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    const images = ['/assets/image/crousal1.png', '/assets/image/crousal2.png', '/assets/image/crousal3.png', '/assets/image/crousal4.png'];

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className='h-auto basis-[100%]'>
                {images.map((item, index) => (
                    <CarouselItem key={index}>
                        <Image src={item} width={1000} height={500} quality={100} className='w-screen' alt='banner' layout='responsive' />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default Banner;