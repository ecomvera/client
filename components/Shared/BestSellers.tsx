"use client";

import { CarouselItem } from "../ui/carousel";
import ReactCarousel from "./Carousel";
import { IProduct } from "@/types";
import ProductCard from "../Cards/ProductCard";
import _ from "lodash";

const BestSellers = ({ data: products }: { data: IProduct[] }) => {
  if (!products || products.length === 0) return null;
  return (
    <div className="px-2 mobile:py-4 mt-5">
      <h2 className="text-center text-xl mobile:text-2xl text-light-1 font-semibold uppercase pb-3">Best Sellers</h2>

      <ReactCarousel showArrows autoPlay={5000}>
        {_.map(products, (product: IProduct) => (
          <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <ProductCard product={product} showHeart={false} />
          </CarouselItem>
        ))}
      </ReactCarousel>
    </div>
  );
};

export default BestSellers;
