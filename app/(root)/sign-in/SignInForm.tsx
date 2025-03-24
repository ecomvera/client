"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { IoMailOutline, IoLockClosedOutline, IoArrowForward } from "react-icons/io5";
import { useUserStore } from "@/stores/user";
import { useDataStore } from "@/stores/data";

const SignInForm = ({
  email,
  setEmail,
  setCurrentState,
}: {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setCurrentState: Dispatch<SetStateAction<"SignIn" | "ForgotPassword" | "OnBoarding">>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setToken } = useUserStore();
  const { cart, wishlist, setCart, setWishlist } = useDataStore();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkEmail = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        body: JSON.stringify({ email }),
      }).then((data) => data.json());

      setIsLoading(false);

      if (res.exists) {
        setEmailChecked(true);
        setShowPassword(true);
      } else {
        // Email doesn't exist, redirect to onboarding
        setCurrentState("OnBoarding");
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }).then((data) => data.json());

      setIsLoading(false);

      if (!res.ok) {
        return toast({
          title: "Error",
          description: res.error || "Invalid email or password",
          variant: "destructive",
        });
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
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPassword) {
      checkEmail();
    } else {
      handleLogin();
    }
  };

  return (
    <>
      <h1 className="text-lg font-bold">Sign In / Sign Up</h1>
      <p className="text-sm">Join our community & get exclusive offers</p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-10">
        <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
          <span className="text-sm font-semibold ml-1">
            <IoMailOutline className="w-5 h-5" />
          </span>
          <Input
            type="email"
            id="email"
            placeholder="Enter Email Address"
            className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={showPassword}
            autoComplete="email"
          />
          {!showPassword && (
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              disabled={!validateEmail(email) || isLoading}
              className="h-8 w-8"
            >
              <IoArrowForward className="h-4 w-4" />
            </Button>
          )}
        </div>

        {showPassword && (
          <>
            <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
              <span className="text-sm font-semibold ml-1">
                <IoLockClosedOutline className="w-5 h-5" />
              </span>
              <Input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-blue-800 font-semibold text-sm"
                onClick={() => setCurrentState("ForgotPassword")}
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={!password || isLoading}
              className="text-base uppercase font-semibold w-full bg-[--c2] hover:bg-[--c2] text-white"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </>
        )}

        {!showPassword && (
          <Button
            type="submit"
            disabled={!validateEmail(email) || isLoading}
            className="text-base uppercase font-semibold w-full bg-[--c2] hover:bg-[--c2] text-white"
          >
            {isLoading ? "Checking..." : "Continue"}
          </Button>
        )}
      </form>

      {showPassword && (
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-800 font-semibold text-sm"
            onClick={() => {
              setShowPassword(false);
              setEmailChecked(false);
              setPassword("");
            }}
          >
            Use a different email
          </button>
        </div>
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

export default SignInForm;
