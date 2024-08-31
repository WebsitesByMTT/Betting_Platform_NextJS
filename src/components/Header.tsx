"use client";
import React, { useEffect } from "react";
import Profile from "./svg/Profile";
import Notification from "./svg/Notification";
import User from "./User";
import Line from "./svg/Line";
import { GetPlayerBets, getUser } from "@/utils/actions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setUserCredits } from "@/lib/store/features/user/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setMyBets } from "@/lib/store/features/bet/betSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const credits = useAppSelector((state) => state.user.credits);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getUser();
      console.log("USER : ", user);

      if (user?.role !== "player") {
        router.push("/logout");
      }

      const response = await GetPlayerBets("all");
      if (response?.error) {
        return toast.error(response.error);
      }

      dispatch(setUserCredits(user?.credits));
      dispatch(setMyBets(response?.responseData));
    };
    fetchCurrentUser();
  }, []);

  return (
    <div className="flex items-end justify-end p-[.5rem] flex-col pb-4">
      <div className="flex items-center justify-center gap-2 lg:gap-5 py-2">
        <div className="w-[2rem] lg:h-[3rem] h-[1.5rem]">
          <Notification />
        </div>
        <div className="bg-gradient-to-b from-[#FFC400] to-[#D8890A] px-[1px] rounded-md">
          <p className="text-white px-5 py-1 bg-[#323232] font-light lg:text-xl rounded-md">
            {Math.round(credits)} $
          </p>
        </div>
        <div className="w-[2rem] lg:h-[3rem] h-[1.5rem] cursor-pointer group relative">
          <Profile />
          <div className="absolute top-[100%] right-[-100%] bg-gradient-to-b from-[#FFC400] to-[#D8890A] px-[1px] z-[100] rounded-md">
            <div className="hidden group-hover:flex text-white hover:block w-[100px] bg-[#323232] px-3 py-2 whitespace-nowrap rounded-md flex-col gap-3 text-center text-sm">
              <User />
            </div>
          </div>
        </div>
      </div>
      <Line />
    </div>
  );
};

export default Header;
