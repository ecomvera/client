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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BiLogOut } from "react-icons/bi";
import { Button } from "../ui/button";
import { useUserStore } from "@/stores/user";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const { cart } = useData();
  const { setIsSidebarOpen } = useAction();

  const isCheckoutPage = pathname === "/checkout";
  return (
    <div className="w-full sticky top-0 bg-background z-10 border-b-2">
      <div className="max-w-desktop mx-auto px-2 w-full sticky top-0 bg-background">
        <div className="flex justify-between gap-3 py-3 tablet:py-2 items-center">
          <div className="flex gap-3 items-center">
            <IoReorderThreeOutline
              className="text-3xl tablet:hidden cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
            <Link href={isCheckoutPage ? "#" : "/"} className="z-20">
              <h2 className="text-xl tablet:text-2xl font-bold uppercase tracking-wide">Test3</h2>
            </Link>

            <div className="hidden tablet:flex gap-5 ml-2">{!isCheckoutPage && <HeaderNavigation />}</div>
          </div>

          {isCheckoutPage ? (
            <div className="hidden tablet:flex flex-col items-center text-sm">
              <p>Signed as</p>
              <p>{user?.email}</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileIcon = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setUser } = useUserStore();
  const [openDelete, setOpenDelete] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setOpenDelete(false);
    setOpen(false);
    setUser(null);
    router.replace("/sign-in");
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        // onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(true)}
        className="focus:outline-none"
      >
        <IoPersonOutline className="cursor-pointer text-xl tablet:text-2xl" />
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
              <DialogTitle className="mb-10">Are you sure you want to log out?</DialogTitle>

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
