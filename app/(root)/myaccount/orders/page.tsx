"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { capitalize } from "lodash";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToken } from "@/hooks/useToken";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const { token } = useToken();
  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/user/orders", {
        method: "GET",
        headers: { authorization: `Bearer ${token.access}` },
      }).then((res) => res.json());
      console.log(res);
      if (res.ok) {
        setOrders(res.data);
      }
    };
    if (token.access) fetchData();
  }, [token.access]);

  return (
    <div>
      <h1
        className="flex md:hidden items-center gap-2 font-semibold mb-5 text-xl font-sans cursor-pointer"
        onClick={() => router.back()}
      >
        <GoArrowLeft className="w-7 h-7 md:hidden" /> My Account
      </h1>

      <div className="flex flex-col gap-5">
        {orders.map((order: any) => (
          <div key={order.id} className="flex flex-col gap-2 border border-light-3 p-2 rounded-lg">
            <div className="flex justify-between items-center">
              <span>
                <h1 className="text-base font-semibold">Order #{order.orderNumber}</h1>
                <p className="text-sm">{order.createdAt.slice(0, 10)}</p>
              </span>
              <p className="text-sm ">{capitalize(order.status)}</p>
            </div>

            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-2 border-t pt-2">
                <div className="w-[60px]">
                  <AspectRatio ratio={0.8 / 1}>
                    <Image
                      src={item.item.images[0].url}
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
                  <Link href={`/p/${item.item.slug}`} className="w-fit">
                    <p className="text-[15px] font-semibold line-clamp-2 leading-5">{item.item.name}</p>
                  </Link>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
