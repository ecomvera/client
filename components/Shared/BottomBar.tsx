import Link from "next/link";
import React from "react";
import { IoCartOutline, IoHomeOutline, IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { PiPackageLight } from "react-icons/pi";

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 tablet:hidden border-t border-border z-10">
      <div className="bg-background h-12 mobile:h-14 w-full">
        <div className="flex justify-around items-center h-full">
          <Link href="/">
            <IoHomeOutline className="text-2xl" />
          </Link>
          <Link href="/orders">
            <PiPackageLight className="text-2xl" />
          </Link>
          <Link href="/search">
            <IoSearchOutline className="text-2xl" />
          </Link>
          <Link href="/cart">
            <IoCartOutline className="text-2xl" />
          </Link>
          <Link href="/profile">
            <IoPersonOutline className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
