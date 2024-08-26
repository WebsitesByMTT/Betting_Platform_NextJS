"use client";
import { GetPlayerBets, redeemPlayerBet } from "@/utils/actions";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import Modal from "./ui/Modal";

const MyBets = () => {
  const [myBets, setMyBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [betID, setBetID] = useState();
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const options = ["all", "pending", "won", "lost", "redeem"];

  const fetchBet = async () => {
    const response = await GetPlayerBets(selectedOption);
    console.log("My bets response", response);
    if (response?.error) {
      return toast.error(response.error || "Error fetching Bets");
    }
    setMyBets(response?.responseData);
  };

  useEffect(() => {
    fetchBet();
  }, [selectedOption]);

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
    setLoading(true);
    const response = await redeemPlayerBet(betId);
    setLoading(false);
    if (response?.error) {
      return toast.error(response.error);
    }
    toast.success(response?.responseData?.message);
    fetchBet();
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
      <div className="h-full overflow-y-scroll hideScrollBar">
        <table className="w-full mx-auto h-auto">
          <thead>
            <tr className="text-xl">
              <th className="font-semibold uppercase py-3">Date and Time</th>
              <th className="font-semibold uppercase py-3">Stake</th>
              <th className="font-semibold uppercase py-3">Odds</th>
              <th className="font-semibold uppercase py-3">Status</th>
              <th className="font-semibold uppercase py-3">Outcome</th>
              <th className="font-semibold uppercase py-3">Match Info.</th>
              <th className="font-semibold uppercase py-3">Type</th>
              <th className="font-semibold uppercase py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {myBets &&
              myBets.length > 0 &&
              myBets.flatMap((item) =>
                item.data.map((data: any, dataIndex: any) => (
                  <tr
                    key={`${item._id}-${dataIndex}`}
                    className="text-center font-extralight text-md hover:bg-[#8585851A]"
                  >
                    <td className="py-2">
                      {formatDateTime(data.commence_time)}
                    </td>
                    <td className="py-2">$ {item.amount}</td>
                    <td className="py-2">
                      {data.bet_on === "away_team"
                        ? data.away_team.odds
                        : data.home_team.odds}
                    </td>
                    <td className="py-2">{data.status}</td>
                    <td className="py-2">
                      {item.possibleWinningAmount.toFixed(3)}
                    </td>
                    <td className="py-2">
                      {data.home_team.name} v/s {data.away_team.name}
                    </td>
                    <td>{item.betType}</td>
                    <td>
                      <button
                        disabled={data.status === "redeem"}
                        className={`bg-[#d6405178] px-2 py-1 rounded-md text-sm ${
                          data.status === "redeem"
                            ? "text-gray-400 bg-[#3837376e]"
                            : ""
                        }`}
                        onClick={() => {
                          setOpen(true);
                          setBetID(item._id);
                        }}
                      >
                        Redeem
                      </button>
                    </td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
      {loading && <Loader />}
      {open && (
        <Modal
          text="Are you sure you want to redeem this bet?"
          buttonText="Redeem"
          id={betID}
          handler={handleRedeem}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default MyBets;
