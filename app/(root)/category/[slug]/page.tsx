"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";

import Filters from "@/components/Shared/Filters";
import ProductsList from "@/components/Shared/ProductsList";
import { Accordion } from "@/components/ui/accordion";
import { IFilters, IProduct } from "@/types";
import { fetcher, fetchOpt } from "@/lib/utils";
import { useDataStore } from "@/stores/data";
import { useAction } from "@/stores/action";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import SortBy from "@/components/Shared/SortBy";
import Search from "@/components/forms/Search";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { slug } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setShowLoadingScreen } = useAction();
  const { filterProperties, setFilterProperties } = useDataStore();

  const [filters, setFilters] = useState<IFilters[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [categoryData, setCategoryData] = useState<any>(null);

  const [garmentTypes, setGarmentTypes] = useState<string | string[]>();

  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const limit = 20;

  // build the search string from URL and page state
  const apiSearchParams = new URLSearchParams(searchParams.toString());
  apiSearchParams.set("page", page.toString());
  apiSearchParams.set("limit", limit.toString());
  const searchStr = apiSearchParams.toString();

  const { data, isLoading } = useSWR(`/api/categories/${slug}?${searchStr}`, fetcher, {
    ...fetchOpt,
    revalidateOnMount: true,
  });

  // parse filters from URL
  useEffect(() => {
    const newFilters: IFilters[] = [];
    searchParams.forEach((value, key) => {
      if (["q", "page", "limit"].includes(key)) return;
      newFilters.push({ key, value: value.split("_") });
    });
    setFilters(newFilters);
  }, [searchParams]);

  // update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (query) newParams.set("q", query);
    filters.forEach((f) => newParams.set(f.key, f.value.join("_")));
    newParams.set("page", page.toString());
    newParams.set("limit", limit.toString());

    const newUrl = `/category/${slug}?${newParams.toString()}`;
    const current = decodeURIComponent(window.location.search);

    if (current !== `?${newParams.toString()}`) {
      router.push(newUrl);
    }
  }, [filters, page]);

  // handle loaded data
  useEffect(() => {
    if (!data?.ok) return;
    setFilteredProducts(data.products || []);
    setCategoryData({
      category: data.category,
      parentCategory: data.parentCategory,
      subCategories: data.subCategories,
    });

    // set filter properties based on category data
    let garmentTypes = data.category?.garmentType || null;
    let wearTypes = data.category?.wearType || null;

    // if there is only one garment type, set it as a string
    if (garmentTypes.length === 1) garmentTypes = garmentTypes[0];
    setGarmentTypes(garmentTypes);

    const url =
      `/api/filters?` +
      `${garmentTypes ? `garment_type=${data.category?.garmentType.join("_")}` : ""}` +
      `${wearTypes ? `&wear_type=${wearTypes.join("_")}` : ""}`;

    const fetchFilters = async () => {
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok || !json.ok) return console.error("Failed to fetch filters", json.error);
      setFilterProperties(json?.data || {});
    };
    fetchFilters();
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      setShowLoadingScreen(true);
    } else {
      setShowLoadingScreen(false);
    }
  }, [isLoading]);

  return (
    <div className="max-w-desktop mx-auto px-2 pb-1 md:py-[2px] h-full min-h-[calc(100vh-200px)]">
      {/* Mobile Search */}
      <Search className="flex laptop:hidden my-2 mb-4 border-2" query={query} />

      <div className="flex gap-8 laptop:py-5">
        {/* Filters Sidebar */}
        <div className="hidden md:block tablet:w-50 laptop:w-64">
          <div className="flex justify-between">
            <span className="font-semibold text-muted-foreground">Filters</span>
            {filters.length > 0 && (
              <span className="font-semibold text-destructive cursor-pointer" onClick={() => setFilters([])}>
                Clear All
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3", "item-4"]} className="w-full">
              <Filters
                // categories={data?.subCategories || []}
                // genders={filterProperties?.genders}
                // productTypes={filterProperties?.productTypes}
                productTypes={Array.isArray(garmentTypes) ? garmentTypes : []}
                // 👆 sending productTypes, if multiple values exists [only for collections or parent category]
                sizes={filterProperties?.sizes.map((size) => size.value).flat()}
                attributes={filterProperties?.attributes}
                colors={filterProperties?.colors}
                filters={filters}
                setFilters={setFilters}
              />
            </Accordion>
          </div>
        </div>

        {/* Product Listing */}
        <div className="flex flex-col w-full mt-[-5px]">
          <div className="z-[2] flex justify-between items-center gap-5 sticky md:flex top-12 md:top-auto bg-background mb-3 py-0 md:p-0">
            <div className="font-semibold text-lg font-sans tracking-wide">
              {data?.parentCategory && (
                <span>
                  <Link className="border-b border-muted-foreground" href={`/category/${data.parentCategory.slug}`}>
                    {data.parentCategory.name}
                  </Link>
                  <span className="text-muted-foreground"> / </span>
                </span>
              )}
              <span className="font-light">
                {categoryData?.category?.name || "Products"}
                {filteredProducts.length > 0 && ` (${filteredProducts.length})`}
              </span>
            </div>
            <div className="hidden md:block">
              <SortBy items={filteredProducts} setItems={setFilteredProducts} desktop />
            </div>
          </div>

          {/* Loading */}
          {isLoading && !filteredProducts.length && <Fetching />}

          {/* No Category Data */}
          {!isLoading && !categoryData && (
            <div className="flex flex-col gap-5 items-center text-muted-foreground mt-10">
              <p className="text-lg">Category not found</p>
              <Button onClick={() => router.push("/")}>Go to Home</Button>
            </div>
          )}

          {/* No Products */}
          {!isLoading && categoryData && filteredProducts.length === 0 && (
            <div className="flex flex-col gap-5 items-center text-muted-foreground mt-10">
              <p className="text-lg">No products found</p>
              {filters.length ? (
                <Button onClick={() => setFilters([])}>Clear All</Button>
              ) : (
                <Button onClick={() => router.push("/")}>Go to Home</Button>
              )}
            </div>
          )}

          {/* Product List */}
          {filteredProducts.length > 0 && <ProductsList products={filteredProducts} />}

          {/* Pagination */}
          {data?.pagination?.totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: data.pagination.totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 ${data.pagination.page === i + 1 ? "bg-[--c2] text-white" : "bg-gray-200"} rounded`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Fetching = () => (
  <div className="flex items-center justify-center mt-10">
    <ReloadIcon className="mr-2 h-5 w-5 animate-spin" />
    <p className="text-xl tablet:text-2xl font-light">Fetching...</p>
  </div>
);

export default Page;
