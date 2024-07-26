import Header from "@/components/common/Header";
import Banner from "@/components/home/Banner";
import Categorys from "@/components/home/Categorys";

export default function Home() {
  return (
    <main className=" w-[95%] mx-auto">
      <Header />
      <Banner />
      <Categorys />
    </main> 
  );
}
