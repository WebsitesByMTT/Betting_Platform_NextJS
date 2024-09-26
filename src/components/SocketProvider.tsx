"use client";
import {
  deleteBet,
  setBetLoadingState,
  setMyBets,
  setOddsMismatch,
  updateBetSlipOdds,
} from "@/lib/store/features/bet/betSlice";
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
          case "CATEGORIES": //render sidebar categories and events
            dispatch(setCategories(data.data));
            break;
          case "ODDS": //get data of all matches for an event
            dispatch(setLoading(false));
            dispatch(setLeagues(data?.data));
            break;
          case "CREDITS": //update any type of player credits change
            dispatch(setUserCredits(data?.credits));
            break;
          case "GET event odds": //get odds of a particular event id
            dispatch(setLoading(false));
            dispatch(setLeaguesInfo(data?.data));
            break;
          case "SEARCH EVENT": //search data
            dispatch(setLoading(false));
            dispatch(setLeagues(data?.data));
            break;
          case "ODDS_MISMATCH": //mismatch bet ids
            dispatch(setBetLoadingState(false));
            dispatch(setOddsMismatch({ message: data.message, id: data.id }));
            break;
          case "BLOCKED":
          default:
            break;
        }
        //
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

          case "BET_SLIP":
            console.log("BET SLIP : ", message);
            break;

          case "BET_PLACED":
            dispatch(deleteBet({ betId: message?.payload.betId }));
            break;

          case "ODDS_UPDATE":
            dispatch(updateBetSlipOdds(message?.payload));
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
