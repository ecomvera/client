"use client";

import AddressDetails from "@/components/forms/AddressDetails";
import React from "react";

const Page = () => {
  return (
    <div className="max-w-desktop mx-auto px-2 py-5">
      <h1 className="head-text font-semibold text-dark-3">Checkout</h1>

      <div className="flex flex-col tablet:flex-row justify-between py-3 gap-4 border-light-3">
        <AddressDetails />
        <PaymentDetails />
      </div>
    </div>
  );
};

const PaymentDetails = () => {
  return (
    <div className="w-full !tablet:w-[500px] px-2">
      <p className="text-lg font-semibold text-dark-3">Payment Method</p>
      <div className="flex items-center gap-3">
        <input type="radio" id="cod" name="payment" value="cod" className="accent-success" />
        <label htmlFor="cod">Cash on Delivery</label>
      </div>
    </div>
  );
};

export default Page;
