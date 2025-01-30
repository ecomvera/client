"use client";

import { useDataStore } from "@/stores/data";
import { ICategory } from "@/types";
import { useEffect } from "react";

const Client = ({ categories }: { categories: ICategory[] }) => {
  const { setCategories } = useDataStore();

  useEffect(() => {
    if (categories) setCategories(categories);
  }, []);
  return <></>;
};

export default Client;
