import Sidebar from "@/components/Sidebar";
import StoreProvider from "./StateProvider";
import { SocketProvider } from "@/components/SocketProvider";
import { getCookie } from "@/utils/utils";
import Header from "@/components/Header";
import AllNotification from "@/components/AllNotification";

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
        <div className="overflow-hidden flex-1 lg:space-x-4 h-screen lg:flex lg:pl-5 lg:pr-2">
          <Sidebar />
            <div>
              <Header />
              {children}
            </div>
          <AllNotification />
        </div>
      </SocketProvider>
    </StoreProvider>
  );
}