"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { capitalize } from "lodash";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToken } from "@/hooks/useToken";
import Image from "next/image";
import { IconBaseProps, IconType } from "react-icons";
import { Icons } from "next/dist/lib/metadata/types/metadata-types";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const { token } = useToken();
  const [orders, setOrders] = React.useState([]);
  const [statusOptions, setStatusOptions] = React.useState([]);

  const getStatus = (status: string) => statusOptions?.find((option: any) => option.value === status);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/user/orders", {
        method: "GET",
        headers: { authorization: `Bearer ${token.access}` },
      }).then((res) => res.json());
      if (res.ok) {
        setOrders(res.data);
        setStatusOptions(res.orderStatus);
      }
    };
    if (token.access) fetchData();
  }, [token.access]);

  return (
    <div>
      <h1 className="flex md:hidden items-center gap-2 font-semibold mb-5 text-xl font-sans">
        <span onClick={() => router.back()} className="hidden  cursor-pointer">
          <GoArrowLeft className="w-7 h-7 md:hidden" />
        </span>
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="flex flex-col gap-5">
          <h1 className="text-lg font-semibold">No orders found</h1>
          <p className="text-gray-600">You have not placed any orders yet.</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-5">
        {orders.map((order: any) => (
          <div key={order.id} className="flex flex-col gap-2 border border-light-3 p-2 rounded-lg">
            <div className="flex justify-between items-center">
              <span>
                <h1 className="text-xs sm:text-base font-semibold">Order #{order.orderNumber}</h1>
                <p className="text-sm">{formatDateTime(order.createdAt)}</p>
              </span>
              {/* <Status id={order.id} amount={order.totalAmount} status={getStatus(order.status)} /> */}
            </div>

            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-2 border-t pt-2">
                <div className="w-[60px]">
                  <AspectRatio ratio={0.8 / 1}>
                    <Image
                      src={item.product.images[0].url}
                      quality={10}
                      priority
                      alt="image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="rounded-md object-contain w-full h-full"
                    />
                  </AspectRatio>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <Link href={`/product/${item.product.slug}`} className="w-fit">
                      <p className="text-[15px] font-semibold line-clamp-2 leading-5">{item.product.name}</p>
                    </Link>
                  </div>
                  <div className="flex flex-col mt-1">
                    <p className="text-xs">
                      Quantity: <b>{item.quantity}</b>
                    </p>
                    <p className="text-xs">
                      Price: <b>₹{item.price}</b>
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Link href={`/myaccount/orders/${order.orderNumber}`} className="w-full">
              <Button variant="outline" className="w-full">
                View Order Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const Status = ({ id, amount, status }: any) => {
  const navigate = useRouter();
  const handleRetry = async () => {
    navigate.push(`/payment?id=${id}&amount=${amount}`);
  };
  return (
    <div>
      <p className={`text-xs sm:text-sm font-semibold`} style={{ color: status.color }}>
        {status.label}
      </p>
      <div className="flex gap-1 sm:gap-[6px]">
        {(status.label === "Payment Failed" || status.label === "Payment Pending") && (
          <button
            className="mt-1 text-xs sm:text-sm sm:py-[2px] border border-light-3 px-2 rounded hover:bg-gray-100"
            onClick={handleRetry}
          >
            Retry
          </button>
        )}
        {status.label === "Payment Pending" && (
          <button className="mt-1 text-xs sm:text-sm sm:py-[2px] px-2 rounded bg-red-400 text-white hover:bg-red-500">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
