"use client";

import React from "react";
import { IProduct } from "@/types";
import useSWR from "swr";
import { fetcher, fetchOpt } from "@/lib/utils";
import ReactCarousel from "./Carousel";
import { CarouselItem } from "../ui/carousel";
import ProductCard from "../Cards/ProductCard";

const NewArrivals = () => {
  const fetchProducts = useSWR("/api/products?new-arrivals", fetcher, fetchOpt);
  const { data: products, isLoading } = fetchProducts;

  if (isLoading || products?.data?.length === 0) return null;

  return (
    <div className="px-2 mobile:py-4 mt-5">
      <h2 className="text-center text-xl mobile:text-2xl text-light-1 font-semibold uppercase">New Arrivals</h2>

      <ReactCarousel showArrows autoPlay={5000}>
        {products?.data.map((product: IProduct) => (
          <CarouselItem key={product.id} className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <ProductCard product={product} showHeart={false} showRating={false} />
          </CarouselItem>
        ))}
      </ReactCarousel>
    </div>
  );
};

export default NewArrivals;
