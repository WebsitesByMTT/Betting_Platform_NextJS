"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { Leagues } from "@/utils/types";
import React, { useEffect, useState } from "react";
import LiveGame from "./svg/LiveGame";
import UpcomingGame from "./svg/UpcomingGame";
import BetCard from "./BetCard";
import SkeletonCard from "./SkeletonCard";
import Today from "./svg/Today";

const BetContainer = ({cat}:any) => {
  const [liveEventLeagues, setLiveEventLeagues] = useState<Leagues[]>([]);
  const [todayEventLeagues, setTodayEventLeagues] = useState<Leagues[]>([]);
  const [upcomingEventLeagues, setUpcomingEventLeagues] = useState<Leagues[]>(
    []
  );
  const loading = useAppSelector((state) => state.sports.loading);
  const leagueData = useAppSelector((state) => state?.sports?.leagues);

  useEffect(() => {
    setLiveEventLeagues(leagueData?.live_games);
    setTodayEventLeagues(leagueData?.todays_upcoming_games);
    setUpcomingEventLeagues(leagueData?.future_upcoming_games);
  }, [leagueData]);

  return (
    <div className="flex flex-col gap-5 py-3">
      <div className="cursor-pointer flex space-x-2 items-center bg-[#1E1C22] w-full rounded-lg p-2 md:p-4 shadow-inner">
        <div className="flex gap-3 items-center">
          <LiveGame />
          <div className="text-md md:text-lg text-white font-light">Live</div>
        </div>
      </div>
      <div className="pt-3 grid grid-cols-12 items-start gap-3">
        {!loading ? (
          liveEventLeagues && liveEventLeagues?.length > 0 ? (
            liveEventLeagues?.map((data, index) => (
              <BetCard cat={cat} key={index} betsData={data} />
            ))
          ) : (
            <p className="w-full text-center col-span-12 text-white py-2 text-sm">
              Nothing to show here
            </p>
          )
        ) : (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
      <div className="cursor-pointer flex space-x-2 items-center bg-[#1E1C22] w-full rounded-lg p-2 md:p-4 shadow-inner">
        <div className="flex gap-3 items-center">
          <Today />
          <div className="text-md md:text-lg text-white font-light">Today</div>
        </div>
      </div>
      <div className="pt-3 grid grid-cols-12 items-start gap-3">
        {!loading ? (
          todayEventLeagues && todayEventLeagues?.length > 0 ? (
            todayEventLeagues?.map((data, index) => (
              <BetCard cat={cat} key={index} betsData={data} />
            ))
          ) : (
            <p className="w-full text-center col-span-12 text-white py-2 text-sm">
              Nothing to show here
            </p>
          )
        ) : (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
      <div className="cursor-pointer flex space-x-2 items-center bg-[#1E1C22] w-full rounded-lg p-2 md:p-4 shadow-inner">
        <div className="flex gap-3 items-center">
          <UpcomingGame />
          <div className="text-md md:text-lg text-white font-light">
            Upcoming
          </div>
        </div>
      </div>
      <div className="pt-3 grid grid-cols-12 items-start gap-3">
        {!loading ? (
          upcomingEventLeagues && upcomingEventLeagues?.length > 0 ? (
            upcomingEventLeagues?.map((data, index) => (
              <BetCard cat={cat} key={index} betsData={data} />
            ))
          ) : (
            <p className="w-full text-center col-span-12 text-white py-2 text-sm">
              Nothing to show here
            </p>
          )
        ) : (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
    </div>
  );
};

export default BetContainer;
