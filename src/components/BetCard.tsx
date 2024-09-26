import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
import Favourite from "./svg/Favourite";
import { BetDetails } from "@/utils/types";
import { addAllBets } from "@/lib/store/features/bet/betSlice";
import { svgMap } from "./svg/SvgMap";
import { useRouter } from "next/navigation";
import Triangle from "./svg/Triangle";
import { useSocket } from "./SocketProvider";
import { generateId, getOutright } from "@/lib/utils";

const BetCard: React.FC<any> = ({ betsData, cat }) => {
  const [leagues, setLeagues] = useState(betsData);
  const dispatch = useAppDispatch();
  const allbets = useAppSelector((state) => state.bet.allbets);
  const myBets = useAppSelector((state) => state.bet.myBets);
  const currentCategory = useAppSelector(
    (state) => state?.sports?.selectedCategory
  );
  const [previousBetsData, setPreviousBetsData] = useState<any>(betsData);
  const router = useRouter();
  const IconComponent = svgMap[currentCategory.toLowerCase()];
  const sportsCategories = useAppSelector((state) => state.sports.categories);
  const { socket } = useSocket();
  const [outright, setOutright] = useState<boolean>(false);

  useEffect(() => {
    setLeagues(betsData);
    setPreviousBetsData((prevState: any) => {
      return prevState;
    });
  }, [betsData]);

  const handleRemove = (betId: string, betDetails: any) => {
    if (allbets.some((bet) => bet.id === betId)) {
      socket?.emit(
        "bet",
        {
          action: "REMOVE_FROM_BETSLIP",
          payload: { betId: betId },
        },
        (response: { status: string; message: string }) => {
          if (response.status === "success") {
            dispatch(addAllBets(betDetails));
          } else {
            console.error("Failed to remove bet:", response.message);
          }
        }
      );
    }
  };

  //add bet to allbets in redux
  const handleBet = async (
    event: React.MouseEvent,
    betOn: string,
    betsData: any
  ) => {
    event.stopPropagation();
    const betDetails: BetDetails = {
      id: generateId(betsData.id, betOn, betsData.markets[0]?.key),
      teams: betsData.markets[0]?.outcomes
        .filter((team: { name: string; price: number }) => team.name !== "Draw")
        .map((team: { name: string; price: number }) => ({
          name: team.name,
          odds: team.price,
        })),
      bet_on: {
        name: betOn,
        odds: betsData.markets[0].outcomes.find(
          (outcome: any) => outcome.name === betOn
        ).price,
        prevOdds: betsData.markets[0].outcomes.find(
          (outcome: any) => outcome.name === betOn
        ).price,
      },
      event_id: betsData.id,
      sport_title: betsData.sport_title,
      sport_key: betsData.sport_key,
      commence_time: betsData.commence_time,
      category: betsData.markets[0]?.key,
      bookmaker: betsData.selected,
      oddsFormat: "decimal",
      amount: 50,
      loading: false,
    };
    console.log(betDetails);
    socket?.emit(
      "bet",
      { action: "ADD_TO_BETSLIP", payload: { data: betDetails } },
      (response: { status: string; message: string }) => {
        if (response.status === "success") {
          dispatch(addAllBets(betDetails));
        } else {
          console.error("Failed to add bet:", response.message);
        }
      }
    );
  };

  useEffect(() => {
    setOutright(getOutright(sportsCategories, leagues.sport_title));
  }, [leagues?.sport_title]);

  //bets included in all bets in redux
  const isBetInAllBets = (betId: string) => {
    return allbets.some((bet) => bet.id === betId);
  };

  const handelLeagueInfo = () => {
    if (betsData) {
      router.push(`/${cat?.cat}/${cat?.subcat}/${betsData?.id}`);
    }
  };

  return (
    <>
      {!outright ? (
        <div
          onClick={handelLeagueInfo}
          className="bg-[#17151A]  shadow-xl flex flex-col gap-1 p-2 rounded-lg col-span-12 md:col-span-6 xl:col-span-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center space-x-[.5px] overflow-hidden">
              <div className=" whitespace-nowrap flex items-center space-x-2 justify-center text-white text-opacity-60 text-[.7rem] md:text-[.9rem]">
                <div className="relative">{IconComponent}</div>
                <p className="whitespace-nowrap">{leagues?.sport_title}</p>
              </div>
            </div>
            <Favourite />
          </div>
          <p className="text-[#67ffff] capitalize text-sm">
            {new Date(leagues.commence_time).toLocaleDateString([], {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            |{" "}
            {new Date(leagues.commence_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <div className="flex flex-col py-1.5 justify-between">
            <button className="grid grid-cols-5 space-x-2">
              <div className="flex col-span-4 gap-2 items-center whitespace-nowrap -mx-2 overflow-hidden">
                <p className="text-white text-[.8rem] pl-2 md:text-[.9rem]">
                  {betsData?.home_team}
                </p>
              </div>
              <p className="text-[#dfdfdf89] border-[1px] border-[#818181] rounded-md py-[1px]">
                {betsData?.scores?.find(
                  (item: any) => item?.name === betsData?.home_team
                )?.score || 0}
              </p>
            </button>
            <button className="grid grid-cols-5 space-x-2">
              <div className="flex col-span-4 items-center gap-2 whitespace-nowrap -mx-2 overflow-hidden">
                <div className="text-white text-[.8rem] pl-2 md:text-[.9rem]">
                  {betsData?.away_team}
                </div>
              </div>
              <p className="text-[#dfdfdf89] border-[1px] border-[#818181] rounded-md py-[1px]">
                {betsData?.scores?.find(
                  (item: any) => item.name === betsData.away_team
                )?.score || 0}
              </p>
            </button>
          </div>
          <div className="flex justify-between">
            <p className="text-white text-sm">{betsData?.markets[0]?.key}</p>
          </div>
          <div className="flex gap-2 w-full betPlaced relative">
            <button
              className={`flex-1 py-2 rounded-lg text-sm relative transition-colors border-[1px] flex group justify-between px-2 ${
                isBetInAllBets(
                  generateId(
                    betsData.id,
                    betsData?.home_team,
                    betsData.markets[0]?.key
                  )
                )
                  ? "bg-gradient-to-b from-[#82ff606a] to-[#4f993a6d] border-[#82FF60] shadow-inner"
                  : "bg-[#040404] border-transparent"
              }`}
              onClick={(event) => {
                handleBet(event, betsData?.home_team, betsData);
              }}
            >
              {betsData?.markets
                .flatMap((market: any) => market.outcomes)
                .find((outcome: any) => outcome.name === betsData?.home_team)
                ?.price >
                previousBetsData?.markets
                  .flatMap((market: any) => market.outcomes)
                  .find(
                    (outcome: any) =>
                      outcome.name === previousBetsData?.home_team
                  )?.price &&
                previousBetsData?.sport_key === betsData?.sport_key && (
                  <span className="absolute animatePulse right-0 top-0 text-green-500 rotate-[-91deg]">
                    <Triangle color={"#00ff00"} />
                  </span>
                )}
              {betsData?.markets
                .flatMap((market: any) => market.outcomes)
                .find((outcome: any) => outcome?.name === betsData?.home_team)
                ?.price <
                previousBetsData?.markets
                  .flatMap((market: any) => market.outcomes)
                  .find(
                    (outcome: any) =>
                      outcome.name === previousBetsData?.home_team
                  )?.price &&
                previousBetsData?.sport_key === betsData?.sport_key && (
                  <span className="absolute right-0 bottom-0 text-red-500 animatePulse">
                    <Triangle color={"#ff0000"} />
                  </span>
                )}

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
            {betsData?.markets[0]?.outcomes?.map(
              (data: any, index: any) =>
                data.name === "Draw" && (
                  <button
                    key={index}
                    className={`flex-1 py-2 rounded-lg text-sm relative transition-colors border-[1px] flex group justify-between px-2 ${
                      isBetInAllBets(
                        generateId(
                          betsData.id,
                          data.name,
                          betsData.markets[0]?.key
                        )
                      )
                        ? "bg-gradient-to-b from-[#82ff606a] to-[#4f993a6d] border-[#82FF60] shadow-inner"
                        : "bg-[#040404] border-transparent"
                    }`}
                    onClick={(event) => {
                      handleBet(event, data.name, betsData);
                    }}
                  >
                    {betsData?.markets
                      .flatMap((market: any) => market.outcomes)
                      .find((outcome: any) => outcome.name === data.name)
                      ?.price >
                      previousBetsData?.markets
                        .flatMap((market: any) => market.outcomes)
                        .find(
                          (outcome: any) =>
                            outcome.name === previousBetsData.name
                        )?.price &&
                      previousBetsData?.sport_key === betsData?.sport_key && (
                        <span className="absolute animatePulse right-0 top-0 text-green-500 rotate-[-91deg]">
                          <Triangle color={"#00ff00"} />
                        </span>
                      )}
                    {betsData?.markets
                      .flatMap((market: any) => market.outcomes)
                      .find((outcome: any) => outcome.name === data.name)
                      ?.price <
                      previousBetsData?.markets
                        .flatMap((market: any) => market.outcomes)
                        .find(
                          (outcome: any) =>
                            outcome.name === previousBetsData?.name
                        )?.price &&
                      previousBetsData?.sport_key === betsData?.sport_key && (
                        <span className="absolute right-0 bottom-0 text-red-500 animatePulse">
                          <Triangle color={"#ff0000"} />
                        </span>
                      )}

                    <p className="text-[#dfdfdf76]">
                      {data.name !== "Draw" ? index + 1 : data.name}
                    </p>
                    <p className="text-white">
                      {
                        betsData.markets
                          .flatMap((market: any) => market.outcomes)
                          .find((outcome: any) => outcome.name === data.name)
                          ?.price
                      }
                    </p>
                  </button>
                )
            )}
            <button
              className={`flex-1 py-2 rounded-lg text-sm relative transition-colors border-[1px] flex justify-between px-2 group ${
                isBetInAllBets(
                  generateId(
                    betsData.id,
                    betsData.away_team,
                    betsData.markets[0]?.key
                  )
                )
                  ? "bg-gradient-to-b from-[#82ff606a] to-[#4f993a6d] border-[#82FF60] shadow-inner"
                  : "bg-[#040404] border-transparent"
              }`}
              onClick={(event) => {
                handleBet(event, betsData.away_team, betsData);
              }}
            >
              {betsData?.markets
                .flatMap((market: any) => market.outcomes)
                .find((outcome: any) => outcome.name === betsData.away_team)
                ?.price >
                previousBetsData?.markets
                  .flatMap((market: any) => market.outcomes)
                  .find(
                    (outcome: any) =>
                      outcome.name === previousBetsData.away_team
                  )?.price &&
                previousBetsData?.sport_key === betsData?.sport_key && (
                  <span className="absolute animatePulse right-0 top-0 text-green-500 rotate-[-91deg]">
                    <Triangle color={"#00ff00"} />
                  </span>
                )}
              {betsData?.markets
                .flatMap((market: any) => market.outcomes)
                .find((outcome: any) => outcome.name === betsData.away_team)
                ?.price <
                previousBetsData?.markets
                  .flatMap((market: any) => market.outcomes)
                  .find(
                    (outcome: any) =>
                      outcome.name === previousBetsData.away_team
                  )?.price &&
                previousBetsData?.sport_key === betsData?.sport_key && (
                  <span className="absolute right-0 bottom-0 text-red-500 animatePulse">
                    <Triangle color={"#ff0000"} />
                  </span>
                )}
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
      ) : (
        <div className="bg-[#17151A]  shadow-xl flex flex-col gap-1 p-2 rounded-lg col-span-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center space-x-[.5px] overflow-hidden">
              <div className=" whitespace-nowrap flex items-center space-x-2 justify-center text-white text-opacity-60 text-[.7rem] md:text-[.9rem]">
                <div className="relative">{IconComponent}</div>
                <p className="whitespace-nowrap">{leagues?.sport_title}</p>
              </div>
            </div>
            <Favourite />
          </div>
          <p className="text-[#67ffff] capitalize text-sm">
            {new Date(leagues.commence_time).toLocaleDateString([], {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            |{" "}
            {new Date(leagues.commence_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 py-4">
            {leagues.markets[0].outcomes.map((data: any, index: any) => (
              <button
                key={index}
                className={`flex-1 py-2 rounded-lg text-sm relative transition-colors border-[1px] flex justify-between px-2 group ${
                  isBetInAllBets(
                    generateId(betsData.id, data.name, betsData.markets[0]?.key)
                  )
                    ? "bg-gradient-to-b from-[#82ff606a] to-[#4f993a6d] border-[#82FF60] shadow-inner"
                    : "bg-[#040404] border-transparent"
                }`}
                onClick={(event) => {
                  handleBet(event, data.name, betsData);
                }}
              >
                <p className="text-[#dfdfdf76] flex gap-3">
                  <span className="flex-[0.5]">{index + 1}.</span>{" "}
                  <span className="flex-1 whitespace-nowrap">
                    {" "}
                    {data?.name}
                  </span>
                </p>
                <p className="text-white">{data.price}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BetCard;