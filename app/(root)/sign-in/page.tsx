"use client";

import { useEffect, useState } from "react";
import SignInForm from "./SignInForm";
import VerifyOTP from "./VerifyOTP";
import OnBoarding from "./OnBoarding";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { toast } from "@/components/ui/use-toast";

const Page = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [currentState, setCurrentState] = useState<"SignIn" | "VerifyOTP" | "OnBoarding">("SignIn");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!isLoading && user) router.replace(params.get("src") || "/");
  }, []);
  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="flex flex-col tablet:flex-row overflow-hidden h-full">
        <div className="w-full h-full tablet:w-1/2 p-2"></div>

        <div className="hidden tablet:block border-[0.1px] border-light-3" />

        <div className="fixed tablet:relative bottom-0 left-0 right-0 bg-background rounded-t-xl flex flex-col justify-center h-max w-full tablet:max-w-[450px] m-auto p-2 tablet:p-5 py-8">
          {currentState === "SignIn" && <SignInForm setPhone={setPhone} phone={phone} setCurrentState={setCurrentState} />}
          {currentState === "VerifyOTP" && <VerifyOTP phone={phone} setCurrentState={setCurrentState} />}
          {currentState === "OnBoarding" && <OnBoarding phone={phone} setCurrentState={setCurrentState} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
