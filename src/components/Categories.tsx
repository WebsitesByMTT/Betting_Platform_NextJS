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

  useEffect(() => {
    const handleData = (data: any) => {
      switch (data.type) {
        case "CATEGORY_SPORTS":
          dispatch(setEvents(data.data));
          break;
        default:
          break;
      }
    };

    if (socket) {
      socket.on("data", handleData);
    }

    return () => {
      if (socket) {
        socket.off("data", handleData);
      }
    };
  }, [socket, dispatch]);

  return (
      <div className="md:bg-gradient-to-tr p-[1px] rounded-2xl overflow-x-hidden from-[#D6A250] via-[#FFE500] to-[#ECB800]">
        <div className="rounded-2xl bg-gradient-to-b from-[#1c1a21] to-[#0d0c15] px-2 py-8">
          <div className="flex !overflow-x-scroll justify-evenly w-[65vw] mx-auto gap-5">
            {category?.map((item, ind) => (
              <div key={ind} className="cursor-pointer">
                <div
                  className={`hover:bg-gradient-to-tr mx-auto group  from-[#D6A250] via-[#FFE500] to-[#ECB800] w-[45px] md:w-[50px] p-[1px] rounded-xl h-[45px] md-h-[50px] transition-all ${
                    currentCategory === item ? "bg-gradient-to-tr" : ""
                  }`}
                >
                  <button
                    className="bg-[#343434] relative p-[.8rem] h-full w-full rounded-xl  shadow-inner shadow-[#232323]"
                    onClick={() => {
                      fetchEvents(item);
                    }}
                  >
                    <Image
                      src={`/assets/image/sidebar/${item
                        .toLowerCase()
                        .replace(/\s+/g, "-")}.svg`}
                      alt="categories"
                      className="p-2"
                      fill
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Categories;
