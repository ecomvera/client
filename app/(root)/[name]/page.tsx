"use client";

import NotFound from "@/components/Cards/404";
import BreadcrumbCard from "@/components/Cards/BreadcrumbCard";
import Filters from "@/components/Shared/Filters";
import ProductsList from "@/components/Shared/ProductsList";
import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Accordion } from "@/components/ui/accordion";

const Page = ({ params }: { params: { name: string } }) => {
  const data = {};

  if (!data) return <NotFound />;

  return (
    <div className="px-2">
      <BreadcrumbCard title={params.name} />

      <div className="">
        <div className="z-[2] flex justify-between items-center gap-5 sticky md:block top-12 md:top-auto py-3 bg-background">
          <div className="font-bold text-xl md:text-3xl font-sans text-light-1  tracking-wide">
            Men's Clothing <span className="font-extralight">(120)</span>
          </div>
          <div className="md:hidden">
            <BottomFilters />
          </div>
        </div>

        <div className="flex gap-5 my-3 md:my-8">
          <SideFilters />
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

const SideFilters = () => {
  return (
    <div className="hidden md:block tablet:w-40 laptop:w-64 ">
      <span className="font-semibold text-muted-foreground">Filters</span>

      <div className="flex flex-col gap-3">
        <Accordion type="multiple" className="w-full">
          <Filters />
        </Accordion>
      </div>
    </div>
  );
};

const BottomFilters = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <span className="font-semibold text-muted-foreground">Filters</span>
      </DrawerTrigger>
      <DrawerContent className="px-5 max-h-[60vh] border-none">
        <Accordion type="multiple" className="w-full gap-5 grid grid-cols-2 overflow-scroll hide-scrollbar">
          <Filters />
        </Accordion>
      </DrawerContent>
    </Drawer>
  );
};

export default Page;
