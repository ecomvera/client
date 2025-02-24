import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const SignInForm = ({
  phone,
  setPhone,
  setCurrentState,
}: {
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  setCurrentState: Dispatch<SetStateAction<"SignIn" | "VerifyOTP" | "OnBoarding">>;
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ phone }),
      }).then((data) => data.json());
      setIsLoading(false);

      if (!res.ok) {
        return toast({
          title: "Error",
          description: res.error || "Something went wrong",
          variant: "destructive",
        });
      }

      toast({
        title: res.data.otp,
      });

      if (!res.data.user || !res.data.user.onBoarded) {
        return setCurrentState("OnBoarding");
      }

      setCurrentState("VerifyOTP");
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if ((phone.length > 0 && phone.length < 10) || phone.length > 10) {
      setError("Phone number should be of 10 digits");
    } else {
      setError("");
    }
  }, [phone]);

  return (
    <>
      <h1 className="text-lg font-bold">Sign In / Sign Up</h1>
      <p className="text-sm">Join our community & get exclusive offers</p>

      <div className="border border-light-1 rounded-md p-1 flex items-center w-full  mt-10">
        <span className="text-sm font-semibold">+91</span>
        <Input
          ref={inputRef}
          type="tel"
          id="mobile"
          placeholder="Enter Mobile Number"
          className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
          value={phone}
          onFocus={handleFocus}
          onChange={(e) => {
            if (e.target.value.length > 10) return;
            setPhone(e.target.value.replace(/[^0-9]/g, ""));
          }}
        />
      </div>
      <p className="text-sm text-red-600">{error}</p>

      <Button
        disabled={phone.length !== 10 || isLoading}
        className="text-base uppercase font-semibold mt-5 bg-[--c2] hover:bg-[--c2] text-white"
        onClick={handleSubmit}
      >
        {isLoading ? "Signing in..." : "Continue"}
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

export default SignInForm;
