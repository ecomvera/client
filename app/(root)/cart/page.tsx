"use client";

import React from "react";
import { useData } from "@/hooks/useData";
import DefaultPage from "./_components/default";

const Page = () => {
  const { cart, totalMRP, totalPrice, finalPrice } = useData();

  return (
    <div className="max-w-desktop mx-auto px-2 py-5">
      <h1 className="text-xl md:text-2xl">My Cart</h1>

      <DefaultPage cart={cart} totalMRP={totalMRP} totalPrice={totalPrice} finalPrice={finalPrice} />
      {/* <CheckoutFlow /> */}
    </div>
  );
};

export default Page;
