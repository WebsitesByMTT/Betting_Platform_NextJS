"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import Sports from "./svg/sidebar/Sports";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setCategories,
  setEvents,
  setSelectedCategory,
  setSelectedEvent,
} from "@/lib/store/features/sports/sportsSlice";
import Logo from "./svg/Logo";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [sports, setSports] = useState<string[]>();
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  //sports categories for sidebar from redux
  const sportsCategories = useAppSelector((state) => state?.sports.categories);
  const currentCategory = useAppSelector(
    (state) => state?.sports?.selectedCategory
  );

  //rendering sidebar categories
  useEffect(() => {
    setSports(sportsCategories);
  }, [sportsCategories]);

  //phone screen toggle
  const handeltoggle = () => {
    setToggle(!toggle);
  };

  //event for all the categories for sidebar from socket
  const fetchSports = () => {
    if (socket) {
      socket.emit("data", { action: "CATEGORIES" });
    } else {
      console.warn("Socket is not connected");
    }
  };

  useEffect(() => {
    if (socket) {
      fetchSports();
    }
  }, [socket]);
  //event for a specific sports category
  const fetchCategoryEvents = (category: any) => {
    dispatch(setSelectedCategory(category));
    if (socket) {
      socket.emit("data", {
        action: "CATEGORY_SPORTS",
        payload: category,
      });
    } else {
      console.warn("Socket is not connected");
    }
  };

  //handle response from the socket and set in redux accordingly
  useEffect(() => {
    const handleData = (data: any) => {
      switch (data.type) {
        case "CATEGORIES":
          dispatch(setCategories(data.data));
          break;
        case "CATEGORY_SPORTS":
          dispatch(setEvents(data.data));
          break;
        default:
          break;
      }
    };

    if (socket) {
      socket.on("data", handleData);
    }

    return () => {
      if (socket) {
        socket.off("data", handleData);
      }
    };
  }, [socket, dispatch]);

  //sidebar list
  const sidebar = [
    {
      id: 1,
      title: "sports",
      icon: <Sports />,
      subTitle: sports,
    },
  ];

  return (
    <div>
      <div
        className={`absolute left-5 top-4 lg:hidden cursor-pointer text-white ${
          toggle ? "hidden" : "block"
        }`}
        onClick={handeltoggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide w-[26px] md:w-[30px] lucide-align-left"
        >
          <line x1="21" x2="3" y1="6" y2="6" />
          <line x1="15" x2="3" y1="12" y2="12" />
          <line x1="17" x2="3" y1="18" y2="18" />
        </svg>
      </div>
      <div
        className={`transition-all ${
          toggle ? "left-0" : "left-[-200%]"
        } text-white z-50 h-[calc(100vh-20px)] bg-[#1E1C22] rounded-tr-3xl rounded-tl-3xl my-5 border-2 border-[#2E2D32] fixed lg:top-0 lg:sticky w-[30%] md:w-[25%] min-w-[200px] lg:w-auto px-[0.5vw]`}
      >
        <div
          className={`absolute left-3 top-2 lg:hidden cursor-pointer text-white text-opacity-60 ${
            toggle ? "block" : "hidden"
          }`}
          onClick={handeltoggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x  w-[24px] md:w-[30px]"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <div className="relative h-[5vw] w-[60%] lg:h-[4.5vw] lg:w-[90%] mx-auto min-h-[50px] my-4">
          <Logo />
        </div>
        <div className="py-[0.5vw] space-y-[0.5vw] h-[calc(100vh-7vw)] overflow-y-scroll">
          {sidebar?.map((item, ind) => (
            <>
              <div
                key={ind}
                className="bg-gradient-to-b from-[#D6A250] via-[#FFE500] to-[#ECB800] rounded-[1.35rem] font-light p-[1px]"
              >
                <div className="uppercase bg-gradient-to-b from-[#36353C] to-[#1C1A21] px-[1vw] rounded-[1.35rem] py-[0.6rem] flex gap-2 items-center text-xl">
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-lg font-light px-[.5vw] py-2">
                {item?.subTitle?.map((subitem, subind) => (
                  <button
                    onClick={() => fetchCategoryEvents(subitem)}
                    key={subind}
                    className={`transition-all duration-1000 ease-in-out cursor-pointer flex gap-2 py-[0.6rem] hover:bg-gradient-to-b rounded-full from-[#2E2D30] to-[#201E2700] px-[1.2rem] ${
                      currentCategory === subitem ? "bg-gradient-to-b" : ""
                    }`}
                  >
                    <div className="relative h-[20px] w-[20px] my-auto">
                      <Image
                        alt={subitem}
                        src={`/assets/image/sidebar/${subitem
                          .toLowerCase()
                          .replace(/\s+/g, "-")}.svg`}
                        fill
                      />
                    </div>
                    <p className="whitespace-nowrap">{subitem}</p>
                  </button>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
      {/* Blur Screen */}
      <div
        onClick={handeltoggle}
        className={`${
          toggle ? "block" : "hidden"
        } lg:hidden cursor-pointer transition w-full h-full backdrop-blur-sm z-30 fixed top-0 left-0`}
      ></div>
    </div>
  );
};

export default Sidebar;
