"use client";
import React, { useEffect, useState } from "react";
import Profile from "./svg/Profile";
import Notification from "./svg/Notification";
import User from "./User";
import { redirect } from "next/navigation";
import Line from "./svg/Line";
import { getUser } from "@/utils/actions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setUserCredits } from "@/lib/store/features/user/userSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const credits = useAppSelector((state) => state.user.credits);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getUser();
      if (user?.role !== "player") {
        // redirect("/logout");
      }
      dispatch(setUserCredits(user?.credits));
    };
    fetchCurrentUser();
  }, []);

  return (
    <div className="flex items-end justify-end space-x-[.6rem] p-[.5rem] flex-col gap-5">
      <div className="flex items-center justify-center gap-5">
        <div className="w-[2rem] h-[3rem]">
          <Notification />
        </div>
        <div className="bg-gradient-to-b from-[#FFC400] to-[#D8890A] px-[1px] rounded-md">
          <p className="text-white px-5 py-1 bg-[#323232] font-light text-xl rounded-md">
            {credits.toFixed(3)} $
          </p>
        </div>
        <div className="w-[2rem] h-[3rem] cursor-pointer group relative">
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
