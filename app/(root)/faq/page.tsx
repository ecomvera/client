import FaqList from "./faqList";
import { StructuredData } from "@/components/structured-data";

export const metadata = {
  title: "FAQ | Silkyester",
  alternates: {
    canonical: "https://www.silkyester.com/faq",
  },
};

export default function FAQPage() {
  const hadJSON = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I place an order on Silkyester?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can visit our website www.silkyester.com, select your preferred clothing items, add them to your cart, and complete the purchase by making the payment.",
        },
      },
      {
        "@type": "Question",
        name: "Are Silkyester clothes available for all age groups?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer a wide range of fashionable and comfortable clothing for men, women, and children.",
        },
      },
      {
        "@type": "Question",
        name: "What is the price range of Silkyester clothing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our clothing is affordable and budget-friendly. You can check different price ranges and offers on our website.",
        },
      },
      {
        "@type": "Question",
        name: "Does Silkyester offer discounts or promotions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide discounts and special offers from time to time. Visit our website regularly to stay updated on our latest collections and exclusive deals.",
        },
      },
      {
        "@type": "Question",
        name: "Can I cancel my order?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can cancel your order before it is shipped. Once the order has been shipped, cancellation is no longer possible.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take for an order to be delivered?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer 30-minute delivery in select locations. For other areas, delivery usually takes 3-5 business days.",
        },
      },
      {
        "@type": "Question",
        name: "Can I track my order?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, once your order is shipped, you will receive a tracking link via SMS and email.",
        },
      },
      {
        "@type": "Question",
        name: "Does Silkyester offer international delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Currently, we deliver only within India, but we plan to start international shipping soon.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a delivery charge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer free delivery on orders above ₹999. For orders below ₹999, a small delivery fee may apply.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if I receive the wrong size or color?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact us within 24 hours, and we will initiate the exchange or return process.",
        },
      },
      {
        "@type": "Question",
        name: "Can I return worn or washed clothes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, we only accept returns and exchanges for unused, unwashed products that are in their original packaging.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if my product is damaged upon delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you receive a damaged item, contact us within 24 hours for a replacement or refund.",
        },
      },
      {
        "@type": "Question",
        name: "How long does the refund process take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once your return is approved, the refund will be processed within 3-7 business days.",
        },
      },
      {
        "@type": "Question",
        name: "What payment options are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept debit cards, credit cards, net banking, UPI, and Cash on Delivery (COD).",
        },
      },
      {
        "@type": "Question",
        name: "Is online payment secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our website is 100% secure and encrypted, ensuring that your payment details remain completely safe.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if my payment fails?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If the payment fails but the amount is deducted, it will be refunded within 24 hours. If the refund is not processed, please contact our support team.",
        },
      },
      {
        "@type": "Question",
        name: "What fabric is used in Silkyester clothing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use premium quality, 100% Made in India fabric, which is comfortable and durable.",
        },
      },
      {
        "@type": "Question",
        name: "Are gift cards or vouchers available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not yet, but we plan to introduce gift vouchers soon.",
        },
      },
      {
        "@type": "Question",
        name: "Does Silkyester have offline stores?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Currently, we operate only online, but offline stores may be launched in the future.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Silkyester?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can visit our 'Contact Us' page on our website or email us at support@silkyester.com.",
        },
      },
      {
        "@type": "Question",
        name: "What are the benefits of creating an account on Silkyester?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "By creating an account, you can track your orders, easily process returns and exchanges, save addresses and payment details, and receive exclusive offers.",
        },
      },
      {
        "@type": "Question",
        name: "How do I create an account on Silkyester?",
        acceptedAnswer: {
          "@type": "Answer",
          text: 'Visit our website www.silkyester.com, click on the "Sign Up" button, enter your mobile number, and log in using the OTP sent to your phone.',
        },
      },
      {
        "@type": "Question",
        name: "Can I place an order without creating an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, you need to create an account to place an order on Silkyester. This allows you to track your orders and access better services.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if I forget my password?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Silkyester does not require a password. You can log in using an OTP sent to your registered mobile number. If you don’t receive the OTP, try again after some time or contact our support team.",
        },
      },
      {
        "@type": "Question",
        name: "Can I update my account details?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can update your name, address, phone number, and other details in the My Account section.",
        },
      },
      {
        "@type": "Question",
        name: "How can I delete my account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you wish to delete your account, email us at support@silkyester.com, and we will process your request.",
        },
      },
      {
        "@type": "Question",
        name: "Is my personal data safe with Silkyester?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we use advanced security systems to protect your data and never share your information with third parties.",
        },
      },
      {
        "@type": "Question",
        name: "Can I save multiple addresses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can save and manage multiple addresses in the My Account > Address Book section.",
        },
      },
      {
        "@type": "Question",
        name: "Can I check my order history?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can view all your previous orders in the My Orders section under My Account.",
        },
      },
      {
        "@type": "Question",
        name: "Will Silkyester send me order updates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we send order updates via SMS and WhatsApp to your registered mobile number.",
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={hadJSON} />

      <main>
        <div className="max-w-laptop mx-auto p-6 my-10 select-text">
          <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

          <FaqList />
        </div>
      </main>
    </>
  );
}
