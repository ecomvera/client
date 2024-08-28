import { ICategory } from "@/types";
import { create } from "zustand";

const categories: ICategory[] = [];

interface IStore {
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
}

export const useStore = create<IStore>((set) => ({
  categories: categories,
  setCategories: (categories: ICategory[]) => set({ categories }),
}));
