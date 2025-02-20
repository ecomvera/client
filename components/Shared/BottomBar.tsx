"use client";

import { useData } from "@/hooks/useData";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import {
  IoCart,
  IoCartOutline,
  IoHome,
  IoHomeOutline,
  IoPerson,
  IoPersonOutline,
  IoSearch,
  IoSearchOutline,
} from "react-icons/io5";
import { PiPackageFill, PiPackageLight } from "react-icons/pi";

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useData();

  if (pathname === "/sign-in") return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 tablet:hidden border-t border-border z-10">
      <div className="bg-background h-12 mobile:h-14 w-full">
        <div className="flex justify-around items-center h-full">
          <NavLink href="/">
            {pathname === "/" ? <IoHome className="text-2xl text-[--c2]" /> : <IoHomeOutline className="text-2xl" />}
          </NavLink>
          <NavLink href="/myaccount/orders">
            {pathname === "/myaccount/orders" ? (
              <PiPackageFill className="text-2xl text-[--c2]" />
            ) : (
              <PiPackageLight className="text-2xl" />
            )}
          </NavLink>
          <NavLink href="/search">
            {pathname === "/search" ? (
              <IoSearch className="text-2xl text-[--c2]" />
            ) : (
              <IoSearchOutline className="text-2xl" />
            )}
          </NavLink>
          <NavLink href="/cart">
            <span className="relative" onClick={() => router.push("/cart")}>
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 text-xs font-semibold text-white bg-green-600 rounded-full w-4 h-4 flex justify-center items-center">
                  {cart.length}
                </span>
              )}
              {pathname === "/cart" ? <IoCart className="text-2xl text-[--c2]" /> : <IoCartOutline className="text-2xl" />}
            </span>
          </NavLink>
          <NavLink href="/myaccount">
            {pathname === "/myaccount" ? (
              <IoPerson className="text-2xl text-[--c2]" />
            ) : (
              <IoPersonOutline className="text-2xl" />
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      // className={`border-b-4 border-transparent hover:border-primary`}
      // style={{ borderColor: pathname === href ? "var(--primary)" : "" }}
    >
      {children}
    </Link>
  );
};

export default BottomBar;
