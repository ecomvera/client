export const metadata = {
  title: "Silkyester | Privacy Policy",
  alternates: {
    canonical: "https://www.silkyester.com/privacy-policy",
  },
};

const Page = () => {
  return (
    <div className="max-w-laptop mx-auto p-6 my-10 select-text">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-6">
        Silkyester ("we," "our," "us") respects the privacy of our customers and website users ("you"). This privacy policy
        explains how we collect, use, share, and safeguard your information. Our goal is to ensure the security and
        confidentiality of your personal data.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Collection of Information</h2>
        <p className="mb-4">We collect personal and non-personal information for the following purposes:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Name, email, phone number, shipping, and billing address</li>
          <li>
            Order details and payment information (for secure transactions, we use Razorpay and do not store your
            credit/debit card details)
          </li>
          <li>Browser and device-related information, IP address, cookies, and other tracking tools</li>
          <li>Customer support requests and preference-related data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Use of Information</h2>
        <p className="mb-4">We may use your information for the following purposes:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Processing and delivering your orders</li>
          <li>Providing customer support and assistance</li>
          <li>Improving and customizing our products, services, and offers</li>
          <li>Complying with legal obligations and preventing fraud</li>
          <li>Optimizing advertising and marketing campaigns</li>
          <li>Analyzing website performance and user experience</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Sharing of Information</h2>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties. However, we may share your information under the
          following circumstances:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>With courier and logistics services: For order delivery</li>
          <li>With payment gateways and financial services: For secure transactions through Razorpay</li>
          <li>With marketing and analytics tools: To analyze user behavior and optimize marketing strategies</li>
          <li>For legal compliance: To meet government or legal requirements</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Cookies & Tracking Technologies</h2>
        <p className="mb-4">Our website uses cookies and other tracking technologies:</p>
        <ul className="list-disc list-inside mb-4">
          <li>To enhance user experience</li>
          <li>To track visited pages and optimize performance</li>
          <li>For marketing and advertising purposes</li>
        </ul>
        <p className="mb-4">
          You can disable cookies in your browser settings, but this may impact certain website features.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. User Rights</h2>
        <p className="mb-4">You have the following rights:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Request access, modification, or deletion of your personal information</li>
          <li>Unsubscribe from marketing emails</li>
          <li>Request access to or deletion of your data</li>
        </ul>
        <p className="mb-4">
          For such requests, email us at{" "}
          <a href="mailto:privacypolicy@silkyester.com" className="text-blue-600 hover:underline">
            privacypolicy@silkyester.com
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
        <p className="mb-4">
          We implement technical and administrative measures to protect your data. However, no online transmission is 100%
          secure, so we take the best possible steps to ensure data security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Changes to Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. Any significant changes will be communicated on our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Grievance Redressal</h2>
        <p className="mb-4">For any concerns or complaints regarding data usage, please contact our privacy officer:</p>
        <p className="mb-4">
          Email:{" "}
          <a href="mailto:privacypolicy@silkyester.com" className="text-blue-600 hover:underline">
            privacypolicy@silkyester.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default Page;
