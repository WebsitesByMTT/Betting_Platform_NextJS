"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { setLoading } from "@/lib/store/features/sports/sportsSlice";
import World from "./svg/World";
import { svgMap } from "./svg/SvgMap";
import Link from "next/link";

const EventsMenu = ({ cat }: any) => {
  const category = cat?.cat && decodeURIComponent(cat.cat);
  const [events, setEvents] = useState<{ title: string; key: string }[]>([]);
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(
    (state) => state.sports.selectedCategory
  );
  const sportsCategories = useAppSelector((state) => state.sports.categories);

  useEffect(() => {
    if (socket) {
      dispatch(setLoading(true));
      socket.emit("data", {
        action: "ODDS",
        payload: { sport: cat.subcat || "", regions: "us", markets: "h2h" },
      });
    }
  }, [socket, cat.subcat]);

  const IconComponent = svgMap[currentCategory.toLowerCase()] || null;

  useEffect(() => {
    if (category && sportsCategories) {
      setEvents(
        sportsCategories.find((item) => item.category === category)?.events || []
      );
    }
  }, [category, sportsCategories]);

  return (
    <div className="w-full flex gap-5 flex-col md:px-4">
      {category && (
        <div className="border-[1px] border-[#2e3134] px-1 space-x-1 md:space-x-0 md:px-3 md:py-1 bg-gradient-to-b from-[#2E2D30] to-[#0C0B14] rounded-full w-fit flex items-center gap-2">
          <div className="relative h-auto w-[30px] md:w-[40px] p-2">
            {IconComponent}
          </div>
          <p className="text-white text-sm md:text-lg font-light pr-2 uppercase">
            {category}
          </p>
        </div>
      )}
      <div className="flex gap-4 overflow-x-scroll hideScrollBa">
        {events?.map((item, index) => (
          <Link
            href={`/${cat.cat}/${item.key}`}
            className="text-white flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#ffffff0f] to-[#4e4e4e2f] border-t-[#D6A250] border-x-[#D6A250] border-x-[1px] border-t-[1px]"
            key={index}
          >
            {cat.subcat === item.key && (
              <div className="h-full px-1 rounded-tl-lg rounded-bl-lg bg-gradient-to-b from-[#ECB800] to-[#58565D00]"></div>
            )}
            <div className="flex items-center">
              <World />
              <p
                className={`text-[12px] md:text-sm font-light whitespace-nowrap py-1 ${
                  cat.subcat === item.key ? "pr-3" : "px-2"
                }`}
              >
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default EventsMenu;
