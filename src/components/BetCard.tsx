import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Favourite from "./svg/Favourite";
import World from "./svg/World";
import { Bet } from "@/utils/types";
import { addAllBets } from "@/lib/store/features/bet/betSlice";

const BetCard: React.FC<any> = ({ betsData }) => {
  const [leagues, setLeagues] = useState(betsData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLeagues(betsData);
  }, [betsData]);
  const currentCategory = useAppSelector(
    (state) => state?.sports?.selectedCategory
  );

  const handleBet = (betOn: string, betsData: any) => {
    const betData: Bet = {
      away_team: {
        name: betsData.away_team,
        odds: betsData.markets
          .flatMap((market: any) => market.outcomes)
          .find((outcome: any) => outcome.name === betsData.away_team)?.price,
      },
      home_team: {
        name: betsData.home_team,
        odds: betsData.markets
          .flatMap((market: any) => market.outcomes)
          .find((outcome: any) => outcome.name === betsData.home_team)?.price,
      },
      bet_on: betOn,
      market: betsData.markets[0]?.key,
      oddsFormat: "decimal",
      player: "66b4669df50c0da50679c821",
      sport: betsData.sport_key,
      sport_title: betsData.sport_title,
      event_id: betsData.id,
      commence_time: betsData.commence_time,
      status: "pending",
      amount: 50,
    };
    dispatch(addAllBets(betData));
  };

  return (
    <div className="bg-[#17151A] shadow-xl flex flex-col gap-1 p-2 rounded-lg col-span-12 md:col-span-6 xl:col-span-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center space-x-[.5px] overflow-hidden">
          <div className=" whitespace-nowrap flex items-center gap-2 justify-center text-white text-opacity-60 text-[.7rem] md:text-[.9rem]">
            <div className="relative h-[20px] w-[15px]">
              <Image
                src={`/assets/image/sidebar/${currentCategory
                  .toLowerCase()
                  .replace(/\s+/g, "-")}.svg`}
                fill
                alt={currentCategory}
              />
            </div>
            <p className="whitespace-nowrap">{leagues?.sport_title}</p>
          </div>
        </div>
        <Favourite />
      </div>
      <p className="text-[#67ffff] text-sm">
        {leagues.commence_time.split("T")[0]}
      </p>
      <div className="flex flex-col py-1.5 justify-between">
        <button className="grid grid-cols-5 space-x-2">
          <div className="flex col-span-4 gap-2 items-center whitespace-nowrap -mx-2">
            <World />
            <p className="text-white text-[.8rem] md:text-[.9rem]">
              {betsData.home_team}
            </p>
          </div>
          <p className="text-[#dfdfdf89] border-[1px] border-[#818181] rounded-md py-[1px]">
            5
          </p>
        </button>
        <button className="grid grid-cols-5 space-x-2">
          <div className="flex col-span-4 items-center gap-2 whitespace-nowrap -mx-2">
            <World />
            <div className="text-white text-[.8rem] md:text-[.9rem]">
              {betsData.away_team}
            </div>
          </div>
          <p className="text-[#dfdfdf89] border-[1px] border-[#818181] rounded-md py-[1px]">
            10
          </p>
        </button>
      </div>
      <div>
        <p className="text-white text-sm">{betsData?.markets[0].key}</p>
      </div>
      <div className="flex gap-2 w-full">
        <button
          className="flex-1 bg-[#040404] py-2 rounded-md"
          onClick={() => {
            handleBet("home_team", betsData);
          }}
        >
          <p className="text-white">
            {
              betsData.markets
                .flatMap((market: any) => market.outcomes)
                .find((outcome: any) => outcome.name === betsData.home_team)
                ?.price
            }
          </p>
        </button>
        <button
          className="flex-1 bg-[#040404] py-2 rounded-md"
          onClick={() => {
            handleBet("away_team", betsData);
          }}
        >
          <p className="text-white">
            {
              betsData.markets
                .flatMap((market: any) => market.outcomes)
                .find((outcome: any) => outcome.name === betsData.away_team)
                ?.price
            }
          </p>
        </button>
      </div>
    </div>
  );
};

export default BetCard;
