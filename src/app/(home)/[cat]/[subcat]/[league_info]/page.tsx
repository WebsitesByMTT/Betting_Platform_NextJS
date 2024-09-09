"use client";
import React, { useEffect, useState } from "react";
import Categories from "@/components/Categories";
import CircleDropdown from "@/components/svg/CircleDropdown";
import Favourite from "@/components/svg/Favourite";
import LiveGame from "@/components/svg/LiveGame";
import Pin from "@/components/svg/Pin";
import { svgMap } from "@/components/svg/SvgMap";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useSocket } from "@/components/SocketProvider";
import { setLoading } from "@/lib/store/features/sports/sportsSlice";
import QuickBet from "@/components/QuickBet";
import { BetDetails } from "@/utils/types";
import { addAllBets } from "@/lib/store/features/bet/betSlice";

const Page = ({ params }: any) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const category = params?.cat && decodeURIComponent(params.cat);
  const currentCategory = useAppSelector(
    (state) => state.sports.selectedCategory
  );
  const IconComponent = svgMap[currentCategory.toLowerCase()] || null;
  const leagues_Info: any = useAppSelector((state) => state.sports.leaguesInfo);
  const loading = useAppSelector((state) => state.sports.loading);
  const allbets = useAppSelector((state) => state.bet.allbets);
  const myBets = useAppSelector((state) => state.bet.myBets);
  // State to track open/closed accordions
  const [openIndices, setOpenIndices] = useState<boolean[]>([]);

  useEffect(() => {
    if (leagues_Info?.markets) {
      setOpenIndices(leagues_Info.markets.map(() => true));
    }
  }, [leagues_Info]);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prevOpenIndices) => {
      const newOpenIndices = [...prevOpenIndices];
      newOpenIndices[index] = !newOpenIndices[index];
      return newOpenIndices;
    });
  };

  useEffect(() => {
    if (socket && params) {
      dispatch(setLoading(true));
      socket?.emit("data", {
        action: "GET event odds",
        payload: {
          sport: params?.subcat,
          eventId: params?.league_info,
          regions: "us",
          has_outrights: false,
        },
      });
    } else {
      console.log("Socket is not connected");
    }
  }, [socket, params]);

  const formatCommenceTime = (commenceTime: string) => {
    const date = new Date(commenceTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const isSameDay = (d1: Date, d2: Date) => {
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    };

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const suffix = hours === 0 ? "12" : hours > 12 ? hours - 12 : hours;
    let formattedTime = `${suffix}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    const currentTime = new Date();
    if (currentTime > date) {
      return "Live";
    } else if (isSameDay(date, today)) {
      return `Today at ${formattedTime}`;
    } else if (isSameDay(date, tomorrow)) {
      return `Tomorrow at ${formattedTime}`;
    } else {
      const day = date.getDate().toString().padStart(2, "0");
      const month = date.toLocaleString("default", { month: "short" });
      return `${day}, ${month} at ${formattedTime}`;
    }
  };

  const handleBet = async (
    event: React.MouseEvent,
    betOn: string,
    betsData: any,
    outcome: any
  ) => {
    event.stopPropagation();
    const betson = betOn.toLowerCase();
    const betDetails: BetDetails = {
      id: betOn + leagues_Info?.id + betsData?.key,
      away_team: {
        name: leagues_Info?.away_team,
        odds: betsData?.outcomes?.find(
          (item: any) =>
            item.name ===
            (betsData?.key === "totals" ? betOn : leagues_Info?.away_team)
        )?.price,
        points: betsData?.outcomes?.find(
          (item: any) =>
            item.name ===
            (betsData?.key === "totals" ? betOn : leagues_Info?.away_team)
        )?.point,
      },
      home_team: {
        name: leagues_Info?.home_team,
        odds: betsData?.outcomes?.find(
          (item: any) =>
            item.name ===
            (betsData?.key === "totals" ? betOn : leagues_Info?.home_team)
        )?.price,
        points: betsData?.outcomes?.find(
          (item: any) =>
            item.name ===
            (betsData?.key === "totals" ? betOn : leagues_Info?.home_team)
        )?.point,
      },
      bet_on: betsData?.key === "totals" ? outcome?.name : betson,
      market: betsData?.key,
      oddsFormat: "decimal",
      sport_key: leagues_Info?.sport_key,
      sport_title: leagues_Info?.sport_title,
      event_id: leagues_Info?.id,
      commence_time: leagues_Info?.commence_time,
      selected: leagues_Info?.selected,
      amount: 50,
    };
    console.log(betDetails);
    dispatch(addAllBets(betDetails));
  };

  //bets included in all bets in redux
  const isBetInAllBets = (betId: string) => {
    if (betId === "Over" || betId === "Under") {
      return allbets.some((bet) => bet.bet_on === betId);
    }
    return allbets.some((bet) => bet.id === betId);
  };

  const isBetDisabled = (betOn: string, event_id: string, market: string) => {
    for (const myBet of myBets) {
      if (Array.isArray(myBet?.data)) {
        const isDisabled = myBet.data.some((bet: any) => {
          return (
            bet.event_id === event_id &&
            bet.bet_on === betOn &&
            bet.status === "pending" &&
            bet.market === market
          );
        });

        if (isDisabled) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <>
      <Categories />
      <div className="w-full md:w-[80%] h-[calc(100vh-200px)] overflow-y-scroll webkit-overflow-scrolling-touch mx-auto">
        <div className="py-5">
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
        </div>
        <div className="border-[1px] rounded-2xl mb-8 border-white border-opacity-10 p-3 bg-gradient-to-tr from-[#0D0C15] to-[#1C1A21]">
          <div className="flex justify-between items-center">
            {formatCommenceTime(leagues_Info.commence_time) && (
              <div className="flex items-center space-x-3">
                {formatCommenceTime(leagues_Info.commence_time) !== "Live" && (
                  <LiveGame />
                )}
                <div className="flex items-center gap-x-1">
                  {formatCommenceTime(leagues_Info.commence_time) ===
                    "Live" && (
                    <span className="inline-block h-4 animate-pulse w-4 rounded-full bg-red-500 "></span>
                  )}
                  <div className="text-sm tracking-wide text-[#67FFFF] flex items-center">
                    {leagues_Info?.commence_time
                      ? formatCommenceTime(leagues_Info.commence_time)
                      : ""}
                  </div>
                </div>
              </div>
            )}
            <Favourite />
          </div>
          <div className="flex w-[80%] mx-auto items-center justify-between pt-10">
            <div>
              <div className="flex justify-start">
                <span className="bg-gradient-to-b from-[#2E2D30] to-[#0C0B14] px-2.5 border-[.2px] border-opacity-5 border-white py-2.5 text-xs rounded-full">
                  {IconComponent}
                </span>
              </div>
              <div className="text-sm tracking-wide text-white pt-1.5 font-light">
                {loading ? "loading..." : leagues_Info?.home_team}
              </div>
            </div>
            <span className="text-white text-2xl">-</span>
            <div>
              <div className="flex justify-end">
                <span className="bg-gradient-to-b from-[#2E2D30] to-[#0C0B14] px-2.5 border-[.2px] border-opacity-5 border-white py-2.5 rounded-full">
                  {IconComponent}
                </span>
              </div>
              <div className="text-sm tracking-wide text-white pt-1.5 font-light">
                {loading ? "loading..." : leagues_Info?.away_team}
              </div>
            </div>
          </div>
        </div>
        {leagues_Info?.markets?.map((item: any, index: number) => (
          <div key={index} className="accordion-item">
            <div
              className="bg-gradient-to-tr cursor-pointer mt-5 rounded-full from-[#0D0C15] to-[#1C1A21] py-2.5 px-5 border-[.2px] border-white border-opacity-[0.02] flex items-center justify-between"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center space-x-3">
                <div className="text-white text-base tracking-wide capitalize">
                  {item.key}
                </div>
                <div
                  className={
                    openIndices[index]
                      ? "rotate-180 transition-all ease-in-out"
                      : "rotate-0 ease-in-out transition-all"
                  }
                >
                  <CircleDropdown />
                </div>
              </div>
              <Pin />
            </div>
            <div
              className={`accordion-content transition-max-height duration-200 ease-in-out overflow-hidden ${
                openIndices[index] ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="border-[.2px] space-y-3 mt-[3px] rounded-xl border-white border-opacity-5 p-1.5 bg-gradient-to-tr from-[#0D0C15] to-[#1C1A21]">
                <div className="flex md:items-center gap-x-2 md:gap-x-10">
                  {loading ? (
                    <>
                      <div className="bg-[#dfdfdf43] w-full rounded-md animate-pulse"></div>
                      <div className="bg-[#dfdfdf43]  w-full rounded-md animate-pulse"></div>
                    </>
                  ) : (
                    item?.outcomes?.map(
                      (outcome: any, outcomeIndex: number) => (
                        <button
                          onClick={(event) => {
                            handleBet(
                              event,
                              item.key === "totals"
                                ? outcome.name
                                : outcome.name === leagues_Info?.home_team
                                ? "home_team"
                                : "away_team",
                              item,
                              outcome
                            );
                          }}
                          key={outcomeIndex}
                          className={`w-full py-2 rounded-lg group relative text-sm disabled:bg-[#27252A] disabled:border-[#4A484D] disabled:cursor-not-allowed transition-colors border-[1px] block md:flex justify-between px-2 group ${
                            isBetInAllBets(
                              item.key === "totals"
                                ? outcome?.name
                                : (outcome?.name === leagues_Info?.home_team
                                    ? "home_team"
                                    : "away_team") +
                                    leagues_Info?.id +
                                    item.key
                            )
                              ? "bg-gradient-to-b from-[#82ff606a] to-[#4f993a6d] border-[#82FF60] shadow-inner"
                              : "bg-[#040404] border-transparent"
                          }`}
                          disabled={isBetDisabled(
                            item.key === "totals"
                              ? outcome.name
                              : outcome.name === leagues_Info?.home_team
                              ? "home_team"
                              : "away_team",
                            leagues_Info?.id,
                            item?.key
                          )}
                        >
                          <div className="text-sm text-white text-opacity-30 font-light flex items-center md:gap-x-2">
                            {outcome.name}
                            <span
                              className={`${
                                outcome?.point < 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              } md:block hidden`}
                            >
                              {outcome?.point}
                            </span>
                          </div>
                          <div className="flex md:items-center justify-between pt-2 md:hidden text-red-400">
                            <span
                              className={`${
                                outcome?.point < 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                            >
                              {outcome?.point}
                            </span>
                            <div className="text-xs text-white py-1 px-1.5 rounded-md bg-[#343434] ">
                              {outcome.price}
                            </div>
                          </div>
                          <div className="text-xs text-white py-1 px-1.5 md:block hidden rounded-md bg-[#343434] ">
                            {outcome.price}
                          </div>
                          {isBetDisabled(
                            item.key === "totals"
                              ? outcome.name
                              : outcome.name === leagues_Info?.home_team
                              ? "home_team"
                              : "away_team",
                            leagues_Info?.id,
                            item?.key
                          ) && (
                            <p className="text-[12px] text-red-500 betPlacedText italic text-center invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bg-black rounded-xl top-[20%] left-[5%] right-[5%] w-full">
                              This bet is already placed
                            </p>
                          )}
                        </button>
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <QuickBet />
    </>
  );
};

export default Page;
