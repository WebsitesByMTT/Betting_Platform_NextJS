import Header from "@/components/common/Header";
import Banner from "@/components/home/Banner";
import BetCard from "@/components/home/BetCard";
import Categorys from "@/components/home/Categorys";
import QuickBet from "@/components/home/QuickBet";
import TopBetsCarousel from "@/components/home/TopBetsCarousel";

export default function Home() {
  return (
    <main className=" w-[95%] pb-[4rem] p-2 mx-auto">
      <Header />
      <Banner />
      <Categorys />
      <TopBetsCarousel />
      <QuickBet />
      <BetCard />
    </main> 
  );
}
