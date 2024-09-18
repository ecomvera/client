"use client";

import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  phone: z.string().min(10, { message: "Invalid phone number" }).max(10, { message: "Invalid phone number" }),
  line1: z.string().min(3, { message: "required" }),
  line2: z.string().min(3, { message: "required" }),
  landmark: z.string().min(3, { message: "required" }),
  city: z.string().min(3, { message: "required" }),
  state: z.string().min(3, { message: "required" }),
  country: z.string().min(3, { message: "required" }),
  pincode: z.string().min(6, { message: "Minimum 6 characters." }),
});
