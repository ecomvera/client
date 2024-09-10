import { ICategory } from "@/types";
import { create } from "zustand";

const categories: ICategory[] = [];
const filterProperties = { sizes: [], attributes: [], colors: [] };

interface IFilterProperties {
  sizes: string[];
  attributes: { key: string; value: string[] }[];
  colors: string[];
}

interface IStore {
  filterProperties: IFilterProperties;
  setFilterProperties: (filterProperties: IFilterProperties) => void;
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
}

export const useStore = create<IStore>((set) => ({
  filterProperties: filterProperties,
  setFilterProperties: (filterProperties: IFilterProperties) => set({ filterProperties }),
  categories: categories,
  setCategories: (categories: ICategory[]) => set({ categories }),
}));
