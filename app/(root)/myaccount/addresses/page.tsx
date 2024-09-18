"use client";

import NewAddress from "@/components/forms/NewAddress";
import { useUser } from "@/hooks/useUser";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { PiNotePencilDuotone } from "react-icons/pi";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import UpdateAddress from "@/components/forms/UpdateAddress";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user";
import { toast } from "@/components/ui/use-toast";

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <div>
      <h1
        className="flex md:hidden items-center gap-2 font-semibold mb-5 text-xl font-sans cursor-pointer"
        onClick={() => router.back()}
      >
        <GoArrowLeft className="w-7 h-7 md:hidden" /> My Account
      </h1>

      {!params.get("address") ? (
        <AddressList />
      ) : params.get("address") === "new" ? (
        <NewAddress />
      ) : (
        <UpdateAddress id={params.get("address") as string} />
      )}
    </div>
  );
};

const AddressList = () => {
  const { user, token } = useUser();
  const { deleteAddress } = useUserStore();

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/user/address`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      deleteAddress(id);
      toast({
        title: "Address deleted",
        description: "Your address has been deleted successfully",
        variant: "success",
      });
      return;
    }
    toast({
      title: "Error",
      description: "Failed to delete address",
      variant: "destructive",
    });
  };
  return (
    <div className="grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-3 gap-5 my-6 md:m-0">
      <Link
        href="?address=new"
        className="border rounded-xl p-5 flex flex-col gap-5 items-center justify-center w-full max-w-[400px] cursor-pointer bg-accent"
      >
        <PlusIcon className="w-7 h-7" />
        <p className="text-center text-lg">Add new address</p>
      </Link>

      {user?.addresses?.map((address) => (
        <div
          key={address.id}
          className="relative border rounded-xl p-2 px-3 w-full max-w-[500px] overflow-hidden flex flex-col"
        >
          <p className="text-lg font-semibold">{address.name}</p>
          <p className="text-light-1">
            {address.line1}, {address.line2}, {address.landmark}, {address.city}
          </p>
          <p className="text-light-1">
            {address.state}, {address.country}, {address.pincode}
          </p>
          <p className="text-light-1 flex-1">+91 {address.phone}</p>
          <div className="absolute top-2 right-2 bg-blue-500 font-semibold text-background rounded px-1 text-sm">
            {address.residenceType}
          </div>
          <div className="flex gap-2 mt-5">
            <Link href={`/myaccount/addresses?address=${address.id}`} className="w-full">
              <Button variant={"outline"} className="w-full">
                Edit
              </Button>
            </Link>
            <Button
              variant={"outline"}
              className="w-full hover:bg-red-400 hover:text-background"
              onClick={() => handleDelete(address.id as string)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
