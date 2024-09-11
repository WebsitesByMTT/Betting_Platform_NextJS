"use client"
import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import Sports from "./svg/sidebar/Sports";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Logo from "./svg/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Hamburger from "./svg/sidebar/Hamburger";
import CrossIcon from "./svg/CrossIcon";
import { svgMap } from "./svg/SvgMap";
import { setSelectedCategory } from "@/lib/store/features/sports/sportsSlice";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const sportsCategories = useAppSelector((state) => state?.sports.categories);
  const { socket } = useSocket();
  const pathname = usePathname();
  const url = decodeURIComponent(pathname);
  const dispatch = useAppDispatch();
  function extractBetweenSlashes(url: string): string | null {
    const parts = url.split("/");
    if (parts.length < 2) return null;
    return parts[1];
  }
  const matchurl = extractBetweenSlashes(url);
  useEffect(() => {
    if (matchurl) {
      dispatch(setSelectedCategory(matchurl));
    }
  }, [matchurl]);

  //phone screen toggle
  const handeltoggle = () => {
    setToggle(!toggle);
    document.body.classList.toggle("no-scroll", !toggle);
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

  //sidebar list
  const sidebar = [
    {
      id: 1,
      title: "sports",
      icon: <Sports />,
      subTitle: sportsCategories,
    },
  ];

  return (
    <div className="sticky top-[20px] z-[499]">
      <button
        className={`absolute left-3 top-0 lg:hidden cursor-pointer text-white z-[500] h-[1.5rem] ${toggle ? "hidden" : "block"
          }`}
        onClick={handeltoggle}
      >
        <Hamburger />
      </button>
      <div
        className={`transition-all fixed lg:sticky top-0 w-[60%] ${
          toggle ? "left-0 " : "left-[-200%]"
        } text-white z-[500] h-screen lg:h-[calc(100vh-40px)]  bg-[#1E1C22] lg:rounded-3xl lg:my-5 border-2 overflow-hidden border-[#2E2D32] md:w-[30%] min-w-[200px] lg:w-auto px-[0.5vw]`}
      >
        <div
          className={`absolute left-3 top-auto w-[30px] h-[5rem] lg:hidden cursor-pointer text-white text-opacity-60 ${
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
        <div className="py-[0.5vw] space-y-[0.5vw]  h-[calc(100vh-130px)] lg:h-[calc(100vh-160px)]  overflow-y-scroll hideScrollBar webkit-overflow-scrolling-touch">
          {sidebar?.map((item, ind) => (
            <div key={ind}>
              <div className="bg-gradient-to-b from-[#D6A250] via-[#FFE500] to-[#ECB800] rounded-full font-light p-[1px] mx-1">
                <div className="uppercase bg-gradient-to-b from-[#36353C] to-[#1C1A21] px-[1vw] rounded-full py-[0.6rem] flex gap-2 items-center text-lg md:text-xl">
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-lg font-light px-[.8vw] py-2">
                {item?.subTitle?.map((subitem, subind) => {
                  const IconComponent =
                    svgMap[subitem?.category?.toLowerCase()];
                  return (
                    <div  key={subind} onClick={() => setToggle(!toggle)}>
                      <Link
                        href={`/${subitem?.category}/${subitem?.events[0].key}`}
                        key={subind}
                        className={`duration-1000 ease-in-out cursor-pointer grid grid-cols-5 py-[0.6rem] transition-none  overflow-hidden hover:bg-gradient-to-b rounded-full from-[#2E2D30] to-[#201E2700] px-[1.2rem] ${
                          subitem?.category === matchurl
                            ? "bg-gradient-to-b  border-[.5px] border-[#4A4940]  from-[#201E2700] to-[#30302D]"
                            : ""
                        }`}
                      >
                        <div className="relative h-[20px] w-[20px] my-auto">
                          {IconComponent}
                        </div>
                        <p className="whitespace-nowrap text-left text-sm md:text-base col-span-3">
                          {subitem.category}
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Blur Screen */}
      {toggle && <div
        onClick={handeltoggle}
        className="lg:hidden cursor-pointer transition w-screen h-screen backdrop-blur-sm z-30 fixed top-0 left-0"
      ></div>}
    </div>
  );
};

export default Sidebar;