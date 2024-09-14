"use client";

import Link from "next/link";
import Search from "../forms/Search";
import HeaderNavigation from "./HeaderNavigation";
import { useTheme } from "next-themes";
import { IoMoonOutline, IoSunnyOutline, IoCartOutline, IoPersonOutline, IoReorderThreeOutline } from "react-icons/io5";
import { useAction } from "@/stores/action";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useData } from "@/hooks/useData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const { cart } = useData();
  const { setIsSidebarOpen } = useAction();

  return (
    <div className="w-full sticky top-0 bg-background z-10 ">
      <div className="max-w-desktop mx-auto px-2 w-full sticky top-0 bg-background">
        <div className="flex justify-between gap-3 py-3 tablet:py-2 items-center">
          <div className="flex gap-3 items-center">
            <IoReorderThreeOutline
              className="text-3xl tablet:hidden cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
            <Link href={"/"} className="z-20">
              <h2 className="text-xl tablet:text-2xl font-bold uppercase tracking-wide">Silkyester</h2>
            </Link>

            <div className="hidden tablet:flex gap-5 ml-2">
              <HeaderNavigation />
            </div>
          </div>

          <div className="flex gap-5 items-center mr-2">
            <Search />
            <ThemeHandler />

            <div className="hidden tablet:flex gap-5">
              <span className="relative" onClick={() => router.push("/cart")}>
                {cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-sm font-semibold text-white bg-green-600 rounded-full w-5 h-5 flex justify-center items-center">
                    {cart.length}
                  </span>
                )}
                <IoCartOutline className="cursor-pointer text-xl tablet:text-2xl" />
              </span>
              {pathname !== "/sign-in" &&
                (user ? (
                  <ProfileIcon />
                ) : (
                  <Link href={`/sign-in?src=${pathname}`} className="cursor-pointer text-sm font-semibold mt-1">
                    SignIn
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileIcon = () => {
  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IoPersonOutline className="cursor-pointer text-xl tablet:text-2xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={handleSignOut}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ThemeHandler = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {theme === "dark" ? (
        <IoSunnyOutline onClick={() => setTheme("light")} className="cursor-pointer text-xl tablet:text-2xl" />
      ) : (
        <IoMoonOutline onClick={() => setTheme("dark")} className="cursor-pointer text-xl tablet:text-2xl" />
      )}
    </>
  );
};

export default Header;
