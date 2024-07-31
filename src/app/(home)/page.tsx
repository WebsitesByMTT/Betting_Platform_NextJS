import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Banner from "@/components/home/Banner";
import BetCard from "@/components/home/BetCard";
import Categories from "@/components/home/Categories";
import QuickBet from "@/components/home/QuickBet";
import TopBetsCarousel from "@/components/home/TopBetsCarousel";

export default function Home() {
  return (
    <main className=" w-[95%] p-2 mx-auto">
      <Header />
      <Banner />
      <Categories />
      <TopBetsCarousel />
      <QuickBet />
      <BetCard />
      <Footer/>
    </main> 
  );
}
