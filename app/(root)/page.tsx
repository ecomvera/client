"use client";

import Banner from "@/components/Cards/Banner";
import InfoCard from "@/components/Cards/InfoCard";
import Search from "@/components/forms/Search";
import DropdownMenu from "@/components/Shared/DropdownMenu";
import { categories } from "@/constants";
import Image from "next/image";
import { IoStorefront } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "@/components/Shared/Footer";
import BestSellers from "@/components/Shared/BestSellers";
import Carousel from "@/components/Shared/Carousel";
import NewArrivals from "@/components/Shared/NewArrivals";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Banner />
      <Categories />

      <NewArrivals />

      <BestSellers />
      <Footer />
    </main>
  );
}

const Header = () => {
  return (
    <div className="w-full sticky top-0 bg-white z-10 shadow-lg">
      <div className="max-w-desktop mx-auto px-2 w-full sticky top-0 bg-white">
        <div className="flex justify-between gap-3 py-1 tablet:py-3 items-center">
          <div className="flex gap-3 items-center">
            <IoStorefront className="text-3xl" />
            <h2 className="hidden text-2xl text-dark-3 font-bold uppercase tracking-wide tablet:block">Brand Name</h2>
          </div>

          <Search />

          <div className="flex gap-5">
            <Image src="/assets/user.png" alt="user" width={25} height={25} />
            <Image src="/assets/bag.png" alt="user" width={25} height={25} />
          </div>
        </div>

        {/* <DropdownMenu /> */}
      </div>
    </div>
  );
};

const Categories = () => {
  return (
    <div className="max-w-desktop mx-auto py-5">
      <Carousel>
        {categories?.map((category) => (
          <InfoCard key={category.label} {...category} isCategory />
        ))}
      </Carousel>
    </div>
  );
};
