"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RefreshCw, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MdBrokenImage } from "react-icons/md";

export default function RetryPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [countdown, setCountdown] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isRedirecting) {
      // Update progress bar
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + (100 / 3) * 0.1; // Smooth progress over 3 seconds
        });
      }, 100);

      // Update countdown
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // Simulate opening payment provider
            simulatePaymentProcess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(countdownInterval);
      };
    }
  }, [isRedirecting, router]);

  const simulatePaymentProcess = () => {
    setIsRedirecting(false);

    // Simulate payment processing (normally this would open a payment provider)
    setTimeout(() => {
      router.push("/myaccount/orders");
    }, 1000); // Short delay to simulate payment provider opening
  };

  const handleCancelRetry = () => {
    router.push("/myaccount/orders");
  };

  if (!orderId) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <MdBrokenImage className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl">Something went wrong</CardTitle>
            <CardDescription>
              {isRedirecting
                ? `Redirecting to payment provider in ${countdown} seconds...`
                : "Please complete your payment in the payment window"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={handleCancelRetry}>
              Go To Orders
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isRedirecting ? (
              <RefreshCw className="h-16 w-16 text-primary animate-spin" />
            ) : (
              <CreditCard className="h-16 w-16 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl">{isRedirecting ? "Preparing Payment" : "Opening Payment Provider"}</CardTitle>
          <CardDescription>
            {isRedirecting
              ? `Redirecting to payment provider in ${countdown} seconds...`
              : "Please complete your payment in the payment window"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isRedirecting && (
            <>
              <Progress value={progress} className="h-2 w-full" />
              <div className="rounded-lg bg-muted p-4">
                <div className="text-sm text-muted-foreground mb-2">Order ID</div>
                <div className="font-medium">#{orderId}</div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={handleCancelRetry}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
