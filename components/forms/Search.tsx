"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";

import { IoSearch } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Cross2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { ClassNameValue } from "tailwind-merge";

const Search = ({ className }: { className?: ClassNameValue }) => {
  const navigate = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate.push(`/search?q=${search}`);
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
        `items-center h-9 rounded overflow-hidden bg-[--white] bg-primary-50 w-full laptop:w-[400px] border-[--c1] border-[1px]`,
        className
      )}
    >
      <form onSubmit={handleSearch} className="flex items-center h-full w-full">
        <div
          className={` 
          ${search.length ? "bg-primary-500 cursor-pointer" : "bg-primary-50 cursor-not-allowed"} 
           h-full p-2 w-10 flex justify-center items-center bg-[--c1]`}
        >
          <IoSearch className={`text-black`} size={20} />
        </div>
        <Input
          type="text"
          placeholder="Search your favorite product here"
          className="border-0 shadow-none focus-visible:ring-transparent px-1 pl-3 placeholder:text-xs text-[--black]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && <Cross2Icon onClick={() => setSearch("")} className={`cursor-pointer mr-3 text-xl w-5`} />}
      </form>
    </div>
  );
};

export default Search;
