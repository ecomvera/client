"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { GoArrowLeft } from "react-icons/go";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <h1
        className="flex md:hidden items-center gap-2 font-semibold mb-5 text-xl font-sans cursor-pointer"
        onClick={() => router.back()}
      >
        <GoArrowLeft className="w-7 h-7 md:hidden" /> My Account
      </h1>

      <div className="text-light-1">No orders found</div>
    </div>
  );
};

export default Page;
