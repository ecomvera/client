import { StructuredData } from "@/components/structured-data";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact Us | Silkyester",
  alternates: {
    canonical: "https://www.silkyester.com/contact-us",
  },
};

export default function ContactUs() {
  const hadJSON = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Silkyester",
    url: "https://www.silkyester.com",
    logo: "https://www.silkyester.com/logo.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "02269646745",
        contactType: "customer service",
        areaServed: ["IN", "US"],
        availableLanguage: ["Hindi", "English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Floor No.: 00, Building No.: TEHSIL MORADABAD, C/O SHRI RUDESH KUMAR, OD 040104",
      addressLocality: "Mohammadpur",
      addressRegion: "Uttar Pradesh",
      postalCode: "244001",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/Silkyester",
      "https://www.facebook.com/Silkyester",
      "https://www.youtube.com/@Silkyester",
      "https://twitter.com/Silkyester",
      "https://www.linkedin.com/company/silkyester",
      "https://www.pinterest.com/Silkyester",
    ],
  };
  return (
    <>
      <StructuredData data={hadJSON} />

      <div className="max-w-laptop mx-auto my-10 select-text">
        <div className="max-w-4xl w-full p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 ">Contact Us</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="">
                <MapPin className="text-blue-500" />
                <p className="text-gray-700 mt-2">
                  Premises Name: C/O Shri Rudesh Kumar Street: OD 040104 Landmark: Panchayat Headquarter Town: Mohammadpur
                  District: Moradabad State: Uttar Pradesh, 240001
                </p>
              </div>
              <div className="">
                <Mail className="text-blue-500" />
                <p className="text-gray-700 mt-2">infosilkyester@gmail.com</p>
              </div>
              <div className="">
                <Phone className="text-blue-500" />
                <p className="text-gray-700 mt-2">02269646745</p>
              </div>
            </div>

            {/* Contact Form */}
            {/* <form className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
              Send Message
            </button>
          </form> */}
          </div>
        </div>
      </div>
    </>
  );
}
