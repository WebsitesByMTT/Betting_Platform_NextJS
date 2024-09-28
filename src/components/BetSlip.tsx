"use client";

import { deleteBet, updateBetAmount } from "@/lib/store/features/bet/betSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import CrossIcon from "./svg/CrossIcon";
import { useEffect, useState } from "react";
import { svgMap } from "./svg/SvgMap";
import { useSocket } from "./SocketProvider";
import { getOutright } from "@/lib/utils";

const BetSlip: React.FC<any> = ({ betinfo, betType }) => {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const [amount, setAmount] = useState(betinfo.amount);
  const [show, setShow] = useState(true);
  const [outright, setOutright] = useState(false);
  const [error, setError] = useState<string>("");
  const currentCategory = useAppSelector(
    (state) => state.sports.selectedCategory
  );
  const [betError, setBetError] = useState<{ message: string; type: string }[]>(
    []
  );
  const oddsMismatch = useAppSelector((state) => state.bet.oddsMismatch);
  const sportsCategories = useAppSelector((state) => state.sports.categories);
  const IconComponent = svgMap[currentCategory.toLowerCase()];

  useEffect(() => {
    setAmount(betinfo.amount);
  }, [betinfo]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setAmount(newAmount);
    dispatch(updateBetAmount({ betId: betinfo.id, amount: newAmount }));
    socket?.emit("bet", {
      action: "UPDATE_BET_AMOUNT",
      payload: { bet: betinfo, amount: newAmount },
    });
  };

  const handleRemove = (betId: string) => {
    setShow(false); // Hide UI element (e.g., loading indicator or modal)

    socket?.emit(
      "bet",
      {
        action: "REMOVE_FROM_BETSLIP",
        payload: { betId: betId },
      },
      (response: { status: string; message: string }) => {
        if (response.status === "success") {
          dispatch(deleteBet({ betId: betId }));
          setShow(true);
        } else {
          console.error("Failed to remove bet:", response.message);
          setError("Failed to remove bet");
          setShow(true); // Optionally show UI again, even on failure
        }
      }
    );
  };

  useEffect(() => {
    setOutright(getOutright(sportsCategories, betinfo.sport_title));
  }, [betinfo.sport_title]);

  useEffect(() => {
    setBetError(oddsMismatch);
  }, [oddsMismatch]);

  return (
    <div
      className={`border-[1.5px] px-2 relative border-[#dfdfdf34] rounded-md flex flex-col items-stretch betslip ${
        show ? "bet-slip-enter-active" : "bet-slip-exit-active"
      }`}
    >
      <div className="flex items-end justify-end">
        {/* remove button */}
        <button
          className="button group rounded-tl-md rounded-bl-md  whitespace-nowrap p-1 w-[1.5rem] transition-all -mx-1"
          onClick={() => {
            handleRemove(betinfo.id);
          }}
        >
          <CrossIcon />
        </button>
      </div>
      {/* bet data */}
      <div className="flex flex-col gap-1">
        {/* bet on and odds */}
        <div className="flex justify-between space-x-4 md:gap-2 text-md font-medium text-[#ffffff]">
          <p className="text-md font-normal">{betinfo.bet_on.name}</p>
          <p
            className={`text-md font-semibold col-span-3 ${
              betinfo.bet_on.odds > betinfo.bet_on.prevOdds
                ? "text-green-500 animate-pulse"
                : betinfo.bet_on.odds < betinfo.bet_on.prevOdds
                ? "text-red-500 animate-pulse"
                : "text-yellow-500"
            }`}
          >
            {betinfo.bet_on.odds}
          </p>
        </div>
        {/* market */}
        <div className="flex justify-between">
          <p className="text-[#dfdfdf9a] font-light text-sm overflow-clip uppercase">
            {betinfo.category}
          </p>
          {(betinfo.category === "totals" ||
            betinfo.category === "spreads") && (
            <p
              className={`text-[#dfdfdf9a] font-light text-sm overflow-clip uppercase ${
                betinfo?.bet_on?.points <= 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {betinfo?.bet_on?.points}
            </p>
          )}
        </div>
        {betinfo.category === "outrights" ? (
          <p className="text-[#dfdfdf9a] font-light text-sm overflow-clip">
            {betinfo.sport_title}
          </p>
        ) : (
          <p className="text-[#dfdfdf9a] font-light text-[12px] overflow-clip">
            <span>{betinfo.teams[0].name}</span> -{" "}
            <span>{betinfo.teams[1].name}</span>
          </p>
        )}
        <div>
          {betType === "single" && (
            <input
              value={amount}
              onChange={handleAmountChange}
              type="number"
              placeholder="Enter stake"
              className="py-1 text-md bg-gray-700 rounded-sm outline-none appearance-none col-span-1 betamount border-[1px] border-[#dfdfdf5a] w-full my-2 px-2"
            ></input>
          )}
        </div>
        {betType === "single" && (
          <div className="flex justify-between pb-1">
            <p className="text-sm">Possible win: </p>
            <p className="text-sm text-green-500">
              {(amount * betinfo.bet_on.odds).toFixed(2)} $
            </p>
          </div>
        )}
        {betinfo.bet_on.prevOdds !== betinfo.bet_on.odds && (
          <p className="text-[12px] pt-2 text-[#dfdfdf70]">
            Odds changed from{" "}
            <span className="text-white">{betinfo.bet_on.prevOdds}</span> to{" "}
            <span className="text-white">{betinfo.bet_on.odds}</span>
          </p>
        )}
        {error && <p className="text-red-500 text-[13px] italic">{error}</p>}
        {betError &&
          betType === "single" &&
          betError.map((err: any, index) => {
            return err.id === betinfo.id ? (
              <p key={index} className="text-red-500 text-[12px] italic">
                {err.message}
              </p>
            ) : null;
          })}
      </div>
      {/* Loader */}
      {betinfo.loading && (
        <div className="fixed z-[9999]  bg-black bg-opacity-50 top-0 left-0 w-full h-full">
          <div className="relative w-full h-full">
            <svg
              className="loader absolute top-[45%] left-[48%]"
              viewBox="25 25 50 50"
            >
              <circle r="20" cy="50" cx="50"></circle>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default BetSlip;
