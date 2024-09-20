"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useDataStore } from "@/stores/data";
import { useEffect, useState } from "react";
import { ICategory } from "@/types";
import useSWR from "swr";
import { fetcher, fetchOpt } from "@/lib/utils";

function HeaderNavigation() {
  const { categories, setCategories } = useDataStore();
  const { mutate: fetchCategories, isLoading: fetchCategoriesLoading } = useSWR("/api/categories", fetcher, fetchOpt);

  useEffect(() => {
    const fetch = async () => {
      if (!categories.length) {
        const res = await fetchCategories();
        setCategories(res?.data || []);
      }
    };
    fetch();
  }, []);

  return (
    <NavigationMenu className="absolute left-5 top-3">
      <NavigationMenuList className="pl-40 laptop:pl-44">
        {categories.map((category) => (
          <CategoryDropdown key={category.id} label={category.name} subCategories={category.children} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const CategoryDropdown = ({ label, subCategories }: { label: string; subCategories: any }) => {
  const [arr, setArr] = useState<{ [key: string]: ICategory[] }>({});

  useEffect(() => {
    const arr = subCategories.reduce((acc: any[], item: any) => {
      if (!acc[item.wearType]) {
        acc[item.wearType] = [];
      }

      acc[item.wearType].push(item);

      return acc;
    }, {});

    setArr(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-base px-2">{label.split("'")[0]}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="flex w-[715px] gap-10 p-5 px-8">
          {Object.keys(arr).map((item) => (
            <div key={item}>
              <h3 className="text-base font-semibold">{item}</h3>
              <ul role="list" className="mt-5 space-y-1">
                {arr[item].map((category: ICategory) => (
                  <Link href={`/${category.slug}`} key={category.slug}>
                    <div className="text-light-3 my-3 text-sm">
                      <p className="text-nowrap">{category.name}</p>
                    </div>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default HeaderNavigation;
