"use client";

import { ICategory } from "@/types";
import { useEffect } from "react";
import { useDataStore } from "@/stores/data";

const HydrateZustand = ({ categories }: { categories: ICategory[] }) => {
  const { setCategories, initialized } = useDataStore();

  useEffect(() => {
    if (!initialized) {
      setCategories(categories);
    }
  }, [categories, initialized, setCategories]);

  return null;
};

export default HydrateZustand;
