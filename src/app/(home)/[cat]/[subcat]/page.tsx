'use client'
import EventsMenu from "@/components/EventsMenu";
import Banner from "@/components/home/Banner";
import BetContainer from "@/components/BetContainer";
import Categories from "@/components/Categories";
import QuickBet from "@/components/QuickBet";
import Footer from "@/components/Footer";
import Searchbar from "@/components/Searchbar";

export default function Home({ params }: any) {
  return (
    <>
      <div className="pb-5 px-2 z-50 lg:overflow-y-scroll lg:h-[calc(100vh-60px)] space-y-[max(1vw,10px)] hideScrollBar">
        <Banner />
        <Categories />
        <EventsMenu cat={params} />
        <Searchbar sportkey={params?.subcat} />
        <BetContainer cat={params} />
        <Footer />
      </div>
    </>

  );
}
