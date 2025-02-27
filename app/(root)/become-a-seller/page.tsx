import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BecomeASeller() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Become a Seller</h1>
      <p className="text-lg text-gray-600 mb-6">
        Join our marketplace and start selling your products to thousands of customers. Grow your business with us!
      </p>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Sell With Us?</h2>
        <ul className="text-gray-700 text-left">
          <li className="mb-2">✅ Reach a wide customer base</li>
          <li className="mb-2">✅ Secure and fast payments</li>
          <li className="mb-2">✅ Easy product management</li>
          <li className="mb-2">✅ 24/7 support for sellers</li>
        </ul>
      </div>
      <Link href={"/contact-us"}>
        <Button className="mt-6 px-6 py-2 text-lg font-semibold">Contact Us</Button>
      </Link>
    </div>
  );
}
