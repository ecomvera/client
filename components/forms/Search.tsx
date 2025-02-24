"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";

import { IoSearch, IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PiCrossLight } from "react-icons/pi";

const Search = () => {
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
    <div className="">
      <form
        onSubmit={handleSearch}
        className="hidden laptop:flex items-center h-9 rounded overflow-hidden bg-[--white] bg-primary-50 w-[350px] laptop:w-[400px]"
      >
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
      <Link href={`/search`} className="hidden tablet:block">
        <IoSearchOutline className={`laptop:hidden cursor-pointer mt-1`} size={24} />
      </Link>
    </div>
  );
};

export default Search;
