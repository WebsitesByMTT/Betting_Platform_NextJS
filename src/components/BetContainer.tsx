"use client";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";
import LiveGame from "./svg/LiveGame";
import UpcomingGame from "./svg/UpcomingGame";
import BetCard from "./BetCard";
import SkeletonCard from "./SkeletonCard";
import Today from "./svg/Today";

const BetContainer = ({ cat }: { cat: any }) => {
  const loading = useAppSelector((state) => state?.sports?.loading);
  const leagueData = useAppSelector((state) => state?.sports?.leagues);

  const categories = [
    {
      name: "Live",
      icon: <LiveGame />,
      data: leagueData?.live_games,
      skeletonCount: 2,
    },
    {
      name: "Today",
      icon: <Today />,
      data: leagueData?.todays_upcoming_games,
      skeletonCount: 4,
    },
    {
      name: "Upcoming",
      icon: <UpcomingGame />,
      data: leagueData?.future_upcoming_games,
      skeletonCount: 4,
    },
  ];

  return (
    <div className="flex flex-col gap-5 py-3">
      {categories.map(({ name, icon, data, skeletonCount }) => (
        <div key={name}>
          <div className="cursor-pointer flex space-x-2 items-center bg-[#1E1C22] w-full rounded-lg p-2 md:p-4 shadow-inner">
            <div className="flex gap-3 items-center">
              {icon}
              <div className="text-md md:text-lg text-white font-light">
                {name}
              </div>
            </div>
          </div>
          <div className="pt-3 grid grid-cols-12 items-start gap-3">
            {!loading ? (
              data?.length > 0 ? (
                data.map((item: any, index: number) => (
                  <BetCard cat={cat} key={index} betsData={item} />
                ))
              ) : (
                <p className="w-full text-center col-span-12 text-white py-2 text-sm">
                  Nothing to show here
                </p>
              )
            ) : (
              Array.from({ length: skeletonCount }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BetContainer;
