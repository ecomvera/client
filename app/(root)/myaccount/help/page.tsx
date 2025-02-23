"use client";

import { HelpCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const links = [
    { href: "/faq", label: "FAQ" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/refund-policy", label: "Refund Policy" },
  ];

  return (
    <div className="">
      <h1 className="flex md:hidden items-center gap-2 font-semibold mb-5 text-xl font-sans">
        <span onClick={() => router.back()} className="hidden  cursor-pointer">
          <HelpCircleIcon className="w-7 h-7 md:hidden" />
        </span>
        Help
      </h1>

      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Useful Links</h1>
        <p className="text-gray-600 mb-8">Find important information about our policies and frequently asked questions.</p>

        <div className=" p-6 w-full">
          <ul className="space-y-4">
            {links.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="block text-lg font-medium transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
