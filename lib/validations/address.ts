"use client";

import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(3, { message: "Minimum 3 characters." }),
  phone: z.string().min(10, { message: "Minimum 10 characters." }),
  email: z.string().email({ message: "Invalid email." }),
  line1: z.string().min(3, { message: "Minimum 3 characters." }),
  line2: z.string().min(3, { message: "Minimum 3 characters." }),
  landmark: z.string().min(3, { message: "Minimum 3 characters." }),
  city: z.string().min(3, { message: "Minimum 3 characters." }),
  state: z.string().min(3, { message: "Minimum 3 characters." }),
  country: z.string().min(3, { message: "Minimum 3 characters." }),
  pincode: z.string().min(6, { message: "Minimum 6 characters." }),
});
