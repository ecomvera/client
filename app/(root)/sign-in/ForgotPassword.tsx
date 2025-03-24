"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState } from "react";
import { IoMailOutline } from "react-icons/io5";

const ForgotPassword = ({
  email,
  setCurrentState,
}: {
  email: string;
  setCurrentState: Dispatch<SetStateAction<"SignIn" | "ForgotPassword" | "PhoneSignIn">>;
}) => {
  const [resetEmail, setResetEmail] = useState(email);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: resetEmail }),
      }).then((data) => data.json());

      if (!res.ok) {
        setIsLoading(false);
        return toast({
          title: "Error",
          description: res.error || "Something went wrong",
          variant: "destructive",
        });
      }

      setResetSent(true);
      toast({
        title: "Success",
        description: "Password reset link has been sent to your email",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <ArrowLeftIcon className="w-5 h-5 cursor-pointer" onClick={() => setCurrentState("SignIn")} />
        <h1 className="text-lg font-bold">Forgot Password</h1>
      </div>

      {!resetSent ? (
        <>
          <p className="text-sm mb-5">Enter your email address and we'll send you a link to reset your password.</p>

          <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
            <span className="text-sm font-semibold ml-1">
              <IoMailOutline className="w-5 h-5" />
            </span>
            <Input
              type="email"
              placeholder="Enter Email Address"
              className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </div>

          <Button
            disabled={!validateEmail(resetEmail) || isLoading}
            className="text-base uppercase font-semibold mt-5 bg-[--c2] hover:bg-[--c2] text-white"
            onClick={handleSubmit}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </>
      ) : (
        <>
          <div className="text-center mt-5 space-y-4">
            <p className="text-sm">
              We've sent a password reset link to <span className="font-semibold">{resetEmail}</span>
            </p>
            <p className="text-sm">Please check your email and follow the instructions to reset your password.</p>
            <Button className="text-base mt-5" onClick={() => setCurrentState("SignIn")}>
              Back to Sign In
            </Button>
          </div>
        </>
      )}

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

export default ForgotPassword;
