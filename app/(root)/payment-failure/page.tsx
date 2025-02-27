import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentFailure() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      <XCircle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Failed</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! Something went wrong with your transaction. Please try again or contact support.
      </p>
      <Link href={"/myaccount/orders"}>
        <Button className="mt-6 px-6 py-2 text-lg font-semibold">View My Orders</Button>
      </Link>
    </div>
  );
}
