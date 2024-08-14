"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Bet } from "@/utils/types";
import { updateBetAmount } from "@/lib/store/features/bet/betSlice";
import { useSocket } from "../SocketProvider";
import toast from "react-hot-toast";
import Quickbet from "../svg/Quickbet";
import Placebet from "../svg/Placebet";

const QuickBet = () => {
  const [isBet, setIsBet] = useState(false);
  const [open, setOpen] = useState(false);
  const [allBets, setAllBets] = useState<Bet[]>([]);
  const dispatch = useAppDispatch();
  const bets = useAppSelector((state) => state.bet.allbets);
  const { socket } = useSocket();

  useEffect(() => {
    setAllBets(bets);
  }, [bets]);

  const handleBet = () => {
    setIsBet(!isBet);
  };

  const handelOpen = () => {
    setOpen(!open);
  };

  const betAmount = [50, 100, 200, 500];

  const handleSubmit = async () => {
    if (socket) {
      socket.emit(
        "bet",
        { action: "PLACE", payload: bets[0] },
        (response: any) => {
          toast.success(response.message);
        }
      );
    } else {
      console.log("SOCKET NOT CONNECTED");
    }
  };

  useEffect(() => {
    setOpen(true);
  }, [bets]);

  return (
    <div
      className={`transition-all text-white  ${
        open ? "bottom-0" : "-bottom-[2rem] md:-bottom-[4rem]"
      }  fixed  z-[20] left-0 md:left-auto md:right-10 w-[90%] md:w-[45%] xl:w-[20%] max-h-[80vh]`}
    >
      <div
        onClick={handelOpen}
        className="bg-gradient-to-b from-[#D71B21] to-[#780005] rounded-tr-xl rounded-tl-xl cursor-pointer px-4 py-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full justify-between space-x-2 cursor-pointer">
            <div className="flex items-center gap-2">
              <Quickbet />
              <p className="text-lg">Betslip</p>
            </div>
            <svg
              width="15"
              height="10"
              viewBox="0 0 15 10"
              className={
                open
                  ? "-rotate-180 transition-all md:w-[25px] w-[10px]"
                  : " md:w-[25px] w-[10px] transition-all"
              }
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.948 1.33C14.8964 1.2054 14.809 1.09891 14.6969 1.02397C14.5848 0.949029 14.453 0.909017 14.3182 0.908989H0.682328C0.547405 0.908882 0.415483 0.948812 0.303264 1.02372C0.191046 1.09863 0.103576 1.20515 0.0519286 1.3298C0.000281235 1.45444 -0.0132214 1.59161 0.0131301 1.72394C0.0394816 1.85626 0.104502 1.9778 0.199961 2.07315L7.01787 8.89106C7.08119 8.95445 7.15639 9.00474 7.23915 9.03905C7.32192 9.07336 7.41064 9.09102 7.50024 9.09102C7.58984 9.09102 7.67856 9.07336 7.76132 9.03905C7.84409 9.00474 7.91929 8.95445 7.98261 8.89106L14.8005 2.07315C14.8958 1.97775 14.9607 1.85622 14.987 1.72394C15.0132 1.59165 14.9996 1.45456 14.948 1.33Z"
                fill="white"
                fillOpacity="0.5"
              />
            </svg>
          </div>
          <div className="flex items-center space-x-3">
            <label className="flex items-center scale-75 md:scale-100 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="dark-mode-toggle"
                  className="sr-only"
                  checked={isBet}
                  onChange={handleBet}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
      <div
        className={`bg-[#0E0F11] ${
          open
            ? "space-y-2 transition-all duration-300 ease-in-out"
            : "max-h-0  transition-all duration-300 ease-in-out"
        } px-2 md:px-6 py-4 md:py-8`}
      >
        {allBets?.length <= 0 ? (
          <>
            <div className="flex items-center justify-around md:justify-center space-x-5">
              <Placebet />
              <div>
                <div className="text-white text-[1rem] md:text-[1.2rem] font-semibold">
                  Place Your Bets
                </div>
                <div className="text-[.9rem] md:text-[1rem] text-opacity-70">
                  Your selection will appear in this area
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col gap-2 max-h-[40vh] overflow-y-scroll">
              {allBets?.map((item, index) => (
                <BetSlipCard key={index} betinfo={item} />
              ))}
            </div>
            <div className="w-full flex justify-between gap-2 px-2 py-4">
              {betAmount.map((item, index) => (
                <button
                  //   onClick={() => handleAmount(item)}
                  key={index}
                  className="rounded-full w-[20%] flex items-center justify-center bg-slate-800 py-2"
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-[#5c4b4b41] text-[#FFE500] border-[#FFE500] border-[1px] rounded-md"
            >
              Place Bet
            </button>
          </>
        )}
      </div>

      <div
        onClick={handelOpen}
        className={`${
          open ? "block" : "hidden"
        } cursor-pointer md:hidden transition w-full h-full z-[-5] fixed top-0 left-0`}
      ></div>
    </div>
  );
};

const BetSlipCard: React.FC<any> = ({ betinfo }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(betinfo.amount);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setAmount(newAmount);
    dispatch(updateBetAmount({ betId: betinfo.event_id, amount: newAmount }));
  };
  return (
    <div className="bg-[#32282892] border-[1px] border-[#dfdfdf34] rounded-md px-4 py-2">
      <div className="flex gap-2 text-sm font-medium text-[#ffffff]">
        <p>
          {betinfo.bet_on == "home_team"
            ? betinfo.home_team.name
            : betinfo.away_team.name}
        </p>
      </div>
      <p className="text-[#dfdfdf9a] font-light text-sm">
        <span>{betinfo.home_team.name}</span> V/S{" "}
        <span>{betinfo.away_team.name}</span>
      </p>
      <p className="text-[#dfdfdf9a] font-light text-sm">{betinfo.market}</p>
      <div className="grid grid-cols-4 items-center">
        <p className="text-md font-semibold col-span-3">
          {betinfo.bet_on == "home_team"
            ? betinfo.home_team.odds
            : betinfo.away_team.odds}
        </p>
        <input
          value={amount}
          onChange={handleAmountChange}
          type="number"
          className="px-6 py-1 text-md bg-gray-700 rounded-md outline-none appearance-none"
        ></input>
      </div>
    </div>
  );
};

export default QuickBet;
