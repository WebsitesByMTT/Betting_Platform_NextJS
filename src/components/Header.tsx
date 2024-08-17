import { config } from "@/utils/config";
import { cookies } from "next/headers";
import React from "react";
import Profile from "./svg/Profile";
import Notification from "./svg/Notification";
import User from "./User";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function getUser() {
  const token = cookies().get("token")?.value;
  try {
    const response = await fetch(`${config.server}/api/auth`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("HERE", error);
  }
}

const Header = async () => {
  const user = await getUser();
  if (user?.role !== "player") {
    redirect("/logout");
  }
  return (
    <div className="flex items-end justify-end space-x-[.6rem] p-[.5rem] flex-col ">
      <div className="flex items-center justify-center gap-5">
        <div className="w-[2rem] h-[3rem]">
          <Notification />
        </div>
        <div className="bg-gradient-to-b from-[#FFC400] to-[#D8890A] px-[1px] rounded-md">
          <p className="text-white px-5 py-1 bg-[#323232] font-light text-xl rounded-md">
            {user?.credits} $
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
    </div>
  );
};

export default Header;
