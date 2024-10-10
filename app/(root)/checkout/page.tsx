"use client";

import { useUser } from "@/hooks/useUser";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { IAddress, ICartItem, IUser } from "@/types";
import { Toggle } from "@/components/ui/toggle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/user";
import { useDataStore } from "@/stores/data";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useData } from "@/hooks/useData";
import { Checkbox } from "@/components/ui/checkbox";
import useSWR from "swr";
import { fetcher, fetchOpt, generateOrderNumber } from "@/lib/utils";
import { useStore } from "zustand";
import { useToken } from "@/hooks/useToken";

const Page = () => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { token } = useToken();
  const { cart, isLoading: cartLoading } = useData();
  const { setCart } = useDataStore();
  const [loading, setLoading] = React.useState(false);
  const [shippingAddress, setShippngAddress] = React.useState<IAddress | null>(null);
  const [billingAddress, setBillingAddress] = React.useState<IAddress | null>(null);
  const [missingItems, setMissingItems] = React.useState<{ productId: string; availableQuantity: number }[]>([]);
  const [currentItem, setCurrentItem] = React.useState(1);
  const totalAccordion = 4;

  const handleCheckout = async () => {
    // check if address is selected
    if (currentItem < totalAccordion) {
      if (currentItem === 1 && !shippingAddress) {
        toast({
          description: "Please select an Delivery address",
          variant: "destructive",
        });
        return;
      }
      if (currentItem === 2 && !billingAddress) {
        toast({
          description: "Please select an Shipping address",
          variant: "destructive",
        });
        return;
      }
      return setCurrentItem(currentItem + 1);
    }

    const items = cart.map((item) => ({
      id: item.product.id,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      price: item.product.price,
      totalPrice: item.product.price * item.quantity,
    }));

    const data = {
      orderNumber: generateOrderNumber(),
      userId: user?.id,
      shippingId: shippingAddress?.id,
      billingId: billingAddress?.id,
      items,
      status: "PENDING",
      totalPrice: cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    };

    setLoading(true);
    const res = await fetch("/api/user/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    // checking if items are missing
    if (!res.ok && res.missingItems) {
      toast({
        description: res.error,
        variant: "destructive",
      });
      setCurrentItem(3);
      setMissingItems(res.missingItems);
      setLoading(false);
      return;
    }

    if (!res.ok) {
      toast({
        description: res.error || "Something went wrong",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setCart([]);
    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully",
      variant: "success",
    });
    setLoading(false);
    router.push("/myaccount/orders");
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    if ((!user && !userLoading) || (!cartLoading && !cart.length)) return router.replace("/sign-in?src=/checkout");
  }, [userLoading, cartLoading]);
  return (
    <div className="max-w-desktop mx-auto px-2 tablet:py-5">
      <h1 className="text-2xl font-semibold text-light-1">Checkout</h1>

      <div className="flex flex-col-reverse tablet:flex-row justify-between py-3 gap-4 border-light-3">
        <div className="w-full">
          <DeliveryDetails
            user={user}
            cart={cart}
            shippingAddress={shippingAddress}
            setShippngAddress={setShippngAddress}
            billingAddress={billingAddress}
            setBillingAddress={setBillingAddress}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            missingItems={missingItems}
            setMissingItems={setMissingItems}
          />
          <Button
            className={`w-full mt-10 py-2 text-lg font-bold ${
              currentItem < totalAccordion ? "" : "bg-[#ffd248] hover:bg-[#ffd248] text-gray-800"
            } `}
            onClick={handleCheckout}
          >
            {currentItem < totalAccordion ? "Next" : loading ? "Loading..." : "Place Order"}
          </Button>
        </div>
        <PaymentDetails />
      </div>
    </div>
  );
};

const DeliveryDetails = ({
  user,
  cart,
  shippingAddress,
  setShippngAddress,
  billingAddress,
  setBillingAddress,
  currentItem,
  setCurrentItem,
  missingItems,
  setMissingItems,
}: {
  user: IUser | null;
  cart: ICartItem[];
  shippingAddress: IAddress | null;
  setShippngAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
  billingAddress: IAddress | null;
  setBillingAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
  currentItem: number;
  setCurrentItem: React.Dispatch<React.SetStateAction<number>>;
  missingItems: { productId: string; availableQuantity: number }[];
  setMissingItems: React.Dispatch<React.SetStateAction<{ productId: string; availableQuantity: number }[]>>;
}) => {
  const totalMRP = useMemo(() => cart && cart.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart && cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0), [cart]);

  return (
    <Accordion type="single" defaultValue={"item-1"} value={`item-${currentItem}`}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-base hover:no-underline" onClick={() => setCurrentItem(1)}>
          {!shippingAddress ? (
            <p className="font-semibold">Delivery address</p>
          ) : (
            <p className="font-normal">
              Delivering to <span className="font-semibold">{shippingAddress?.name}</span>{" "}
              <span className="ml-2 bg-blue-400 text-white rounded px-2">{shippingAddress?.residenceType}</span>
            </p>
          )}
        </AccordionTrigger>
        <RadioGroup>
          {user && user.addresses.length > 0 ? (
            user.addresses.map((address) => (
              <AccordionContent className="hover:bg-accent p-2" key={address.id}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={address.id as string} id={address.id} />
                  <Label
                    htmlFor={address.id}
                    className="w-full"
                    onClick={() => {
                      setShippngAddress(address);
                      setCurrentItem(1);
                    }}
                  >
                    <AccordionContent>
                      <p className="font-semibold">{address.name}</p>
                      <p>{`${address.line1} ${address.line2} ${address.city}, ${address.state}, ${address.country}. ${address.pincode}`}</p>
                      <p>{address.landmark}</p>
                      <p className="font-semibold">+91 {address.phone}</p>
                    </AccordionContent>
                  </Label>
                </div>
              </AccordionContent>
            ))
          ) : (
            <AccordionContent>
              <p className="text-light-1 px-2">No address found</p>
            </AccordionContent>
          )}
        </RadioGroup>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-base hover:no-underline" onClick={() => setCurrentItem(2)}>
          {!billingAddress ? (
            <p className="font-semibold">Shipping address</p>
          ) : (
            <p className="font-normal">
              Billing to <span className="font-semibold">{billingAddress?.name}</span>{" "}
              <span className="ml-2 bg-blue-400 text-white rounded px-2">{billingAddress?.residenceType}</span>
            </p>
          )}
        </AccordionTrigger>
        <RadioGroup>
          <AccordionContent className="hover:bg-accent p-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={shippingAddress ? shippingAddress?.id === billingAddress?.id : false}
                onClick={() => {
                  setBillingAddress(shippingAddress);
                  setCurrentItem(2);
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Same as delivery
              </label>
            </div>
          </AccordionContent>
          {user && user.addresses.length > 0 ? (
            user.addresses.map((address) => (
              <AccordionContent className="hover:bg-accent p-2" key={address.id}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={address.id as string} id={address.id} checked={address.id === billingAddress?.id} />
                  <Label
                    htmlFor={address.id}
                    className="w-full"
                    onClick={() => {
                      setBillingAddress(address);
                      setCurrentItem(2);
                    }}
                  >
                    <AccordionContent>
                      <p className="font-semibold">{address.name}</p>
                      <p>{`${address.line1} ${address.line2} ${address.city}, ${address.state}, ${address.country}. ${address.pincode}`}</p>
                      <p>{address.landmark}</p>
                      <p className="font-semibold">+91 {address.phone}</p>
                    </AccordionContent>
                  </Label>
                </div>
              </AccordionContent>
            ))
          ) : (
            <AccordionContent>
              <p className="text-light-1 px-2">No address found</p>
            </AccordionContent>
          )}
        </RadioGroup>
      </AccordionItem>
      <AccordionItem value="item-3" onClick={() => setCurrentItem(3)}>
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          Item{cart && cart.length > 1 ? "s" : ""} ({cart && cart.length})
        </AccordionTrigger>
        <AccordionContent className="px-2">
          {missingItems.length > 0 && (
            <p className="text-blue-600 text-base font-semibold">We are sorry for the inconvenience.</p>
          )}
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-20 rounded-md"
                    />
                    <p>{item.product.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p>₹{item.product.price}</p>
                    <p className="font-semibold">x {item.quantity}</p>
                  </div>
                </div>
                <MissingItemDetails item={item} missingItems={missingItems} setMissingItems={setMissingItems} />
              </div>
            ))
          ) : (
            <AccordionContent>
              <p className="text-light-1 px-2">No items found</p>
            </AccordionContent>
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4" className="border-none" onClick={() => setCurrentItem(4)}>
        <AccordionTrigger className="text-base font-semibold hover:no-underline">Price Summary</AccordionTrigger>
        <AccordionContent className="">
          <div className="text-base flex items-center justify-between py-2">
            <p>Total MRP (incl. of all taxes)</p>
            <p className="font-semibold">₹{totalMRP}</p>
          </div>
          <div className="text-base flex items-center justify-between py-2">
            <p>Discount</p>
            <p className="font-normal text-green-600">₹{totalPrice - totalMRP}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <p>Delivery Charge</p>
            <p className="font-semibold">₹0</p>
          </div>
          <Separator />
          <div className="text-base flex items-center justify-between py-2">
            <p>Total</p>
            <p className="font-semibold">₹{totalPrice}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const MissingItemDetails = ({
  item,
  missingItems,
  setMissingItems,
}: {
  item: ICartItem;
  missingItems: { productId: string; availableQuantity: number }[];
  setMissingItems: React.Dispatch<React.SetStateAction<{ productId: string; availableQuantity: number }[]>>;
}) => {
  const { removeFromCart, updateQuantity } = useDataStore();
  return (
    <>
      {missingItems?.map((i) => {
        if (i.productId === item.productId) {
          if (i.availableQuantity === 0) {
            return (
              <div
                key={i.productId}
                className="flex items-center justify-between rounded-b-md pl-2 p-1 border border-red-300 border-t-0"
              >
                <p className="text-red-600">Out of stock</p>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="text-sm text-red-500 hover:bg-red-50 hover:text-red-500"
                  onClick={() => {
                    removeFromCart(item);
                    setMissingItems(missingItems.filter((i) => i.productId !== item.productId));
                  }}
                >
                  Remove
                </Button>
              </div>
            );
          }
          return (
            <div
              key={i.productId}
              className="flex items-center justify-between rounded-b-md pl-2 p-1 border border-red-300 border-t-0"
            >
              <p className="text-red-600 font-semibold">Only {i.availableQuantity} left in stock</p>
              <span className="flex gap-2">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="text-sm text-green-600 hover:bg-green-50 hover:text-green-600"
                  onClick={() => {
                    updateQuantity(item.id, i.availableQuantity);
                    setMissingItems(missingItems.filter((i) => i.productId !== item.productId));
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="text-sm text-red-500 hover:bg-red-50 hover:text-red-500"
                  onClick={() => {
                    removeFromCart(item);
                    setMissingItems(missingItems.filter((i) => i.productId !== item.productId));
                  }}
                >
                  Remove
                </Button>
              </span>
            </div>
          );
        }
      })}
    </>
  );
};

const PaymentDetails = () => {
  return (
    <div className="w-full !tablet:w-[500px] px-2">
      <p className="text-lg font-semibold text-dark-3">Payment Method</p>
      <div className="flex items-center gap-3">
        <input type="radio" id="cod" name="payment" value="cod" className="accent-success" />
        <label htmlFor="cod">Cash on Delivery</label>
      </div>
    </div>
  );
};

export default Page;
