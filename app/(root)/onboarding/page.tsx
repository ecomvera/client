"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoFemaleOutline, IoLockClosedOutline, IoMailOutline, IoMaleOutline, IoTransgenderOutline } from "react-icons/io5";
import { useUserStore } from "@/stores/user";
import { useDataStore } from "@/stores/data";
import { useRouter, useSearchParams } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Image from "next/image";
import { Eye } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setToken } = useUserStore();
  const { cart, wishlist, setCart, setWishlist } = useDataStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email verification
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  // Phone verification (if coming from phone flow)
  const [phoneOtp, setPhoneOtp] = useState(searchParams.get("otp") || "");
  const [phoneVerified, setPhoneVerified] = useState(!!searchParams.get("otp"));

  // Validate email format
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Send email verification code
  const sendEmailVerification = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setSendingCode(true);
      const res = await fetch("/api/auth/send-email-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
      }).then((data) => data.json());

      if (!res.ok) {
        toast({
          title: "Error",
          description: res.error || "Something went wrong",
          variant: "destructive",
        });
        setSendingCode(false);
        return;
      }

      setEmailVerificationSent(true);

      // For development purposes only - in production, this would be sent via email
      toast({
        title: "Success",
        description: `Verification code sent to ${email}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setSendingCode(false);
    }
  };

  // Verify email code
  const verifyEmailCode = async () => {
    try {
      setVerifyingEmail(true);
      const res = await fetch("/api/auth/verify-email-code", {
        method: "POST",
        body: JSON.stringify({ email, code: emailVerificationCode }),
      }).then((data) => data.json());

      if (!res.ok) {
        toast({
          title: "Error",
          description: res.error || "Invalid verification code",
          variant: "destructive",
        });
        setVerifyingEmail(false);
        return;
      }

      setEmailVerified(true);
      toast({
        title: "Success",
        description: "Email verified successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setVerifyingEmail(false);
    }
  };

  // Complete onboarding
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      return toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
    }

    if (!emailVerified && !phoneVerified) {
      return toast({
        title: "Error",
        description: "Please verify your email or phone",
        variant: "destructive",
      });
    }

    if (phone && phone.length !== 10) {
      return toast({
        title: "Error",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
    }

    try {
      setIsLoading(true);

      const payload: any = {
        name,
        gender,
        password,
      };

      // Add verified contact method
      if (emailVerified) {
        payload.email = email;
      }

      if (phone) {
        payload.phone = phone;
      }

      if (phoneVerified) {
        payload.otp = phoneOtp;
      }

      const res = await fetch("/api/auth/onboarding", {
        method: "POST",
        body: JSON.stringify(payload),
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

  // Send email verification when component mounts if email is provided
  useEffect(() => {
    if (email && !emailVerificationSent && !emailVerified) {
      sendEmailVerification();
    }
  }, []);

  return (
    <div className="max-w-desktop ">
      <div className="flex flex-col tablet:flex-row  h-full">
        <div className="w-full h-full tablet:w-1/2 p-2"></div>

        <div className="bg-background rounded-t-xl flex flex-col justify-center h-max w-full tablet:max-w-[450px] m-auto p-2 tablet:p-5 py-8 mb-10">
          <Image
            src="/assets/logo_200x200.png"
            alt="logo"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-[120px] object-cover text-center mx-auto"
          />

          <div className="flex items-center gap-3 mt-4">
            <h1 className="text-lg font-bold">Complete Your Profile</h1>
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

            {email && (
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

                {!emailVerified && (
                  <div className="mt-2">
                    <span className="text-sm font-semibold">Verification Code</span>
                    <div className="flex gap-2">
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        onChange={(value) => setEmailVerificationCode(value)}
                        value={emailVerificationCode}
                      >
                        <InputOTPGroup className="rounded-none border-none">
                          <InputOTPSlot index={0} className="rounded-md border border-primary" />
                          <InputOTPSeparator />
                          <InputOTPSlot index={1} className="rounded-md border border-primary" />
                          <InputOTPSeparator />
                          <InputOTPSlot index={2} className="rounded-md border border-primary" />
                          <InputOTPSeparator />
                          <InputOTPSlot index={3} className="rounded-md border border-primary" />
                          <InputOTPSeparator />
                          <InputOTPSlot index={4} className="rounded-md border border-primary" />
                          <InputOTPSeparator />
                          <InputOTPSlot index={5} className="rounded-md border border-primary" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <button
                        className="text-blue-800 font-semibold text-sm"
                        onClick={sendEmailVerification}
                        disabled={verifyingEmail}
                      >
                        Resend Code
                      </button>
                      <Button
                        size="sm"
                        disabled={emailVerificationCode.length !== 6 || verifyingEmail || sendingCode}
                        onClick={verifyEmailCode}
                      >
                        {/* {sendingCode && emailVerificationSent ? "Resening..." : sendingCode && "Sending..."}

                        {!sendingCode && !emailVerificationSent && "Send Code"}
                        {!sendingCode && emailVerificationSent && !verifyingEmail && "Verify Code"}

                        {verifyingEmail && "Verifying..."} */}

                        {sendingCode
                          ? emailVerificationSent
                            ? "Resending..."
                            : "Sending..."
                          : verifyingEmail
                          ? "Verifying..."
                          : emailVerificationSent
                          ? "Verify Code"
                          : "Send Code"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* {!phone && ( */}
            <div>
              <span className="text-sm font-semibold">Phone</span>
              <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
                <span className="text-sm font-semibold">+91</span>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter Mobile Number"
                  className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
                  value={phone}
                  onChange={(e) => {
                    if (e.target.value.length > 10) return;
                    setPhone(e.target.value.replace(/[^0-9]/g, ""));
                  }}
                  maxLength={10}
                />
              </div>
            </div>
            {/* )} */}

            {/* {phone && (
              <div>
                <span className="text-sm font-semibold">Phone</span>
                <div className="border border-light-1 rounded-md p-1 flex items-center w-full">
                  <span className="text-sm font-semibold">+91</span>
                  <Input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
                    value={phone}
                    disabled
                  />
                </div>
              </div>
            )} */}

            <div>
              <span className="text-sm font-semibold">Password</span>
              <div className="border border-light-1 rounded-md p-1 gap-1 flex items-center w-full">
                <span className="text-sm font-semibold">
                  <IoLockClosedOutline className="w-5 h-5" />
                </span>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  autoComplete="new-password webauthn"
                />
                <Eye onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold">Confirm Password</span>
              <div className="border border-light-1 rounded-md p-1 gap-1 flex items-center w-full">
                <span className="text-sm font-semibold">
                  <IoLockClosedOutline className="w-5 h-5" />
                </span>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="border-none focus-visible:ring-transparent shadow-none text-base font-semibold w-full ml-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password webauthn"
                />
                <Eye onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />
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
            </div>
          </div>

          <Button
            disabled={
              !name ||
              !password ||
              !confirmPassword ||
              !gender ||
              isLoading ||
              password !== confirmPassword ||
              (!emailVerified && !phoneVerified) ||
              !phone
            }
            className="text-base uppercase font-semibold mt-10 bg-[--c2] hover:bg-[--c3] text-background"
            onClick={handleSubmit}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="border-[0.5px] border-light-3 my-6" />

          <p className="text-sm text-light-1 text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-800 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
