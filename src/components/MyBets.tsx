"use client";
import { GetPlayerBets, redeemPlayerBet } from "@/utils/actions";
import { Mybet } from "@/utils/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyBets = () => {
  const [myBets, setMyBets] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const options = ["all", "live", "won", "lost"];

  useEffect(() => {
    const fetchBet = async () => {
      const response = await GetPlayerBets();
      if (response?.error) {
        return toast.error(response.error || "Error fetching Bets");
      }
      setMyBets(response?.responseData?.bets);
    };
    fetchBet();
  }, []);

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);

    const datePart = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours || 12;
    const timePart = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;

    return `${datePart} at ${timePart}`;
  };

  const handleRedeem = async (betId: string) => {
    const response = await redeemPlayerBet(betId);
  };

  return (
    <div className="z-[100] text-white h-full">
      <div className="w-full flex gap-5 py-6">
        {options.map((item, index) => (
          <button
            onClick={() => setSelectedOption(item)}
            className="text-white flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#ffffff0f] to-[#4e4e4e2f] border-t-[#D6A250] border-r-[#D6A250] border-r-[1px] border-t-[1px]"
            key={index}
          >
            {selectedOption === item && (
              <div className="h-full px-1 rounded-tl-lg rounded-bl-lg bg-gradient-to-b from-[#ECB800] to-[#58565D00]"></div>
            )}
            <p
              className={`text-lg font-medium whitespace-nowrap py-1 px-5 capitalize `}
            >
              {item}
            </p>
          </button>
        ))}
      </div>
      <div className="h-full overflow-y-scroll">
        <table className="w-full mx-auto h-full">
          <thead>
            <tr className="text-xl">
              <th className="font-semibold uppercase py-3">Date and Time</th>
              <th className="font-semibold uppercase py-3">Stake</th>
              <th className="font-semibold uppercase py-3">Odds</th>
              <th className="font-semibold uppercase py-3">Status</th>
              <th className="font-semibold uppercase py-3">Outcome</th>
              <th className="font-semibold uppercase py-3">Match Info.</th>
              <th className="font-semibold uppercase py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {myBets &&
              myBets?.map((item, index) => (
                <tr
                  key={index}
                  className="text-center font-extralight text-lg hover:bg-[#8585851A]"
                >
                  <td className="py-2">{formatDateTime(item.commence_time)}</td>
                  <td className="py-2">$ {item.amount}</td>
                  <td className="py-2">
                    {" "}
                    {item.bet_on === "away_team"
                      ? item.away_team.odds
                      : item.home_team.odds}
                  </td>
                  <td className="py-2">{item.status}</td>
                  <td className="py-2">{item.possibleWinningAmount}</td>
                  <td className="py-2">
                    {item.home_team.name} v/s {item.away_team.name}
                  </td>
                  <td>
                    <button className="bg-[#d6405178] px-2 py-1 rounded-md text-sm" onClick={() => handleRedeem(item._id)}>
                      Redeem
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBets;
