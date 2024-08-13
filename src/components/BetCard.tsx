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
    <div className="bg-[#17151A] shadow-xl flex flex-col gap-1 p-2 rounded-lg col-span-12 md:col-span-6 xl:col-span-3">
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
      <p className="text-[#67ffff] text-sm">
        {leagues.commence_time.split("T")[0]}
      </p>
      <div className="flex flex-col py-1.5 justify-between">
        <button className="flex justify-between items-center space-x-2">
          <div className="flex gap-2 items-center">
            <World />
            <p className="text-white text-[.8rem] md:text-[.9rem]">
              {betsData.home_team}
            </p>
          </div>
          <p className="text-[#dfdfdf89]">
            {betsData.markets[0].outcomes[0].price}
          </p>
        </button>
        <button className="flex items-center space-x-2 justify-between">
          <div className="flex items-center gap-2">
            <World />
            <div className="text-white text-[.8rem] md:text-[.9rem]">
              {betsData.away_team}
            </div>
          </div>
          <p className="text-[#dfdfdf89]">
            {betsData.markets[0].outcomes[1].price}
          </p>
        </button>
      </div>
    </div>
  );
};

export default BetCard;
