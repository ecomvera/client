import { ICartItem, ICategory, IProduct } from "@/types";
import { create } from "zustand";

const categories: ICategory[] = [];
const filterProperties = { sizes: [], attributes: [], colors: [] };
const cart: ICartItem[] = [];
const wishlist: ICartItem[] = [];

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

  cart: ICartItem[];
  setCart: (data: ICartItem[]) => void;
  addToCart: (data: ICartItem) => void;
  removeFromCart: (data: ICartItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  // updateSize: (itemId: string, size: string) => void;

  wishlist: ICartItem[];
  setWishlist: (data: ICartItem[]) => void;
  addToWishlist: (data: ICartItem) => void;
  removeFromWishlist: (itemId: string) => void;
  moveToCart: (data: ICartItem) => void;
}

export const useStore = create<IStore>((set) => ({
  filterProperties: filterProperties,
  setFilterProperties: (filterProperties: IFilterProperties) => set({ filterProperties }),
  categories: categories,
  setCategories: (categories: ICategory[]) => set({ categories }),

  cart: cart,
  setCart: (data: ICartItem[]) => set({ cart: data }),
  addToCart: (data: ICartItem) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.itemId === data.itemId);
      let updatedCart;
      if (!existingItem) {
        updatedCart = [...state.cart, data];
      } else {
        updatedCart = state.cart.map((item) =>
          item.itemId === data.itemId ? { ...item, quantity: item.quantity + data.quantity } : item
        );
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },
  removeFromCart: (data: ICartItem) =>
    set((state) => {
      let updatedCart = state.cart.filter((item) => item.itemId !== data.itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  updateQuantity: (id: string, quantity: number) =>
    set((state) => {
      let updatedCart = state.cart.map((item) => (item.itemId === id ? { ...item, quantity: quantity } : item));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  wishlist: wishlist,
  setWishlist: (data: ICartItem[]) => set({ wishlist: data }),
  addToWishlist: (data: ICartItem) =>
    set((state) => {
      let updatedWishlist = [...state.wishlist, data];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return { wishlist: updatedWishlist };
    }),
  removeFromWishlist: (itemId: string) =>
    set((state) => {
      let updatedWishlist = state.wishlist.filter((item) => item.itemId !== itemId);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return { wishlist: updatedWishlist };
    }),
  moveToCart: (data: ICartItem) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.itemId === data.itemId ? { ...item, quantity: item.quantity + data.quantity } : item
      ),
      wishlist: state.wishlist.filter((item) => item.itemId !== data.itemId),
    })),
}));
