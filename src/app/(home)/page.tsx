import EventsMenu from "@/components/EventsMenu";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from "@/components/home/Banner";
import BetCard from "@/components/home/BetCard";
import Categories from "@/components/Categories";
// import QuickBet from "@/components/home/QuickBet";
// import TopBetsCarousel from "@/components/home/TopBetsCarousel";

export default function Home() {
  return (
    <div className="w-full px-[1vw] mx-auto h-full">
      <Header />
      <div className="h-[95vh] overflow-y-scroll py-5 space-y-[1vw]">
        <Banner />
        <Categories />
        <EventsMenu />
        {/* <TopBetsCarousel />  */}
        {/* <QuickBet />  */}
        <BetCard />
        <Footer />
      </div>
    </div>
  );
}
