import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        Welcome to our{" "}
        <Link href="/" className="font-semibold">
          Silkyester
        </Link>
        , your one-stop destination for premium quality products. We are committed to delivering an exceptional shopping
        experience with a seamless interface, secure transactions, and fast delivery services.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full text-left">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          Our mission is to provide high-quality products that cater to a wide range of customers. We aim to redefine online
          shopping by ensuring affordability, reliability, and convenience.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Curated selection of high-quality products</li>
          <li>Secure and seamless checkout process</li>
          <li>Fast and reliable shipping</li>
          <li>24/7 customer support</li>
        </ul>
      </div>
      <Link href="/">
        <Button className="mt-6 px-6 py-2 text-lg font-semibold">Explore Our Products</Button>
      </Link>
    </div>
  );
}
