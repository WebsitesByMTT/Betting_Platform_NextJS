import Sidebar from "@/components/common/Sidebar";
import StoreProvider from "./StateProvider";

export const metadata = {
    title: "Betting Paradise",
    description: "Betting Paradise",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
      <StoreProvider>
        <div className="grid grid-cols-12">
          <Sidebar />
          <div className="col-span-12 lg:col-span-9 xl:col-span-10 pb-10  bg-secondary">
            {children}
          </div>
        </div>
      </StoreProvider>
    );
}