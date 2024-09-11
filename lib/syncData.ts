import { useStore } from "@/stores/store";

export const syncData = async () => {
  try {
    // get data from local storage
    const cart = localStorage.getItem("cart");
    const wishlist = localStorage.getItem("wishlist");

    if (cart) {
      const parsedCart = JSON.parse(cart);
      if (parsedCart) {
        useStore.setState({ cart: parsedCart });
      }
    }

    if (wishlist) {
      const parsedWishlist = JSON.parse(wishlist);
      if (parsedWishlist) {
        useStore.setState({ wishlist: parsedWishlist });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
