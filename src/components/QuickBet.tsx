"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useRef, useState } from "react";
import { Bet } from "@/utils/types";
import { useSocket } from "./SocketProvider";
import toast from "react-hot-toast";
import Quickbet from "./svg/Quickbet";
import Placebet from "./svg/Placebet";
import Dropdown from "./svg/Dropdown";
import BetSlip from "./BetSlip";

const QuickBet = () => {
  const [isBet, setIsBet] = useState(false);
  const [open, setOpen] = useState(false);
  const [allBets, setAllBets] = useState<Bet[]>([]);
  const bets = useAppSelector((state) => state.bet.allbets);
  const { socket } = useSocket();

  const betsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setAllBets(bets);
  }, [bets]);

  const handelOpen = () => {
    setOpen(!open);
  };

  const betAmount = [50, 100, 200, 500];

  const handleSubmit = async () => {
    if (socket) {
      socket.emit(
        "bet",
        { action: "PLACE", payload: bets },
        (response: any) => {
          toast.success(response.message);
        }
      );
    } else {
      console.log("SOCKET NOT CONNECTED");
    }
  };

  useEffect(() => {
    if (betsContainerRef.current) {
      betsContainerRef.current.scrollTop =
        betsContainerRef.current.scrollHeight;
    }
  }, [allBets]);

  useEffect(() => {
    setOpen(true);
  }, [bets]);

  return (
    <div
      className={`transition-all text-white  ${
        open ? "bottom-0" : "-bottom-[2rem]"
      }  fixed  z-[100] md:right-10 right-auto w-[360px] max-h-[80vh]`}
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
              {allBets?.length > 0 && (
                <div className="bg-[#fff] rounded-full px-[6px]">
                  <p className="text-[#D71B21] font-semibold text-sm">
                    {allBets?.length}
                  </p>
                </div>
              )}
            </div>
            <Dropdown open={open} />
          </div>
        </div>
      </div>
      <div
        className={`bg-[#1b1a1a] ${
          open
            ? "space-y-2 transition-all duration-300 ease-in-out"
            : "max-h-0  transition-all duration-300 ease-in-out"
        } px-2  py-4 `}
      >
        {allBets?.length <= 0 ? (
          <>
            <div className="flex items-center justify-around md:justify-center space-x-5">
              <Placebet />
              <div>
                <div className="text-white text-[1rem] md:text-[1.2rem] font-medium">
                  Place Your Bets
                </div>
                <div className="text-sm text-opacity-70">
                  Your selection will appear in this area
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              ref={betsContainerRef}
              className="w-full flex flex-col gap-2 max-h-[40vh] overflow-y-scroll"
            >
              {allBets?.map((item, index) => (
                <BetSlip key={index} betinfo={item} />
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
              className="w-full py-2 text-[#fff] uppercase border-[#D71B21] border-2 font-semibold rounded-full bg-gradient-to-b from-[#d71b2163] to-[#7800047a] text-lg "
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

export default QuickBet;
