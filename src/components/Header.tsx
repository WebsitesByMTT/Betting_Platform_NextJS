"use client";
import React, { useEffect, useState } from "react";
import Profile from "./svg/Profile";
import Notification from "./svg/Notification";
import User from "./User";
import Line from "./svg/Line";
import { GetPlayerBets, getUser } from "@/utils/actions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setUserCredits } from "@/lib/store/features/user/userSlice";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setMyBets } from "@/lib/store/features/bet/betSlice";
import Notifications from "./Notifications";
import Hamburger from "./svg/sidebar/Hamburger";
import { setIsSideBar } from "@/lib/store/features/notification/notificationSlice";
import { getCurrentUser } from "@/utils/utils";
const Header = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const credits = useAppSelector((state) => state.user.credits);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const notification = useAppSelector(
    (state) => state?.notification?.notification
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getUser();
       setUserName(user?.username)
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

  const handelNotify = () => {
    setOpen(false);
  };

  const handeltoggle = () => {
    dispatch(setIsSideBar(true))
  }

  return (
    <>
      <div className="w-full z-50 bg-[#0C0B14] sticky top-0 p-[.5rem]  pb-4">

        <div className="flex items-center w-full justify-between">
          <button
            className={`lg:invisible cursor-pointer text-white`}
            onClick={handeltoggle}
          >
            <Hamburger />
          </button>
          <div className="flex items-center justify-center z-50 gap-x-2 lg:gap-x-7 ">
            <div className="md:relative pt-3">
              <button
                onClick={() => {
                  setOpen(!open);
                }}
                className="w-[2.5rem] relative cursor-pointer lg:h-[3rem] h-[2rem]"
              >
                <Notification />
                <span className="bg-[#D71B21] text-white w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem] pt-[1px] md:pt-[2px] rounded-full text-[.6rem] md:text-[.8rem] top-0 absolute">
                  {
                    notification?.length>0&&(notification?.filter((item: any) => item?.viewed === false)
                      ?.length)
                  }
                </span>
              </button>
              <Notifications open={open} setOpen={setOpen} />
              {open && (
                <div
                  onClick={handelNotify}
                  className="fixed top-0 left-0 bg-black bg-opacity-25 w-screen h-screen"
                ></div>
              )}
            </div>
            <div className="bg-gradient-to-b from-[#FFC400] to-[#D8890A] px-[1px] rounded-md">
              <p className="text-white px-5 py-1 bg-[#323232] font-light lg:text-xl rounded-md">
                {credits?.toFixed(1)} $
              </p>
            </div>
            <div className="relative">
              <div className="flex items-center space-x-1">
                <button
                  className="w-[1.7rem] lg:h-[3rem] h-[1.7rem] pt-[3px] cursor-pointer  "
                  onClick={() => setToggle(!toggle)}
                >
                  <Profile />
                </button>
                <div className="text-white capitalize">{userName}</div>
              </div>
              <div
                className={`absolute ${toggle ? "scale-100" : "scale-0"
                  } transition-all top-[100%] right-0 bg-gradient-to-b from-[#FFC400] to-[#D8890A] px-[1px] z-[10001] rounded-md`}
              >
                <div
                  onClick={() => setToggle(!toggle)}
                  className=" text-white hover:block w-[100px] bg-[#323232] px-3 py-2 whitespace-nowrap rounded-md flex-col items-center gap-3 text-center text-sm"
                >
                  <User />
                </div>
              </div>
            </div>
          </div>
        </div>


        <Line />
      </div>
      {toggle && (
        <div
          onClick={() => setToggle(!toggle)}
          className="fixed top-0 left-0 w-full h-full bg-opacity-30 bg-black z-10"
        ></div>
      )}
    </>
  );
};

export default Header;
