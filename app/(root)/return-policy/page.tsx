const Page = () => {
  return (
    <div className="max-w-laptop mx-auto p-6 my-10 select-text">
      <h1 className="text-3xl font-bold text-center mb-6">Silkyester 24-Hour Return & Exchange Policy</h1>
      <p className="mb-6">
        At Silkyester, customer satisfaction is our top priority, and we strive to provide you with the best shopping
        experience. However, if you are not completely satisfied with your purchase, we offer a 24-hour Return & Exchange
        Policy, under which you can request a return or exchange, provided certain conditions are met. Please read this
        policy carefully before initiating a return or exchange request.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Eligibility for Return & Exchange</h2>
        <p className="mb-4">To qualify for a return or exchange, the following conditions must be met:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The request must be initiated within 24 hours of receiving the product.</li>
          <li>
            The product must be unused, unwashed, and in its original condition, with all packaging, tags, and labels intact.
          </li>
          <li>
            Only products with manufacturing defects, incorrect size, or wrong product delivered will be considered for
            return or exchange.
          </li>
          <li>
            Customized, personalized, or altered products based on customer request are not eligible for return or exchange.
          </li>
          <li>Products that show signs of wear, damage, or washing will not be accepted for return or exchange.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Order Cancellation Process</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            If you wish to cancel your order, you must do so within 24 hours of placing the order by visiting the Silkyester
            website portal and completing the cancellation process.
          </li>
          <li>
            Order cancellations cannot be processed through phone calls or emails. Cancellation can only be done through the
            website portal.
          </li>
          <li>
            Once an order is successfully canceled, a confirmation will be sent to your registered email or phone number.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. Return & Exchange Process</h2>
        <p className="mb-4">If you wish to return or exchange an eligible product, follow these steps:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Initiate a Request:</strong> Contact us by emailing{" "}
            <a href="mailto:privacy@silkyester.com" className="text-blue-500 hover:underline">
              privacy@silkyester.com
            </a>{" "}
            {/* or calling{" "}
            <a href="tel:6399269102" className="text-blue-500 hover:underline">
              6399269102
            </a>{" "} */}
            within 24 hours of receiving the product.
          </li>
          <li>
            <strong>Provide Details:</strong> Share your order number, reason for return or exchange, and necessary
            supporting images (if applicable).
          </li>
          <li>
            <strong>Review & Approval:</strong> Our team will review your request, and if approved, you will receive
            instructions on how to return the product.
          </li>
          <li>
            <strong>Product Pickup or Return:</strong> Depending on your location, we will either arrange a pickup or provide
            you with the return address.
          </li>
          <li>
            <strong>Inspection & Processing:</strong> Once we receive the product, we will inspect its condition, and if
            everything is in order, we will proceed with the exchange or refund.
          </li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Refund & Exchange Terms</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Exchange:</strong> If the requested product for exchange is unavailable, we will offer a refund or store
            credit, which can be used for future purchases.
          </li>
          <li>
            <strong>Refund:</strong> If applicable, refunds will be processed within 10-12 business days and credited to the
            original payment method.
          </li>
          <li>
            <strong>Shipping Costs:</strong> If the return is due to a Silkyester error (wrong or damaged product sent), we
            will cover the return shipping costs. Otherwise, the customer will be responsible for the return shipping
            charges.
          </li>
          <li>
            <strong>Store Credit Option:</strong> If you prefer, you can choose store credit instead of a refund, which can
            be used for future purchases on our website.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">5. Important Notes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Returns and exchanges will only be accepted if they meet the criteria mentioned above.</li>
          <li>Refunds will be processed only after the product is received and inspected by our team.</li>
          <li>Any return or exchange request beyond 24 hours of delivery will not be entertained.</li>
          <li>
            If a customer repeatedly requests returns or exchanges, Silkyester reserves the right to refuse future return or
            exchange requests.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Page;
