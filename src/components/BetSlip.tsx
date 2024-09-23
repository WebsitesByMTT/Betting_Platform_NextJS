"use client";

import { deleteBet, updateBetAmount } from "@/lib/store/features/bet/betSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import CrossIcon from "./svg/CrossIcon";
import { useEffect, useState } from "react";
import { svgMap } from "./svg/SvgMap";
import { useSocket } from "./SocketProvider";

const BetSlip: React.FC<any> = ({ betinfo, betType }) => {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const [amount, setAmount] = useState(betinfo.amount);
  const [show, setShow] = useState(true);
  const currentCategory = useAppSelector(
    (state) => state.sports.selectedCategory
  );
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
          // Now update the client state after receiving a success response from the server
          dispatch(deleteBet({ betId: betId }));
          setShow(true); // Show UI element again after successful removal
        } else {
          console.error("Failed to remove bet:", response.message);
          // Optionally show an error message or handle the failure case
          setShow(true); // Optionally show UI again, even on failure
        }
      }
    );
  };

  return (
    <div
      className={`border-[1.5px] relative border-[#dfdfdf34] rounded-md flex items-stretch betslip ${
        show ? "bet-slip-enter-active" : "bet-slip-exit-active"
      }`}
    >
      <button
        className="bg-[#2f2f2f] button group rounded-tl-md rounded-bl-md w-[15%] max-w-[2rem] whitespace-nowrap px-[0.4vw] lg:max-w-[3rem]  hover:bg-gradient-to-b from-[#d71b212b] to-[#7800047a] transition-all"
        onClick={() => {
          handleRemove(betinfo.id);
        }}
      >
        <CrossIcon />
      </button>
      <div className="px-3 py-2 w-[85%]">
        <div className="flex space-x-4 md:gap-2 text-sm font-medium text-[#ffffff]">
          <div className="relative w-[15px]">{IconComponent}</div>
          <p className="text-md font-normal">{betinfo.sport_title}</p>
        </div>
        <p className="text-[#dfdfdf9a] font-light text-sm overflow-clip">
          {betinfo?.teams?.map((data: any, index: number) => (
            <span
              className={
                betinfo.bet_on.name === data.name
                  ? "text-yellow-500"
                  : "text-[#dfdfdf9a]"
              }
              key={index}
            >
              {data.name}
              <span className="text-[#dfdfdf9a]">
                {" "}
                {index < betinfo.teams.length - 1 ? "v/s" : ""}{" "}
              </span>
            </span>
          ))}
        </p>
        <p className="text-[#fff] font-medium text-sm">{betinfo.market}</p>
        <div className="grid grid-cols-4 items-center">
          <p className="text-xl font-semibold col-span-3">
            {betinfo.bet_on.odds}
          </p>
          {betType === "single" && (
            <input
              value={amount}
              onChange={handleAmountChange}
              type="number"
              className="text-center py-1 text-sm bg-gray-700 rounded-md outline-none appearance-none col-span-1 betamount border-[1px] border-transparent"
            ></input>
          )}
        </div>
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
