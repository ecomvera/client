"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useUserStore } from "@/stores/user";
import { useDataStore } from "@/stores/data";

const PhoneSignIn = ({
  phone,
  setPhone,
  setCurrentState,
}: {
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  setCurrentState: Dispatch<SetStateAction<"SignIn" | "ForgotPassword" | "PhoneSignIn">>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setToken } = useUserStore();
  const { cart, wishlist, setCart, setWishlist } = useDataStore();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });

      console.log(res);

      if (!res.ok) {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
        return;
      }

      const resJson = await res.json();

      console.log(resJson);

      setIsLoading(false);

      if (!resJson.ok) {
        return toast({
          title: "Error",
          description: resJson.error || "Something went wrong",
          variant: "destructive",
        });
      }

      setOtpSent(true);

      // For development purposes only - in production, this would be sent via SMS
      toast({
        title: "OTP Sent",
        description: `Your OTP is: ${resJson.data.otp}`,
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const verifyOTP = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phone, otp }),
      }).then((data) => data.json());

      if (!res.ok) {
        setIsLoading(false);
        toast({
          title: "Error",
          description: res.error || "Something went wrong",
          variant: "destructive",
        });
        return;
      }

      // If user is not onboarded, redirect to onboarding
      if (!res.data.user.onBoarded) {
        router.push(`/onboarding?phone=${encodeURIComponent(phone)}&otp=${encodeURIComponent(otp)}`);
        return;
      }

      // Set user data and tokens
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
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // Send OTP when component mounts
  React.useEffect(() => {
    if (phone && !otpSent) {
      sendOTP();
    }
  }, [phone]);

  return (
    <>
      <div className="flex items-center gap-3">
        <ArrowLeftIcon className="w-5 h-5 cursor-pointer" onClick={() => setCurrentState("SignIn")} />
        <h1 className="text-lg font-bold">Phone Verification</h1>
      </div>

      <p className="text-sm mb-5">
        Enter the OTP sent to {phone}{" "}
        <span className="text-blue-800 font-semibold cursor-pointer" onClick={() => setCurrentState("SignIn")}>
          Change
        </span>
      </p>

      <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={(value) => setOtp(value)}>
        <InputOTPGroup className="rounded-none border-none">
          <InputOTPSlot index={0} className="rounded-md border border-primary" />
          <InputOTPSeparator />
          <InputOTPSlot index={1} className="rounded-md border border-primary" />
          <InputOTPSeparator />
          <InputOTPSlot index={2} className="rounded-md border border-primary" />
          <InputOTPSeparator />
          <InputOTPSlot index={3} className="rounded-md border border-primary" />
        </InputOTPGroup>
      </InputOTP>

      <div className="flex justify-between items-center mt-4">
        <button className="text-blue-800 font-semibold text-sm" onClick={sendOTP} disabled={isLoading}>
          Resend OTP
        </button>
        <span className="text-sm text-muted-foreground">Valid for 10 minutes</span>
      </div>

      <Button
        disabled={otp.length !== 4 || isLoading}
        className="text-base uppercase font-semibold mt-5 w-full bg-[--c2] hover:bg-[--c2] text-white"
        onClick={verifyOTP}
      >
        {isLoading ? "Verifying..." : "Verify & Continue"}
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

export default PhoneSignIn;
