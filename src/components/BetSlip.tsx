"use client";

import { deleteBet, updateBetAmount } from "@/lib/store/features/bet/betSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import CrossIcon from "./svg/CrossIcon";
import { useEffect, useState } from "react";
import { svgMap } from "./svg/SvgMap";

const BetSlip: React.FC<any> = ({ betinfo, betType }) => {
  const dispatch = useAppDispatch();
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
  };

  const handleRemove = (betId: string) => {
    setShow(false);
    setTimeout(() => {
      dispatch(deleteBet({ betId: betId }));
      setShow(true);
    }, 300);
  };
  return (
    <div
      className={`border-[1.5px] border-[#dfdfdf34] rounded-md flex items-stretch betslip ${
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
          <div className="relative w-[15px]">
            {IconComponent}
          </div>
          <p className="text-md font-normal">
            {betinfo.bet_on == "home_team"
              ? betinfo.home_team.name
              : betinfo.away_team.name}
          </p>
        </div>
        <p className="text-[#dfdfdf9a] font-light text-sm whitespace-nowrap overflow-clip">
          <span>{betinfo.home_team.name}</span> v/s{" "}
          <span>{betinfo.away_team.name}</span>
        </p>
        <p className="text-[#fff] font-medium text-sm">{betinfo.market}</p>
        <div className="grid grid-cols-4 items-center">
          <p className="text-xl font-semibold col-span-3">
            {betinfo.bet_on == "home_team"
              ? betinfo.home_team.odds
              : betinfo.away_team.odds}
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
    </div>
  );
};

export default BetSlip;
