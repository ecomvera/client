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
import { makePayment } from "@/lib/razorpay";
import { formatDateTime } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

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

      <div className="flex flex-col gap-5">
        {orders.map((order: any) => (
          <div key={order.id} className="flex flex-col gap-2 border border-light-3 p-2 rounded-lg">
            <div className="flex justify-between items-center">
              <span>
                <h1 className="text-xs sm:text-base font-semibold">Order #{order.orderNumber}</h1>
                <p className="text-sm">{formatDateTime(order.createdAt)}</p>
              </span>
              <Status id={order.id} amount={order.totalAmount} status={getStatus(order.status)} />
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
                    <Link href={`/p/${item.product.slug}`} className="w-fit bg-red-400">
                      <p className="text-[15px] font-semibold line-clamp-2 leading-5">{item.product.name}</p>
                    </Link>
                    {order.ProductReviews.length > 0 ? (
                      <EditProductReview review={order.ProductReviews[0]} />
                    ) : (
                      <AddProductReview productId={item.product.id} orderId={order.id} />
                    )}
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
          </div>
        ))}
      </div>
    </div>
  );
};

const AddProductReview = ({ productId, orderId }: { productId: string; orderId: string }) => {
  const { token } = useToken();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    const data = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ rating, comment, productId, orderId }),
    }).then((res) => res.json());
    if (!data.ok) {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
      return;
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <p className="text-xs underline text-[--c3]">Add Product Review</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product Review</DialogTitle>
          <DialogDescription>Write your product review here.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xl">Rating:</p>
            <div className="flex gap-1 justify-center">
              {[1, 2, 3, 4, 5].map((item) => (
                <button
                  key={item}
                  className="cursor-pointer"
                  onClick={() => setRating(item)}
                  onMouseMove={() => setRating(item)}
                >
                  {item <= rating ? (
                    <StarFilledIcon color={rating >= item ? "var(--c2)" : "gray"} width={"40px"} height={"40px"} />
                  ) : (
                    <StarIcon color={rating >= item ? "var(--c2)" : "gray"} width={"40px"} height={"40px"} />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Textarea
              rows={5}
              placeholder="Write your experience here"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </div>
          <Button className="bg-[--c2] hover:bg-[--c3]" onClick={handleReview} disabled={rating === 0}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EditProductReview = ({ review }: { review: any }) => {
  const { token } = useToken();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(review.rating || 0);
  const [comment, setComment] = useState(review.comment || "");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    const data = await fetch("/api/review?reviewId=" + review.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ rating, comment }),
    }).then((res) => res.json());
    if (!data.ok) {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Success", description: "Successfully updated!" });
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <p className="text-xs underline text-[--c3]">Edit Product Review</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product Review</DialogTitle>
          <DialogDescription>Update your product review here.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xl">Rating:</p>
            <div className="flex gap-1 justify-center">
              {[1, 2, 3, 4, 5].map((item) => (
                <button
                  key={item}
                  className="cursor-pointer"
                  onClick={() => setRating(item)}
                  onMouseMove={() => setRating(item)}
                >
                  {item <= rating ? (
                    <StarFilledIcon color={rating >= item ? "var(--c2)" : "gray"} width={"40px"} height={"40px"} />
                  ) : (
                    <StarIcon color={rating >= item ? "var(--c2)" : "gray"} width={"40px"} height={"40px"} />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Textarea
              rows={5}
              placeholder="Write your experience here"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </div>
          <Button className="bg-[--c2] hover:bg-[--c3]" onClick={handleReview} disabled={rating === 0}>
            {loading ? "Loading..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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
