"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Page = () => {
  return (
    <div className="max-w-desktop mx-auto px-2 py-5">
      <h1 className="head-text font-semibold text-dark-3">My Cart</h1>

      <div className="flex flex-col tablet:flex-row justify-between py-3 gap-4 border-light-3">
        <CartProducts />
        <CartSummary />
      </div>
    </div>
  );
};

const CartProducts = () => {
  return (
    <div className="px-2 flex-1">
      <CartProduct />
      <CartProduct />
      <CartProduct />
      <CartProduct />
    </div>
  );
};

const CartProduct = () => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-light-3">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/p1.webp"
          alt="product"
          width={80}
          height={0}
          sizes="100vw"
          className="w-[80px] h-[80px] object-cover"
        />
        <div>
          <p className="text-sm font-semibold">Product name</p>
          <p className="text-sm font-normal text-light-3 line-through">Rs. 5000.00</p>
          <p className="text-sm font-semibold">Rs. 3000.00</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <button className="cursor-pointer">
            <FaMinus />
          </button>
          <p>1</p>
          <button className="cursor-pointer">
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

const CartSummary = () => {
  const router = useRouter();
  return (
    <div className="w-full tablet:w-[300px] px-2">
      <div className="flex justify-between items-center py-3 border-b border-light-3">
        <p className="text-sm font-semibold">Subtotal</p>
        <p className="text-sm font-semibold">Rs. 3000.00</p>
      </div>
      <div className="flex justify-between items-center py-3 border-b border-light-3">
        <p className="text-sm font-semibold">Shipping</p>
        <p className="text-sm font-semibold">Free</p>
      </div>
      <div className="flex justify-between items-center py-3 border-b border-light-3">
        <p className="text-sm font-semibold">Total</p>
        <p className="text-sm font-semibold">Rs. 3000.00</p>
      </div>

      <div className="w-full flex justify-center py-5">
        <Button className="w-full bg-success py-2 text-base" onClick={() => router.push("/checkout")}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Page;
