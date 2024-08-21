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
import Header from "@/components/Shared/Header";

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
