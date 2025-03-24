"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!token || !email) {
    return (
      <div className="max-w-desktop mx-auto h-[calc(100vh-50px)] tablet:h-[calc(100vh-100px)]">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-2xl font-bold">Invalid Reset Link</h1>
          <p className="text-sm mt-2">The password reset link is invalid or has expired.</p>
          <Button className="mt-5" onClick={() => router.push("/sign-in")}>
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

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
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, email, password }),
      }).then((data) => data.json());

      if (!res.ok) {
        toast({
          title: "Error",
          description: res.error || "Something went wrong",
          variant: "destructive",
        });
        return;
      }

      setIsSuccess(true);
      toast({
        title: "Success",
        description: "Your password has been reset successfully",
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

  return (
    <div className="max-w-desktop mx-auto h-[calc(100vh-50px)] tablet:h-[calc(100vh-100px)]">
      <div className="flex flex-col tablet:flex-row overflow-hidden h-full">
        <div className="w-full h-full tablet:w-1/2 p-2"></div>

        <div className="bg-background rounded-t-xl flex flex-col justify-center h-max w-full tablet:max-w-[450px] m-auto p-2 tablet:p-5 py-8">
          <Image
            src="/assets/logo_200x200.png"
            alt="logo"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-[120px] object-cover text-center mx-auto"
          />

          {!isSuccess ? (
            <>
              <h1 className="text-lg font-bold mt-5">Reset Your Password</h1>
              <p className="text-sm">Create a new password for your account</p>

              <div className="space-y-4 mt-5">
                <div>
                  <span className="text-sm font-semibold">New Password</span>
                  <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
                    <span className="text-sm font-semibold ml-1">
                      <IoLockClosedOutline className="w-5 h-5" />
                    </span>
                    <Input
                      type="password"
                      placeholder="Enter New Password"
                      className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      placeholder="Confirm New Password"
                      className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button
                disabled={!password || !confirmPassword || password !== confirmPassword || isLoading}
                className="text-base uppercase font-semibold mt-10 bg-[--c2] hover:bg-[--c3] text-background"
                onClick={handleSubmit}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </>
          ) : (
            <div className="text-center mt-5 space-y-4">
              <h1 className="text-lg font-bold">Password Reset Successful</h1>
              <p className="text-sm">
                Your password has been reset successfully. You can now sign in with your new password.
              </p>
              <Button className="text-base mt-5" onClick={() => router.push("/sign-in")}>
                Sign In
              </Button>
            </div>
          )}

          <div className="border-[0.5px] border-light-3 my-6" />

          <p className="text-sm text-light-1 text-center">
            Remember your password?{" "}
            <Link href="/sign-in" className="text-blue-800 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
