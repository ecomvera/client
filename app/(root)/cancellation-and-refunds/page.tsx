export const metadata = {
  title: "Refund Policy | Silkyester",
  alternates: {
    canonical: "https://www.silkyester.com/cancellation-refunds",
  },
};

export default function RefundPolicy() {
  return (
    <div className="max-w-laptop mx-auto p-6 my-10 select-text">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cancellation and Refunds</h1>

        {/* Refund Introduction */}
        <section className="mb-10">
          <p className="text-gray-700 mb-4">
            At <span className="font-semibold">Silkyester</span>, we strive to provide the best-quality products to our
            customers. However, if you are not completely satisfied with your purchase or have received a damaged or
            incorrect product, you can apply for a refund as per the guidelines below.
          </p>
        </section>

        {/* Refund Eligibility */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Conditions for Refund Eligibility</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              The product must be unused, unwashed, and in its original condition along with all tags and packaging intact.
            </li>
            <li>
              Refund requests must be initiated within <span className="font-semibold">24 hours</span> of delivery.
            </li>
            <li>
              Customized and sale products are <span className="text-red-500 font-semibold">not eligible</span> for a refund.
            </li>
            <li>
              If you receive a damaged, defective, or incorrect item, you must upload clear images of the product while
              filling out the refund request.
            </li>
          </ul>
        </section>

        {/* Refund Process */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Refund Process</h2>
          <p className="text-gray-700 mb-3">To request a refund, please follow these steps:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              Log in to your account on{" "}
              <a href="https://www.silkyester.com" className="text-blue-600 hover:underline">
                www.silkyester.com
              </a>
              .
            </li>
            <li>
              Go to the <span className="font-semibold">"Return/Refund Request"</span> section.
            </li>
            <li>Fill out the required details and attach necessary photos if applicable.</li>
            <li>Our customer support team will review your request.</li>
            <li>If approved, our courier partner will schedule a pickup within 2-3 business days.</li>
            <li>
              Once the product is received and undergoes a quality check, the refund will be processed within 3-7 business
              days to the original payment method.
            </li>
          </ol>
        </section>

        {/* Refund Not Received */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Refund Not Received?</h2>
          <p className="text-gray-700">If you do not receive your refund within the mentioned timeframe:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>First, check your bank account statement or contact your payment provider.</li>
            <li>If there is still an issue, feel free to contact our customer support team for assistance.</li>
          </ul>
        </section>

        {/* Non-Eligible Cases */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Non-Eligible Cases for Returns & Refunds</h2>
          <ul className="list-none space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="text-red-500 font-semibold text-lg mr-2">❌</span> The product has been used, washed, or
              damaged after delivery.
            </li>
            <li className="flex items-center">
              <span className="text-red-500 font-semibold text-lg mr-2">❌</span> The original tags and packaging are
              missing.
            </li>
            <li className="flex items-center">
              <span className="text-red-500 font-semibold text-lg mr-2">❌</span> The return request was initiated after 24
              hours of delivery.
            </li>
            <li className="flex items-center">
              <span className="text-red-500 font-semibold text-lg mr-2">❌</span> Products bought during a sale or special
              promotion are not refundable.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
