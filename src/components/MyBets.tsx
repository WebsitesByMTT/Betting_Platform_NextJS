"use client";
import { GetPlayerBets, getScores, redeemPlayerBet } from "@/utils/actions";
import React, { useEffect, useRef, useState } from "react";
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
import { useAppSelector } from "@/lib/store/hooks";
import Back from "./svg/Back";
import { usePathname, useRouter } from "next/navigation";
import Footer from "./Footer";
import Dropdown from "./svg/Dropdown";

const MyBets = () => {
  const [myBets, setmyBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [betID, setBetID] = useState();
  const router = useRouter();
  const pathname = usePathname();
  const activeNotificationBetId = useAppSelector(
    (state) => state.bet.notificationBet
  );
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const [load, setLoad] = useState(false);
  const [pagecount, setPageCount] = useState(1);
  const [observerdata, setObserverData] = useState([]);
  const isMounted = useRef(false);
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const lastElementRef = useRef(null);
  const [openDropdownId, setOpenDropdownId] = useState({
    uniqueId: null,
    eventId: null,
  });
  const [scoresData, setScoresData] = useState<any>();
  const [scoresLoading, setScoresLoading] = useState(false);
  const triggeredByOptionChange = useRef(false);

  const options = [
    "all",
    "pending",
    "won",
    "lost",
    "redeem",
    "combo",
    "failed",
  ];
  const headers = [
    { icon: <Sport />, text: "sport" },
    { icon: <Bet />, text: "Stake" },
    { icon: <Market />, text: "Category" },
    { icon: <Odds />, text: "odds" },
    { icon: <Amount />, text: "Possible Winning" },
    { icon: <Status />, text: "status" },
    { icon: <Action />, text: "action" },
  ];

  const handelSelectedOption = (item: string) => {
    setSelectedOption(item);
    setPageCount(1);
    triggeredByOptionChange.current = true;

    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll
      });
    }
  };

  const fetchBet = async () => {
    try {
      setLoad(true);
      const response = await GetPlayerBets(selectedOption, pagecount, 10);
      console.log("DATA", response);

      if (response?.error) {
        return toast.error(response?.error || "Error fetching Bets");
      }
      if (triggeredByOptionChange.current) {
        // Clear previous data and replace with new data on option change
        setmyBets([...response?.responseData?.data]);
        triggeredByOptionChange.current = false; // Reset the flag
      } else {
        // Otherwise, append the new data (for infinite scrolling or pagination)
        setmyBets([...myBets, ...response?.responseData?.data]);
      }

      setObserverData(response?.responseData?.data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchBet();
  }, [selectedOption, pagecount]);

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);

    const datePart = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const element = document.getElementById(activeNotificationBetId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.style.backgroundColor = "#dfdfdf";
        element.style.opacity = "0.8";

        setTimeout(() => {
          element.style.backgroundColor = "transparent";
          element.style.opacity = "1";
        }, 500);
      }, 1500);
    }
  }, [pathname, isMounted.current, activeNotificationBetId]);

  // Use IntersectionObserver to detect when the last element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && observerdata?.length >= 10) {
          setPageCount((prevPageCount) => prevPageCount + 1);
        }
        ` `;
      },
      {
        threshold: 1,
      }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [observerdata]);

  //for fetching score
  useEffect(() => {
    const fetchScores = async () => {
      setScoresLoading(true);
      const scores = await getScores(openDropdownId?.eventId);
      setScoresLoading(false);
      if (scores?.error) {
        return toast.error(scores?.error);
      }
      setScoresData(scores);
    };
    fetchScores();
  }, [openDropdownId]);

  return (
    <>
      <div className="z-[100] text-white h-full w-full ">
        <button onClick={() => router.back()}>
          <Back />
        </button>
        <div className="w-full flex-wrap overflow-auto gap-y-2 md:gap-y-0 flex gap-x-2  md:gap-5 py-3">
          {options.map((item, index) => (
            <button
              onClick={() => handelSelectedOption(item)}
              className="text-white flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#ffffff0f] to-[#4e4e4e2f] border-t-[#D6A250] border-r-[#D6A250] border-r-[1px] border-t-[1px]"
              key={index}
            >
              {selectedOption === item && (
                <div className="h-full px-1 rounded-tl-lg rounded-bl-lg bg-gradient-to-b from-[#ECB800] to-[#58565D00]"></div>
              )}
              <p
                className={`text-sm  font-medium whitespace-nowrap py-1 ${
                  selectedOption === item ? "px-3" : "px-5"
                } capitalize `}
              >
                {item}
              </p>
            </button>
          ))}
        </div>
        <div
          ref={scrollableDivRef}
          className="lg:h-[calc(100vh-200px)] w-[96vw] md:w-full hideScrollBar border-[1px] border-[#484848]  rounded-2xl overflow-y-scroll scroll-smooth"
        >
          <table className=" overflow-x-scroll w-[750px] md:w-[calc(100%-2rem)] mx-auto h-auto">
            <thead>
              <tr className="text-xl">
                {headers.map((item, index) => (
                  <th
                    key={index}
                    className="font-extralight uppercase py-5 border-b-[1px] border-b-[#484848]"
                  >
                    <div className="flex w-full px-3 xl:px-0 xl:items-center xl:justify-center xl:gap-2">
                      <span className="hidden xl:block">{item?.icon}</span>
                      <span className="text-sm md:text-base">{item?.text}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myBets &&
                myBets?.length > 0 &&
                myBets?.flat()?.map((item, ind) =>
                  item?.betType === "single" ? (
                    item?.data?.map((data: any, dataIndex: any) => (
                      <>
                        <tr
                          id={item?._id}
                          key={`${item?._id}-${dataIndex}-single`}
                          className={`text-center font-extralight hover:bg-[#8585851A]  border-[#414141] ${
                            data?.status === "redeem"
                              ? "bg-[#121216]"
                              : " bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d]"
                          } border-t-[1px] transition-all duration-500 `}
                        >
                          <td className="w-[20%] py-2 md:py-4">
                            <div className="w-full flex flex-col gap-1 px-3">
                              <span
                                className={`${
                                  data?.status === "redeem"
                                    ? "text-[#55545a]"
                                    : "text-white"
                                } font-medium  text-left text-sm md:text-lg`}
                              >
                                {data?.sport_title}
                              </span>
                              <span
                                className={`text-[9px] md:text-[11px] p-1  border-[1px] ${
                                  data?.status === "redeem"
                                    ? "bg-[#17161f] text-[#56555d] border-[#353342]"
                                    : "bg-[#303030] text-[#A1A1A1] border-[#414141] "
                                }  rounded-lg w-fit`}
                              >
                                Placed On :{" "}
                                <span
                                  className={`${
                                    data?.status === "redeem"
                                      ? "text-gray-600"
                                      : "text-white"
                                  }  text-opacity-50 font-semibold`}
                                >
                                  {formatDateTime(data?.createdAt)}
                                </span>
                              </span>
                              {data?.bet_on?.name ? (
                                data.category === "outrights" ? (
                                  <span className="text-[9px]  md:text-[13px] text-left text-[#FFC400]">
                                    {data.bet_on?.name}
                                  </span>
                                ) : (
                                  <span className="text-[9px]  md:text-[13px] text-left">
                                    {data?.teams?.map(
                                      (team: any, index: number) => (
                                        <span
                                          key={index}
                                          className={
                                            data?.bet_on?.name === team?.name ||
                                            data?.bet_on?.name === "Draw"
                                              ? `${
                                                  data?.status === "redeem"
                                                    ? "text-[#57555f]"
                                                    : "text-[#FFC400]"
                                                }`
                                              : `${
                                                  data?.status === "redeem"
                                                    ? "text-[#424149]"
                                                    : "text-white"
                                                }`
                                          }
                                        >
                                          {team?.name}{" "}
                                          <span
                                            className={`${
                                              data?.status === "redeem"
                                                ? "text-[#424149]"
                                                : "text-white"
                                            }`}
                                          >
                                            {index < data?.teams?.length - 1
                                              ? "v/s"
                                              : ""}{" "}
                                          </span>
                                        </span>
                                      )
                                    )}
                                  </span>
                                )
                              ) : (
                                <span
                                  className={`text-[9px] md:text-[13px] text-left`}
                                >
                                  <span
                                    className={
                                      data?.bet_on === "home_team"
                                        ? "text-[#FFC400]"
                                        : ""
                                    }
                                  >
                                    {data?.home_team?.name}
                                  </span>{" "}
                                  v/s{" "}
                                  <span
                                    className={
                                      data?.bet_on === "away_team"
                                        ? "text-[#FFC400]"
                                        : ""
                                    }
                                  >
                                    {data?.away_team?.name}
                                  </span>
                                </span>
                              )}
                              <span
                                className={`text-[9px] md:text-[11px] p-1  border-[1px] ${
                                  data?.status === "redeem"
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
                              data?.status === "redeem" ? "text-[#555458]" : ""
                            } text-sm md:text-lg`}
                          >
                            $ {item.amount}
                          </td>
                          <td
                            className={`uppercase text-sm md:text-lg ${
                              data?.status === "redeem" ? "text-[#555458]" : ""
                            }`}
                          >
                            <div className="flex flex-col">
                              {data?.category ? (
                                <span>{data?.category}</span>
                              ) : (
                                <span>{data?.market}</span>
                              )}
                              <span
                                className={`text-[.84rem] ${
                                  data?.category == "h2h" && "hidden"
                                } text-opacity-60 text-white dark:text-black`}
                              >
                                {data?.bet_on?.points}
                              </span>
                            </div>
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
                              {data?.bet_on?.odds ? (
                                <span
                                  className={`${
                                    data.status === "redeem"
                                      ? "text-[#555458]"
                                      : ""
                                  }`}
                                >
                                  {data?.bet_on?.odds}
                                </span>
                              ) : (
                                <span
                                  className={`${
                                    data.status === "redeem"
                                      ? "text-[#555458]"
                                      : ""
                                  }`}
                                >
                                  {data?.bet_on === "away_team"
                                    ? data?.away_team?.odds
                                    : data?.home_team?.odds}
                                </span>
                              )}
                            </div>
                          </td>
                          <td
                            className={`${
                              data?.status === "redeem" ? "text-[#555458]" : ""
                            } text-sm md:text-lg`}
                          >
                            {item.possibleWinningAmount.toFixed(3)}
                          </td>
                          <td
                            className={`text-sm ${
                              data?.status === "redeem"
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
                                data?.status !== "pending"
                                  ? "text-gray-500"
                                  : "text-[#00C8FF] bg-white bg-opacity-10"
                              }`}
                              onClick={() => {
                                setOpen(true);
                                setBetID(item._id);
                              }}
                            >
                              Redeem
                            </button>
                            <button
                              disabled={data.status === "pending"}
                              className={`rotate-180 mx-2`}
                              onClick={() =>
                                data.status !== "pending" &&
                                setOpenDropdownId({
                                  uniqueId:
                                    openDropdownId.uniqueId === item._id
                                      ? null
                                      : item._id,
                                  eventId: data?.event_id,
                                })
                              }
                            >
                              <Dropdown />
                            </button>
                          </td>
                        </tr>
                        {openDropdownId.uniqueId === item._id && (
                          <>
                            <tr>
                              <td
                                className="font-light uppercase px-4"
                                colSpan={7}
                              >
                                Scores
                              </td>
                            </tr>
                            {!scoresLoading ? (
                              scoresData &&
                              scoresData.teams &&
                              scoresData.teams.length > 0 ? (
                                <tr>
                                  <td colSpan={7}>
                                    <div className="grid grid-cols-2 gap-4">
                                      {scoresData.teams.map((team: any) => (
                                        <div
                                          key={team._id}
                                          className="bg-gray-800 p-4 rounded"
                                        >
                                          <div className="font-extralight text-[#FFC400]">
                                            {team.name}
                                          </div>
                                          <div className="font-semibold">
                                            {team.score}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </td>
                                </tr>
                              ) : (
                                <tr>
                                  <td
                                    className="font-light text-[#FFC400] text-center"
                                    colSpan={7}
                                  >
                                    Scores not available
                                  </td>
                                </tr>
                              )
                            ) : (
                              <tr>
                                <td colSpan={7}>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-800 p-4 py-10 rounded animatePulse"></div>
                                    <div className="bg-gray-800 p-4 py-10 rounded animatePulse"></div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        )}
                      </>
                    ))
                  ) : (
                    <>
                      <tr>
                        <td className="bg-black px-5 py-1 rounded-tl-2xl border-[#f3aa3589] border-x-[1px] border-b-[1px] rounded-tr-2xl  inline-block mt-2">
                          Combo
                        </td>
                      </tr>
                      {item?.data?.map((data: any, dataIndex: any) => (
                        <>
                          <tr
                            id={item._id}
                            key={`${item._id}-${dataIndex}-combo`}
                            className={`${
                              dataIndex === 0 ? "border-t-[1px]" : ""
                            } text-center font-extralight border-[#f3aa3589] border-x-[1px] border-b-[1px] ${
                              dataIndex === item?.data?.length - 1
                                ? "border-b-[#d8d2d2a3]"
                                : "border-b-[#414141]"
                            }  hover:bg-[#8585851A] ${
                              data?.status === "redeem"
                                ? "bg-[#121216]"
                                : " bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d]"
                            }`}
                          >
                            <td className="w-[20%] py-4">
                              <div className="w-full flex flex-col gap-1 px-3">
                                <span
                                  className={`${
                                    data?.status === "redeem"
                                      ? "text-[#55545a]"
                                      : "text-white"
                                  } font-medium text-left text-sm md:text-lg`}
                                >
                                  {data.sport_title}
                                </span>
                                <span
                                  className={`text-[9px] md:text-[11px] p-1  border-[1px] ${
                                    data?.status === "redeem"
                                      ? "bg-[#17161f] text-[#56555d] border-[#353342]"
                                      : "bg-[#303030] text-[#A1A1A1] border-[#414141] "
                                  }  rounded-lg w-fit`}
                                >
                                  Placed On :{" "}
                                  <span
                                    className={`${
                                      data?.status === "redeem"
                                        ? "text-gray-600"
                                        : "text-white"
                                    }  text-opacity-50 font-semibold`}
                                  >
                                    {formatDateTime(data?.createdAt)}
                                  </span>
                                </span>
                                {data?.bet_on?.name ? (
                                  data.category === "outrights" ? (
                                    <span className="text-[9px]  md:text-[13px] text-left text-[#FFC400]">
                                      {data.bet_on?.name}
                                    </span>
                                  ) : (
                                    <span className="text-[9px]  md:text-[13px] text-left">
                                      {data?.teams?.map(
                                        (team: any, index: number) => (
                                          <span
                                            key={index}
                                            className={
                                              data?.bet_on?.name ===
                                                team?.name ||
                                              data?.bet_on?.name === "Draw"
                                                ? `${
                                                    data?.status === "redeem"
                                                      ? "text-[#57555f]"
                                                      : "text-[#FFC400]"
                                                  }`
                                                : `${
                                                    data?.status === "redeem"
                                                      ? "text-[#424149]"
                                                      : "text-white"
                                                  }`
                                            }
                                          >
                                            {team?.name}{" "}
                                            <span
                                              className={`${
                                                data?.status === "redeem"
                                                  ? "text-[#424149]"
                                                  : "text-white"
                                              }`}
                                            >
                                              {index < data?.teams?.length - 1
                                                ? "v/s"
                                                : ""}{" "}
                                            </span>
                                          </span>
                                        )
                                      )}
                                    </span>
                                  )
                                ) : (
                                  <span
                                    className={`text-[9px] md:text-[13px] text-left`}
                                  >
                                    <span
                                      className={
                                        data?.bet_on === "home_team"
                                          ? "text-[#FFC400]"
                                          : ""
                                      }
                                    >
                                      {data?.home_team?.name}
                                    </span>{" "}
                                    v/s{" "}
                                    <span
                                      className={
                                        data?.bet_on === "away_team"
                                          ? "text-[#FFC400]"
                                          : ""
                                      }
                                    >
                                      {data?.away_team?.name}
                                    </span>
                                  </span>
                                )}
                                <span
                                  className={`text-[9px] md:text-[11px] p-1 ${
                                    data?.status === "redeem"
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
                                data?.status === "redeem"
                                  ? "text-[#555458]"
                                  : ""
                              }`}
                            >
                              <div className="flex flex-col">
                                {data?.category ? (
                                  <span>{data?.category}</span>
                                ) : (
                                  <span>{data?.market}</span>
                                )}
                                <span
                                  className={`text-[.84rem] ${
                                    data.category == "h2h" && "hidden"
                                  } text-opacity-60 text-white dark:text-black`}
                                >
                                  {data?.bet_on?.points}
                                </span>
                              </div>
                            </td>
                            <td className="text-sm md:text-lg">
                              <div className="flex flex-col gap-2">
                                <span
                                  className={`${
                                    data?.status === "redeem"
                                      ? "text-[#403f4b]"
                                      : "text-gray-400"
                                  } text-sm`}
                                >
                                  {data.oddsFormat}
                                </span>
                                {data?.bet_on?.odds ? (
                                  <span
                                    className={`${
                                      data.status === "redeem"
                                        ? "text-[#555458]"
                                        : ""
                                    }`}
                                  >
                                    {data?.bet_on?.odds}
                                  </span>
                                ) : (
                                  <span
                                    className={`${
                                      data.status === "redeem"
                                        ? "text-[#555458]"
                                        : ""
                                    }`}
                                  >
                                    {data?.bet_on === "away_team"
                                      ? data?.away_team?.odds
                                      : data?.home_team?.odds}
                                  </span>
                                )}
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
                            <td className="text-sm md:text-lg text-gray-500">
                              <button
                                disabled={data.status === "pending"}
                                className={`rotate-180 mx-2`}
                                onClick={() =>
                                  setOpenDropdownId({
                                    uniqueId:
                                      openDropdownId.uniqueId === data._id
                                        ? null
                                        : data._id,
                                    eventId: data?.event_id,
                                  })
                                }
                              >
                                <Dropdown />
                              </button>
                            </td>
                          </tr>
                          {openDropdownId.uniqueId === data._id && (
                            <>
                              <tr>
                                <td
                                  className="font-light uppercase px-4 border-[#f3aa3589] border-x-[1px]"
                                  colSpan={7}
                                >
                                  Scores
                                </td>
                              </tr>
                              {!scoresLoading ? (
                                scoresData &&
                                scoresData.teams &&
                                scoresData.teams.length > 0 ? (
                                  <tr className="border-[#f3aa3589] border-x-[1px]">
                                    <td colSpan={7}>
                                      <div className="grid grid-cols-2 gap-4">
                                        {scoresData.teams.map((team: any) => (
                                          <div
                                            key={team._id}
                                            className="bg-gray-800 p-4 rounded"
                                          >
                                            <div className="font-extralight text-[#FFC400]">
                                              {team.name}
                                            </div>
                                            <div className="font-semibold">
                                              {team.score}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </td>
                                  </tr>
                                ) : (
                                  <tr>
                                    <td
                                      className="font-light text-[#FFC400] text-center border-[#f3aa3589] border-x-[1px]"
                                      colSpan={7}
                                    >
                                      Scores not available
                                    </td>
                                  </tr>
                                )
                              ) : (
                                <tr className="border-[#f3aa3589] border-x-[1px]">
                                  <td colSpan={7}>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="bg-gray-800 p-4 py-10 rounded animatePulse"></div>
                                      <div className="bg-gray-800 p-4 py-10 rounded animatePulse"></div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          )}
                        </>
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
                            item?.status === "redeem"
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
                              item?.status !== "pending"
                                ? "text-gray-500"
                                : "text-[#00C8FF] bg-white  bg-opacity-10"
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
                    </>
                  )
                )}
            </tbody>
          </table>
          <div ref={lastElementRef} style={{ height: "4px", width: "100%" }} />
          {load &&
            Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-700 mt-2 bg-opacity-30 rounded-lg w-[98%] mx-auto h-[8%] animate-pulse"
              ></div>
            ))}
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
      <div className="lg:hidden">
        <Footer />
      </div>
    </>
  );
};

export default MyBets;
