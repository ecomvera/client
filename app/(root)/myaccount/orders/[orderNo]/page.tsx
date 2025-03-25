"use client";

import { ArrowLeft, Check, Clock, Pencil, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { devLog, formatDateTime } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import LoadingPage from "@/components/Shared/LoadingPage";
import { useAction } from "@/stores/action";
import { IOrder } from "@/types";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useToken } from "@/hooks/useToken";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";

export default function OrderDetailsPage({ params }: { params: { orderNo: string } }) {
  const { showLoadingScreen, setShowLoadingScreen } = useAction();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // This would normally be fetched from an API based on the order ID
  const orderr = {
    id: "7867050244",
    date: "Mar 16, 2025, 10:39 AM",
    status: "processing", // Can be: created, confirmed, processing, shipped, delivered, cancelled
    items: [
      {
        id: "1",
        name: "Silkyester men t-shirt",
        image: "/placeholder.svg?height=80&width=80",
        price: 999,
        quantity: 1,
      },
      {
        id: "2",
        name: "Premium Denim Jeans",
        image: "/placeholder.svg?height=80&width=80",
        price: 1499,
        quantity: 1,
      },
    ],
    subtotal: 2498,
    shipping: 99,
    tax: 250,
    total: 2847,
    paymentMethod: "Credit Card (ending in 4242)",
    shippingAddress: {
      name: "John Doe",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
    },
    timeline: [
      { status: "ORDER_CREATED", completed: true },
      { status: "PROCESSING", completed: true },
      { status: "CONFIRMED", completed: true, current: true },
      { status: "Shipped", completed: false },
      { status: "OUT_FOR_PICKUP", completed: false },
      { status: "PICKED_UP", completed: false },
      { status: "SHIPPED", completed: false },
      { status: "IN_TRANSIT", completed: false },
      { status: "REACHED_AT_DESTINATION", completed: false },
      { status: "OUT_FOR_DELIVERY", completed: false },
      { status: "DELIVERED", completed: false },
      { status: "PAYMENT_PENDING", completed: false },
      { status: "PAYMENT_FAILED", completed: false },
      { status: "CANCELLED", completed: false },
      { status: "FAILED", completed: false },
      { status: "RETURN_REQUESTED", completed: false },
      { status: "RETURNED", completed: false },
      { status: "RETURN_FAILED", completed: false },
      { status: "RETURN_CANCELLED", completed: false },
      { status: "REFUNDED", completed: false },
    ],
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "created":
        return "bg-gray-500";
      case "confirmed":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    const getOrder = async () => {
      setShowLoadingScreen(true);
      try {
        const res = await fetch(`/api/user/orders/${params.orderNo}`);
        const data = await res.json();
        setIsLoading(false);
        if (data.ok) {
          setOrder(data.data);
        } else {
          devLog("error -", data.error);
          toast({ title: "Error", description: "failed to fetch order", variant: "destructive" });
        }
      } catch (error) {
        devLog("error -", error);
        toast({ title: "Error", description: "failed to fetch order", variant: "destructive" });
        setIsLoading(false);
      }
      setShowLoadingScreen(false);
    };
    getOrder();
  }, [params.orderNo]);

  // console.log(order);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto py-6 p-0">
      <div className="flex items-center mb-6">
        <Link
          href="/myaccount/orders"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order #{order.orderNumber}</h1>
          <p className="text-muted-foreground">{formatDateTime(order?.createdAt || "")}</p>
        </div>
        <div className="mt-2 md:mt-0">
          <Badge className={`${getStatusColor(order.status)} text-white px-3 py-1 text-sm capitalize`}>
            {order.timeline[0]?.activity || order.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-7 lg:gap-4">
        <div className="md:col-span-5">
          {/* Order Status Stepper */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Stepper line */}
                {order.timeline.length > 0 ? (
                  <div className="absolute left-5 top-0 h-full w-0.5 bg-muted" />
                ) : (
                  <p>No tracking info</p>
                )}

                {/* Stepper items */}
                <div className="space-y-8">
                  {order.timeline.map((step, index) => (
                    <div key={index} className="relative flex items-start">
                      <div
                        className={`absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border ${
                          step.completed
                            ? step.current
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-primary bg-primary text-primary-foreground"
                            : "border-muted bg-background"
                        }`}
                      >
                        {!step.completed ? (
                          <>
                            {step.current ? (
                              <Clock className="h-5 w-5" />
                            ) : (
                              <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                            )}
                          </>
                        ) : (
                          <Check className="h-5 w-5" />
                        )}
                      </div>
                      <div className="ml-14 space-y-1">
                        <p className="text-base font-semibold">{step.activity}</p>
                        <p className="text-sm text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                      <Image
                        src={item.product.images[0]?.url || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Quantity: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{item.price}</p>
                      {/* <AddProductReview productId={item.product.id || ""} orderId={order.id} name={item.product.name} /> */}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {/* download invoice */}
          {/* <Card className="mb-4">
            <CardContent className="p-6">
              <div className="space-y-2">
                <Button className="w-full" variant="ghost">
                  <Link href={`/api/user/orders/${order.orderNumber}/invoice`}>Download Invoice</Link>
                </Button>
              </div>
            </CardContent>
          </Card> */}

          {/* Order Summary */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{order.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₹{order.deliveryCharge || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gift Wrap</span>
                  <span>₹{order.giftWrapCharge || 0}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{order.subTotal}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-sm text-muted-foreground">{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && (
                  <p className="text-sm text-muted-foreground">{order.shippingAddress.line2}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                </p>
                <p className="text-sm text-muted-foreground">{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {order.paymentMode === "COD" ? "Cash on Delivery" : "Online Payment"}
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Cancel Order
              </Button>
              <Button className="w-full" variant="outline">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const DownloadInvoiceButton = ({ orderId }: { orderId: string }) => {
  return (
    <Button asChild className="w-full" variant="outline">
      <Link href={`/api/orders/${orderId}/invoice`}>Download Invoice</Link>
    </Button>
  );
};

const AddProductReview = ({ productId, orderId, name }: { productId: string; orderId: string; name?: string }) => {
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
        <p className="text-xs text-[--c3] break-all">
          <Plus className="mr-1 inline-block h-[14px] w-[14px] align-[-0.25em]" /> Review
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product Review</DialogTitle>
          <DialogDescription>Write your product review here.</DialogDescription>
          <h2 className="text-[--c3]">{name}</h2>
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
        <p className="text-xs underline text-[--c3]">
          <Pencil className="mr-1 inline-block h-[14px] w-[14px] align-[-0.25em]" /> Review
        </p>
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
