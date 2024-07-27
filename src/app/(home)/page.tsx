import Header from "@/components/common/Header";
import Banner from "@/components/home/Banner";
import BetCard from "@/components/home/BetCard";
import Categorys from "@/components/home/Categorys";
import QuickBet from "@/components/home/QuickBet";

export default function Home() {
  return (
    <main className=" w-[95%] pb-[5rem] mx-auto">
      <Header />
      <Banner />
      <Categorys />
      <QuickBet />
      <BetCard />
    </main> 
  );
}
