import { IAttribute, ICartItem, ICategory, IColor, IProduct, ISize } from "@/types";
import { create } from "zustand";

const categories: ICategory[] = [];
const filterProperties = { sizes: [], attributes: [], colors: [] };
const cart: ICartItem[] = [];
const wishlist: ICartItem[] = [];

const deliveryCost = process.env.NEXT_PUBLIC_DELIVERY_CHARGE ? parseInt(process.env.NEXT_PUBLIC_DELIVERY_CHARGE) : 0;
const freeDeliveryAt = process.env.NEXT_PUBLIC_FREE_SHIPPING_AT ? parseInt(process.env.NEXT_PUBLIC_FREE_SHIPPING_AT) : 0;

interface IFilterProperties {
  sizes: ISize[];
  attributes: IAttribute[];
  colors: IColor[];
}

interface IDataStore {
  filterProperties: IFilterProperties;
  setFilterProperties: (filterProperties: IFilterProperties) => void;
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
  initialized: boolean;

  deliveryCost: number;
  freeDeliveryAt: number;

  cart: ICartItem[];
  setCart: (data: ICartItem[]) => void;
  addToCart: (data: ICartItem) => void;
  removeFromCart: (data: ICartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  // updateSize: (id: string, size: string) => void;

  wishlist: ICartItem[];
  setWishlist: (data: ICartItem[]) => void;
  addToWishlist: (data: ICartItem) => void;
  removeFromWishlist: (id: string) => void;
  // moveToCart: (data: ICartItem) => void;
}

export const checkExistsOrAddToCart = (cart: ICartItem[], item: ICartItem) => {
  const existingItem = cart.find((i) => i.id === item.id);
  let updatedCart;
  if (!existingItem) {
    updatedCart = [...cart, item];
  } else {
    updatedCart = cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
  }

  return updatedCart;
};

export const useDataStore = create<IDataStore>((set) => ({
  filterProperties: filterProperties,
  setFilterProperties: (filterProperties: IFilterProperties) => set({ filterProperties }),
  categories: categories,
  initialized: false,
  setCategories: (categories: ICategory[]) => set({ categories, initialized: true }),

  deliveryCost: deliveryCost,
  freeDeliveryAt: freeDeliveryAt,

  cart: cart,
  setCart: (data: ICartItem[]) => set({ cart: data }),
  addToCart: (data: ICartItem) => {
    set((state) => {
      const updatedCart = checkExistsOrAddToCart(state.cart, data);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },
  removeFromCart: (data: ICartItem) =>
    set((state) => {
      let updatedCart = state.cart.filter((item) => item.id !== data.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  updateQuantity: (id: string, quantity: number) =>
    set((state) => {
      let updatedCart = state.cart.map((item) => (item.id === id ? { ...item, quantity: quantity } : item));
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
  removeFromWishlist: (id: string) =>
    set((state) => {
      let updatedWishlist = state.wishlist.filter((item) => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return { wishlist: updatedWishlist };
    }),
  // moveToCart: (data: ICartItem) =>
  //   set((state) => ({
  //     cart: state.cart.map((item) => (item.id === data.id ? { ...item, quantity: item.quantity + data.quantity } : item)),
  //     wishlist: state.wishlist.filter((item) => item.id !== data.id),
  //   })),
}));
