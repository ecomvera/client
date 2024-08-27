"use client";

import Link from "next/link";
import Search from "../forms/Search";
import HeaderNavigation from "./HeaderNavigation";
import { useTheme } from "next-themes";
import { IoMoonOutline, IoSunnyOutline, IoCartOutline, IoPersonOutline, IoReorderThreeOutline } from "react-icons/io5";
import { useAction } from "@/stores/action";
import { useEffect, useState } from "react";

const Header = () => {
  const { setIsSidebarOpen } = useAction();

  return (
    <div className="w-full sticky top-0 bg-background z-10 shadow-lg">
      <div className="max-w-desktop mx-auto px-2 w-full sticky top-0 bg-background">
        <div className="flex justify-between gap-3 py-3 tablet:py-2 items-center">
          <div className="flex gap-3 items-center">
            <IoReorderThreeOutline
              className="text-3xl tablet:hidden cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
            <Link href={"/"}>
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
              <IoPersonOutline className="cursor-pointer text-xl tablet:text-2xl" />
              <IoCartOutline className="cursor-pointer text-xl tablet:text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
