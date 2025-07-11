"use client";

import { Separator } from "@/components/ui/separator";
import { footer } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram, FaFacebook, FaYoutube, FaTwitter, FaLinkedin, FaPrint, FaPinterest } from "react-icons/fa";
import Image from "next/image";
import { useDataStore } from "@/stores/data";
import { useMemo } from "react";

const Footer = () => {
  const pathname = usePathname();
  const { categories } = useDataStore();

  const categoriesData = useMemo(() => categories.map((category) => category.children).flat(), [categories]);

  if (["/sign-in", "/cart", "/checkout", "/payment", "/onboarding"].includes(pathname)) return null;
  // return (
  //   <div className="py-10 px-10 hidden tablet:block laptp:px-20 bg-[--c5] text-[--white]">
  //     <div className="max-w-desktop mx-auto">
  //       <div className="w-full flex justify-between flex-wrap">
  //         <div className="w-full mobile:w-1/2 laptop:w-auto mt-7">
  //           <h2 className="text-lg text-[--c1] font-semibold uppercase">Shop</h2>
  //           <ul className="flex flex-col mobile:mt-5">
  //             {categories?.map((category) => (
  //               <FLink key={category.label} label={category.label} route={category.route} />
  //             ))}
  //           </ul>
  //         </div>

  //         <div className="w-full mobile:w-1/2 laptop:w-auto mt-7">
  //           <h2 className="text-lg text-[--c1] font-semibold uppercase">About</h2>
  //           <ul className="flex flex-col mobile:mt-5">
  //             {footer.about?.map((item) => (
  //               <FLink key={item.label} label={item.label} route={item.route} />
  //             ))}
  //           </ul>
  //         </div>

  //         <div className="w-full mobile:w-1/2 laptop:w-auto mt-7">
  //           <h2 className="text-lg text-[--c1] font-semibold uppercase">Company</h2>
  //           <ul className="flex flex-col mobile:mt-5">
  //             {footer.company?.map((item) => (
  //               <FLink key={item.label} label={item.label} route={item.route} />
  //             ))}
  //           </ul>
  //         </div>

  //         <div className="w-full mobile:w-1/2 laptop:w-auto mt-7">
  //           <h2 className="text-lg text-[--c1] font-semibold uppercase">Help</h2>
  //           <ul className="flex flex-col mobile:mt-5">
  //             {footer.help?.map((item) => (
  //               <FLink key={item.label} label={item.label} route={item.route} />
  //             ))}
  //           </ul>
  //         </div>
  //       </div>

  //       <div className="text-center pt-20 flex flex-col">
  //         <div className="flex justify-center gap-5 pt-5">
  //           <Link href="https://www.instagram.com/silkyester/" target="_blank">
  //             <FaInstagram className="text-2xl text-[--c1]" />
  //           </Link>
  //           <Link href="https://www.facebook.com/profile.php?id=61565074614724#" target="_blank">
  //             <FaFacebook className="text-2xl text-[--c1]" />
  //           </Link>
  //           <Link href="https://www.youtube.com/@Silkyester" target="_blank">
  //             <FaYoutube className="text-2xl text-[--c1]" />
  //           </Link>
  //           <Link href="https://x.com/silkyester" target="_blank">
  //             <FaTwitter className="text-2xl text-[--c1]" />
  //           </Link>
  //           <Link href="https://www.linkedin.com/company/silkyester/" target="_blank">
  //             <FaLinkedin className="text-2xl text-[--c1]" />
  //           </Link>
  //           <Link href="https://in.pinterest.com/silkyester/" target="_blank">
  //             <FaPinterest className="text-2xl text-[--c1]" />
  //           </Link>
  //         </div>
  //         <p className="text-xs tablet:text-sm text-light-4 py-5">
  //           © 2025 Silkyester. All Rights Reserved. | www.silkyester.com
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-gray-100 text-gray-700 py-10 px-6 md:px-20 select-text hidden tablet:block">
      <div className="max-w-desktop mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-semibold mb-3">CATEGORIES</h3>
          <ul className="space-y-2">
            {categoriesData.slice(0, 6).map((item: any) => (
              <li key={item.id} className="hover:text-gray-900 cursor-pointer">
                <Link key={item.label} href={`/category/${item.slug}`} className="hover:text-gray-900 cursor-pointer">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">CUSTOMER HELP</h3>
          <ul className="space-y-2">
            {footer.help?.map((item) => (
              <FLink key={item.label} label={item.label} route={item.route} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col  mb-8">
          <h3 className="font-semibold">USEFULL LINKS</h3>
          <ul className="">
            {footer.links?.map((item) => (
              <FLink key={item.label} label={item.label} route={item.route} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <Image src="/assets/icons/original.png" width={200} height={200} alt="logo" className="w-[50px]" />
              <p>
                <span className="font-semibold text-black">100% ORIGINAL</span> guarantee for <br /> all products at
                Silkyester
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/assets/icons/24_hours.png" width={200} height={200} alt="logo" className="w-[50px]" />
              <p>
                <span className="font-semibold text-black">Return within 24 hours</span> of receiving your order
              </p>
            </div>
          </div>

          <h3 className="font-semibold mt-5">KEEP IN TOUCH</h3>
          <div className="flex space-x-4">
            <div className="flex flex-wrap gap-5">
              <Link href="https://www.instagram.com/silkyester/" target="_blank">
                <FaInstagram className="text-2xl " />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61565074614724#" target="_blank">
                <FaFacebook className="text-2xl " />
              </Link>
              <Link href="https://www.youtube.com/@Silkyester" target="_blank">
                <FaYoutube className="text-2xl " />
              </Link>
              <Link href="https://x.com/silkyester" target="_blank">
                <FaTwitter className="text-2xl " />
              </Link>
              <Link href="https://www.linkedin.com/company/silkyester/" target="_blank">
                <FaLinkedin className="text-2xl " />
              </Link>
              <Link href="https://in.pinterest.com/silkyester/" target="_blank">
                <FaPinterest className="text-2xl " />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-desktop mx-auto mt-10">
        <div>
          <h3 className="font-semibold mb-3">POPULAR SEARCHES</h3>
          <div className="text-sm text-gray-600 flex gap-2">
            {categoriesData.map((item: any, index) => (
              <Link key={index} href={item.slug}>
                {item.name} <span className={index === categoriesData.length - 1 ? "hidden" : ""}> |</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col md:flex-row justify-between text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Silkyester. All Rights Reserved. | www.silkyester.com</p>
        <p>
          A{" "}
          <Link className="text-[--c2] font-semibold" href={"https://trosoft.in"} target="_blank">
            Trosoft
          </Link>{" "}
          company
        </p>
      </div>
    </div>
  );
};

const FLink = ({ label, route }: { label: string; route: string }) => {
  return (
    <Link href={`${route}`}>
      <li className="text-sm tablet:text-base mt-2 hover:text-gray-900 cursor-pointer">{label}</li>
    </Link>
  );
};

export default Footer;
