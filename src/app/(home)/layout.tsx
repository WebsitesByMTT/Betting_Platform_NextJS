import Sidebar from "@/components/Sidebar";
import StoreProvider from "./StateProvider";
import { SocketProvider } from "@/components/SocketProvider";
import { getCookie } from "@/utils/utils";
import Header from "@/components/Header";

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
    <SocketProvider token={token as string}>
      <StoreProvider>
        <div className="w-screen flex bg-[#0C0B14] h-screen overflow-hidden px-[1vw]">
          <div className="lg:w-[15%]">
            <Sidebar />
          </div>
          <div className="w-full lg:w-[82%] px-[1vw] mx-auto">
            <Header />
            <div>{children}</div>
          </div>
        </div>
      </StoreProvider>
    </SocketProvider>
  );
}
