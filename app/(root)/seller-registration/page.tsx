// export const metadata = {
//   title: "Become a Seller | Silkyester",
//   alternates: {
//     canonical: "https://www.silkyester.com/seller-registration",
//   },
// };

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  storeName: z.string().min(2, "Store name is required"),
  businessAddress: z.string().min(5, "Business address is required"),
  businessType: z.enum(["individual", "company", "wholesaler", "manufacturer"]),
  productCategories: z.array(z.string()).nonempty("Select at least one category"),
  otherCategory: z.string().optional(),
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST number"),
  businessDocument: z.instanceof(File).optional(),
});

export default function SellerRegistration() {
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productCategories: [],
      otherCategory: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      if (values.businessDocument) {
        const fileSize = values.businessDocument?.size || 0;
        const fileSizeInMB = fileSize / (1024 * 1024);

        if (fileSizeInMB > 5) {
          toast({
            title: "Error",
            description: "File size must be less than 5MB",
          });
          return;
        }
      }

      const formData = new FormData();

      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("storeName", values.storeName);
      formData.append("businessAddress", values.businessAddress);
      formData.append("businessType", values.businessType);
      formData.append("productCategories", JSON.stringify(values.productCategories));
      formData.append("gstNumber", values.gstNumber);
      if (values.otherCategory) {
        formData.append("otherCategory", values.otherCategory);
      }
      if (values.businessDocument) {
        formData.append("businessDocument", values.businessDocument);
      }

      const response = await fetch("/api/seller-registration", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.ok) {
        toast({
          title: "Form submitted successfully",
          description: "We will get back to you soon.",
        });
        form.reset({
          fullName: "",
          email: "",
          phone: "",
          storeName: "",
          businessAddress: "",
          businessType: undefined,
          productCategories: [],
          otherCategory: "",
          gstNumber: "",
          businessDocument: undefined,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the form.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Become a Seller on Silkyester</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow">
            {/* Personal Information */}
            <div className="space-y-4 border-b pb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Business Information */}
            <div className="space-y-4 border-b pb-6">
              <h2 className="text-xl font-semibold">Business Information</h2>
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store/Brand Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Fashion Store" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Business Street, City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">Individual Seller</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="wholesaler">Wholesaler</SelectItem>
                        <SelectItem value="manufacturer">Manufacturer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Product Category */}
            <div className="space-y-4 border-b pb-6">
              <h2 className="text-xl font-semibold">Product Category</h2>
              <FormField
                control={form.control}
                name="productCategories"
                render={() => (
                  <FormItem>
                    <div className="space-y-2">
                      {["men", "women", "accessories", "other"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={form.watch("productCategories").includes(category)}
                            onCheckedChange={(checked) => {
                              const currentCategories = form.getValues("productCategories");
                              const newCategories = checked
                                ? [...currentCategories, category]
                                : currentCategories.filter((c) => c !== category);
                              form.setValue("productCategories", newCategories as any);
                            }}
                          />
                          <Label htmlFor={category} className="capitalize">
                            {category === "men"
                              ? "Men's Clothing"
                              : category === "women"
                              ? "Women's Clothing"
                              : category === "accessories"
                              ? "Accessories"
                              : "Others"}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("productCategories").includes("other") && (
                <FormField
                  control={form.control}
                  name="otherCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Specify other category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* GST & Document Upload */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="gstNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter GSTIN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessDocument"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Business Document (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        ref={fileInputRef}
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full bg-[--c2] hover:bg-[--c3]" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
