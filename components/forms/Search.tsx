"use client";

import { useState } from "react";
import { Input } from "../ui/input";

import { IoSearch, IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PiCrossLight } from "react-icons/pi";

const Search = () => {
  const navigate = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate.push(`/search?q=${search}`);
  };

  return (
    <div className="hidden tablet:flex">
      <form
        onSubmit={handleSearch}
        className="hidden laptop:flex items-center h-10 rounded-md overflow-hidden bg-gray-100 bg-primary-50 w-auto "
      >
        <div
          className={`
          ${search.length ? "bg-primary-500 cursor-pointer" : "bg-primary-50 cursor-not-allowed"} 
           h-full p-2 w-10 flex justify-center items-center bg-yellow-500`}
        >
          <IoSearch className={`text-black`} size={20} />
        </div>
        <Input
          type="text"
          placeholder="Search your favorite product here"
          className="border-0 shadow-none focus-visible:ring-transparent px-1 placeholder:text-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && <Cross2Icon onClick={() => setSearch("")} className={`cursor-pointer mr-3 text-xl w-5`} />}
      </form>
      <Link href={`/search?q=${search}`}>
        <IoSearchOutline className={`laptop:hidden cursor-pointer`} size={20} />
      </Link>
    </div>
  );
};

export default Search;
