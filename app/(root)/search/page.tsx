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
import DefaultPage from "./DefaultPage";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setShowLoadingScreen } = useAction();
  const { filterProperties, setFilterProperties } = useDataStore();

  const [filters, setFilters] = useState<IFilters[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const limit = 20;

  // build the search string from URL and page state
  const searchStr = `${searchParams.toString()}&page=${page}&limit=${limit}`;
  const { data, isLoading } = useSWR(`/api/search?${searchStr}`, fetcher, { ...fetchOpt, revalidateOnMount: true });

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
    if (!query) return;

    const newParams = new URLSearchParams({ q: query });

    filters.forEach((f) => {
      newParams.set(f.key, f.value.join("_"));
    });

    const newUrl = `/search?${newParams.toString()}`;

    // Avoid pushing same URL again
    if (decodeURIComponent(window.location.search) !== `?${newParams.toString()}`) {
      const timer = setTimeout(() => {
        setShowLoadingScreen(true);
        router.push(newUrl);
      }, 100); // adjust delay as needed

      return () => clearTimeout(timer);
    }
  }, [filters, page]);

  // fetch filter properties once
  useEffect(() => {
    const fetchFilters = async () => {
      const res = await fetch(`/api/filters`);
      const json = await res.json();
      setFilterProperties(json?.data || {});
    };
    fetchFilters();
  }, []);

  // handle loaded data
  useEffect(() => {
    setShowLoadingScreen(false);
    if (!data?.ok) return;
    setFilteredProducts(data.data || []);
  }, [data]);

  return (
    <div className="max-w-desktop mx-auto px-2 pb-1 md:py-[2px] h-full min-h-[calc(100vh-200px)]">
      {/* Mobile Search */}
      <Search className="flex laptop:hidden my-2 mb-4 border-2" query={query} />

      {/* When query exists */}
      {query ? (
        <div className="flex gap-8 md:py-5">
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
              <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="w-full">
                <Filters
                  genders={filterProperties?.genders}
                  productTypes={filterProperties?.productTypes}
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
              <div className="font-semibold text-xl md:text-2xl font-sans tracking-wide">
                {query}
                {filteredProducts.length > 0 && <span className="ml-2 font-extralight">({filteredProducts.length})</span>}
              </div>
              <div className="hidden md:block">
                <SortBy items={filteredProducts} setItems={setFilteredProducts} desktop />
              </div>
            </div>

            {/* Loading */}
            {isLoading && !filteredProducts.length && <Fetching />}

            {/* No Products */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="flex flex-col gap-5 items-center text-muted-foreground mt-10">
                <p className="text-lg">No products found</p>
                <Button onClick={() => setFilters([])}>Clear All</Button>
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
                    className={`px-4 py-2 ${
                      data.pagination.page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                    } rounded`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <DefaultPage />
      )}
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
