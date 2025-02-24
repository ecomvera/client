"use client";

import { IProduct } from "@/types";
import ReactCarousel from "./Carousel";
import { CarouselItem } from "../ui/carousel";
import ProductCard from "../Cards/ProductCard";

const SimilarProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="py-5">
      <h2 className="text-xl font-semibold py-5">You may also like</h2>

      <ReactCarousel showArrows autoPlay={5000}>
        {products?.map((product: IProduct) => (
          <CarouselItem key={product.id} className="basis-[40%] sm:basis-1/3 md:basis-1/5 lg:basis-1/6">
            <ProductCard product={product} showHeart={false} showRating={true} />
          </CarouselItem>
        ))}
      </ReactCarousel>
    </div>
  );
};

export default SimilarProducts;
