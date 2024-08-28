import React from "react";
import ProductCard from "../Cards/ProductCard";

const ProductsList = () => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 mobile:grid-cols-3 tablet:grid-cols-3 laptop:grid-cols-4 gap-2">
        {[...Array(8)].map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
