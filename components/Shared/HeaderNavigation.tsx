"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useStore } from "@/stores/store";
import { useEffect, useState } from "react";
import { ICategory } from "@/types";

function HeaderNavigation() {
  const { setCategories } = useStore();
  const [categories, setData] = useState<ICategory[]>([]);

  useEffect(() => {
    async function fetchData() {
      console.log("fetching data - categories");
      const response = await fetch(`/api/categories`);
      const data = await response.json();
      if (data.ok) {
        setData(data.data);
        setCategories(data.data);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationMenu className="absolute left-5 top-3">
      <NavigationMenuList className="pl-40 laptop:pl-44">
        {categories.map((category) => (
          <CategoryDropdown key={category._id} label={category.name} subCategories={category.children} />
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
      <NavigationMenuTrigger className="text-base px-2">{label.split("-")[0]}</NavigationMenuTrigger>
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
