"use client";
import { add } from "@/lib/store/features/bet/betSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Leagues } from "@/utils/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LiveGame from "./svg/LiveGame";
import UpcomingGame from "./svg/UpcomingGame";
import BetCard from "./BetCard";

const BetContainer = () => {
  const [liveEventLeagues, setLiveEventLeagues] = useState<Leagues[]>([]);
  const [upcomingEventLeagues, setUpcomingEventLeagues] = useState<Leagues[]>(
    []
  );
  const leagueData = useAppSelector((state) => state?.sports?.leagues);

  useEffect(() => {
    setLiveEventLeagues(leagueData?.live_games);
    setUpcomingEventLeagues(leagueData?.upcoming_games);
  }, [leagueData]);

  return (
    <div className="flex flex-col gap-5">
      <div className="cursor-pointer flex space-x-2 items-center bg-[#1E1C22] w-full rounded-md px-4 py-2">
        <div className="flex gap-3 items-center">
          <LiveGame />
          <div className="text-xl md:text-lg text-white font-light">Live</div>
        </div>
      </div>
      <div className="pt-3 grid grid-cols-12 items-start gap-3">
        {liveEventLeagues?.length > 0 ? (
          liveEventLeagues?.map((data, index) => (
            <BetCard key={index} betsData={data} />
          ))
        ) : (
          <p className="w-full text-center col-span-12 text-white my-5">
            Nothing to show here
          </p>
        )}
      </div>
      <div className="cursor-pointer flex space-x-2 items-center bg-[#1E1C22] w-full rounded-md px-4 py-2">
        <div className="flex gap-3 items-center">
          <UpcomingGame />
          <div className="text-xl md:text-lg text-white font-light">
            Upcoming
          </div>
        </div>
      </div>
      <div className="pt-3 grid grid-cols-12 items-start gap-3">
        {upcomingEventLeagues?.length > 0 ? (
          upcomingEventLeagues?.map((data, index) => (
            <BetCard key={index} betsData={data} />
          ))
        ) : (
          <p className="w-full text-center col-span-12 text-white my-5">
            Nothing to show here
          </p>
        )}
      </div>
    </div>
  );
};

export default BetContainer;
