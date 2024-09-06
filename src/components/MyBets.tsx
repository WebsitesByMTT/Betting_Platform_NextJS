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
import { useAppDispatch } from "@/lib/store/hooks";
import { setMyBets } from "@/lib/store/features/bet/betSlice";

const MyBets = () => {
  const [myBets, setmyBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [betID, setBetID] = useState();
  const dispatch = useAppDispatch();
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
    setmyBets(response?.responseData);
    dispatch(setMyBets(response?.responseData));
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
      fetchBet();
      return toast.error(response.error);
    }
    toast.success(response?.responseData?.message);
    fetchBet();
  };

  return (
    <div className="z-[100] text-white h-full">
      <div className="w-full overflow-auto flex gap-x-3  md:gap-5 py-3">
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
        <table className="w-[750px] md:w-[calc(100%-2rem)] mx-auto h-auto">
          <thead>
            <tr className="text-xl">
              {headers.map((item, index) => (
                <th
                  key={index}
                  className="font-extralight uppercase py-5 border-b-[1px] border-b-[#484848]"
                >
                  <div className="flex w-full items-center justify-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-sm md:text-base">{item.text}</span>
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
                      className={`text-center font-extralight hover:bg-[#8585851A]  border-[#414141] ${
                        data.status === "redeem"
                          ? "bg-[#121216]"
                          : " bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d]"
                      } border-t-[1px]  `}
                    >
                      <td className="w-[20%] py-2 md:py-4">
                        <div className="w-full flex flex-col gap-1 px-3">
                          <span
                            className={`${
                              data.status === "redeem"
                                ? "text-[#55545a]"
                                : "text-white"
                            } font-medium  text-left text-sm md:text-lg`}
                          >
                            {data.sport_title}
                          </span>
                          <span className="text-[9px]  md:text-[13px] text-left">
                            <span
                              className={
                                data.bet_on === "home_team"
                                  ? `${
                                      data.status === "redeem"
                                        ? "text-[#57555f]"
                                        : "text-[#FFC400]"
                                    }`
                                  : `${
                                      data.status === "redeem"
                                        ? "text-[#424149]"
                                        : "text-white"
                                    }`
                              }
                            >
                              {data.home_team.name}
                            </span>{" "}
                            <span
                              className={
                                data.status === "redeem"
                                  ? "text-[#424149]"
                                  : "text-white"
                              }
                            >
                              v/s
                            </span>{" "}
                            <span
                              className={
                                data.bet_on === "away_team"
                                  ? `${
                                      data.status === "redeem"
                                        ? "text-[#7b7984]"
                                        : "text-[#FFC400]"
                                    }`
                                  : `${
                                      data.status === "redeem"
                                        ? "text-[#424149]"
                                        : "text-white"
                                    }`
                              }
                            >
                              {data.away_team.name}
                            </span>
                          </span>
                          <span
                            className={`text-[9px] md:text-[11px] p-1  border-[1px] ${
                              data.status === "redeem"
                                ? "bg-[#17161f] text-[#56555d] border-[#353342]"
                                : "bg-[#303030] text-[#A1A1A1] border-[#414141] "
                            }  rounded-lg w-fit`}
                          >
                            {formatDateTime(data.commence_time)}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`${
                          data.status === "redeem" ? "text-[#555458]" : ""
                        } text-sm md:text-lg`}
                      >
                        $ {item.amount}
                      </td>
                      <td
                        className={`uppercase text-sm md:text-lg ${
                          data.status === "redeem" ? "text-[#555458]" : ""
                        }`}
                      >
                        {data.market}
                      </td>
                      <td className="text-sm md:text-lg">
                        <div className="flex flex-col gap-2">
                          <span
                            className={`${
                              data.status === "redeem"
                                ? "text-[#403f4b]"
                                : "text-gray-400"
                            } text-sm`}
                          >
                            {data.oddsFormat}
                          </span>
                          <span
                            className={`${
                              data.status === "redeem" ? "text-[#555458]" : ""
                            }`}
                          >
                            {data.bet_on === "away_team"
                              ? data.away_team.odds
                              : data.home_team.odds}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`${
                          data.status === "redeem" ? "text-[#555458]" : ""
                        } text-sm md:text-lg`}
                      >
                        {item.possibleWinningAmount.toFixed(3)}
                      </td>
                      <td
                        className={`text-sm ${
                          data.status ==="redeem"
                            ? "text-gray-500"
                            : "text-[#FF6A00]"
                        } md:text-lg capitalize `}
                      >
                        {data.status}
                      </td>
                      <td>
                        <button
                          disabled={data.status !== "pending"}
                          className={` px-4 py-1 rounded-lg text-sm md:text-lg ${
                            data.status !== "pending"
                              ? "text-gray-500"
                              : "text-[#00C8FF] bg-white bg-opacity-10"
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
                        }  hover:bg-[#8585851A] ${
                          data.status === "redeem"
                            ? "bg-[#121216]"
                            : " bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d]"
                        }`}
                      >
                        <td className="w-[20%] py-4">
                          <div className="w-full flex flex-col gap-1 px-3">
                            <span
                              className={`${
                                data.status === "redeem"
                                  ? "text-[#55545a]"
                                  : "text-white"
                              } font-medium text-left text-sm md:text-lg`}
                            >
                              {data.sport_title}
                            </span>
                            <span className="text-[10px] md:text-[13px] text-left">
                              <span
                                className={
                                  data.bet_on === "home_team"
                                    ? `${
                                        data.status === "redeem"
                                          ? "text-[#57555f]"
                                          : "text-[#FFC400]"
                                      }`
                                    : `${
                                        data.status === "redeem"
                                          ? "text-[#424149]"
                                          : "text-white"
                                      }`
                                }
                              >
                                {data.home_team.name}
                              </span>{" "}
                              <span
                                className={
                                  data.status === "redeem"
                                    ? "text-[#424149]"
                                    : "text-white"
                                }
                              >
                                v/s
                              </span>{" "}
                              <span
                                className={
                                  data.bet_on === "away_team"
                                    ? `${
                                        data.status === "redeem"
                                          ? "text-[#57555f]"
                                          : "text-[#FFC400]"
                                      }`
                                    : `${
                                        data.status === "redeem"
                                          ? "text-[#424149]"
                                          : "text-white"
                                      }`
                                }
                              >
                                {data.away_team.name}
                              </span>
                            </span>
                            <span
                              className={`text-[9px] md:text-[11px] p-1 ${
                                data.status === "redeem"
                                  ? "bg-[#17161f] text-[#56555d] border-[#353342]"
                                  : "bg-[#303030] text-[#A1A1A1] border-[#414141] "
                              } border-[1px]  rounded-lg w-fit`}
                            >
                              {formatDateTime(data.commence_time)}
                            </span>
                          </div>
                        </td>
                        <td className="text-sm md:text-lg text-gray-500">
                          --/--
                        </td>
                        <td
                          className={`uppercase text-sm md:text-lg ${
                            data.status === "redeem" ? "text-[#555458]" : ""
                          }`}
                        >
                          {data.market}
                        </td>
                        <td className="text-sm md:text-lg">
                          <div className="flex flex-col gap-2">
                            <span
                              className={`text-sm ${
                                data.status === "redeem"
                                  ? "text-[#403f4b]"
                                  : "text-gray-400"
                              }`}
                            >
                              {data.oddsFormat}
                            </span>
                            <span
                              className={`${
                                data.status === "redeem" ? "text-[#555458]" : ""
                              }`}
                            >
                              {data.bet_on === "away_team"
                                ? data.away_team.odds
                                : data.home_team.odds}
                            </span>
                          </div>
                        </td>
                        <td className="text-sm md:text-lg text-gray-500">
                          --/--
                        </td>
                        <td
                          className={`text-sm ${
                            data.status === "redeem"
                              ? "text-gray-500"
                              : "text-[#FF6A00]"
                          }  md:text-lg capitalize `}
                        >
                          {data.status}
                        </td>
                        <td className="text-gray-500">--/--</td>
                      </tr>
                    ))}
                    <tr className="text-center font-extralight bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d] border-[1px] border-[#f3aa357c]">
                      <td className="py-3"></td>
                      <td
                        className={`py-3 text-lf ${
                          item.status === "redeem"
                            ? "text-[#55545a]"
                            : "text-white"
                        }`}
                      >
                        $ {item.amount}
                      </td>
                      <td className="py-3"></td>
                      <td className="py-3"></td>
                      <td
                        className={`py-3 text-lf ${
                          item.status === "redeem"
                            ? "text-[#55545a]"
                            : "text-white"
                        }`}
                      >
                        {item.possibleWinningAmount.toFixed(3)}
                      </td>
                      <td
                        className={`text-sm ${
                          item.status === "redeem"
                            ? "text-gray-500"
                            : "text-[#FF6A00]"
                        } py-3 md:text-lg capitalize `}
                      >
                        {item.status}
                      </td>
                      <td className="py-3">
                        <button
                          disabled={item.status !== "pending"}
                          className={` px-4 py-1 rounded-lg text-sm md:text-lg ${
                            item.status !== "pending"
                              ? "text-gray-500"
                              : "text-[#00C8FF] bg-white  bg-opacity-10"
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
