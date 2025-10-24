import Image from "next/image";
import HeroSection from "@/components/home page/hero";
import Categories from "@/components/ui/categories";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center max-w-7xl mx-auto gap-10 md:gap-16 lg:gap-20">
          <h2 className="text-6xl font-bold font-serif text-[#0D383B] text-center">Our Collections</h2>
          <Categories />
        </div>
      </section>
    </main>
  );
}
