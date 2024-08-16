"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setEvents,
  setSelectedCategory,
} from "@/lib/store/features/sports/sportsSlice";
import { useSocket } from "./SocketProvider";

const Categories = () => {
  const [category, setCategory] = useState<string[]>();
  const { socket } = useSocket();
  const sportsCategories = useAppSelector(
    (state: any) => state?.sports?.categories
  );
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(
    (state: any) => state?.sports?.selectedCategory
  );

  useEffect(() => {
    setCategory(sportsCategories);
  }, [sportsCategories]);

  const fetchEvents = (category: string) => {
    dispatch(setSelectedCategory(category));
    if (socket) {
      socket.emit("data", {
        action: "CATEGORY_SPORTS",
        payload: category,
      });
    } else {
      console.warn("Socket is not connected");
    }
  };

  return (
    <div className="md:bg-gradient-to-tr p-[1px] rounded-2xl overflow-x-hidden from-[#D6A250] via-[#FFE500] to-[#ECB800] w-full">
      <div className="rounded-2xl md:bg-gradient-to-b from-[#1c1a21] to-[#0d0c15] py-2 lg:py-6">
        <div className="flex !overflow-x-scroll overflow-y-hidden justify-evenly w-[90%] lg:w-[70%] mx-auto gap-5 ">
          {category?.map((item, ind) => (
            <div
              key={ind}
              className={`hover:bg-gradient-to-tr cursor-pointer flex-none mx-auto group from-[#D6A250] via-[#FFE500] to-[#ECB800] h-[35px] w-[35px] md:w-[45px] md:h-[45px] p-[1px] rounded-md md:rounded-xl transition-all ${
                currentCategory === item ? "bg-gradient-to-tr" : ""
              }`}
            >
              <button
                className="bg-[#343434] hover:bg-[#292929] relative lg:p-[1rem] lg:py-[1.2rem] h-full w-full  rounded-md md:rounded-xl  shadow-inner shadow-[#232323] transition-all duration-500"
                onClick={() => {
                  fetchEvents(item);
                }}
              >
                <Image
                  src={`/assets/image/sidebar/${item
                    .toLowerCase()
                    .replace(/\s+/g, "-")}.svg`}
                  alt="categories"
                  className="md:p-2 p-1"
                  fill
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
