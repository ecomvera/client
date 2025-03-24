import Link from "next/link";

export const metadata = {
  title: "Shipping and Return Policy | Silkyester",
  alternates: {
    canonical: "https://www.silkyester.com/shipping-returns",
  },
};

export default function ShippingReturn() {
  return (
    <div className="max-w-laptop mx-auto p-6 text-gray-800 my-10 select-text">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Shipping and Return Policy</h1>

        {/* Shipping Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Policy</h2>
          <p className="text-gray-700 mb-4">
            At <span className="font-semibold">Silkyester</span>, we are committed to delivering your order quickly and
            safely.
          </p>

          <div className="space-y-3">
            <p>
              <span className="font-semibold">Shipping Time:</span> We strive to deliver orders within 30 minutes (available
              in selected cities). For other regions, delivery may take 3-7 business days.
            </p>
            <p>Once your order is confirmed, you will receive a tracking ID to track your order status.</p>
            <p>
              <span className="font-semibold">Shipping Charges:</span> Free shipping is available on all orders. Additional
              charges may apply for express delivery.
            </p>
            <p>
              <span className="font-semibold">Order Processing:</span> All orders are processed on business days
              (Monday-Saturday). Orders are not shipped on public holidays, Sundays, and national holidays.
            </p>
          </div>
        </section>

        {/* Return and Refund Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Return and Refund Policy</h2>
          <p className="text-gray-700 mb-4">
            We are committed to providing the best quality to our customers. If you face any issues, you can return the
            product as per our return and refund policy.
          </p>

          <div className="space-y-3">
            <p>
              <span className="font-semibold">Return Conditions:</span> Products can be returned within 24 hours of delivery.
              Returns will be accepted only if the product is unused, unwashed, and in its original packaging. Customized and
              sale products are not eligible for return.
            </p>

            <p>
              <span className="font-semibold">Return Process:</span>
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Request a Return: Log in to our website{" "}
                <a href="https://www.silkyester.com" className="text-blue-600 hover:underline">
                  www.silkyester.com
                </a>{" "}
                and fill out the 'Return Request' form.
              </li>
              <li>Schedule Pickup: Our courier partner will pick up the product within 2-3 days.</li>
              <li>Quality Check: The return will be accepted after verification by our team.</li>
            </ul>

            <p>
              <span className="font-semibold">Refund/Exchange:</span> Refunds will be processed within 3-7 business days in
              the original payment mode. If you request an exchange, the new product will be shipped as soon as possible.
            </p>

            <p>
              <span className="font-semibold">Conditions for Non-Acceptance of Returns:</span>
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>If the product has been used or is in a damaged condition.</li>
              <li>If the original tags and packaging are missing.</li>
              <li>If the return window (24 hours) has expired.</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you need any assistance, please visit our website's profile section where you will find complete company
            contact information.{" "}
            <Link href={"/contact-us"} className="text-blue-600 hover:underline">
              Contact Us
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
