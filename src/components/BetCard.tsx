import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Favourite from "./svg/Favourite";
import World from "./svg/World";

const BetCard: React.FC<any> = ({ betsData }) => {
  const [leagues, setLeagues] = useState(betsData);
  useEffect(() => {
    setLeagues(betsData);
    console.log(betsData);
  }, [betsData]);
  const currentCategory = useAppSelector(
    (state) => state?.sports?.selectedCategory
  );
  return (
    <div className="bg-[#292D2E] shadow-xl flex flex-col gap-1 p-2 rounded-lg col-span-12 md:col-span-6 xl:col-span-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center space-x-[.5px] overflow-hidden">
          <div className=" whitespace-nowrap flex items-center gap-2 justify-center text-white text-opacity-60 text-[.7rem] md:text-[.9rem]">
            <div className="relative h-[20px] w-[15px]">
              <Image
                src={`/assets/image/sidebar/${currentCategory
                  .toLowerCase()
                  .replace(/\s+/g, "-")}.svg`}
                fill
                alt={currentCategory}
              />
            </div>
            <p className="whitespace-nowrap">{leagues?.sport_title}</p>
            {/* <svg
              width="4"
              height="7"
              viewBox="0 0 4 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.06189 3.64849L0.602133 6.10823C0.567731 6.14267 0.523885 6.16613 0.476145 6.17564C0.428405 6.18514 0.378918 6.18027 0.333947 6.16164C0.288977 6.14301 0.250547 6.11145 0.223522 6.07096C0.196496 6.03048 0.182091 5.98288 0.182129 5.93421V1.01472C0.182091 0.966045 0.196496 0.918451 0.223522 0.877965C0.250547 0.837479 0.288977 0.805922 0.333947 0.787289C0.378918 0.768656 0.428405 0.763785 0.476145 0.773292C0.523885 0.782799 0.567731 0.806257 0.602133 0.840696L3.06189 3.30044C3.08476 3.32328 3.1029 3.35041 3.11528 3.38027C3.12766 3.41013 3.13403 3.44214 3.13403 3.47446C3.13403 3.50679 3.12766 3.5388 3.11528 3.56866C3.1029 3.59852 3.08476 3.62565 3.06189 3.64849Z"
                fill="#565656"
              />
            </svg> */}
            {/* <p className="text-white">{currentCategory}</p> */}
          </div>
        </div>
        <Favourite />
      </div>
      <p className="text-[#d1d5d5b9] text-sm">
        {leagues.commence_time.split("T")[0]}
      </p>
      <div className="flex flex-col py-1.5 justify-between">
        <div className="flex items-center space-x-2">
          <World />
          <div className="text-white text-[.8rem] md:text-[.9rem]">
            {betsData.home_team}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <World />
          <div className="text-white text-[.8rem] md:text-[.9rem]">
            {betsData.away_team}
          </div>
        </div>
      </div>
      {/* <div className="pt-1">
              <div className="text-white text-[.8rem] md:text-[.9rem]">
                Winner
              </div>
              <div className="flex items-center justify-between pt-2">
                {data.winner.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleBet({ data, item })}
                    className="w-[38%] bg-[#1A1A1A] relative p-2 rounded-md flex items-center justify-between"
                  >
                    <div className="text-white text-opacity-60">
                      {item.position}
                    </div>
                    <div className="text-white text-[.8rem] md:text-[.9rem]">
                      {item.odds}
                    </div>
                    <svg
                      width="8"
                      height="8"
                      className={`absolute  right-0 ${
                        item.iconColor === "#82FF60"
                          ? "top-0"
                          : "bottom-0 rotate-90"
                      }`}
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 0.704895H1.20711C0.761654 0.704895 0.53857 1.24346 0.853552 1.55845L7.14645 7.85134C7.46143 8.16632 8 7.94324 8 7.49779V3.7049C8 2.04804 6.65685 0.704895 5 0.704895Z"
                        fill={item.iconColor}
                      />
                    </svg>
                  </button>
                ))}
                <div
                  onClick={() => handelopen(ind)}
                  className="w-[18%] bg-[#1A1A1A] relative p-2 cursor-pointer rounded-md flex items-center justify-between"
                >
                  <div className="text-white text-opacity-60 mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-down"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div> */}
      {
        // <div
        //   className={`${
        //     index.includes(ind)
        //       ? "space-y-2 max-h-[500px] transition-all duration-300 ease-in-out overflow-hidden"
        //       : "max-h-0 transition-all duration-300 ease-in-out overflow-hidden"
        //   }`}
        // >
        //   <div className="pt-4">
        //     <div className="text-white text-[.8rem] md:text-[.9rem]">
        //       Point handicap
        //     </div>
        //     <div className="flex items-center justify-between pt-2">
        //       <div className="w-[49%] bg-[#0A053B] relative p-2 rounded-md flex items-center justify-between">
        //         <div className="text-white text-[.7rem] text-opacity-40 overflow-hidden text-overflow-ellipsis whitespace-nowrap max-w-[80%] fade-text">
        //           <div className="relative z-10">{`(1.4) Alfonso, Switzerland`}</div>{" "}
        //           {/* Text with shadow */}
        //         </div>
        //         <div className="text-white text-[.9rem]">1.9</div>
        //         <svg
        //           width="8"
        //           height="8"
        //           className="absolute top-0 right-0"
        //           viewBox="0 0 8 8"
        //           fill="none"
        //           xmlns="http://www.w3.org/2000/svg"
        //         >
        //           <path
        //             d="M5 0.704895H1.20711C0.761654 0.704895 0.53857 1.24346 0.853552 1.55845L7.14645 7.85134C7.46143 8.16632 8 7.94324 8 7.49779V3.7049C8 2.04804 6.65685 0.704895 5 0.704895Z"
        //             fill="#82FF60"
        //           />
        //         </svg>
        //       </div>
        //       <div className="w-[49%] bg-[#0A053B] relative p-2 rounded-md flex items-center justify-between">
        //         <div className="text-white text-[.7rem] text-opacity-40 overflow-hidden text-overflow-ellipsis whitespace-nowrap max-w-[80%] fade-text">
        //           <div className="relative z-10">{`(-1.5) Zain,Algeria`}</div>
        //         </div>
        //         <div className="text-white text-[.9rem]">1.8</div>
        //         <svg
        //           width="8"
        //           height="8"
        //           className="absolute bottom-0 right-0"
        //           viewBox="0 0 8 8"
        //           fill="none"
        //           xmlns="http://www.w3.org/2000/svg"
        //         >
        //           <path
        //             d="M5 7.7049H1.20711C0.761654 7.7049 0.53857 7.16633 0.853552 6.85134L7.14645 0.558448C7.46143 0.243466 8 0.466549 8 0.912002V4.7049C8 6.36175 6.65685 7.7049 5 7.7049Z"
        //             fill="#FF6060"
        //           />
        //         </svg>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="pt-2">
        //     <div className="text-white text-[.8rem] md:text-[.9rem]">
        //       Total point
        //     </div>
        //     <div className="flex items-center justify-between pt-2">
        //       <div className="w-[49%] bg-[#0A053B] relative p-2 rounded-md flex items-center justify-between">
        //         <div className="text-white text-[.7rem] text-opacity-40 overflow-hidden text-overflow-ellipsis whitespace-nowrap max-w-[80%] fade-text">
        //           <div className="relative z-10">{`over 80.5`}</div>{" "}
        //           {/* Text with shadow */}
        //         </div>
        //         <div className="text-white text-[.8rem] md:text-[.9rem]">
        //           2.9
        //         </div>
        //         <svg
        //           width="8"
        //           height="8"
        //           className="absolute top-0 right-0"
        //           viewBox="0 0 8 8"
        //           fill="none"
        //           xmlns="http://www.w3.org/2000/svg"
        //         >
        //           <path
        //             d="M5 0.704895H1.20711C0.761654 0.704895 0.53857 1.24346 0.853552 1.55845L7.14645 7.85134C7.46143 8.16632 8 7.94324 8 7.49779V3.7049C8 2.04804 6.65685 0.704895 5 0.704895Z"
        //             fill="#82FF60"
        //           />
        //         </svg>
        //       </div>
        //       <div className="w-[49%] bg-[#0A053B] relative p-2 rounded-md flex items-center justify-between">
        //         <div className="text-white text-[.7rem] text-opacity-40 overflow-hidden text-overflow-ellipsis whitespace-nowrap max-w-[80%] fade-text">
        //           <div className="relative z-10">{`under 80.5`}</div>
        //         </div>
        //         <div className="text-white text-[.8rem] md:text-[.9rem]">
        //           1.8
        //         </div>
        //         <svg
        //           width="8"
        //           height="8"
        //           className="absolute bottom-0 right-0"
        //           viewBox="0 0 8 8"
        //           fill="none"
        //           xmlns="http://www.w3.org/2000/svg"
        //         >
        //           <path
        //             d="M5 7.7049H1.20711C0.761654 7.7049 0.53857 7.16633 0.853552 6.85134L7.14645 0.558448C7.46143 0.243466 8 0.466549 8 0.912002V4.7049C8 6.36175 6.65685 7.7049 5 7.7049Z"
        //             fill="#FF6060"
        //           />
        //         </svg>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      }
    </div>
  );
};

export default BetCard;
