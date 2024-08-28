import React from "react";
import ProductCard from "../Cards/ProductCard";
import { IProduct } from "@/types";

const ProductsList = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 mobile:grid-cols-3 tablet:grid-cols-3 laptop:grid-cols-4 gap-2">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
