
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
    <div className={`flex-1  ${notification?'xl:w-[63vw]':'w-[96vw] md:w-[83vw]'} pl-[1vw] mx-auto`}>
      <div className="h-[89vh] overflow-y-scroll pb-5 space-y-[max(1vw,10px)] hideScrollBar">
        <Banner />
        <Categories />
        <EventsMenu cat={params} />
        <QuickBet />
        <Searchbar sportkey={params?.subcat} />
        <BetContainer cat={params} />
        <Footer/>
      </div>
    </div>

  );
}
