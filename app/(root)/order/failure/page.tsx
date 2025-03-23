"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentMode = searchParams.get("paymentMode");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/myaccount/orders");
    }, 3000);

    const interval = setInterval(() => {
      if (countdown < 1) {
        clearInterval(interval);
        return;
      }
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Payment Failed</CardTitle>
          <CardDescription>We couldn't process your order. Please try again.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMode && (
            <div className="rounded-lg bg-muted p-4">
              <div className="text-sm text-muted-foreground mb-2">Payment Method</div>
              <div className="font-medium">{paymentMode}</div>
            </div>
          )}
          <p className="text-center text-sm text-muted-foreground">Redirecting to orders page in {countdown} seconds...</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" variant="default" onClick={() => {}} disabled>
            Try Again
          </Button>
          <Button className="w-full bg-[--c2] hover:bg-[--c3]" onClick={() => router.push("/myaccount/orders")}>
            View My Orders
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
