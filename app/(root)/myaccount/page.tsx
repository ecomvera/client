"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { IoShirtOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import Link from "next/link";

const Page = () => {
  const { user } = useUser();

  return (
    <div>
      <h1 className="flex items-center gap-2 font-semibold text-xl md:text-2xl font-sans">My Account</h1>
      <div className="flex flex-col justify-between items-baseline my-6 border max-w-96 p-5">
        <div className="flex">
          <Avatar className="w-14 md:w-20 h-14 md:h-20">
            <AvatarImage src="#" />
            <AvatarFallback className="text-lg md:text-3xl">{user?.name?.slice(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-1 md:ml-5 text-light-1">
            <h1 className="text-lg md:text-2xl font-semibold">{user?.name}</h1>
            <p className="text-sm md:text-lg">{user?.email}</p>
          </div>
        </div>
        <Link href="/myaccount/profile" className="w-full mt-10">
          <Button className="w-full md:text-lg" variant={"outline"}>
            Edit
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 mobile:grid-cols-2 md:grid-cols-3 gap-5">
        <Link
          href="/myaccount/orders"
          className="flex flex-col justify-center items-center text-center border p-5 text-light-1 hover:bg-accent"
        >
          <IoShirtOutline className="w-7 h-7" />
          <p className="text-lg font-semibold">Orders</p>
          <p className="text-sm">View or Track your orders</p>
        </Link>
        <Link
          href="/myaccount/addresses"
          className="flex flex-col justify-center items-center text-center border p-5 text-light-1 hover:bg-accent"
        >
          <FaRegAddressCard className="w-7 h-7" />
          <p className="text-lg font-semibold">Addresses</p>
          <p className="text-sm">Add or edit your addresses</p>
        </Link>
        <Link
          href="/myaccount/profile"
          className="flex flex-col justify-center items-center text-center border p-5 text-light-1 hover:bg-accent"
        >
          <FiUser className="w-7 h-7" />
          <p className="text-lg font-semibold">Profile</p>
          <p className="text-sm">Manage your profile</p>
        </Link>
      </div>
    </div>
  );
};

export default Page;
