"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Order & Shopping",
    questions: [
      {
        q: "How can I place an order on Silkyester?",
        a: (
          <>
            You can visit our website{" "}
            <Link href="https://www.silkyester.com" className="underline text-[--c3]" target="_blank">
              www.silkyester.com
            </Link>
            , select your preferred clothing items, add them to your cart, and complete the purchase by making the payment.
          </>
        ),
      },
      {
        q: "Are Silkyester clothes available for all age groups?",
        a: "Yes, we offer a wide range of fashionable and comfortable clothing for men, women, and children.",
      },
      {
        q: "What is the price range of Silkyester clothing?",
        a: "Our clothing is affordable and budget-friendly. You can check different price ranges and offers on our website.",
      },
      {
        q: "Does Silkyester offer discounts or promotions?",
        a: "Yes, we provide discounts and special offers from time to time. Visit our website regularly to stay updated on our latest collections and exclusive deals.",
      },
      {
        q: "Can I cancel my order?",
        a: "Yes, you can cancel your order before it is shipped. Once the order has been shipped, cancellation is no longer possible.",
      },
    ],
  },
  {
    category: "Delivery & Shipping",
    questions: [
      {
        q: "How long does it take for an order to be delivered?",
        a: "We offer 30-minute delivery in select locations. For other areas, delivery usually takes 3-5 business days.",
      },
      {
        q: "Can I track my order?",
        a: "Yes, once your order is shipped, you will receive a tracking link via SMS and email.",
      },
      {
        q: "Does Silkyester offer international delivery?",
        a: "Currently, we deliver only within India, but we plan to start international shipping soon.",
      },
      {
        q: "Is there a delivery charge?",
        a: "We offer free delivery on orders above ₹999. For orders below ₹999, a small delivery fee may apply.",
      },
    ],
  },
  {
    category: "Returns, Exchanges & Complaints",
    questions: [
      {
        q: "What should I do if I receive the wrong size or color?",
        a: "You can contact us within 24 hours, and we will initiate the exchange or return process.",
      },
      {
        q: "Can I return worn or washed clothes?",
        a: "No, we only accept returns and exchanges for unused, unwashed products that are in their original packaging.",
      },
      {
        q: "What should I do if my product is damaged upon delivery?",
        a: "If you receive a damaged item, contact us within 24 hours for a replacement or refund.",
      },
      {
        q: "How long does the refund process take?",
        a: "Once your return is approved, the refund will be processed within 3-7 business days.",
      },
    ],
  },
  {
    category: "Payment & Security",
    questions: [
      {
        q: "What payment options are available?",
        a: "We accept debit cards, credit cards, net banking, UPI, and Cash on Delivery (COD).",
      },
      {
        q: "Is online payment secure?",
        a: "Yes, our website is 100% secure and encrypted, ensuring that your payment details remain completely safe.",
      },
      {
        q: "What should I do if my payment fails?",
        a: "If the payment fails but the amount is deducted, it will be refunded within 24 hours. If the refund is not processed, please contact our support team.",
      },
    ],
  },
  {
    category: "General",
    questions: [
      {
        q: "What fabric is used in Silkyester clothing?",
        a: "We use premium quality, 100% Made in India fabric, which is comfortable and durable.",
      },
      { q: "Are gift cards or vouchers available?", a: "Not yet, but we plan to introduce gift vouchers soon." },
      {
        q: "Does Silkyester have offline stores?",
        a: "Currently, we operate only online, but offline stores may be launched in the future.",
      },
      {
        q: "How can I contact Silkyester?",
        a: "You can visit our 'Contact Us' page on our website or email us at support@silkyester.com.",
      },
    ],
  },
  {
    category: "FAQs About My Account",
    questions: [
      {
        q: "What are the benefits of creating an account on Silkyester?",
        a: "By creating an account, you can track your orders, easily process returns and exchanges, save addresses and payment details, and receive exclusive offers.",
      },
      {
        q: "How do I create an account on Silkyester?",
        a: (
          <>
            Visit our website{" "}
            <Link href="https://www.silkyester.com" target="_blank" className="underline text-[--c3]">
              www.silkyester.com
            </Link>
            , click on the "Sign Up" button, enter your mobile number, and log in using the OTP sent to your phone.
          </>
        ),
      },
      {
        q: "Can I place an order without creating an account?",
        a: "No, you need to create an account to place an order on Silkyester. This allows you to track your orders and access better services.",
      },
      {
        q: "What should I do if I forget my password?",
        a: "Silkyester does not require a password. You can log in using an OTP sent to your registered mobile number. If you don’t receive the OTP, try again after some time or contact our support team.",
      },
      {
        q: "Can I update my account details?",
        a: "Yes, you can update your name, address, phone number, and other details in the My Account section.",
      },
      {
        q: "How can I delete my account?",
        a: (
          <>
            If you wish to delete your account, email us at{" "}
            <Link href="mailto:support@silkyester.com" className="underline text-[--c3]" target="_blank">
              support@silkyester.com
            </Link>
            , and we will process your request.
          </>
        ),
      },
      {
        q: "Is my personal data safe with Silkyester?",
        a: "Yes, we use advanced security systems to protect your data and never share your information with third parties.",
      },
      {
        q: "Can I save multiple addresses?",
        a: "Yes, you can save and manage multiple addresses in the My Account > Address Book section.",
      },
      {
        q: "Can I check my order history?",
        a: "Yes, you can view all your previous orders in the My Orders section under My Account.",
      },
      {
        q: "Will Silkyester send me order updates?",
        a: "Yes, we send order updates via SMS and WhatsApp to your registered mobile number.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index: any) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <div className="max-w-laptop mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>
      {faqs.map((section, index) => (
        <div key={index} className="mb-4 border rounded-lg overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-4 bg-gray-200 hover:bg-gray-300 text-lg font-semibold"
            onClick={() => toggleCategory(index)}
          >
            {section.category}
            {openCategory === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openCategory === index && (
            <div className="bg-white p-4 border-t">
              {section.questions.map((faq, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold">{faq.q}</p>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
