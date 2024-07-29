import Sidebar from "@/components/common/Sidebar";

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
        <div className="grid  grid-cols-12">
            <Sidebar />
            <div className="col-span-12 lg:col-span-10  bg-secondary">{children}</div>
        </div>
    );
}