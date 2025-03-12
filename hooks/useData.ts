import { useDataStore } from "@/stores/data";
import { useEffect, useMemo, useState } from "react";

export const useData = () => {
  const { cart, setCart, wishlist, setWishlist, deliveryCost, freeDeliveryAt } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);

  const totalMRP = useMemo(() => cart && cart.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart && cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0), [cart]);
  const finalPrice = totalPrice && (totalPrice > freeDeliveryAt ? totalPrice : totalPrice + deliveryCost);

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

  return { cart, setCart, wishlist, isLoading, totalMRP, totalPrice, finalPrice };
};
