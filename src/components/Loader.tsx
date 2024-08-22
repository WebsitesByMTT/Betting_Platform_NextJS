import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 bg-[#0005] backdrop-blur-[3px] h-full w-full flex items-center justify-center z-[100]">
      <div className="aspect-square h-[20%] relative">
        <Image src="/assets/image/loader.gif" fill alt="loader" />
      </div>
    </div>
  );
};

export default Loader;
