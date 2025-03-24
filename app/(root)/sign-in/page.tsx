"use client";

import { useEffect, useState } from "react";
import SignInForm from "./SignInForm";
import ForgotPassword from "./ForgotPassword";
import OnBoarding from "./OnBoarding";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";

const Page = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [currentState, setCurrentState] = useState<"SignIn" | "ForgotPassword" | "OnBoarding">("SignIn");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isLoading && user) router.replace(params.get("src") || "/");
  }, [isLoading, user, router, params]);

  return (
    <div className="max-w-desktop mx-auto h-[calc(100vh-50px)] tablet:h-[calc(100vh-100px)]">
      <div className="flex flex-col tablet:flex-row overflow-hidden h-full">
        <div className="w-full h-full tablet:w-1/2 p-2"></div>

        <div className="bg-background rounded-t-xl flex flex-col justify-center h-max w-full tablet:max-w-[450px] m-auto p-2 tablet:p-5 py-8">
          <Image
            src="/assets/logo_200x200.png"
            alt="signin"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-[120px] object-cover text-center mx-auto"
          />

          {currentState === "SignIn" && <SignInForm setEmail={setEmail} email={email} setCurrentState={setCurrentState} />}
          {currentState === "ForgotPassword" && <ForgotPassword email={email} setCurrentState={setCurrentState} />}
          {currentState === "OnBoarding" && <OnBoarding email={email} setCurrentState={setCurrentState} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
