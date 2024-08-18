import EventsMenu from "@/components/EventsMenu";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from "@/components/home/Banner";
import BetContainer from "@/components/BetContainer";
import Categories from "@/components/Categories";
import QuickBet from "@/components/QuickBet";
import MyBets from "@/components/MyBets";

export default function Home() {
  return (
    <div className="w-full mx-auto">
      <div className="h-[95vh] overflow-y-scroll py-5 space-y-[max(1vw,10px)]">
        <Banner />
        <Categories />
        <EventsMenu />
        <QuickBet />
        <BetContainer />
        <Footer />
      </div>
    </div>
  );
}
