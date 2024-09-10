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
    <StoreProvider>
      <SocketProvider token={token as string}>
        <div className="w-screen flex h-auto bg-[#0C0B14] px-[1vw]">
          <div className="lg:w-[300px]">
            <Sidebar />
          </div>
          <div className="w-full lg:w-[calc(100vw-350px)] px-[1vw] mx-auto relative">
            <Header />
            <div>{children}</div>
          </div>
        </div>
      </SocketProvider>
    </StoreProvider>
  );
}
