"use client"
import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "./SocketProvider";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setLoading } from "@/lib/store/features/sports/sportsSlice";
import { svgMap } from "./svg/SvgMap";
import World from "./svg/World";
import Link from "next/link";
import NextPrev from "./svg/NextPrev";

const EventsMenu = ({ cat }: any) => {
  const category = cat?.cat && decodeURIComponent(cat.cat);
  const [events, setEvents] = useState<{ title: string; key: string }[]>([]);
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.notification.isNotiFication);
  const currentCategory = useAppSelector(
    (state) => state.sports.selectedCategory
  );
  const sportsCategories = useAppSelector((state) => state.sports.categories);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      let allEvents = [...(sportsCategories.find((item) => item.category === category)?.events || [])];
  
      if (category === 'All') {
        const nflIndex = allEvents.findIndex((event) => event.title === 'NFL');
        if (nflIndex !== -1) {
          const [nflEvent] = allEvents.splice(nflIndex, 1);
          setEvents([nflEvent, ...allEvents]);
        } else {
          setEvents(allEvents);
        }
      } else {
        setEvents(allEvents);
      }
    }
  }, [category, sportsCategories]);
  
  useEffect(() => {
    if (scrollRef.current && cat.subcat) {
      const activeIndex = events.findIndex((item) => item.key === cat?.subcat);
      if (activeIndex !== -1) {
        const activeElement = scrollRef.current.children[activeIndex] as HTMLElement;
        const offset = activeElement.offsetLeft - scrollRef.current.clientWidth / 2 + activeElement.clientWidth / 2;
        scrollRef.current.scrollTo({ left: offset, behavior: "smooth" });
      }
    }
  }, [cat.subcat, events]);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

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
      <div className={`flex ${notification?'lg:w-[calc(100vw-770px)]':'lg:w-[calc(100vw-380px)]'}  items-center`}>
        <button onClick={scrollPrev} className="text-white hover:bg-opacity-70  bg-gray-800 rounded-full mr-2"><NextPrev /></button>
        <div className="flex gap-4  overflow-x-scroll hideScrollBar" ref={scrollRef}>
          {events?.map((item, index) => (
            <Link
              href={`/${cat.cat}/${item.key}`}
              className="text-white flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#ffffff0f] to-[#4e4e4e2f]  "
              key={index}
            >
              <div className={`flex ${cat.subcat === item.key ? 'bg-gradient-to-b from-[#D71B21] to-[#780005]' : ''} py-1.5 rounded-lg items-center`}>
                <World />
                <p
                  className={`text-[12px] md:text-sm font-light px-2 whitespace-nowrap ${cat.subcat === item.key ? "" : ""
                    }`}
                >
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <button
          onClick={scrollNext}
          className="text-white rotate-180 hover:bg-opacity-70 bg-gray-800 rounded-full ml-2"
        >
          <NextPrev />
        </button>
      </div>
    </div>
  );
};

export default EventsMenu;

