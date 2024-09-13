
import EventsMenu from "@/components/EventsMenu";
import Banner from "@/components/home/Banner";
import BetContainer from "@/components/BetContainer";
import Categories from "@/components/Categories";
import QuickBet from "@/components/QuickBet";
import Footer from "@/components/Footer";
import Searchbar from "@/components/SearchBar";


export default function Home({ params }: any) {

  return (
    <div className="w-full mx-auto">
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
