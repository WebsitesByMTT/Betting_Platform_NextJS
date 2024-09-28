import Sidebar from "@/components/Sidebar";
import StoreProvider from "./StateProvider";
import { SocketProvider } from "@/components/SocketProvider";
import { getCookie } from "@/utils/utils";
import Header from "@/components/Header";
import AllNotification from "@/components/AllNotification";
import QuickBet from "@/components/QuickBet";

export const metadata = {
  title: "Betting Paradise",
  description: "Betting Paradise",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getCookie();
  return (
    <StoreProvider>
      <SocketProvider token={token as string}>
        <div className="lg:flex-1 lg:space-x-2 lg:overflow-x-hidden lg:flex  lg:px-2">
          <Sidebar />
          <div>
            <Header />
            {children}
          </div>
          <AllNotification />
        </div>
        <QuickBet />
      </SocketProvider>
    </StoreProvider>
  );
}