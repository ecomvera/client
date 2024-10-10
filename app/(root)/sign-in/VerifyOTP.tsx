import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/user";
import { useDataStore } from "@/stores/data";

const VerifyOTP = ({
  phone,
  setCurrentState,
}: {
  phone: string;
  setCurrentState: Dispatch<SetStateAction<"SignIn" | "VerifyOTP" | "OnBoarding">>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setToken } = useUserStore();
  const { setCart, setWishlist } = useDataStore();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
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

      setUser(res.data.user);
      setCart(res.data.user.cart);
      setWishlist(res.data.user.wishlist);
      setToken({ access: res.data.accessToken, refresh: res.data.refreshToken });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("cart", JSON.stringify(res.data.user.cart));
      localStorage.setItem("wishlist", JSON.stringify(res.data.user.wishlist));

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      setIsLoading(false);
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
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <ArrowLeftIcon className="w-5 h-5 cursor-pointer" onClick={() => setCurrentState("SignIn")} />
        <h1 className="text-lg font-bold">Verify OTP</h1>
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

      <Button
        disabled={phone.length !== 10 || isLoading}
        className="text-base uppercase font-semibold mt-5"
        onClick={handleSubmit}
      >
        {isLoading ? "Verifying..." : "Continue"}
      </Button>

      <div className="border-[0.5px] border-light-3 my-6" />

      <p className="text-sm text-light-1 text-center">
        By creating an account or signing in, you agree with <br className="hidden mobile:block" /> our{" "}
        <Link href="#" className="text-blue-800 font-semibold">
          Terms and Conditions
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-blue-800 font-semibold">
          Privacy Policy
        </Link>
      </p>
    </>
  );
};

export default VerifyOTP;
