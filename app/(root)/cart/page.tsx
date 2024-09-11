"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import WishList from "./WishList";
import { useStore } from "@/stores/store";
import { syncData } from "@/lib/syncData";
import { ICartItem } from "@/types";
import SelectSize from "@/components/Dialogs/SelectSize";
import UpdateQuantity from "@/components/Dialogs/UpdateQuantity";
import Link from "next/link";

const Page = () => {
  const { cart, wishlist } = useStore();

  React.useEffect(() => {
    if (!cart.length || !wishlist.length) syncData();
  }, []);

  return (
    <div className="max-w-desktop mx-auto px-2 py-5">
      <Cart cart={cart} />
      <WishList />
    </div>
  );
};

const Cart = ({ cart }: { cart: ICartItem[] }) => {
  return (
    <>
      <h1 className="font-semibold text-xl md:text-2xl font-sans text-light-1">My Cart</h1>

      <div className="flex flex-col tablet:flex-row justify-between py-3 gap-4 border-light-3">
        <div className="tablet:px-2 flex-1">
          {cart.length === 0 ? (
            <div className="text-light-1">No items in your cart</div>
          ) : (
            <div>
              {cart.map((item) => (
                <CartProduct key={item.itemId} item={item} />
              ))}
            </div>
          )}
        </div>
        <CartSummary cart={cart} />
      </div>
    </>
  );
};

const CartProduct = ({ item }: { item: ICartItem }) => {
  return (
    <div className="p-2 flex gap-2 border my-2">
      <Link href={`/p/${item.product.slug}`} className="relative w-[100px] tablet:w-[150px]">
        <Image src={item.product.images[0].url} alt="product" layout="fill" objectFit="contain" />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex-1">
          <h1 className="text-sm tablet:text-lg font-semibold text-light-1">{item.product.name}</h1>
          <span
            style={{ backgroundColor: item.color }}
            className="w-5 h-5 tablet:w-7 tablet:h-7 rounded-full flex items-center justify-center"
          >
            <span className="w-4 h-4 tablet:w-6 tablet:h-6 rounded-full border-2 border-white"></span>
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <SelectSize item={item} />
            <UpdateQuantity item={item} />
          </div>
          <div className="flex gap-1 tablet:gap-2 items-baseline">
            <p className="font-bold text-sm tablet:text-lg">₹{item.product.price * item.quantity}</p>
            <p className="line-through text-[10px] tablet:text-sm">₹{item.product.mrp * item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSummary = ({ cart }: { cart: ICartItem[] }) => {
  const router = useRouter();
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="w-full tablet:w-[300px] px-2">
      <div className="flex justify-between items-center py-3 border-b border-light-3">
        <p className="text-sm font-semibold">Subtotal</p>
        <p className="text-sm font-semibold">Rs. {total}</p>
      </div>
      <div className="flex justify-between items-center py-3 border-b border-light-3">
        <p className="text-sm font-semibold">Shipping</p>
        <p className="text-sm font-semibold">Free</p>
      </div>
      <div className="flex justify-between items-center py-3 border-b border-light-3">
        <p className="text-sm font-semibold">Total</p>
        <p className="text-sm font-semibold">Rs. {total}</p>
      </div>

      <div className="w-full flex justify-center py-5">
        <Button
          className="w-full bg-[#ffd248] py-2 text-gray-800 text-lg font-bold hover:bg-[#ffd248]"
          onClick={() => router.push("/checkout")}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Page;
