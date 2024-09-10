"use client";

import NotFound from "@/components/Cards/404";
import BreadcrumbCard from "@/components/Cards/BreadcrumbCard";
import LoadingPage from "@/components/Shared/LoadingPage";
import ProductDetails from "@/components/Shared/ProductDetails";
import SimilarProducts from "@/components/Shared/SimilarProducts";
import { fetcher, fetchOpt } from "@/lib/utils";
import { IProduct } from "@/types";
import React, { useEffect } from "react";
import useSWR from "swr";

const Page = ({ params }: { params: { slug: string } }) => {
  const fetchProduct = useSWR(`/api/products/${params.slug}`, fetcher, fetchOpt);
  const { data, isLoading } = fetchProduct;
  const product: IProduct = data?.data;

  if (isLoading) return <LoadingPage />;
  if (!isLoading && !product) return <NotFound />;

  if (product)
    return (
      <div>
        <div className="max-w-desktop mx-auto px-2">
          <BreadcrumbCard
            nav={[
              { title: product.category?.parent?.name || "", url: `/${product.category?.parent?.slug}` },
              { title: product.category?.name || "", url: `/${product.category?.slug}` },
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
