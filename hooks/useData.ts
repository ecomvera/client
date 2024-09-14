import { useDataStore } from "@/stores/data";
import { useEffect, useState } from "react";

export const useData = () => {
  const { cart, setCart, wishlist, setWishlist } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (!cart.length) {
        const localCart = localStorage.getItem("cart");
        if (localCart) setCart(JSON.parse(localCart));
      }
      if (!wishlist.length) {
        const localWishlist = localStorage.getItem("wishlist");
        if (localWishlist) setWishlist(JSON.parse(localWishlist));
      }
      setIsLoading(false);
    };

    if (typeof window !== "undefined") fetchCart();
  }, []);

  return { cart, wishlist, isLoading };
};
