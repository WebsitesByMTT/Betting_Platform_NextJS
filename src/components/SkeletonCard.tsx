import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-[#b9b8ba3f] shadow-xl flex flex-col justify-evenly p-4 py-2 rounded-lg col-span-12 md:col-span-6 xl:col-span-3 h-[170px] animate-pulse">
      <div className="bg-[#dfdfdf43] h-[10px] w-full rounded-md animate-pulse"></div>
      <div className="bg-[#dfdfdf43] h-[10px] w-[40px] rounded-md animate-pulse"></div>
      <div className="bg-[#dfdfdf43] h-[15px] w-full rounded-md animate-pulse"></div>
      <div className="bg-[#dfdfdf43] h-[15px] w-full rounded-md animate-pulse"></div>
      <div className="flex gap-5">
        <div className="bg-[#dfdfdf43] h-[25px] flex-1 rounded-md animate-pulse"></div>
        <div className="bg-[#dfdfdf43] h-[25px] flex-1 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
