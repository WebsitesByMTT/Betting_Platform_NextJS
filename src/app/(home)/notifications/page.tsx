"use client";
import Alert from "@/components/svg/Alert";
import Message from "@/components/svg/Message";
import { notificationBet } from "@/lib/store/features/bet/betSlice";
import { setNotification } from "@/lib/store/features/notification/notificationSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { getNotifications, markBetAsViewed } from "@/utils/actions";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [allNotification, setAllNotifications] = useState<[]>([]);

  const handelNotifications = async () => {
    const response = await getNotifications(true);
    if (response?.error) {
      return toast.error(response?.error);
    }
    setAllNotifications(response);
  };

  useEffect(() => {
    handelNotifications();
  }, []);

  const handleBetNavigation = async (betId: string, notificationId: string) => {
    router.push("/mybets");
    dispatch(notificationBet({ betId: betId }));
    const markBetviewed = await markBetAsViewed(notificationId);
    if (markBetviewed?.error) {
      return toast.error(markBetviewed?.error);
    }
    handelNotifications();
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex gap-2 flex-col scrollbar overflow-y-auto">
        <p className="text-white md:text-3xl text-xl text-left font-extralight tracking-wide my-3">
          All Notifications
        </p>
        {allNotification?.map((item: any, index: number) => (
          <div
            key={item._id}
            onClick={() => {
              handleBetNavigation(item.data.betId, item._id);
            }}
            className="cursor-pointer"
          >
            <div
              key={index}
              className={`p-3 shadow-sm ${
                item.viewed ? "bg-gray-600" : "bg-black"
              } shadow-black `}
            >
              <div className="flex items-center space-x-3">
                {item.type === "alert" ? (
                  <Alert />
                ) : item.type === "message" ? (
                  <Message />
                ) : (
                  <Info />
                )}
                <div className="text-white text-opacity-70 tracking-wide font-light text-sm">
                  {item?.data.message}
                </div>
              </div>
              <div className="text-[.6rem] text-right text-white text-opacity-70 pt-1">
                {new Date(item?.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                At{" "}
                <span className="text-right">
                  {new Date(item.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
