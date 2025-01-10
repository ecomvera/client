"use client";

import { Button } from "@/components/ui/button";
import { makePayment } from "@/lib/razorpay";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const navigate = useRouter();
  const id = useSearchParams().get("id");
  const amount = useSearchParams().get("amount");

  const handlePayment = async () => {
    if (id && amount) {
      makePayment(id, parseInt(amount));
    } else {
      navigate.push("/");
    }
  };

  useEffect(() => {
    handlePayment();
  }, []);

  return (
    <div className="mx-auto h-96 flex flex-col items-center justify-center">
      <p>Complete your payment!</p>
      <Button onClick={handlePayment}>Retry</Button>
      <Button onClick={() => window.location.replace("/myaccount/orders")}>Go to Orders</Button>
    </div>
  );
};

export default Page;
