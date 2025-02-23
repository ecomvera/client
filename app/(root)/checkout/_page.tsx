"use client";

import { Button } from "@/components/ui/button";
import Stepper from "./_components/stepper";
import React, { useEffect } from "react";
import { IAddress, ICartItem, IUser } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/hooks/useUser";
import { Label } from "@/components/ui/label";
import { PlusCircle, PlusCircleIcon } from "lucide-react";

const Page = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  const [deliveryAddress, setDeliveryAddress] = React.useState<IAddress | null>(null);

  return (
    <div className="max-w-laptop mx-auto px-2 tablet:py-5">
      <h1 className="text-2xl font-semibold text-light-1">Checkout</h1>

      <div className="max-w-tablet mx-auto mt-4">
        {/* <Stepper activeStep={activeStep} /> */}

        {activeStep === 1 && <AddressForm selectedAddress={deliveryAddress} cb={setDeliveryAddress} />}
        {activeStep === 2 && <p className="text-muted-foreground mt-2 text-xs">Payment form</p>}
        {activeStep === 3 && <p className="text-muted-foreground mt-2 text-xs">Summary</p>}

        <Button onClick={() => setActiveStep(activeStep + 1)} className="mt-10" disabled={!deliveryAddress}>
          Next
        </Button>
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

  console.log(user?.addresses);

  if (!userLoading && !user) return null;
  return (
    <div>
      <p className="font-semibold py-4">Delivery address</p>

      {userLoading && <div>Loading...</div>}
      {user?.addresses.map((address) => (
        <div
          id={"shipping" + address.id}
          className="hover:bg-accent flex items-center gap-3 cursor-pointer p-5 relative"
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
            <p className="font-semibold absolute top-0 right-0 p-1 bg-[--c1] m-1 rounded">{address.residenceType}</p>
          </Label>
        </div>
      ))}

      <div className="hover:bg-accent flex items-center gap-3 cursor-pointer p-5">
        <p className="w-full flex items-center gap-3">
          <PlusCircle /> Add new Address
        </p>
      </div>
    </div>
  );
};

export default Page;
