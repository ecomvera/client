"use client";

import NotFound from "@/components/Cards/404";
import BreadcrumbCard from "@/components/Cards/BreadcrumbCard";
import Filters from "@/components/Shared/Filters";
import ProductsList from "@/components/Shared/ProductsList";
import React, { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Accordion } from "@/components/ui/accordion";
import { ICategory, IProduct } from "@/types";
import { fetcher, fetchOpt } from "@/lib/utils";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/stores/data";

interface IFilters {
  key: string;
  value: string[];
}

const Page = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filterProperties, setFilterProperties } = useDataStore();
  const { mutate: fetchFilterProperties } = useSWR(`/api/enum`, fetcher, fetchOpt);

  const [category, setCategory] = useState<ICategory>();
  const { data, isLoading } = useSWR(`/api/categories/${params.slug}?${searchParams.toString()}`, fetcher);

  // applying filters
  const [filteredProducts, setFilteredProducts] = React.useState<IProduct[]>([]);

  const allParams: IFilters[] = []; // Convert the search parameters into an array
  searchParams.forEach((value, key) => {
    allParams.push({ key, value: value.split("_") });
  });

  const [filters, setFilters] = React.useState<IFilters[]>(allParams);
  useEffect(() => {
    // create a single string from the filters
    const filterString = filters.length ? filters.map((f) => `${f.key}=${f.value.join("_")}`).join("&") : "";
    router.push(`/${params.slug}?${filterString}`);
  }, [filters]);
  // end of filters

  // fetch filter properties from DB
  useEffect(() => {
    const fetch = async () => {
      if (!filterProperties.sizes.length) {
        const res = await fetchFilterProperties();
        setFilterProperties(res?.data || {});
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (data?.category) {
      setFilteredProducts(data?.category.products);
      setCategory(data?.category);
    }
  }, [data?.category]);

  if (!isLoading && !data?.category) return <NotFound />;
  if (category)
    return (
      <div className="px-2 pb-1 py-[2px] min-h-[calc(100vh-100px)]">
        <BreadcrumbCard
          title={category.name}
          nav={category.parent ? [{ title: category.parent?.name, url: `/${category.parent.slug}` }] : []}
        />

        <div className="">
          <div className="z-[2] flex justify-between items-center gap-5 sticky md:block top-12 md:top-auto py-3 bg-background">
            <div className="flex justify-between">
              <div className="font-bold text-xl md:text-2xl font-sans text-light-1  tracking-wide">
                {category.name} <span className="font-extralight">({category?.products?.length})</span>
              </div>
            </div>
            <div className="md:hidden">
              <Drawer>
                <DrawerTitle className="hidden">Filters</DrawerTitle>
                {filters.length > 0 && (
                  <span className="text-sm font-semibold text-destructive" onClick={() => setFilters([])}>
                    Clear All
                  </span>
                )}
                <DrawerTrigger>
                  <span className="ml-5 font-semibold text-muted-foreground">Filters</span>
                </DrawerTrigger>
                <DrawerContent className="px-5 mb-4 max-h-[60vh] border-none" aria-describedby={undefined}>
                  <Accordion
                    type="multiple"
                    defaultValue={Array.from({ length: 10 }).map((_, i) => `item-${i + 1}`)}
                    className="w-full gap-5 grid grid-cols-auto overflow-scroll hide-scrollbar"
                  >
                    <Filters
                      sizes={filterProperties.sizes}
                      attributes={filterProperties.attributes}
                      colors={filterProperties.colors}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </Accordion>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          <div className="flex gap-5 my-3 md:my-8">
            <div className="hidden md:block tablet:w-40 laptop:w-64 ">
              <div className="flex justify-between">
                <span className="font-semibold text-muted-foreground">Filters</span>
                {filters.length > 0 && (
                  <span className="font-semibold text-destructive" onClick={() => setFilters([])}>
                    Clear All
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Accordion
                  type="multiple"
                  defaultValue={Array.from({ length: 10 }).map((_, i) => `item-${i + 1}`)}
                  className="w-full"
                >
                  <Filters
                    sizes={filterProperties.sizes}
                    attributes={filterProperties.attributes}
                    colors={filterProperties.colors}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </Accordion>
              </div>
            </div>
            {isLoading && (
              <div className="flex-1 w-full h-full z-50 flex justify-center">
                <p className="text-xl tablet:text-2xl font-light mt-10">fetching...</p>
              </div>
            )}
            {!isLoading && !filteredProducts.length && (
              <div className="flex flex-col gap-5 items-center  text-muted-foreground flex-1 w-full">
                <p className="text-lg">No products found</p>
                <Button className="" onClick={() => setFilters([])}>
                  Clear All
                </Button>
              </div>
            )}
            {!isLoading && filteredProducts.length > 0 && <ProductsList products={filteredProducts} />}
          </div>
        </div>
      </div>
    );
};

export default Page;
