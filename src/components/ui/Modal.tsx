import React, { useEffect, useState } from "react";
import CrossIcon from "../svg/CrossIcon";
import { useAppSelector } from "@/lib/store/hooks";
import toast from "react-hot-toast";
import { GetRedeemInfo } from "@/utils/actions";

const Modal: React.FC<any> = ({ text, buttonText, handler, id, setOpen }) => {
  const [redeemInfo, setRedeemInfo] = useState() as any;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const redeemAmount = await GetRedeemInfo(id);
        setRedeemInfo(redeemAmount);
      } catch (error) {
        toast.error("Error fetching payout amount");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full w-full bg-[#00000093] flex justify-center item-center backdrop-blur-[2px] absolute top-0 left-0">
      <div className="bg-[#1E1E1E] relative rounded-md w-[90%] md:w-[60%] xl:w-[35%] py-8 flex flex-col md:gap-10 items-center my-auto h-fit text-white">
        <p className="text-sm md:text-lg text-center w-[90%] py-4]">{text}</p>
        <p className="w-[80%] text-center">
          {redeemInfo?.message}:{" "}
          <span className="font-bold">{redeemInfo?.amount?.toFixed(3)}</span>
        </p>
        <button
          className="text-sm md:text-md px-4 py-2 border-x-[2px] border-[#D8890A] rounded-md  bg-[#323232]"
          onClick={() => {
            setOpen(false);
            handler(id);
          }}
        >
          {buttonText}
        </button>
        <div className="absolute right-2 top-2">
          <button onClick={() => setOpen(false)}>
            <CrossIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
