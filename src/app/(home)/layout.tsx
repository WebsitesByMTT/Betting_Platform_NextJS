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
        <div className="lg:flex h-auto px-[1vw]">
          <div>
            <Sidebar />
          </div>
          <div className="px-[1vw]">
            <Header />
            <div>{children}</div>
          </div>
          <AllNotification/>
        </div>
      </SocketProvider>
    </StoreProvider>
  );
}
