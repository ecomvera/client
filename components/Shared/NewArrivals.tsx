"use client";

import React, { useEffect } from "react";
import ProductCard from "../Cards/ProductCard";
import { IProduct } from "@/types";

const NewArrivals = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);

  useEffect(() => {
    async function fetchData() {
      console.log("fetching data - products -", "new-arrivals");
      const response = await fetch(`/api/product?query=new-arr=true`);
      const data = await response.json();
      if (data.ok) setProducts(data.data);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="px-2 mobile:py-4 mt-5">
      <h2 className="text-center text-xl mobile:text-2xl tablet:text-3xl text-light-1 font-bold uppercase">New Arrivals</h2>

      <div className="max-w-screen overflow-x-scroll hide-scrollbar">
        <div className="flex gap-2 my-2 w-[max-content]">
          {products.map((product) => (
            <div key={product._id} className="w-[250px] h-[350px]">
              <ProductCard key={product._id} product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
