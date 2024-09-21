"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useRef, useState } from "react";
import { BetDetails } from "@/utils/types";
import { useSocket } from "./SocketProvider";
import toast from "react-hot-toast";
import Quickbet from "./svg/Quickbet";
import Placebet from "./svg/Placebet";
import Dropdown from "./svg/Dropdown";
import DeleteIcon from "./svg/DeleteIcon";
import BetSlip from "./BetSlip";
import {
  calculatePotentialWin,
  calculateTotalBetAmount,
  calculateTotalOdds,
  deleteAllBets,
  updateAllBetsAmount,
} from "@/lib/store/features/bet/betSlice";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "@/utils/utils";
import Error from "./svg/Error";

const QuickBet = () => {
  const [open, setOpen] = useState(false);
  const [allBets, setAllBets] = useState<BetDetails[]>([]);
  const [currentBetType, setCurrentBetType] = useState<String>("single");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [retryBetMessage, setRetryBetMessage] = useState<boolean>();
  const [comboBetAmount, setCombobetAmount] = useState<any>(100);
  const potentialWin = useAppSelector((state) => state.bet.potentialWin);
  const totalBetAmount = useAppSelector((state) => state.bet.totalBetAmount);
  const totalBetOdds = useAppSelector((state) => state.bet.totalOdds);
  const bets = useAppSelector((state) => state.bet.allbets);
  const oddsMismatch = useAppSelector((state) => state.bet.oddsMismatch);

  const myBets = useAppSelector((state) => state.bet.myBets);
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const betsContainerRef = useRef<HTMLDivElement | null>(null);

  const betAmount = [20, 50, 100, 500];
  const betType = ["single", "combo"];

  const hasDuplicateEventIds = () => {
    if (currentBetType === "single") return false;
    const betPairs = bets.map((bet) => `${bet.event_id}-${bet.category}`);
    const betPairsSet = new Set(betPairs);

    return betPairs.length !== betPairsSet.size;
  };

  useEffect(() => {
    setAllBets(bets);
    if (bets.length <= 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }

    //Do not place combo bet if length of bet is less than 1
    if (bets.length <= 1) {
      setCurrentBetType("single");
    }
    setDisabled(hasDuplicateEventIds());
    //calculate all the values whenevr bet changes
    dispatch(calculateTotalOdds());
    dispatch(calculateTotalBetAmount());
    dispatch(
      calculatePotentialWin({
        betType: currentBetType,
        comboBetAmount: comboBetAmount,
      })
    );
  }, [bets]);

  const handleSubmit = async () => {
    if (comboBetAmount <= 0) {
      return toast.error("Betting Amount can't be zero");
    }
    let playerId: string = "";
    const token = await getCookie();
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      playerId = decodedToken?.userId;
    }
    //format bets before sending
    const finalbets: any = {
      player: playerId,
      data: allBets,
      amount: currentBetType === "single" ? 0 : comboBetAmount,
      betType: currentBetType,
    };
    if (socket) {
      socket.emit("bet", { action: "PLACE", payload: finalbets });
    } else {
      console.log("SOCKET NOT CONNECTED");
    }
    // dispatch(deleteAllBets());
  };

  //calculate all amounts when tabs switch between combo and single
  useEffect(() => {
    setDisabled(hasDuplicateEventIds());
    dispatch(
      calculatePotentialWin({
        betType: currentBetType,
        comboBetAmount: comboBetAmount,
      })
    );
    dispatch(calculateTotalBetAmount());
    dispatch(calculateTotalOdds());
  }, [currentBetType]);

  const handleAmount = (amount: number) => {
    if (currentBetType === "combo") {
      setCombobetAmount(amount);
      calculatePotentialWin({
        betType: currentBetType,
        comboBetAmount: amount,
      });
    }
    dispatch(updateAllBetsAmount({ amount: amount }));
  };

  //delete all bets
  const handleDelete = () => {
    dispatch(deleteAllBets());
  };
  useEffect(() => {
    if (oddsMismatch) {
      setRetryBetMessage(true);
    }
  }, [oddsMismatch]);
  //scroll to bottom when new bet is added to show latest bet
  useEffect(() => {
    if (betsContainerRef.current) {
      betsContainerRef.current.scrollTop =
        betsContainerRef.current.scrollHeight;
    }
  }, [allBets]);
  console.log(oddsMismatch, "odds");

  return (
    <div
      className={`transition-all text-white  ${
        open ? "bottom-0" : "-bottom-[1rem]"
      }  fixed  z-[100] md:right-10 right-auto w-[96%] md:w-[360px] max-h-[80vh]`}
    >
      <div
        onClick={() => {
          setOpen(!open);
        }}
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
                    {disabled ? (
                      <span className="px-[2.5px]">!</span>
                    ) : (
                      <span>{allBets?.length}</span>
                    )}
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
        } px-2  py-2 `}
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
            <div className="flex text-md">
              {betType?.map((item, index) => (
                <button
                  key={index}
                  disabled={bets.length < 2 && item === "combo"}
                  onClick={() => setCurrentBetType(item)}
                  className={`flex-1 py-1 border-b-[2px] capitalize transition-all disabled:text-[#dfdfdf6f] ${
                    item === currentBetType
                      ? "border-b-[#Bf141a]"
                      : "border-transparent"
                  } `}
                >
                  {item}
                </button>
              ))}
            </div>
            {disabled && (
              <div className="flex gap-2 px-2">
                <div>
                  <Error />
                </div>
                <p className="text-sm text-red-500">Error</p>
              </div>
            )}
            <div
              ref={betsContainerRef}
              className={`w-full flex flex-col ${
                disabled ? "border-[1px] rounded-lg border-[#D96C4B]" : ""
              } ${
                currentBetType === "combo" ? "gap-0" : "gap-2"
              }  max-h-[calc(40vh-90px)] overflow-y-scroll`}
            >
              {allBets?.map((item, index) => (
                <BetSlip key={index} betinfo={item} betType={currentBetType} />
              ))}
            </div>
            {disabled && (
              <p className="text-[12px] text-red-500 italic text-right">
                {currentBetType === "single"
                  ? "Can't place this bet"
                  : "Can't place bet on this combo"}
              </p>
            )}
            {currentBetType === "combo" && (
              <input
                value={comboBetAmount}
                onChange={(e) => {
                  setCombobetAmount(e.target.value);
                  dispatch(
                    calculatePotentialWin({
                      betType: currentBetType,
                      comboBetAmount: parseInt(e.target.value) || 0,
                    })
                  );
                }}
                type="number"
                className="text-right py-1 px-3 text-sm bg-black rounded-md outline-none appearance-none w-full betamount border-[1px] border-transparent"
              ></input>
            )}
            <div className="w-full flex justify-between gap-2 px-2 py-1">
              {betAmount.map((item, index) => (
                <button
                  onClick={() => handleAmount(item)}
                  key={index}
                  className="rounded-md w-[20%] text-sm flex items-center justify-center bg-gradient-to-b border-[1px] border-[#3A3A3A] from-[#0000004D] to-[#5F63684D] py-1"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="space-y-1 py-4">
              {currentBetType === "combo" && (
                <div className="flex px-2 text-sm text-[#dfdfdfa8]">
                  <p className="flex-1">Total Odds</p>
                  <p className="flex-1 text-right">{totalBetOdds.toFixed(3)}</p>
                </div>
              )}
              {currentBetType === "single" && (
                <div className="flex px-2 text-sm text-[#dfdfdfa8]">
                  <p className="flex-1">Total Bet</p>
                  <p className="flex-1 text-right">{totalBetAmount} $</p>
                </div>
              )}
              <div className="flex px-2 text-sm">
                <p className="flex-1 uppercase">Potential win</p>
                <p className="flex-1 text-right">{potentialWin.toFixed(1)} $</p>
              </div>
            </div>
            <div className="text-red-700 ">
              {retryBetMessage && (
                <span className="block sm:inline">
                  The odds for cuurent bets have changed, please retry!
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="w-fit px-4 py-1 text-[#fff]  uppercase border-[#3A3A3A] border-2 font-semibold rounded-md bg-gradient-to-b from-[#0000004D] to-[#5F63684D] text-lg "
              >
                <DeleteIcon />
              </button>

              <button
                disabled={disabled}
                onClick={handleSubmit}
                className="w-full py-1 text-[#fff] uppercase border-[#D71B21] border-2 font-semibold rounded-full bg-gradient-to-b from-[#d71b2163] to-[#7800047a] text-lg "
              >
                {retryBetMessage ? "RETRY" : "PLACE BET"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuickBet;
