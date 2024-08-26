import { addressSchema } from "@/lib/validations/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { useAddressStore } from "@/stores/address";
import { useEffect, useRef } from "react";
// @ts-ignore
import { isEqual } from "lodash";

const AddressDetails = () => {
  const { addressData, setAddressData } = useAddressStore();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: addressData,
  });

  const formData = form.watch();
  const prevFormData = useRef(formData);

  function onSubmit(values: z.infer<typeof addressSchema>) {
    console.log(values);
  }

  useEffect(() => {
    if (!isEqual(formData, prevFormData.current)) {
      setAddressData(formData);
      prevFormData.current = formData;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
        <p className="text-lg font-semibold text-dark-3">Address Details</p>
        <div className="flex gap-4">
          <InputField control={form.control} name="name" label="Name" placeholder="Enter your name" />
          <InputField control={form.control} name="phone" label="Phone" type="tel" placeholder="0123456789" />
        </div>
        <InputField control={form.control} name="email" label="Email" type="email" placeholder="Enter your email" />
        <div className="flex gap-4">
          <InputField control={form.control} name="line1" label="Line 1" placeholder="eq. 1st floor | House No | Building" />
          <InputField control={form.control} name="line2" label="Line 2" placeholder="eq. Sector 1 | Road " />
        </div>
        <InputField
          control={form.control}
          name="landmark"
          label="Landmark"
          placeholder="eq. Behind Shiv Mandir | near Bank"
        />
        <div className="flex gap-4">
          <InputField control={form.control} name="city" label="City" placeholder="Enter your city" />
          <InputField control={form.control} name="state" label="State" placeholder="Enter your state" />
        </div>
        <div className="flex gap-4">
          <InputField control={form.control} name="country" label="Country" placeholder="Country" />
          <InputField control={form.control} name="pincode" label="Pincode" placeholder="Pincode" />
        </div>

        <Button type="submit" className="mt-6 w-fit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AddressDetails;
