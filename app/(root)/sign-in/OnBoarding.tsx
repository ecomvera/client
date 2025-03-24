"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeftIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState } from "react";
import { IoFemaleOutline, IoLockClosedOutline, IoMailOutline, IoMaleOutline, IoTransgenderOutline } from "react-icons/io5";
import { useUserStore } from "@/stores/user";
import { useDataStore } from "@/stores/data";
import { useRouter, useSearchParams } from "next/navigation";

const OnBoarding = ({
  email,
  setCurrentState,
}: {
  email: string;
  setCurrentState: Dispatch<SetStateAction<"SignIn" | "ForgotPassword" | "OnBoarding">>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setToken } = useUserStore();
  const { cart, wishlist, setCart, setWishlist } = useDataStore();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      return toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/onboarding", {
        method: "POST",
        body: JSON.stringify({ name, email, password, gender }),
      }).then((data) => data.json());

      if (!res.ok) {
        toast({
          title: "Error",
          description: res.error || "Something went wrong",
          variant: "destructive",
        });
        return;
      }

      setUser(res.data.user);

      if (res.data.user.cart.length > 0) {
        toast({
          title: "Success",
          description: "Your cart has been updated successfully",
          variant: "success",
        });
      }
      const updatedCart = [...cart, ...res.data.user.cart];
      const updatedWishlist = [...wishlist, ...res.data.user.wishlist];
      setCart(updatedCart);
      setWishlist(updatedWishlist);

      setToken({ access: res.data.accessToken, refresh: res.data.refreshToken });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      const src = searchParams.get("src");
      if (src) return router.replace(src);
      router.replace("/");
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <ArrowLeftIcon className="w-5 h-5 cursor-pointer" onClick={() => setCurrentState("SignIn")} />
        <h1 className="text-lg font-bold">Create Account</h1>
      </div>
      <p className="text-sm">Please provide the following information to create your account.</p>

      <div className="space-y-4 mt-5">
        <div>
          <span className="text-sm font-semibold">Name</span>
          <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
            <span className="text-sm font-semibold ml-1">
              <PersonIcon className="w-5 h-5" />
            </span>
            <Input
              placeholder="Enter Your Full Name"
              className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              autoComplete="name"
            />
          </div>
        </div>

        <div>
          <span className="text-sm font-semibold">Email</span>
          <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
            <span className="text-sm font-semibold ml-1">
              <IoMailOutline className="w-5 h-5" />
            </span>
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
              value={email}
              disabled
              name="email"
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <span className="text-sm font-semibold">Password</span>
          <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
            <span className="text-sm font-semibold ml-1">
              <IoLockClosedOutline className="w-5 h-5" />
            </span>
            <Input
              type="password"
              placeholder="Create Password"
              className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              autoComplete="new-password"
            />
          </div>
        </div>

        <div>
          <span className="text-sm font-semibold">Confirm Password</span>
          <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
            <span className="text-sm font-semibold ml-1">
              <IoLockClosedOutline className="w-5 h-5" />
            </span>
            <Input
              type="password"
              placeholder="Confirm Password"
              className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              autoComplete="new-password"
            />
          </div>
        </div>

        <div>
          <span className="text-sm font-semibold">Gender</span>
          <div className="flex gap-3">
            <div
              className={`border border-light-1 rounded-md p-1 flex items-center w-full h-10 cursor-pointer ${
                gender === "Male" && "bg-primary text-background"
              }`}
              onClick={() => setGender("Male")}
            >
              <span className="flex gap-5 text-sm font-semibold">
                <IoMaleOutline className="w-5 h-5" /> <span>Male</span>
              </span>
            </div>
            <div
              className={`border border-light-1 rounded-md p-1 flex items-center w-full h-10 cursor-pointer ${
                gender === "Female" && "bg-primary text-background"
              }`}
              onClick={() => setGender("Female")}
            >
              <span className="flex gap-5 text-sm font-semibold">
                <IoFemaleOutline className="w-5 h-5" /> <span>Female</span>
              </span>
            </div>
            <div
              className={`border border-light-1 rounded-md p-1 flex items-center w-full h-10 cursor-pointer ${
                gender === "Other" && "bg-primary text-background"
              }`}
              onClick={() => setGender("Other")}
            >
              <span className="flex gap-5 text-sm font-semibold">
                <IoTransgenderOutline className="w-5 h-5" /> <span>Other</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button
        disabled={!name || !password || !confirmPassword || !gender || isLoading || password !== confirmPassword}
        className="text-base uppercase font-semibold mt-10 bg-[--c2] hover:bg-[--c3] text-background"
        onClick={handleSubmit}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="border-[0.5px] border-light-3 my-6" />

      <p className="text-sm text-light-1 text-center">
        By creating an account or signing in, you agree with <br className="hidden mobile:block" /> our{" "}
        <Link href="/terms-and-conditions" className="text-blue-800 font-semibold">
          Terms and Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-blue-800 font-semibold">
          Privacy Policy
        </Link>
      </p>
    </>
  );
};

export default OnBoarding;
