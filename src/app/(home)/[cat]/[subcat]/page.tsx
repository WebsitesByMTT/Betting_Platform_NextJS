
'use client'
import EventsMenu from "@/components/EventsMenu";
import Banner from "@/components/home/Banner";
import BetContainer from "@/components/BetContainer";
import Categories from "@/components/Categories";
import QuickBet from "@/components/QuickBet";
import Footer from "@/components/Footer";
import Searchbar from "@/components/Searchbar";
import { useAppSelector } from "@/lib/store/hooks";


export default function Home({ params }: any) {
  const notification = useAppSelector(
    (state) => state.notification.isNotiFication
  );
  return (
    <>
      <div className="pb-5 px-2 lg:px-0 z-50 overflow-y-scroll h-screen space-y-[max(1vw,10px)] hideScrollBar">
        <Banner />
        <Categories />
        <EventsMenu cat={params} />
        <Searchbar sportkey={params?.subcat} />
        <BetContainer cat={params} />
        <Footer />
      </div>
      <QuickBet />
    </>

  );
}
