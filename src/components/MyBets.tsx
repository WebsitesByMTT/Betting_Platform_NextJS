"use client";
import { GetPlayerBets, redeemPlayerBet } from "@/utils/actions";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import Modal from "./ui/Modal";
import Sport from "./svg/mybets/Sport";
import Bet from "./svg/mybets/Bet";
import Market from "./svg/mybets/Market";
import Odds from "./svg/mybets/Odds";
import Amount from "./svg/mybets/Amount";
import Status from "./svg/mybets/Status";
import Action from "./svg/mybets/Action";

const MyBets = () => {
  const [myBets, setMyBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [betID, setBetID] = useState();
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const options = ["all", "pending", "won", "lost", "redeem", "combo"];
  const headers = [
    { icon: <Sport />, text: "sport" },
    { icon: <Bet />, text: "bet" },
    { icon: <Market />, text: "market" },
    { icon: <Odds />, text: "odds" },
    { icon: <Amount />, text: "amount won" },
    { icon: <Status />, text: "status" },
    { icon: <Action />, text: "action" },
  ];

  const fetchBet = async () => {
    const response = await GetPlayerBets(selectedOption);
    if (response?.error) {
      return toast.error(response.error || "Error fetching Bets");
    }
    console.log(response);
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
    console.log("MYBETS", response);
    toast.success(response?.responseData?.message);
    fetchBet();
  };

  return (
    <div className="z-[100] text-white h-full">
      <div className="w-full flex gap-5 py-3">
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
              className={`text-sm lg:text-lg font-medium whitespace-nowrap py-1 ${
                selectedOption === item ? "px-3" : "px-5"
              } capitalize `}
            >
              {item}
            </p>
          </button>
        ))}
      </div>
      <div className="h-[calc(100%-13vh)] hideScrollBar border-[1px] border-[#484848] rounded-2xl overflow-y-scroll">
        <table className="w-[calc(100%-2rem)] mx-auto h-auto">
          <thead>
            <tr className="text-xl">
              {headers.map((item, index) => (
                <th
                  key={index}
                  className="font-light uppercase py-5 border-b-[1px] border-b-[#484848]"
                >
                  <div className="flex w-full items-center justify-center gap-2">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {myBets &&
              myBets.length > 0 &&
              myBets.map((item) =>
                item.betType === "single" ? (
                  item.data.map((data: any, dataIndex: any) => (
                    <tr
                      key={`${item._id}-${dataIndex}-single`}
                      className="text-center font-extralight hover:bg-[#8585851A] bg-gradient-to-b border-[#414141] border-t-[1px]  from-[#1c1a2176] to-[#0d0c156d]"
                    >
                      <td className="w-[20%] py-4">
                        <div className="w-full flex flex-col gap-1 px-3">
                          <span className="font-medium text-left text-lg">
                            {data.sport_title}
                          </span>
                          <span className="text-[13px] text-left">
                            <span
                              className={
                                data.bet_on === "home_team"
                                  ? "text-[#FFC400]"
                                  : "text-white"
                              }
                            >
                              {data.home_team.name}
                            </span>{" "}
                            v/s{" "}
                            <span
                              className={
                                data.bet_on === "away_team"
                                  ? "text-[#FFC400]"
                                  : "text-white"
                              }
                            >
                              {data.away_team.name}
                            </span>
                          </span>
                          <span className="text-[11px] p-1 text-[#A1A1A1] border-[1px] border-[#414141] bg-[#303030] rounded-lg w-fit">
                            {formatDateTime(data.commence_time)}
                          </span>
                        </div>
                      </td>
                      <td className="text-lg">$ {item.amount}</td>
                      <td className="uppercase text-lg">{data.market}</td>
                      <td className="text-lg">
                        <div className="flex flex-col gap-2">
                          <span className="text-gray-400 text-sm">
                            {data.oddsFormat}
                          </span>
                          <span>
                            {data.bet_on === "away_team"
                              ? data.away_team.odds
                              : data.home_team.odds}
                          </span>
                        </div>
                      </td>
                      <td className="text-lg">
                        {item.possibleWinningAmount.toFixed(3)}
                      </td>
                      <td className="text-lg capitalize text-[#FF6A00]">
                        {data.status}
                      </td>
                      <td>
                        <button
                          disabled={data.status === "redeem"}
                          className={` px-2 py-1 rounded-md text-lg ${
                            data.status === "redeem"
                              ? "text-gray-400"
                              : "text-[#00C8FF]"
                          }`}
                          onClick={() => {
                            setOpen(true);
                            setBetID(item._id);
                          }}
                        >
                          Redeem Bet
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    {item.data.map((data: any, dataIndex: any) => (
                      <tr
                        key={`${item._id}-${dataIndex}-combo`}
                        className={`${
                          dataIndex === 0 ? "border-t-[1px]" : ""
                        } text-center font-extralight border-[#f3aa3589] border-x-[1px] border-b-[1px] ${
                          dataIndex === item.data.length - 1
                            ? "border-b-[#d8d2d2a3]"
                            : "border-b-[#414141]"
                        }  hover:bg-[#8585851A] bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d]`}
                      >
                        <td className="w-[20%] py-4">
                          <div className="w-full flex flex-col gap-1 px-3">
                            <span className="font-medium text-left text-lg">
                              {data.sport_title}
                            </span>
                            <span className="text-[13px] text-left">
                              <span
                                className={
                                  data.bet_on === "home_team"
                                    ? "text-[#FFC400]"
                                    : "text-white"
                                }
                              >
                                {data.home_team.name}
                              </span>{" "}
                              v/s{" "}
                              <span
                                className={
                                  data.bet_on === "away_team"
                                    ? "text-[#FFC400]"
                                    : "text-white"
                                }
                              >
                                {data.away_team.name}
                              </span>
                            </span>
                            <span className="text-[11px] p-1 text-[#A1A1A1] border-[1px] border-[#414141] bg-[#303030] rounded-lg w-fit">
                              {formatDateTime(data.commence_time)}
                            </span>
                          </div>
                        </td>
                        <td className="text-lg text-gray-500">--/--</td>
                        <td className="uppercase text-lg">{data.market}</td>
                        <td className="text-lg">
                          <div className="flex flex-col gap-2">
                            <span className="text-gray-400 text-sm">
                              {data.oddsFormat}
                            </span>
                            <span>
                              {data.bet_on === "away_team"
                                ? data.away_team.odds
                                : data.home_team.odds}
                            </span>
                          </div>
                        </td>
                        <td className="text-lg text-gray-500">--/--</td>
                        <td className="text-lg capitalize text-[#FF6A00]">
                          {data.status}
                        </td>
                        <td className="text-gray-500">--/--</td>
                      </tr>
                    ))}
                    <tr className="text-center font-extralight bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d] border-[1px] border-[#f3aa357c]">
                      <td className="py-3"></td>
                      <td className="py-3 text-lf">$ {item.amount}</td>
                      <td className="py-3"></td>
                      <td className="py-3"></td>
                      <td className="py-3 text-lf">
                        {item.possibleWinningAmount.toFixed(3)}
                      </td>
                      <td className="py-3 text-lg capitalize text-[#FF6A00]">
                        {item.status}
                      </td>
                      <td className="py-3">
                        <button
                          disabled={item.status === "redeem"}
                          className={` px-2 py-1 rounded-md text-lg ${
                            item.status === "redeem"
                              ? "text-gray-400"
                              : "text-[#00C8FF]"
                          }`}
                          onClick={() => {
                            setOpen(true);
                            setBetID(item._id);
                          }}
                        >
                          Redeem Bet
                        </button>
                      </td>
                    </tr>
                  </>
                )
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
