"use client";

import NotFound from "@/components/Cards/404";
import BreadcrumbCard from "@/components/Cards/BreadcrumbCard";
import LoadingPage from "@/components/Shared/LoadingPage";
import ProductDetails from "@/components/Shared/ProductDetails";
import SimilarProducts from "@/components/Shared/SimilarProducts";
import { IProduct } from "@/types";
import React, { useEffect } from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = React.useState<IProduct>({} as IProduct);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function fetchData() {
      console.log("fetching data - category -", params.slug);
      const response = await fetch(`/api/product/${params.slug}`);
      const data = await response.json();
      if (data.ok) setProduct(data.data);
      setLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingPage />;
  if (!loading && !product) return <NotFound />;

  return (
    <div>
      <div className="max-w-desktop mx-auto px-2">
        <BreadcrumbCard
          nav={[
            { title: product.category?.name, url: `/${product.category?.slug}` },
            { title: product.subCategory?.name, url: `/${product.subCategory?.slug}` },
          ]}
          title={product.name}
        />
        <ProductDetails product={product} />
        {/* <SimilarProducts /> */}
      </div>
    </div>
  );
};

export default Page;
