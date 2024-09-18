"use client";

import { useData } from "@/hooks/useData";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoCartOutline, IoHomeOutline, IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { PiPackageLight } from "react-icons/pi";

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useData();

  if (pathname === "/sign-in") return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 tablet:hidden border-t border-border z-10">
      <div className="bg-background h-12 mobile:h-14 w-full">
        <div className="flex justify-around items-center h-full">
          <Link href="/">
            <IoHomeOutline className="text-2xl" />
          </Link>
          <Link href="/myaccount/orders">
            <PiPackageLight className="text-2xl" />
          </Link>
          <Link href="/search">
            <IoSearchOutline className="text-2xl" />
          </Link>
          <Link href="/cart">
            <span className="relative" onClick={() => router.push("/cart")}>
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs font-semibold text-white bg-green-600 rounded-full w-4 h-4 flex justify-center items-center">
                  {cart.length}
                </span>
              )}
              <IoCartOutline className="text-2xl" />
            </span>
          </Link>
          <Link href="/myaccount">
            <IoPersonOutline className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
