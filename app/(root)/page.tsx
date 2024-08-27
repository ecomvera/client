"use client";

import Banner from "@/components/Cards/Banner";
import Footer from "@/components/Shared/Footer";
import BestSellers from "@/components/Shared/BestSellers";
import NewArrivals from "@/components/Shared/NewArrivals";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Banner />

      <NewArrivals />

      <BestSellers />
      <Footer />
    </>
  );
}
