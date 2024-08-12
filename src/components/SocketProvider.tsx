"use client";

import { config } from "@/utils/config";
import { useEffect, useState, createContext, useContext } from "react";
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

  useEffect(() => {
    console.log("TOKEN", token);
    if (token) {
      const socketInstance = io(`${config.server}`, {
        auth: { token },
      });
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Connected with socket id:", socketInstance.id);
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
