"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { IAddress, ICartItem } from "@/types";
import SelectSize from "@/components/Dialogs/SelectSize";
import UpdateQuantity from "@/components/Dialogs/UpdateQuantity";
import Link from "next/link";
import { useData } from "@/hooks/useData";
import DeleteCartItem from "@/components/Dialogs/DeleteCartItem";
import { useUser } from "@/hooks/useUser";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useDataStore } from "@/stores/data";
import Stepper from "./_components/stepper";
import { set } from "lodash";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(1);
  const [deliveryAddress, setDeliveryAddress] = React.useState<IAddress | null>(null);
  const { cart, totalMRP, totalPrice, finalPrice } = useData();

  return (
    <div className="max-w-desktop mx-auto px-2 py-5">
      <h1 className="text-xl md:text-2xl">My Cart</h1>

      <div className="mt-4">
        <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />

        {activeStep === 1 && <MyCart setActiveStep={setActiveStep} />}
        {activeStep === 2 && <AddressForm selectedAddress={deliveryAddress} cb={setDeliveryAddress} />}
        {activeStep === 3 && <Payment />}

        <div className="w-full flex justify-end pt-5">
          <Button
            className="w-full tablet:w-[300px] bg-[--c2] py-2 text-lg font-bold hover:bg-[--c3]"
            onClick={() => setActiveStep(activeStep + 1)}
            disabled={cart.length === 0 || (activeStep === 2 && !deliveryAddress)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const Payment = () => {
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

const AddressForm = ({
  selectedAddress,
  cb,
}: {
  selectedAddress: IAddress | null;
  cb: (address: IAddress | null) => void;
}) => {
  const { user, isLoading: userLoading } = useUser();

  if (!userLoading && !user) return null;
  return (
    <div>
      <p className="font-semibold py-4">Delivery address</p>

      {userLoading && <div>Loading...</div>}
      {user?.addresses.map((address) => (
        <div
          id={"shipping" + address.id}
          className={`hover:bg-accent flex items-center gap-3 cursor-pointer p-5 relative rounded ${
            address.id === selectedAddress?.id ? "bg-accent" : ""
          }`}
          key={address.id}
          onClick={() => {
            if (address.id === selectedAddress?.id) {
              cb(null);
            } else {
              cb(address);
            }
          }}
        >
          <Label htmlFor={"shipping" + address.id} className="flex flex-col gap-1 cursor-pointer">
            <p className="font-semibold mb-1">{address.name}</p>
            <p>{`${address.line1} ${address.line2} ${address.city}, ${address.state}, ${address.country}. ${address.pincode}`}</p>
            <p>{address.landmark}</p>
            <p className="font-semibold">+91 {address.phone}</p>
            <p className="font-semibold absolute top-0 right-0 p-1 bg-[--c1] m-2 rounded">{address.residenceType}</p>
          </Label>
        </div>
      ))}

      <Link
        href="/myaccount/addresses?address=new&src=/cart"
        className="hover:bg-accent flex items-center gap-3 cursor-pointer p-5"
      >
        <div className="hover:bg-accent flex items-center gap-3 cursor-pointer p-5">
          <p className="w-full flex items-center gap-3">
            <PlusCircle /> Add new Address
          </p>
        </div>
      </Link>
    </div>
  );
};

const MyCart = ({ setActiveStep }: { setActiveStep: React.Dispatch<React.SetStateAction<number>> }) => {
  const { cart, totalMRP, totalPrice, finalPrice } = useData();

  return (
    <div className="flex flex-col tablet:flex-row justify-between py-3 gap-4 border-light-3 mt-4">
      <div className="tablet:px-2 flex-1 tablet:min-h-[300px]">
        {cart.length === 0 ? (
          <div>
            <div className="text-light-1">No items in your cart</div>
            <Image
              src="/assets/bag.png"
              alt="empty"
              width={0}
              height={0}
              sizes="100vw"
              className="mx-auto py-16 w-44 tablet:w-52 laptop:w-64"
            />
            <div className="flex items-center justify-center">
              <Button onClick={() => window.location.replace("/")} className="bg-[--c2]">
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {cart.map((item) => (
              <CartProduct key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <CartSummary
          cart={cart}
          totalMRP={totalMRP}
          totalPrice={totalPrice}
          finalPrice={finalPrice}
          setActiveStep={setActiveStep}
        />
      )}
    </div>
  );
};

const CartProduct = ({ item }: { item: ICartItem }) => {
  return (
    <div className="p-2 flex gap-2 border my-2">
      <Link href={`/p/${item.product.slug}`} className="relative w-[60px] tablet:w-[100px] overflow-hidden">
        <AspectRatio ratio={0.8 / 1}>
          <Image
            src={item.product.images.filter((image) => image.color === item.color)[0]?.url}
            alt="product"
            width={0}
            height={0}
            priority
            sizes="100vw"
            className="w-full"
          />
        </AspectRatio>
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="relative">
          <h1 className="text-sm tablet:text-base font-semibold text-light-1">{item.product.name}</h1>
          <span
            style={{ backgroundColor: item.color }}
            className="w-5 h-5 tablet:w-7 tablet:h-7 rounded-full flex items-center justify-center mt-1"
          >
            <span className="w-4 h-4 tablet:w-6 tablet:h-6 rounded-full border-2 border-white"></span>
          </span>
          <DeleteCartItem item={item} />
        </div>
        <div className="flex-1"></div>
        <div className="flex justify-between">
          <div className="flex flex-col mobile:flex-row">
            <SelectSize item={item} />
            <UpdateQuantity item={item} />
          </div>
          <div className="flex gap-1 tablet:gap-2 items-end">
            <p className="font-bold text-sm tablet:text-lg">₹{item.product.price * item.quantity}</p>
            <p className="line-through text-[10px] tablet:text-sm">₹{item.product.mrp * item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSummary = ({
  cart,
  totalMRP,
  totalPrice,
  finalPrice,
  setActiveStep,
}: {
  cart: ICartItem[];
  totalMRP: number;
  totalPrice: number;
  finalPrice: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { user } = useUser();
  const { deliveryCost, freeDeliveryAt } = useDataStore();

  return (
    <div className="w-full tablet:w-[300px] px-2">
      <div className="flex justify-between items-center py-3">
        <p className="text-sm">Total MRP</p>
        <p className="text-sm font-semibold">₹ {totalMRP}</p>
      </div>
      <div className="flex justify-between items-center py-3">
        <p className="text-sm">Discount</p>
        <p className="text-sm font-semibold text-[--c6]">₹ {totalPrice - totalMRP}</p>
      </div>
      <Separator />
      <div className="flex justify-between items-center py-3">
        <p className="text-sm">Total Price (incl. of all taxes)</p>
        <p className="text-sm font-semibold">₹ {totalPrice}</p>
      </div>
      <div className="flex justify-between items-center pt-3">
        <p className="text-sm">Delivery Charge</p>
        <p className="text-sm font-semibold">₹ {totalPrice > freeDeliveryAt ? 0 : deliveryCost}</p>
      </div>
      <span className="text-xs text-gray-500">Get free delivery above ₹ {freeDeliveryAt}</span>
      <Separator />
      <div className="flex justify-between items-center py-3">
        <p className="text-sm font-semibold">Total</p>
        <p className="text-sm font-semibold">₹ {finalPrice}</p>
      </div>

      {/* <p className="text-xs text-gray-500 mt-2">Delivery charge will be calculated at the time of checkout</p> */}
    </div>
  );
};

export default Page;
