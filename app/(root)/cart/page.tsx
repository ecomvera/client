"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { ICartItem } from "@/types";
import SelectSize from "@/components/Dialogs/SelectSize";
import UpdateQuantity from "@/components/Dialogs/UpdateQuantity";
import Link from "next/link";
import { useData } from "@/hooks/useData";
import DeleteCartItem from "@/components/Dialogs/DeleteCartItem";
import { useUser } from "@/hooks/useUser";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useDataStore } from "@/stores/data";

const Page = () => {
  const { cart, totalMRP, totalPrice, finalPrice } = useData();

  return (
    <div className="max-w-desktop mx-auto px-2 py-5">
      <h1 className="font-semibold text-xl md:text-2xl font-sans text-light-1">My Cart</h1>

      <div className="flex flex-col tablet:flex-row justify-between py-3 gap-4 border-light-3">
        <div className="tablet:px-2 flex-1 tablet:min-h-[300px]">
          {cart.length === 0 ? (
            <div className="text-light-1">No items in your cart</div>
          ) : (
            <div>
              {cart.map((item) => (
                <CartProduct key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && <CartSummary cart={cart} totalMRP={totalMRP} totalPrice={totalPrice} finalPrice={finalPrice} />}
      </div>
    </div>
  );
};

const CartProduct = ({ item }: { item: ICartItem }) => {
  return (
    <div className="p-2 flex gap-2 border my-2">
      <Link href={`/p/${item.product.slug}`} className="relative w-[60px] tablet:w-[100px]">
        <AspectRatio ratio={0.8 / 1}>
          <Image
            src={item.product.images[0].url}
            alt="product"
            width={0}
            height={0}
            priority
            sizes="100vw"
            className="w-full"
          />
        </AspectRatio>
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="relative">
          <h1 className="text-sm tablet:text-base font-semibold text-light-1">{item.product.name}</h1>
          <span
            style={{ backgroundColor: item.color }}
            className="w-5 h-5 tablet:w-7 tablet:h-7 rounded-full flex items-center justify-center mt-1"
          >
            <span className="w-4 h-4 tablet:w-6 tablet:h-6 rounded-full border-2 border-white"></span>
          </span>
          <DeleteCartItem item={item} />
        </div>
        <div className="flex-1"></div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <SelectSize item={item} />
            <UpdateQuantity item={item} />
          </div>
          <div className="flex gap-1 tablet:gap-2 items-end">
            <p className="font-bold text-sm tablet:text-lg">₹{item.product.price * item.quantity}</p>
            <p className="line-through text-[10px] tablet:text-sm">₹{item.product.mrp * item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSummary = ({
  cart,
  totalMRP,
  totalPrice,
  finalPrice,
}: {
  cart: ICartItem[];
  totalMRP: number;
  totalPrice: number;
  finalPrice: number;
}) => {
  const router = useRouter();
  const { user } = useUser();
  const { deliveryCost, freeDeliveryAt } = useDataStore();

  return (
    <div className="w-full tablet:w-[300px] px-2">
      <div className="flex justify-between items-center py-3">
        <p className="text-sm">Total MRP</p>
        <p className="text-sm font-semibold">₹ {totalMRP}</p>
      </div>
      <div className="flex justify-between items-center py-3">
        <p className="text-sm">Discount</p>
        <p className="text-sm font-semibold text-green-600">₹ {totalPrice - totalMRP}</p>
      </div>
      <Separator />
      <div className="flex justify-between items-center py-3">
        <p className="text-sm">Total Price (incl. of all taxes)</p>
        <p className="text-sm font-semibold">₹ {totalPrice}</p>
      </div>
      <div className="flex justify-between items-center pt-3">
        <p className="text-sm">Delivery Charge</p>
        <p className="text-sm font-semibold">₹ {totalPrice > freeDeliveryAt ? 0 : deliveryCost}</p>
      </div>
      <span className="text-xs text-gray-500">Get free delivery above ₹ {freeDeliveryAt}</span>
      <Separator />
      <div className="flex justify-between items-center py-3">
        <p className="text-sm font-semibold">Total</p>
        <p className="text-sm font-semibold">₹ {finalPrice}</p>
      </div>

      <div className="w-full flex justify-center pt-5">
        <Button
          className="w-full bg-[#ffd248] py-2 text-gray-800 text-lg font-bold hover:bg-[#ffd248]"
          onClick={() =>
            user
              ? user.addresses.length > 0
                ? router.push("/checkout")
                : router.push("/myaccount/addresses?address=new&src=/cart")
              : router.push("/sign-in?src=/cart")
          }
          disabled={cart.length === 0}
        >
          Proceed
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Delivery charge will be calculated at the time of checkout</p>
    </div>
  );
};

export default Page;
