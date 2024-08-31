"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import {
  setLoading,
  setSelectedEvent,
} from "@/lib/store/features/sports/sportsSlice";
import { Event } from "@/utils/types";
import World from "./svg/World";
import { svgMap } from "./svg/SvgMap";

const EventsMenu = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { socket } = useSocket();
  const currentCategory = useAppSelector(
    (state) => state?.sports?.selectedCategory
  );
  const IconComponent = svgMap[currentCategory.toLowerCase()];
  const currentEvent = useAppSelector((state) => state?.sports?.selectedEvent);
  const sportsEvents: any = useAppSelector((state) => state?.sports?.events);
  const dispatch = useAppDispatch();

  const fetchLeagues = (event: string, title: string) => {
    dispatch(setSelectedEvent(title));
    if (socket) {
      dispatch(setLoading(true));
      socket.emit("data", {
        action: "ODDS",
        payload: { sport: event, regions: "us", markets: "h2h" },
      });
    } else {
      console.warn("Socket not connected!");
    }
  };

  useEffect(() => {
    setEvents(sportsEvents);
    dispatch(setSelectedEvent(sportsEvents[0]?.title));
    fetchLeagues(sportsEvents[0]?.key, sportsEvents[0]?.title);
  }, [sportsEvents]);

  return (
    <div className="w-full flex gap-5 flex-col md:px-4">
      {currentCategory && (
        <div className="border-[1px] border-[#2e3134] px-1 space-x-1 md:space-x-0 md:px-3 md:py-1 bg-gradient-to-b from-[#2E2D30] to-[#0C0B14] rounded-full w-fit flex items-center gap-2">
          <div className="relative h-auto w-[30px] md:w-[40px] p-2">
            {IconComponent}
          </div>
          <p className="text-white text-sm md:text-lg font-light pr-2 uppercase">
            {currentCategory}
          </p>
        </div>
      )}
      <div className="flex gap-4 overflow-x-scroll hideScrollBar">
        {events?.map((item, index) => (
          <button
            className="text-white flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#ffffff0f] to-[#4e4e4e2f] border-t-[#D6A250] border-x-[#D6A250] border-x-[1px] border-t-[1px]"
            key={index}
            onClick={() => {
              fetchLeagues(item.key, item.title);
            }}
          >
            {currentEvent === item.title && (
              <div className="h-full px-1 rounded-tl-lg rounded-bl-lg bg-gradient-to-b from-[#ECB800] to-[#58565D00]"></div>
            )}
            <div className="flex items-center">
              <World />
              <p
                className={`text-[12px] md:text-sm font-light whitespace-nowrap py-1 ${
                  currentEvent === item.title ? "pr-3" : "px-2"
                }`}
              >
                {item.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventsMenu;
