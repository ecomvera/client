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

const Page = () => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { cart, isLoading: cartLoading } = useData();
  const [selectedAddress, setSelectedAddress] = React.useState<IAddress | null>(null);

  const handleCheckout = () => {
    if (!selectedAddress) {
      toast({
        description: "Please select an address",
        variant: "destructive",
      });
      return;
    }
  };

  useEffect(() => {
    if ((!user && !userLoading) || (!cartLoading && !cart.length)) return router.replace("/sign-in?src=/checkout");
  }, [userLoading, cartLoading]);
  return (
    <div className="max-w-desktop mx-auto tablet:py-5">
      <h1 className="text-2xl font-semibold text-light-1">Checkout</h1>

      <div className="flex flex-col-reverse tablet:flex-row justify-between py-3 gap-4 border-light-3">
        <div className="w-full">
          <DeliveryDetails
            user={user}
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress}
            cart={cart}
          />
          <Button
            className="w-full mt-10 bg-[#ffd248] py-2 text-gray-800 text-lg font-bold hover:bg-[#ffd248]"
            onClick={handleCheckout}
          >
            Proceed
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
  selectedAddress,
  setSelectedAddress,
}: {
  user: IUser | null;
  cart: ICartItem[];
  selectedAddress: IAddress | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
}) => {
  const totalMRP = useMemo(() => cart && cart.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart && cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0), [cart]);

  const [currentItem, setCurrentItem] = React.useState("item-1");

  return (
    <Accordion type="single" collapsible defaultValue={"item-1"} value={currentItem}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-base hover:no-underline" onClick={() => setCurrentItem("item-1")}>
          {!selectedAddress ? (
            <p className="font-semibold">Delivery address</p>
          ) : (
            <p className="font-normal">
              Delivering to <span className="font-semibold">{selectedAddress?.name}</span>{" "}
              <span className="ml-2 bg-blue-400 text-white rounded px-2">{selectedAddress?.residenceType}</span>
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
                      setSelectedAddress(address);
                      setCurrentItem("item-3");
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
      <AccordionItem value="item-2" onClick={() => setCurrentItem("item-2")}>
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          Item{cart && cart.length > 1 ? "s" : ""} ({cart && cart.length})
        </AccordionTrigger>
        <AccordionContent className="px-2">
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div className="flex items-center justify-between py-2" key={item.id}>
                <div className="flex items-center gap-3">
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-20 rounded-full"
                  />
                  <p>{item.product.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p>₹{item.product.price}</p>
                  <p className="font-semibold">x {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <AccordionContent>
              <p className="text-light-1 px-2">No items found</p>
            </AccordionContent>
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="border-none" onClick={() => setCurrentItem("item-3")}>
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
