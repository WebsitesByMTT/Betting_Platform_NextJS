import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Favourite from "./svg/Favourite";
import World from "./svg/World";
import { Bet, DecodedToken } from "@/utils/types";
import { addAllBets } from "@/lib/store/features/bet/betSlice";
import { getCookie } from "@/utils/utils";
import { jwtDecode } from "jwt-decode";

const BetCard: React.FC<any> = ({ betsData }) => {
  const [leagues, setLeagues] = useState(betsData);
  const dispatch = useAppDispatch();
  const allbets = useAppSelector((state) => state.bet.allbets);

  useEffect(() => {
    setLeagues(betsData);
  }, [betsData]);
  const currentCategory = useAppSelector(
    (state) => state?.sports?.selectedCategory
  );

  const handleBet = async (betOn: string, betsData: any) => {
    const token = await getCookie();
    let playerId: string = "";
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      playerId = decodedToken?.userId;
    }
    const betData: Bet = {
      id: betOn + betsData.id + betsData.markets[0]?.key,
      away_team: {
        name: betsData.away_team,
        odds: betsData.markets
          .flatMap((market: any) => market.outcomes)
          .find((outcome: any) => outcome.name === betsData.away_team)?.price,
      },
      home_team: {
        name: betsData.home_team,
        odds: betsData?.markets
          .flatMap((market: any) => market.outcomes)
          .find((outcome: any) => outcome.name === betsData.home_team)?.price,
      },
      bet_on: betOn,
      market: betsData.markets[0]?.key,
      oddsFormat: "decimal",
      player: playerId,
      sport_key: betsData.sport_key,
      sport_title: betsData.sport_title,
      event_id: betsData.id,
      commence_time: betsData.commence_time,
      status: "pending",
      amount: 50,
    };
    dispatch(addAllBets(betData));
  };

  const isBetInAllBets = (betId: string) => {
    return allbets.some((bet) => bet.id === betId);
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
            {betsData?.scores?.find(
              (item: any) => item?.name === betsData?.home_team
            )?.score || 0}
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
            {betsData?.scores?.find(
              (item: any) => item.name === betsData.away_team
            )?.score || 0}
          </p>
        </button>
      </div>
      <div>
        <p className="text-white text-sm">{betsData?.markets[0]?.key}</p>
      </div>
      <div className="flex gap-2 w-full">
        <button
          className={`flex-1 py-2 rounded-lg text-sm transition-colors border-[1px] flex justify-between px-2 ${
            isBetInAllBets("home_team" + betsData.id + betsData.markets[0]?.key)
              ? "bg-gradient-to-b from-[#82ff606a] to-[#4f993a6d] border-[#82FF60] shadow-inner"
              : "bg-[#040404] border-transparent"
          }`}
          onClick={() => {
            handleBet("home_team", betsData);
          }}
        >
          <p className="text-[#dfdfdf76]">1</p>
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
          className={`flex-1 py-2 rounded-lg text-sm transition-colors border-[1px] flex justify-between px-2 ${
            isBetInAllBets("away_team" + betsData.id + betsData.markets[0]?.key)
              ? "bg-gradient-to-b from-[#82ff606a] to-[#4f993a6d] border-[#82FF60] shadow-inner"
              : "bg-[#040404] border-transparent "
          }`}
          onClick={() => {
            handleBet("away_team", betsData);
          }}
        >
          <p className="text-[#dfdfdf76]">2</p>
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
