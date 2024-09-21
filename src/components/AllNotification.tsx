"use client";
import Alert from "@/components/svg/Alert";
import Message from "@/components/svg/Message";
import { notificationBet } from "@/lib/store/features/bet/betSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { getNotifications, markBetAsViewed } from "@/utils/actions";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import CrossIcon from "./svg/CrossIcon";
import { setIsNotification } from "@/lib/store/features/notification/notificationSlice";

const AllNotification = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [allNotification, setAllNotifications] = useState<[]>([]);
    const notification = useAppSelector(
        (state) => state.notification.isNotiFication
    );

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
        handelisNotification()
    };

    const handelisNotification = () => {
        dispatch(setIsNotification(false));
    }
    return (
        <div className={`${notification ? 'text-white w-[70%] md:w-[300px] xl:w-[500px]' : '!hidden'} fixed  top-0 xl:static right-0 bg-[#0C0B14] z-[99] lg:flex transition-all gap-2 flex-col scrollbar h-[calc(100vh-50px)] overflow-y-scroll`}>
            <div className="text-white text-sm  lg:text-[1rem]  sticky top-0 bg-[#0C0B14] font-extralight flex items-center justify-between tracking-wide  px-2">
                <span className="bg-[#1E1C22]  px-3 py-1 rounded-2xl">All Notifications</span>
                <button
                    className="w-[30px] h-[5rem] cursor-pointer text-white text-opacity-60"
                    onClick={handelisNotification}
                >
                    <CrossIcon />
                </button>
            </div>
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
                        className={`p-3 shadow-sm ${item.viewed ? "bg-gray-600" : "bg-black"
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
                            <div className="text-white text-opacity-70 tracking-wide font-light text-[.7rem] 2xl:text-sm">
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
    );
};

export default AllNotification;
