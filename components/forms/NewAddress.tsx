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
import { useRouter, useSearchParams } from "next/navigation";
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

const NewAddress = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { token } = useToken();
  const { addAddress } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [residenceType, setResidenceType] = useState("");

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: addressData,
  });

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
        body: JSON.stringify({ ...values, residenceType }),
      }).then((res) => res.json());

      if (!res.ok) {
        return toast({
          title: "Error",
          description: "Failed to add address",
          variant: "destructive",
        });
      }

      toast({
        title: "Success",
        description: "Address added successfully",
      });
      addAddress(res.data);
      params.get("src") ? router.push(`${params.get("src") as string}?address=${res.data.id}`) : router.back();
      form.reset();
    } catch (error) {
      console.log(error);
      return toast({
        title: "Error",
        description: "Failed to add address",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
        <InputField control={form.control} name="email" label="Email" placeholder="Enter your email" />
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
          Save Address
        </Button>
      </form>
    </Form>
  );
};

export default NewAddress;
