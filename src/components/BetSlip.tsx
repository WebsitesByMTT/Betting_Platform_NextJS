"use client";

import { deleteBet, updateBetAmount } from "@/lib/store/features/bet/betSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import CrossIcon from "./svg/CrossIcon";
import Image from "next/image";
import { useState } from "react";

const BetSlip: React.FC<any> = ({ betinfo }) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(betinfo.amount);
  const currentCategory = useAppSelector(
    (state) => state.sports.selectedCategory
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setAmount(newAmount);
    dispatch(updateBetAmount({ betId: betinfo.id, amount: newAmount }));
  };

  return (
    <div className="border-[1.5px] border-[#dfdfdf34] rounded-md flex items-stretch">
      <button
        className="bg-[#2f2f2f] group rounded-tl-md rounded-bl-md w-[25%] whitespace-nowrap px-2 hover:bg-gradient-to-b from-[#d71b2163] to-[#7800047a] transition-all"
        onClick={() => {
          dispatch(deleteBet({ betId: betinfo.id }));
        }}
      >
        <CrossIcon />
      </button>
      <div className="px-3 py-2">
        <div className="flex gap-2 text-sm font-medium text-[#ffffff]">
          <div className="relative w-[15px]">
            <Image
              src={`/assets/image/sidebar/${currentCategory
                .toLowerCase()
                .replace(/\s+/g, "-")}.svg`}
              fill
              alt={currentCategory}
            />
          </div>
          <p className="text-md font-normal">
            {betinfo.bet_on == "home_team"
              ? betinfo.home_team.name
              : betinfo.away_team.name}
          </p>
        </div>
        <p className="text-[#dfdfdf9a] font-light text-sm">
          <span>{betinfo.home_team.name}</span> v/s{" "}
          <span>{betinfo.away_team.name}</span>
        </p>
        <p className="text-[#fff] font-medium text-sm">{betinfo.market}</p>
        <div className="grid grid-cols-4 items-center">
          <p className="text-xl font-semibold col-span-3 py-2">
            {betinfo.bet_on == "home_team"
              ? betinfo.home_team.odds
              : betinfo.away_team.odds}
          </p>
          <input
            value={amount}
            onChange={handleAmountChange}
            type="number"
            className="text-center py-1 text-md bg-gray-700 rounded-md outline-none appearance-none col-span-1"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
