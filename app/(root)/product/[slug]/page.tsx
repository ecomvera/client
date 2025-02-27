import NotFound from "@/components/Cards/404";
import BreadcrumbCard from "@/components/Cards/BreadcrumbCard";
import LoadingPage from "@/components/Shared/LoadingPage";
import ProductDetails from "@/components/Shared/ProductDetails";
import SimilarProducts from "@/components/Shared/SimilarProducts";
import { getData } from "@/lib/utils";
import React, { useEffect } from "react";

const Page = async ({ params }: { params: { slug: string } }) => {
  // const fetchProduct = useSWR(`/api/products/${params.slug}`, fetcher, noCache);
  // const { data, isLoading } = fetchProduct;
  const product = await getData(`/api/products/${params.slug}`);
  const similarProducts = await getData(`/api/products?new-arrivals`);
  if (!product) return <NotFound />;

  if (product)
    return (
      <div className="max-w-desktop mx-auto px-2 mb-14">
        <BreadcrumbCard
          nav={[
            { title: product.category?.parent?.name || "", url: `/${product.category?.parent?.slug}` },
            { title: product.category?.name || "", url: `/${product.category?.slug}` },
          ]}
          title={product.name}
        />
        <ProductDetails product={product} />
        <SimilarProducts products={similarProducts} />
      </div>
    );
};

export default Page;
