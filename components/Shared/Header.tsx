"use client";

import Link from "next/link";
import Search from "../forms/Search";
import HeaderNavigation from "./HeaderNavigation";
import { useTheme } from "next-themes";
import {
  IoMoonOutline,
  IoSunnyOutline,
  IoCartOutline,
  IoPersonOutline,
  IoReorderThreeOutline,
  IoHeartOutline,
} from "react-icons/io5";
import { useAction } from "@/stores/action";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useData } from "@/hooks/useData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BiLogOut } from "react-icons/bi";
import { Button } from "../ui/button";
import { useUserStore } from "@/stores/user";
import { useDataStore } from "@/stores/data";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const { cart, wishlist } = useData();
  const { setIsSidebarOpen } = useAction();

  const isCheckoutPage = pathname === "/checkout" || pathname === "/payment";
  return (
    <div className="w-full sticky top-0 bg-[--c2] text-[--white] z-10">
      <div className="bg-[#f1f1f1] hidden tablet:block">
        <div className="max-w-desktop mx-auto px-3 w-full">
          <div className="flex justify-between gap-3 items-center">
            <div className="flex gap-4">
              <HeadLink href="/about-us" label="About" />
              <HeadLink href="/blog" label="Blog" />
            </div>
            <div className="flex gap-4">
              <HeadLink href="/contact-us" label="Contact" />
              <HeadLink href="/myaccount/orders" label="Track Order" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-desktop mx-auto w-full sticky top-0 ">
        <div className="flex justify-between gap-3 px-2 items-center">
          <div className="flex gap-3 items-center">
            <IoReorderThreeOutline
              className="text-3xl tablet:hidden cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
            <Link href={"/"} className="z-20 overflow-hidden">
              {/* <h2 className="text-xl tablet:text-2xl font-bold uppercase tracking-wide">Silkyester</h2> */}
              <Image
                src="/assets/logo_text.png"
                alt="logo"
                className="object-cover w-28 mobile:w-32 tablet:w-40 py-1 h-full scale-125 zoom-in-90 transition-transform duration-300"
                width="0"
                height="0"
                sizes="100vw"
              />
            </Link>

            {!isCheckoutPage && (
              <div className="hidden tablet:flex gap-5">
                <HeaderNavigation />
              </div>
            )}
          </div>

          {isCheckoutPage ? (
            user && (
              <div className="hidden tablet:flex flex-col items-center text-sm">
                <p>Signed as</p>
                <p>{user?.email}</p>
              </div>
            )
          ) : (
            <div className="flex gap-5 items-center mr-2 flex-1 justify-end">
              <Search />
              {/* <ThemeHandler /> */}

              <span className="relative mt-1" onClick={() => router.push("/wishlist")}>
                {wishlist?.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-sm font-semibold text-[--white] bg-[--c1] rounded-full w-5 h-5 flex justify-center items-center">
                    {wishlist.length}
                  </span>
                )}
                <IoHeartOutline className="cursor-pointer text-[22px] tablet:text-[25px]" />
              </span>
              <div className="hidden tablet:flex gap-5">
                <span className="relative mt-1" onClick={() => router.push("/cart")}>
                  {cart?.length > 0 && (
                    <span className="absolute -top-2 -right-2 text-sm font-semibold text-[--white] bg-[--c1] rounded-full w-5 h-5 flex justify-center items-center">
                      {cart.length}
                    </span>
                  )}
                  <IoCartOutline className="cursor-pointer text-[25px]" />
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
          )}
        </div>
      </div>
    </div>
  );
};

const HeadLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link href={href} className="text-[10px] text-[--black] py-1">
      {label}
    </Link>
  );
};

const ProfileIcon = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setUser } = useUserStore();
  const [openDelete, setOpenDelete] = useState(false);
  const { setCart, setWishlist } = useDataStore();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setCart([]);
    setWishlist([]);
    setOpenDelete(false);
    setOpen(false);
    setUser(null);
    router.replace("/");
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        // onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(true)}
        className="focus:outline-none"
      >
        <IoPersonOutline className="cursor-pointer text-xl tablet:text-[24px] mt-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mx-2"
        //  onMouseLeave={() => setOpen(false)}
      >
        <Link href="/myaccount">
          <DropdownMenuItem>My Account</DropdownMenuItem>
        </Link>
        <Link href="/myaccount/orders">
          <DropdownMenuItem>Orders</DropdownMenuItem>
        </Link>
        <Link href="/myaccount/addresses">
          <DropdownMenuItem>Addresses</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Dialog
          open={openDelete}
          onOpenChange={(state) => {
            setOpenDelete(state);
            if (!state) setOpen(!open);
          }}
        >
          <DialogTrigger className="flex gap-3 items-center text-red-600 text-sm p-1 hover:bg-red-100 w-full rounded">
            <BiLogOut /> <div>Log out</div>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="mb-10 font-normal">Are you sure you want to log out?</DialogTitle>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpenDelete(false);
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="destructive" className="font-semibold" onClick={handleSignOut}>
                  Log out
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
    <div className="hidden tablet:flex">
      {theme === "dark" ? (
        <IoSunnyOutline onClick={() => setTheme("light")} className="cursor-pointer text-xl tablet:text-xl" />
      ) : (
        <IoMoonOutline onClick={() => setTheme("dark")} className="cursor-pointer text-xl tablet:text-xl" />
      )}
    </div>
  );
};

export default Header;
