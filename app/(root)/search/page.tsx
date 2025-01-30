"use client";

import Filters from "@/components/Shared/Filters";
import ProductsList from "@/components/Shared/ProductsList";
import React, { useEffect, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { IAttribute, ICategory, IProduct, ISize } from "@/types";
import { fetcher, fetchOpt } from "@/lib/utils";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/stores/data";
import { ReloadIcon } from "@radix-ui/react-icons";
import MobileFilters from "@/components/Shared/MobileFilters";
import SortBy from "@/components/Shared/SortBy";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useAction } from "@/stores/action";
import NewArrivals from "@/components/Shared/NewArrivals";
import BestSellers from "@/components/Shared/BestSellers";
import DefaultPage from "./DefaultPage";

interface IFilters {
  key: string;
  value: string[];
}

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setShowLoadingScreen } = useAction();
  const { filterProperties, setFilterProperties } = useDataStore();
  const [sizes, setSizes] = useState<string[]>([]);
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const { mutate: fetchFilterProperties } = useSWR(`/api/filters`, fetcher, fetchOpt);

  const [genders, setGenders] = useState<string[]>([]);
  const [category, setCategory] = useState<ICategory>();
  const [productTypes, setProductTypes] = useState<string[]>([]);

  const { data, isLoading } = useSWR(`/api/search?${searchParams}`, fetcher, {
    ...fetchOpt,
    revalidateOnMount: true,
  });

  // applying filters
  const [filteredProducts, setFilteredProducts] = React.useState<IProduct[]>([]);

  const allParams: IFilters[] = []; // Convert the search parameters into an array
  let query = searchParams.get("q") || "";
  searchParams.forEach((value, key) => {
    if (key === "q") return;
    allParams.push({ key, value: value.split("_") });
  });

  const [filters, setFilters] = React.useState<IFilters[]>(allParams);
  useEffect(() => {
    if (!query) return;
    // create a param string from the filters
    const filterString = filters.length ? filters.map((f) => `${f.key}=${f.value.join("_")}`).join("&") : "";
    if (filterString) {
      setShowLoadingScreen(true);
      router.push(`search?q=${query}&${filterString}`);
      return;
    }
    router.push(`search?q=${query}`);
  }, [filters]);
  // end of filters

  // fetch filter properties from DB
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchFilterProperties();
      setFilterProperties(res?.data || {});
    };
    fetch();
  }, []);

  useEffect(() => {
    setShowLoadingScreen(false);
    if (!data?.ok) return;

    const sizeList = data?.productSizes
      .reverse()
      .map((size: string) => filterProperties?.sizes?.find((item) => item.type === size)?.value.map((item) => item))
      .flat();

    setSizes(sizeList ?? []);
    if (data?.genders?.length > 1) setGenders(data?.genders || []); // set only if genders are more than 1

    const productTypeIds = [...new Set(data?.products?.map((i: IProduct) => i.productType?.id).flat())];
    setAttributes(
      filterProperties?.attributes?.reduce((acc: IAttribute[], curr) => {
        if (productTypeIds.includes(curr.productTypeId)) {
          return [...acc, curr];
        }
        return acc;
      }, [])
    );

    setFilteredProducts(data?.products || []);
  }, [data]);

  return (
    <div className="max-w-desktop mx-auto px-2 pb-1 md:py-[2px] h-full min-h-[calc(100vh-200px)]">
      {/* mobile design */}
      <div className="md:hidden fixed bottom-[48px] mobile:bottom-[56px] left-0 right-0 z-[2] flex justify-between bg-background">
        <div className="w-full text-center p-2 border border-r-0 border-border">
          <SortBy items={filteredProducts} setItems={setFilteredProducts} />
        </div>
        <MobileFilters
          genders={genders}
          productTypes={productTypes}
          sizes={sizes}
          attributes={attributes}
          colors={filterProperties?.colors}
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      {/* desktop design */}
      {query && (
        <div className="flex gap-8 md:py-5">
          <div className="hidden md:block tablet:w-50 laptop:w-64 ">
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
                  genders={genders}
                  productTypes={productTypes}
                  sizes={sizes}
                  attributes={attributes}
                  colors={filterProperties?.colors}
                  filters={filters}
                  setFilters={setFilters}
                />
              </Accordion>
            </div>
          </div>

          <div className="flex flex-col w-full mt-[-5px]">
            <div className="z-[2] flex justify-between items-center gap-5 sticky md:flex top-12 md:top-auto bg-background mb-3 py-3 md:p-0">
              <div className="font-semibold text-xl md:text-2xl font-sans tracking-wide">
                {category?.name}{" "}
                {(category?.products || data?.products) && (
                  <span className="font-extralight">({category?.products?.length || data?.products?.length})</span>
                )}
              </div>

              <div className="hidden md:block">
                <SortBy items={filteredProducts} setItems={setFilteredProducts} desktop />
              </div>
            </div>

            {category?.banner && (
              <div className="mb-3">
                <AspectRatio ratio={3.57 / 1}>
                  <Image
                    src={category?.banner || ""}
                    alt="Image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-md object-contain w-full h-full"
                  />
                </AspectRatio>
              </div>
            )}

            {!isLoading && !filteredProducts?.length && (
              <div className="flex flex-col gap-5 items-center text-muted-foreground mt-10">
                <p className="text-lg">No products found</p>
                <Button className="" onClick={() => router.push("/search")}>
                  Clear All
                </Button>
              </div>
            )}

            {filteredProducts?.length > 0 && <ProductsList products={filteredProducts} />}
          </div>
        </div>
      )}

      {/* show when no query is provided */}
      {!query && <DefaultPage />}
    </div>
  );
};

const Fetching = () => {
  return (
    <div className="flex items-center justify-center mt-10">
      <ReloadIcon className="mr-2 h-5 w-5 animate-spin" />
      <p className="text-xl tablet:text-2xl font-light">fetching...</p>
    </div>
  );
};

export default Page;
