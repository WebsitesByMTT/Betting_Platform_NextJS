"use client";
import { GetPlayerBets } from "@/utils/actions";
import { Mybet } from "@/utils/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyBets = () => {
  const [myBets, setMyBets] = useState<Mybet[]>([]);
  useEffect(() => {
    const fetchBetch = async () => {
      const response = await GetPlayerBets();
      if (response?.error) {
        return toast.error(response.error || "Error fetching Bets");
      }
      setMyBets(response?.responseData?.Bets);
    };
    fetchBetch();
  }, []);

  return (
    <div className=" z-[100] text-white">
      <p className="text-center my-5 text-3xl"> MY BETS </p>
      <table className="w-full">
        <thead>
          <tr className="text-xl">
            <th className="font-medium">Created At</th>
            <th className="font-medium">Status</th>
            <th className="font-medium">Odds</th>
            <th className="font-medium">Match Info</th>
            <th className="font-medium">Amount</th>
            <th className="font-medium">Pick</th>
          </tr>
        </thead>
        <tbody>
          {myBets &&
            myBets?.map((item, index) => (
              <tr key={index} className="text-center font-light">
                <td>{item.commence_time}</td>
                <td>{item.status}</td>
                <td>
                  {" "}
                  {item.bet_on === "away_team"
                    ? item.away_team.odds
                    : item.home_team.odds}
                </td>
                <td>
                  {item.home_team.name} v/s {item.away_team.name}
                </td>
                <td>{item.amount}</td>
                <td>
                  {item.bet_on === "away_team"
                    ? item.away_team.name
                    : item.home_team.name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBets;
