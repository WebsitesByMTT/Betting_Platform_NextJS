"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import Sports from "./svg/sidebar/Sports";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSelectedCategory } from "@/lib/store/features/sports/sportsSlice";
import Logo from "./svg/Logo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Hamburger from "./svg/sidebar/Hamburger";
import CrossIcon from "./svg/CrossIcon";
import { svgMap } from "./svg/SvgMap";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [sports, setSports] = useState<string[]>();
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const router = useRouter();

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
      fetchCategoryEvents(currentCategory);
    }
  }, [socket]);

  //event for a specific sports category
  const fetchCategoryEvents = (category: any) => {
    router.push("/");
    setToggle(false)
    dispatch(setSelectedCategory(category || "All"));
    if (socket) {
      socket.emit("data", {
        action: "CATEGORY_SPORTS",
        payload: category,
      });
    } else {
      console.warn("Socket is not connected");
    }
  };

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
      <button
        className={`absolute left-4 top-5 lg:hidden cursor-pointer text-white z-[500] h-[1.5rem] ${
          toggle ? "hidden" : "block"
        }`}
        onClick={handeltoggle}
      >
        <Hamburger />
      </button>
      <div
        className={`transition-all ${
          toggle ? "left-0 " : "left-[-200%]"
        } text-white z-[500] h-[calc(100vh-40px)] bg-[#1E1C22] rounded-3xl my-5 border-2 overflow-hidden border-[#2E2D32] fixed lg:top-0 lg:sticky w-[60%] md:w-[30%] min-w-[200px] lg:w-auto px-[0.5vw]`}
      >
        <div
          className={`absolute left-3 top-2 lg:hidden cursor-pointer text-white text-opacity-60 ${
            toggle ? "block" : "hidden"
          }`}
          onClick={handeltoggle}
        >
          <CrossIcon />
        </div>
        <div className="relative w-[60%] lg:h-[80px] lg:w-[90%] mx-auto min-h-[50px] my-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="py-[0.5vw] space-y-[0.5vw]  h-[82vh] overflow-y-scroll hideScrollBar">
          {sidebar?.map((item, ind) => (
            <div key={ind}>
              <div className="bg-gradient-to-b from-[#D6A250] via-[#FFE500] to-[#ECB800] rounded-full font-light p-[1px] mx-1 md:mx-0">
                <div className="uppercase bg-gradient-to-b from-[#36353C] to-[#1C1A21] px-[1vw] rounded-full py-[0.6rem] flex gap-2 items-center text-lg md:text-xl">
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-lg font-light px-[.8vw] py-2">
                {item?.subTitle?.map((subitem, subind) => {
                  const IconComponent = svgMap[subitem.toLowerCase()];
                  return (
                    <button
                      onClick={() => fetchCategoryEvents(subitem)}
                      key={subind}
                      className={`transition-all duration-1000 ease-in-out cursor-pointer grid grid-cols-5 py-[0.6rem] overflow-hidden hover:bg-gradient-to-b rounded-full from-[#2E2D30] to-[#201E2700] px-[1.2rem] ${
                        currentCategory === subitem ? "bg-gradient-to-b" : ""
                      }`}
                    >
                      <div className="relative h-[20px] w-[20px] my-auto">
                        {IconComponent}
                      </div>
                      <p className="whitespace-nowrap text-left text-sm md:text-base col-span-3">
                        {subitem}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
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
