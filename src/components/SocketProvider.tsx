"use client";
import { setMyBets, setOddsMismatch, setRedeemAmount } from "@/lib/store/features/bet/betSlice";
import { setSocketNotification } from "@/lib/store/features/notification/notificationSlice";
import {
  setCategories,
  setEvents,
  setLeagues,
  setLeaguesInfo,
  setLoading,
} from "@/lib/store/features/sports/sportsSlice";
import { setUserCredits } from "@/lib/store/features/user/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { config } from "@/utils/config";
import { useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}
const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<{
  token: string;
  children: React.ReactNode;
}> = ({ token, children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const socketInstance = io(`${config.server}`, {
        auth: { token },
      });
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Connected with socket id:", socketInstance.id);
      });

      socketInstance.on("data", (data: any) => {
        switch (data.type) {
          case "CATEGORIES":
            dispatch(setCategories(data.data));
            break;
          case "CATEGORY_SPORTS":
            dispatch(setEvents(data?.data));
            break;
          case "ODDS":
            dispatch(setLoading(false));
            dispatch(setLeagues(data?.data));
            break;
          case "CREDITS":
            dispatch(setUserCredits(data?.credits));
            break;
          case "INACTIVE":
            dispatch(setUserCredits(data?.credits));
            break;
          case "MYBETS":
            dispatch(setMyBets(data?.bets));
            break;
          case "GET event odds":
            dispatch(setLoading(false));
            dispatch(setLeaguesInfo(data?.data));
            break;
          case "REDEEM_AMOUNT":
            dispatch(setRedeemAmount(data?.data));
            break;
          case "SEARCH EVENT":
            dispatch(setLoading(false));
            dispatch(setLeagues(data?.data));
            break;
          case "ODDS_MISMATCH":
            dispatch(setOddsMismatch(true)); 

                break;  
          case "BLOCKED":
          default:
            break;
        }
      });

      socketInstance.on("message", (data: any) => {
        switch (data.type) {
          case "BET":
            toast.success(data.data);
            break;

          case "STATUS":
            if (!data.payload) {
              toast.error("You are blocked by admin");
              router.push("/logout");
            }
            break;

          default:
            break;
        }
      });

      socketInstance.on("alert", (data: any) => {
        const message = data?.message;

        switch (message.type) {
          case "NOTIFICATION":
            toast.success(message.payload.data.message);
            dispatch(setSocketNotification(message?.payload));
            break;
          default:
            break;
        }
      });

      socketInstance.on("error", (error) => {
        toast.remove();
        toast.error(`Error from server: ${error.message}`);
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
