import { addressSchema } from "@/lib/validations/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { useAddressStore } from "@/stores/address";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import { isEqual } from "lodash";
import { IAddress } from "@/types";
import { useUser } from "@/hooks/useUser";
import { toast } from "../ui/use-toast";
import { useUserStore } from "@/stores/user";
import { useRouter } from "next/navigation";
import { useToken } from "@/hooks/useToken";

const addressData: IAddress = {
  name: "",
  phone: "",
  email: "",
  line1: "",
  line2: "",
  landmark: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
};

const UpdateAddress = ({ id }: { id: string }) => {
  const router = useRouter();
  const { user } = useUser();
  const { token } = useToken();
  const userAddress = user?.addresses?.find((address) => address.id === id);
  const { updateAddress } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [residenceType, setResidenceType] = useState(userAddress?.residenceType);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: userAddress || addressData,
  });

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    setIsLoading(true);

    const res = await fetch("/api/user/address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      body: JSON.stringify({ ...values, id, residenceType }),
    }).then((res) => res.json());

    if (!res.ok) {
      setIsLoading(false);
      return toast({
        title: "Error",
        description: "Failed to update address",
        variant: "destructive",
      });
    }

    setIsLoading(false);
    toast({
      title: "Success",
      description: "Address updated successfully",
    });
    updateAddress(res.data);
    router.replace("/myaccount/addresses");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
        <InputField control={form.control} name="name" label="Name" placeholder="Enter your name" />
        <InputField
          control={form.control}
          name="phone"
          label="Phone"
          type="tel"
          placeholder="0123456789"
          leftElement={<p>+91</p>}
        />
        <InputField
          control={form.control}
          name="line1"
          label="Flat no/Building, Street name"
          placeholder="eq. 1st floor | House No | Building"
        />
        <InputField control={form.control} name="line2" label="Area/Locality" placeholder="eq. Sector 1 | Road " />
        <InputField
          control={form.control}
          name="landmark"
          label="Landmark"
          placeholder="eq. Behind Shiv Mandir | near Bank"
        />
        <div className="flex gap-4 my-2">
          <InputField control={form.control} name="city" label="City" placeholder="Enter your city" />
          <InputField control={form.control} name="state" label="State" placeholder="Enter your state" />
        </div>
        <div className="flex gap-4">
          <InputField control={form.control} name="country" label="Country" placeholder="Country" disabled />
          <InputField control={form.control} name="pincode" label="Pin code" placeholder="Pincode" />
        </div>

        <div>Residence Type*</div>
        <div className="flex gap-4 mb-2">
          {["Home", "Office", "Other"].map((residence) => (
            <Button
              type="button"
              key={residence}
              variant={residenceType === residence ? "default" : "outline"}
              onClick={() => setResidenceType(residence)}
            >
              {residence}
            </Button>
          ))}
        </div>

        <Button
          type="submit"
          size={"lg"}
          variant="default"
          className="w-full md:text-lg"
          disabled={isLoading || Object.keys(form.formState.errors).length > 0 || !residenceType}
        >
          Update Address
        </Button>
      </form>
    </Form>
  );
};

export default UpdateAddress;
