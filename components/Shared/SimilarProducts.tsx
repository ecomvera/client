"use client";

import InfoCard from "../Cards/InfoCard";
import ProductCard from "../Cards/ProductCard";
import Carousel from "./Carousel";

const product = {
  image: "/assets/p1.webp",
  route: "/p/p1",
  label: "Men T-Shirt",
  price: "50.00",
};

const SimilarProducts = () => {
  return (
    <div className="py-5">
      <h2 className="text-2xl text-dark-3 font-bold py-5">Related Products</h2>

      <Carousel nodots>
        <InfoCard {...product} />
        <InfoCard {...product} />
        <InfoCard {...product} />
        <InfoCard {...product} />
        <InfoCard {...product} />
      </Carousel>
    </div>
  );
};

export default SimilarProducts;
