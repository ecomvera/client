"use client";

import { IProduct } from "@/types";
import ReactCarousel from "./Carousel";
import { CarouselItem } from "../ui/carousel";
import ProductCard from "../Cards/ProductCard";
import _ from "lodash";

const NewArrivals = ({ data: products }: { data: IProduct[] }) => {
  if (!products || products.length === 0) return null;
  return (
    <div className="px-2 mobile:py-4 mt-5">
      <h2 className="text-center text-xl mobile:text-2xl text-light-1 font-semibold uppercase pb-3">New Arrivals</h2>

      <ReactCarousel showArrows autoPlay={5000}>
        {_.map(products, (product: IProduct) => (
          <CarouselItem key={product.id} className="basis-3/5 sm:basis-1/3 md:basis-1/5 lg:basis-1/6">
            <ProductCard product={product} showHeart={false} showRating={false} />
          </CarouselItem>
        ))}
      </ReactCarousel>
    </div>
  );
};

export default NewArrivals;
