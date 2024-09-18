"use client";

import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineViewGrid } from "react-icons/hi";
import { PiPackage } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { BiIdCard } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) return router.push(`/sign-in?src=${pathname}`);
  }, [isLoading, user]);
  return (
    <div className="flex py-2 md:py-5 px-3">
      <SidebarNav />
      <main className="w-full md:px-3">{children}</main>
    </div>
  );
}

const nav = [
  {
    icon: <HiOutlineViewGrid className="w-5 h-5" />,
    name: "Overview",
    href: "/myaccount",
  },
  {
    icon: <PiPackage className="w-5 h-5" />,
    name: "Orders",
    href: "/myaccount/orders",
  },
  {
    icon: <MdOutlineLocationOn className="w-5 h-5" />,
    name: "Addresses",
    href: "/myaccount/addresses",
  },
  {
    icon: <BiIdCard className="w-5 h-5" />,
    name: "Profile",
    href: "/myaccount/profile",
  },
];

const SidebarNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname?.split("/").pop();
  const { setUser } = useUserStore();
  const [open, setOpen] = React.useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setOpen(false);
    setUser(null);
    router.replace("/sign-in");
  };

  return (
    <div className="border rounded-lg p-5 flex-col gap-5 w-48 h-fit laptop:w-64 hidden tablet:flex">
      {nav.map((item) => (
        <Link key={item.name} href={item.href} className={`my-3 text-light-1`}>
          <div
            className={`flex gap-3 items-center text-lg border-b ${
              (active == item.name.toLowerCase() || pathname === item.href) &&
              "font-semibold border-b-[1px] border-b-primary"
            }`}
          >
            {item.icon} {item.name}
          </div>
        </Link>
      ))}
      <div
        className="flex gap-3 items-center mt-3 text-light-1 text-red-600 font-semibold cursor-pointer"
        onClick={() => {}}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex gap-3 items-center text-lg">
            <BiLogOut className="w-5 h-5" /> <div className="text-lg">Log out</div>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="mb-10">Are you sure you want to log out?</DialogTitle>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" className="font-semibold" onClick={handleSignOut}>
                  Log out
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
