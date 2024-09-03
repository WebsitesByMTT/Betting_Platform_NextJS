"use client";
import React, { useEffect, useState } from "react";
import {useAppSelector } from "@/lib/store/hooks";
import { svgMap } from "./svg/SvgMap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SportItem } from "@/utils/types";
const Categories = () => {
  const [category, setCategory] = useState<SportItem[]>();
  const sportsCategories = useAppSelector(
    (state: any) => state?.sports?.categories
  );
  const pathname = usePathname()
  const url = decodeURIComponent(pathname)

  function extractBetweenSlashes(url: string): string | null {
    const parts = url.split('/');
    if (parts.length < 2) return null;
    return parts[1];
  }
  const matchurl = extractBetweenSlashes(url);

  useEffect(() => {
    setCategory(sportsCategories);
  }, [sportsCategories]);

  return (
    <div className="hidden md:block md:bg-gradient-to-tr p-[1px] rounded-2xl overflow-x-hidden from-[#D6A250] via-[#FFE500] to-[#ECB800] w-full">
      <div className="rounded-2xl md:bg-gradient-to-b from-[#1c1a21] to-[#0d0c15] py-2 lg:py-6">
        <div className="flex !overflow-x-scroll hideScrollBar overflow-y-hidden justify-evenly w-[90%] lg:w-[70%] mx-auto gap-5 ">
          {category?.map((item, ind) => {
            const IconComponent = svgMap[item?.group.toLowerCase()];
            return (
              <div
                key={ind}
                className={`hover:bg-gradient-to-tr cursor-pointer flex-none mx-auto group from-[#D6A250] via-[#FFE500] to-[#ECB800] h-[35px] w-[35px] md:w-[45px] md:h-[45px] p-[1px] rounded-md md:rounded-xl transition-all ${
                  matchurl === item.group ? "bg-gradient-to-tr" : ""
                }`}
              >
                <Link
                  href={`/${item?.group}/${item?.items[0]?.key}`}
                  className="bg-[#343434] hover:bg-[#292929] relative h-full w-full flex items-center justify-center rounded-md md:rounded-xl  shadow-inner shadow-[#232323] transition-all duration-500"
                >
                  <div>{IconComponent}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
