"use client";

import React, { useEffect } from "react";
import NewArrivals from "@/components/Shared/NewArrivals";
import { getData } from "@/lib/utils";
import ShopByCategory from "./ShopByCategory";

const ListByCategory = () => {
  const [categories, setCategories] = React.useState([]);
  const [newArrivals, setNewArrivals] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [categories, newArrivals] = await Promise.all([
        getData("/api/products?shop-by-category"),
        getData("/api/products?new-arrivals"),
      ]);
      setCategories(categories);
      setNewArrivals(newArrivals);
    };

    fetchData();
  }, []);

  return (
    <div>
      <ShopByCategory data={categories || []} />
      <NewArrivals data={newArrivals || []} />
    </div>
  );
};

export default ListByCategory;
