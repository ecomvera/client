import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeftIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { IoFemaleOutline, IoMail, IoMailOutline, IoMaleOutline, IoTransgenderOutline } from "react-icons/io5";
import { useUserStore } from "@/stores/user";
import { useDataStore } from "@/stores/data";
import { useRouter, useSearchParams } from "next/navigation";

const OnBoarding = ({
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/onboarding", {
        method: "POST",
        body: JSON.stringify({ phone, name, email, otp, gender }),
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
      if (src) router.replace(src);
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
        <h1 className="text-lg font-bold">OnBoarding...</h1>
      </div>
      <p className="text-sm">Please complete your profile.</p>

      <span className="text-sm font-semibold mt-5">Name</span>
      <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
        <span className="text-sm font-semibold ml-1">
          <PersonIcon className="w-5 h-5" />
        </span>
        <Input
          placeholder="Enter Your Full Name"
          className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <span className="text-sm font-semibold mt-5">Phone</span>
      <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
        <span className="text-sm font-semibold">+91</span>
        <Input
          placeholder="Enter Mobile Number"
          className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
          value={phone}
          disabled
        />
      </div>
      <span className="text-sm font-semibold mt-5">Email</span>
      <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
        <span className="text-sm font-semibold ml-1">
          <IoMailOutline className="w-5 h-5" />
        </span>
        <Input
          type="email"
          placeholder="Enter Your Email"
          className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <span className="text-sm font-semibold mt-5">Gender</span>
      <div className="flex gap-3">
        <div
          className={`border border-light-1 rounded-md p-1 flex items-center w-full h-10 cursor-pointer ${
            gender === "Male" && "bg-primary text-background"
          }`}
          onClick={() => setGender("Male")}
        >
          <span className="flex gap-5 text-sm font-semibold ml-1">
            <IoMaleOutline className="w-5 h-5" /> <span>Male</span>
          </span>
        </div>
        <div
          className={`border border-light-1 rounded-md p-1 flex items-center w-full h-10 cursor-pointer ${
            gender === "Female" && "bg-primary text-background"
          }`}
          onClick={() => setGender("Female")}
        >
          <span className="flex gap-5 text-sm font-semibold ml-1">
            <IoFemaleOutline className="w-5 h-5" /> <span>Female</span>
          </span>
        </div>
        <div
          className={`border border-light-1 rounded-md p-1 flex items-center w-full h-10 cursor-pointer ${
            gender === "Other" && "bg-primary text-background"
          }`}
          onClick={() => setGender("Other")}
        >
          <span className="flex gap-5 text-sm font-semibold ml-1">
            <IoTransgenderOutline className="w-5 h-5" /> <span>Other</span>
          </span>
        </div>
      </div>

      <span className="text-sm font-semibold mt-5">OTP</span>
      <p className="text-sm mb-2">
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
        disabled={!name || !email || !gender || !otp || isLoading}
        className="text-base uppercase font-semibold mt-10"
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

export default OnBoarding;
