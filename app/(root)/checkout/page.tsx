"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { IAddress, ICartItem, IUser } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDataStore } from "@/stores/data";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useData } from "@/hooks/useData";
import { Checkbox } from "@/components/ui/checkbox";
import { generateOrderNumber } from "@/lib/utils";
import { useToken } from "@/hooks/useToken";
import Script from "next/script";
import { makePayment } from "@/lib/razorpay";
import { Cross1Icon } from "@radix-ui/react-icons";
import DeleteCartItem from "@/components/Dialogs/DeleteCartItem";
import Stepper from "./_components/stepper";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/Shared/loader";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Page = () => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { token } = useToken();
  const { cart, isLoading: cartLoading, totalMRP, totalPrice, finalPrice } = useData();
  const { deliveryCost, freeDeliveryAt } = useDataStore();
  const [loading, setLoading] = React.useState(false);
  const [paymentMode, setPaymentMode] = React.useState<"PREPAID" | "COD">("PREPAID");
  const [deliveryAddress, setDeliveryAddress] = React.useState<IAddress | null>(null);
  const [missingItems, setMissingItems] = React.useState<{ productId: string; availableQuantity: number }[]>([]);
  const [currentItem, setCurrentItem] = React.useState(1);
  const [activeStep, setActiveStep] = React.useState(1);
  const totalAccordion = 3;

  const handlePayment = async ({ orderID }: { orderID: string }) => {
    console.log({ orderID });
    try {
      const data = await fetch("/api/user/payment/payu", {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
        body: JSON.stringify({
          amount: 1,
          email: user?.email || "",
          firstName: user?.name || "",
          mobile: user?.phone || "",
          orderID: orderID,
        }),
      });
      if (!data.ok) {
        toast({
          description: "Something went wrong",
          variant: "destructive",
        });
        return;
      }

      // try {
      //   const res = await data.json();
      //   if (!res.ok) {
      //     toast({
      //       description: res.error || "Something went wrong",
      //       variant: "destructive",
      //     });
      //     return;
      //   }
      // } catch (error) {}

      const html = await data.text();

      document.open();
      document.write(html);
      document.close();

      // // open a new window
      // const newWindow = window.open();
      // newWindow?.document.write(html);
      // newWindow?.document.close();
    } catch (error: any) {
      console.log("error -", error);
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = async () => {
    if (currentItem < totalAccordion) {
      setActiveStep(activeStep + 1);
      return setCurrentItem(currentItem + 1);
    }

    if (!deliveryAddress) {
      toast({
        description: "Please select an Delivery address",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        description: "Your cart is empty",
        variant: "destructive",
      });
      return;
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
      deliveryId: deliveryAddress?.id,
      items,
      status: paymentMode === "PREPAID" ? "PAYMENT_PENDING" : "PROCESSING",
      paymentMode: paymentMode === "PREPAID" ? "ONLINE" : "CASH_ON_DELIVERY",
      totalAmount: totalPrice,
      deliveryCharge: totalPrice < freeDeliveryAt ? deliveryCost : 0,
      giftWrapCharge: 0,
      subTotal: finalPrice,
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

    // localStorage.removeItem("cart");
    // setCart([]);
    setLoading(false);

    if (paymentMode === "PREPAID") {
      // await makePayment(res.data.id, parseInt(res.data.totalAmount));
      await handlePayment({ orderID: res.data.id });
    }

    if (paymentMode === "COD") {
      toast({
        description: "Order placed successfully",
        variant: "success",
      });
      router.replace(`/myaccount/orders`);
    }
  };

  // useEffect(() => {
  // const getData = async (deliveryAddress: IAddress) => {
  // // calculate delivery charges & delivery date
  // const deliveryPincode = deliveryAddress.pincode;
  // const getNearestWarehouse = (deliveryPincode: string, pickupPincodes: string[]) => {
  //   if (pickupPincodes.length === 1) return pickupPincodes[0];
  //   // get nearest warehouse pincode
  //   // here will be a api that will return the distance between two pincodes [pickupPincode, deliveryPincode]
  //   // and will return the nearest warehouse
  //   return pickupPincodes[0]; // for now
  // };
  // const shipmentDetails = cart.map((item) => ({
  //   id: item.product.id,
  //   weight: item.product.weight,
  //   hasDeliveryFee: item.product.hasDeliveryFee,
  //   pickupPincode: getNearestWarehouse(
  //     deliveryPincode,
  //     item.product.warehouses.map((pw) => pw.warehouse.pincode)
  //   ),
  // }));
  // // remove items that don't have delivery fee
  // const filteredShipmentDetails = shipmentDetails.filter((item) => item.hasDeliveryFee);
  // // group items by warehouse pincode
  // const groupedShipmentDetails = filteredShipmentDetails.reduce((acc, item) => {
  //   if (!acc[item.pickupPincode]) acc[item.pickupPincode] = [];
  //   acc[item.pickupPincode].push(item);
  //   return acc;
  // }, {} as Record<string, typeof filteredShipmentDetails>);
  // // calculate delivery charges
  // for await (const pincode of Object.keys(groupedShipmentDetails)) {
  //   const data = await fetch(
  //     `http://localhost:3001/api/shipment/courier-list?p_pin=${pincode}&d_pin=${deliveryPincode}&dm=s&pm=${}&sv=1000&w=1000&bl=1&bw=1&bh=1`
  //   ).then((res) => res.json());
  // }
  // console.log(groupedShipmentDetails);
  // };
  // if (deliveryAddress && paymentMode) getData(deliveryAddress);
  // }, [deliveryAddress, paymentMode]);

  useEffect(() => {
    if (!user && !userLoading) return router.replace("/sign-in?src=/checkout");
    if (!cart.length && !cartLoading) return router.replace("/");
  }, [userLoading, cartLoading]);

  return (
    <div className="max-w-desktop mx-auto px-2 tablet:py-5 mb-28">
      <h1 className="text-2xl font-semibold text-light-1">Checkout</h1>

      <div className="flex flex-col-reverse tablet:flex-row justify-between py-3 gap-4 border-light-3">
        <div className="w-full tablet:w-tablet">
          <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
          <DeliveryDetails
            user={user}
            cart={cart}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            missingItems={missingItems}
            setMissingItems={setMissingItems}
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
            deliveryCost={deliveryCost}
            freeDeliveryAt={freeDeliveryAt}
            totalMRP={totalMRP}
            totalPrice={totalPrice}
            finalPrice={finalPrice}
            setActiveStep={setActiveStep}
          />
          <Button
            className={`w-full mt-10 py-2 text-lg font-bold bg-[--c2] hover:bg-[--c3] ${
              currentItem < totalAccordion ? "" : "bg-[--c1] hover:bg-[--c1] text-gray-800"
            } `}
            disabled={loading}
            onClick={handleCheckout}
          >
            {currentItem < totalAccordion ? "Next" : loading ? "Loading..." : "Place Order"}
          </Button>
        </div>
        {/* <PaymentDetails /> */}
      </div>

      <Loader />
    </div>
  );
};

const DeliveryDetails = ({
  user,
  cart,
  deliveryAddress,
  setDeliveryAddress,
  currentItem,
  setCurrentItem,
  missingItems,
  setMissingItems,
  paymentMode,
  setPaymentMode,
  freeDeliveryAt,
  deliveryCost,
  totalMRP,
  totalPrice,
  finalPrice,
  setActiveStep,
}: {
  user: IUser | null;
  cart: ICartItem[];
  deliveryAddress: IAddress | null;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
  currentItem: number;
  setCurrentItem: React.Dispatch<React.SetStateAction<number>>;
  missingItems: { productId: string; availableQuantity: number }[];
  setMissingItems: React.Dispatch<React.SetStateAction<{ productId: string; availableQuantity: number }[]>>;
  paymentMode: string;
  setPaymentMode: React.Dispatch<React.SetStateAction<"PREPAID" | "COD">>;
  freeDeliveryAt: number;
  deliveryCost: number;
  totalMRP: number;
  totalPrice: number;
  finalPrice: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <Accordion type="single" defaultValue={"item-1"} value={`item-${currentItem}`}>
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="text-base hover:no-underline"
            onClick={() => {
              setCurrentItem(1);
              setActiveStep(1);
            }}
          >
            {!deliveryAddress ? (
              <p className="font-semibold">Delivery address</p>
            ) : (
              <p className="font-normal">
                Delivering to <span className="font-semibold">{deliveryAddress?.name}</span>{" "}
                <span className="ml-2 bg-blue-400 text-white rounded px-2">{deliveryAddress?.residenceType}</span>
              </p>
            )}
          </AccordionTrigger>
          <RadioGroup>
            <AccordionContent>
              {user && user.addresses.length > 0 ? (
                user.addresses.map((address) => (
                  <div
                    id={"shipping" + address.id}
                    className="hover:bg-accent p-2 flex items-center gap-3 cursor-pointer"
                    key={address.id}
                    onClick={() => {
                      if (address.id === deliveryAddress?.id) {
                        setDeliveryAddress(null);
                      } else {
                        setDeliveryAddress(address);
                        setCurrentItem(1);
                        setActiveStep(1);
                      }
                    }}
                  >
                    <RadioGroupItem
                      value={address.id as string}
                      checked={address.id === deliveryAddress?.id}
                      id={"shipping" + address.id}
                    />
                    <Label htmlFor={"shipping" + address.id} className="flex flex-col gap-1 cursor-pointer">
                      <p className="font-semibold mb-1">{address.name}</p>
                      <p>{`${address.line1} ${address.line2} ${address.city}, ${address.state}, ${address.country}. ${address.pincode}`}</p>
                      <p>{address.landmark}</p>
                      <p className="font-semibold">+91 {address.phone}</p>
                    </Label>
                  </div>
                ))
              ) : (
                //
                <p className="text-light-1 px-2">No address found</p>
              )}
              <Link
                href="/myaccount/addresses?address=new&src=/checkout"
                className="hover:bg-accent p-2 flex items-center gap-3 cursor-pointer"
              >
                <Label className="flex gap-1 cursor-pointer items-center p-4">
                  <PlusCircleIcon className="w-6 h-6" />
                  <p className="font-semibold">Add New Address</p>
                </Label>
              </Link>
            </AccordionContent>
          </RadioGroup>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          onClick={() => {
            setCurrentItem(2);
            setActiveStep(2);
          }}
        >
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            Item{cart && cart.length > 1 ? "s" : ""} ({cart && cart.length})
          </AccordionTrigger>
          <AccordionContent className="px-2">
            {missingItems.length > 0 && (
              <p className="text-blue-600 text-base font-semibold">We are sorry for the inconvenience.</p>
            )}
            {cart && cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="py-2 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.product.images.filter((image) => image.color === item.color)[0].url}
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
                  <DeleteCartItem item={item} />
                </div>
              ))
            ) : (
              <AccordionContent>
                <p className="text-light-1 px-2">No items found</p>
              </AccordionContent>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border-none"
          onClick={() => {
            setCurrentItem(3);
            setActiveStep(3);
          }}
        >
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
              <p>
                Delivery Charge <span className="text-xs">(Free for orders above ₹{freeDeliveryAt})</span>
              </p>
              <p className="font-semibold">₹{totalPrice > freeDeliveryAt ? 0 : deliveryCost}</p>
            </div>
            <Separator />
            <div className="text-base flex items-center justify-between py-2">
              <p>Total</p>
              <p className="font-semibold">₹{finalPrice}</p>
            </div>

            <div>
              <h1 className="font-semibold text-light-1 mt-3">Payment Mode</h1>
              <RadioGroup value={paymentMode} className="flex justify-between h-10">
                {["PREPAID", "COD"].map((mode) => (
                  <div
                    key={mode}
                    className="flex gap-2 w-full items-center hover:bg-accent p-2 cursor-pointer"
                    onClick={() => setPaymentMode(mode as "PREPAID" | "COD")}
                  >
                    <RadioGroupItem value={mode} id={mode}>
                      {mode}
                    </RadioGroupItem>
                    <Label htmlFor={mode} className="text-sm">
                      {mode === "PREPAID" ? (
                        <>
                          Online
                          {/* <span className="text-xs">(UPI, Credit/Debit Card, Netbanking, etc)</span> */}
                        </>
                      ) : (
                        "Cash On Delivery"
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
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

// const PaymentDetails = () => {
//   return (
//     <div className="w-full !tablet:w-[500px] px-2">
//       <p className="text-lg font-semibold text-dark-3">Payment Method</p>
//       <div className="flex items-center gap-3">
//         <input type="radio" id="cod" name="payment" value="cod" className="accent-success" />
//         <label htmlFor="cod">Cash on Delivery</label>
//       </div>
//     </div>
//   );
// };

{
  /* <AccordionItem value="item-2">
          <AccordionTrigger className="text-base hover:no-underline" onClick={() => setCurrentItem(2)}>
            {!billingAddress ? (
              <p className="font-semibold">Billing address</p>
            ) : (
              <p className="font-normal">
                Billing to <span className="font-semibold">{billingAddress?.name}</span>{" "}
                <span className="ml-2 bg-blue-400 text-white rounded px-2">{billingAddress?.residenceType}</span>
              </p>
            )}
          </AccordionTrigger>
          <AccordionContent className="hover:bg-accent p-2">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Checkbox id="terms" checked={deliveryAddress ? deliveryAddress?.id === billingAddress?.id : false} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                onClick={() => {
                  setBillingAddress(deliveryAddress);
                  setCurrentItem(2);
                }}
              >
                Same as delivery
              </label>
            </div>
          </AccordionContent>
          <RadioGroup>
            {user && user.addresses.length > 0 ? (
              user.addresses.map((address) => (
                <AccordionContent
                  id={"billing" + address.id}
                  className="hover:bg-accent p-2 flex items-center gap-3 cursor-pointer w-full"
                  key={address.id}
                  onClick={() => {
                    if (address.id === billingAddress?.id) {
                      setBillingAddress(null);
                    } else {
                      setBillingAddress(address);
                      setCurrentItem(2);
                    }
                  }}
                >
                  <RadioGroupItem
                    value={address.id as string}
                    id={"billing" + address.id}
                    checked={address.id === billingAddress?.id}
                  />
                  <Label htmlFor={"billing" + address.id} className="flex flex-col gap-1 cursor-pointer">
                    <p className="font-semibold mb-1">{address.name}</p>
                    <p>{`${address.line1} ${address.line2} ${address.city}, ${address.state}, ${address.country}. ${address.pincode}`}</p>
                    <p>{address.landmark}</p>
                    <p className="font-semibold">+91 {address.phone}</p>
                  </Label>
                </AccordionContent>
              ))
            ) : (
              <AccordionContent>
                <p className="text-light-1 px-2">No address found</p>
              </AccordionContent>
            )}
          </RadioGroup>
        </AccordionItem> */
}

export default Page;
