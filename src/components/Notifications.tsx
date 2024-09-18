"use cleint";
import React, { useEffect, useState } from "react";
import Alert from "./svg/Alert";
import { getNotifications, markBetAsViewed } from "@/utils/actions";
import Message from "./svg/Message";
import { setIsNotification, setNotification } from "@/lib/store/features/notification/notificationSlice";
import { useAppSelector } from "@/lib/store/hooks";
import Info from "./svg/Info";
import { useDispatch } from "react-redux";
import { notificationBet } from "@/lib/store/features/bet/betSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Notification_bell = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const notification = useAppSelector(
    (state) => state.notification.notification
  );

  const handelNotifications = async () => {
    try {
      const response = await getNotifications(false);
      if (response) {
        dispatch(setNotification(response));
      }
    } catch (error) {}
  };

  useEffect(() => {
    handelNotifications();
  }, []);

  const handleBetNavigation = async (betId: string, notificationId: string) => {
    router.push("/mybets");
    setOpen(!open);
    dispatch(notificationBet({ betId: betId }));
    const markBetviewed = await markBetAsViewed(notificationId);
    if (markBetviewed?.error) {
      return toast.error(markBetviewed?.error);
    }
    handelNotifications();
  };

  const handelOpenNotifications = () => {
    dispatch(setIsNotification(true))
    setOpen(false);
  }

  return (
    <div
      className={` absolute top-[80%] ${
        open ? "scale-100" : "hidden"
      }  transition-all md:right-0 mobileleft z-[504] translate-x-[-50%] md:transform-none translate-y-[0%] md:top-[100%] `}
    >
      <div
        className={`w-[96vw] rounded-md ${
          open ? "scale-100" : "scale-0"
        } transition-all md:w-[400px] bg-[#2b2831]`}
      >
        <div className="bg-gradient-to-b w-full relative from-[#D71B21] to-[#780005] rounded-tl-md rounded-tr-md px-4 py-2">
          <span className="bg-gradient-to-b w-[20px] h-[20px] right-1.5 top-[-19%] md:inline-block hidden rounded-br-md -z-[10] -rotate-[40deg] absolute  from-[#D71B21] to-[#D71B21]"></span>
          <div className="flex items-center justify-between">
            <div className="text-white font-extralight tracking-wide">
              Recent Notifications
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex gap-2 flex-col max-h-[600px] md:max-h-[400px] scrollbar overflow-y-auto">
            {notification.length > 0 ? (
              notification?.map((item: any, index: number) => (
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
              ))
            ) : (
              <div className="text-white text-sm text-center py-4">
                No recent notifications
              </div>
            )}
          </div>
        </div>
        <div className="bg-gradient-to-b w-full relative from-[#D71B21] to-[#780005] rounded-bl-md rounded-br-md px-4 py-2 text-right text-white flex justify-end items-center">
          <button
            onClick={handelOpenNotifications}
            className="text-sm font-extralight group hover:-translate-x-3 flex gap-2 transition-all"
          >
            <span>All notifications</span>
            <span className="group-hover:block hidden transition-all text-md translate-y-[1px]">
              &gt;
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification_bell;
