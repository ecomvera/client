"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="hidden tablet:flex">
      <div className="flex items-center h-10  rounded-xl overflow-hidden bg-primary-50">
        <Input
          type="text"
          placeholder="Search your favorite product here"
          className="border-0 shadow-none focus-visible:ring-transparent placeholder:text-primary-500"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className={`
          ${search.length ? "bg-primary-500 cursor-pointer" : "bg-primary-50 cursor-not-allowed"} 
           h-full p-2 w-10 flex justify-center items-center`}
        >
          <IoSearch className={`${search.length ? "text-white" : "text-dark-4"}`} size={20} />
        </div>
      </div>
    </div>
  );
};

export default Search;
