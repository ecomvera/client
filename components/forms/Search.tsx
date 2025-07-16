"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";

import { IoSearch } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Cross2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { ClassNameValue } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

const placeholders = [
  "Search for products...",
  "Find your next favorite item...",
  "Discover new arrivals...",
  "Explore trending styles...",
  "What are you looking for today?",
];

const Search = ({ className, query }: { className?: ClassNameValue; query?: string }) => {
  const navigate = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(query || "");

  const [isFocused, setIsFocused] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Only animate if the input is not focused and is empty
    if (!isFocused && search.length === 0) {
      interval = setInterval(() => {
        setCurrentPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isFocused, search]);

  const currentAnimatedPlaceholder = placeholders[currentPlaceholderIndex];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search || search.trim() === "") return;
    navigate.push(`/search?q=${search.trim()}`);
  };

  useEffect(() => {
    if (pathname === "/search") {
      let query = searchParams.get("q") || "";
      if (!query) setSearch("");
    }
  }, [searchParams]);

  return (
    <div
      className={clsx(
        `items-center h-9 rounded overflow-hidden bg-[--white] bg-primary-50 laptop:w-[400px] border-[--c1] border-[1px]`,
        className
      )}
    >
      <form onSubmit={handleSearch} className="flex items-center h-full w-full relative">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="border-0 shadow-none focus-visible:ring-transparent px-1 pl-3 placeholder:text-xs text-[--black]"
          // placeholder="Search..."
          aria-label="Search input with animated suggestions"
        />

        {/* Animated placeholder overlay */}
        {search.length === 0 && !isFocused && (
          <div className="absolute inset-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground text-sm overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentAnimatedPlaceholder}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute"
              >
                {currentAnimatedPlaceholder}
              </motion.span>
            </AnimatePresence>
          </div>
        )}

        {search && <Cross2Icon onClick={() => setSearch("")} className={`cursor-pointer text-xl w-5 text-black`} />}

        <Button
          className={` 
          ${search.trim().length ? "bg-primary-500 cursor-pointer" : "bg-primary-50 cursor-not-allowed"} 
           h-full p-2 w-10 flex justify-center items-center bg-[--c1] rounded-none border-none hover:bg-[--c1] hover:text-[--white] ml-3`}
        >
          <IoSearch className={`text-black w-[20px]`} />
        </Button>
      </form>
    </div>
  );
};

export default Search;
