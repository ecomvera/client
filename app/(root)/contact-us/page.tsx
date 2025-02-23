"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="max-w-laptop mx-auto my-10 select-text">
      <div className="max-w-4xl w-full p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 ">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="">
              <MapPin className="text-blue-500" />
              <p className="text-gray-700 mt-2">
                Premises Name: C/O Shri Radesh Kumar Street: OD 040104 Landmark: Panchayat Headquarter Town: Mohammadpur
                District: Moradabad State: Uttar Pradesh, 240001
              </p>
            </div>
            <div className="">
              <Mail className="text-blue-500" />
              <p className="text-gray-700 mt-2">support@silkyester.com</p>
            </div>
            <div className="">
              <Phone className="text-blue-500" />
              <p className="text-gray-700 mt-2">+123 456 7890</p>
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
  );
}
