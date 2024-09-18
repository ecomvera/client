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
import { ReloadIcon } from "@radix-ui/react-icons";
import { GrSort } from "react-icons/gr";
import { FiFilter } from "react-icons/fi";

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
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);
  const { data, isLoading } = useSWR(`/api/categories/${params.slug}?${searchParams.toString()}`, fetcher);

  // applying filters
  const [filteredProducts, setFilteredProducts] = React.useState<IProduct[]>([]);

  const allParams: IFilters[] = []; // Convert the search parameters into an array
  searchParams.forEach((value, key) => {
    allParams.push({ key, value: value.split("_") });
  });

  const [filters, setFilters] = React.useState<IFilters[]>(allParams);
  const handleClearAll = () => {
    setFilters(category?.parentId ? [] : [filters[0]]); // Set the first filter as the default for the parent category
  };

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
      if (data?.category?.parentId) {
        setFilteredProducts(data?.category.products);
      } else {
        // console.log(data?.subCategories);
        setSubCategories(data?.subCategories);
        const products = data?.category?.children?.reduce((acc: IProduct[], category: ICategory) => {
          // @ts-ignore
          return [...acc, ...category.products];
        }, []);
        setFilteredProducts(products);
      }
      setCategory(data?.category);
    }
  }, [data?.category]);

  if (!isLoading && !data?.category) return <NotFound />;
  if (category)
    return (
      <div className="px-2 pb-1 md:py-[2px] min-h-[calc(100vh-200px)] md:min-h-0">
        <BreadcrumbCard
          title={category.name}
          nav={category.parent ? [{ title: category.parent?.name, url: `/${category.parent.slug}?parent=true` }] : []}
        />

        {/* mobile design */}
        <div className="md:hidden fixed bottom-[48px] mobile:bottom-[56px] left-0 right-0 z-[2] flex justify-between bg-background">
          <div className="w-full text-center p-2 border border-r-0 font-semibold text-muted-foreground">
            <GrSort className="inline mr-1" /> Sort
          </div>
          <Drawer>
            <DrawerTitle className="hidden">Filters</DrawerTitle>
            <DrawerTrigger className="w-full border">
              <span className="font-semibold text-muted-foreground">
                <FiFilter className="inline mr-1 w-5 h-5" />
                Filters
              </span>
            </DrawerTrigger>
            <DrawerContent className="px-5 mb-4 max-h-[60vh] border-none" aria-describedby={undefined}>
              <Accordion
                type="multiple"
                defaultValue={Array.from({ length: 10 }).map((_, i) => `item-${i + 1}`)}
                className="w-full gap-5 grid grid-cols-auto overflow-scroll hide-scrollbar"
              >
                <Filters
                  subCategories={subCategories}
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

        {/* desktop design */}
        <div className="flex gap-8 py-3 md:py-5">
          <div className="static top-12 hidden md:block tablet:w-50 laptop:w-64 ">
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">Filters</span>
              {filters.length > 0 && (
                <span className="font-semibold text-destructive cursor-pointer" onClick={handleClearAll}>
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
                  subCategories={subCategories}
                  sizes={filterProperties.sizes}
                  attributes={filterProperties.attributes}
                  colors={filterProperties.colors}
                  filters={filters}
                  setFilters={setFilters}
                />
              </Accordion>
            </div>
          </div>

          <div className="flex flex-col w-full mt-[-5px]">
            <div className="z-[2] flex justify-between items-center gap-5 sticky md:flex top-12 md:top-auto bg-background mb-3 py-3 md:p-0">
              <div className="font-semibold text-xl md:text-2xl font-sans text-light-1 tracking-wide">
                {category.name}{" "}
                {category.products && <span className="font-extralight">({category?.products?.length})</span>}
              </div>

              <div className="font-semibold text-muted-foreground">
                <GrSort className="inline mr-1" /> Sort
              </div>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center mt-32">
                <ReloadIcon className="mr-2 h-5 w-5 animate-spin" />
                <p className="text-xl tablet:text-2xl font-light">fetching...</p>
              </div>
            )}
            {!isLoading && !filteredProducts?.length && (
              <div className="flex flex-col gap-5 items-center text-muted-foreground mt-32">
                <p className="text-lg">No products found</p>
                <Button className="" onClick={handleClearAll}>
                  Clear All
                </Button>
              </div>
            )}
            {!isLoading && filteredProducts?.length > 0 && <ProductsList products={filteredProducts} />}
          </div>
        </div>
      </div>
    );
};

export default Page;
