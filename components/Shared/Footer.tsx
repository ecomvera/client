"use client";

import { categories, footer } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();

  if (["/sign-in", "/cart", "/checkout", "/payment"].includes(pathname)) return null;
  return (
    <div className="py-10 px-10 laptp:px-20 bg-[--black] text-[--white]">
      <div className="max-w-desktop mx-auto">
        <div className="w-full flex justify-between flex-wrap">
          <div className="w-full mobile:w-1/2 laptop:w-auto mt-7">
            <h2 className="text-lg text-[--c1] font-semibold uppercase">Shop</h2>
            <ul className="flex flex-col mobile:mt-5">
              {categories?.map((category) => (
                <FLink key={category.label} label={category.label} route={category.route} />
              ))}
            </ul>
          </div>

          <div className="w-full mobile:w-1/2 laptop:w-auto mt-7">
            <h2 className="text-lg text-[--c1] font-semibold uppercase">About</h2>
            <ul className="flex flex-col mobile:mt-5">
              {footer.about?.map((item) => (
                <FLink key={item.label} label={item.label} route={item.route} />
              ))}
            </ul>
          </div>

          <div className="w-full mobile:w-1/2 laptop:w-auto mt-7">
            <h2 className="text-lg text-[--c1] font-semibold uppercase">Company</h2>
            <ul className="flex flex-col mobile:mt-5">
              {footer.company?.map((item) => (
                <FLink key={item.label} label={item.label} route={item.route} />
              ))}
            </ul>
          </div>

          <div className="w-full mobile:w-1/2 laptop:w-auto mt-7">
            <h2 className="text-lg text-[--c1] font-semibold uppercase">Help</h2>
            <ul className="flex flex-col mobile:mt-5">
              {footer.help?.map((item) => (
                <FLink key={item.label} label={item.label} route={item.route} />
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center pt-20 flex flex-col">
          <div className="flex justify-center gap-5 pt-5">
            <FaInstagram className="text-2xl text-[--c1]" />
            <FaFacebook className="text-2xl text-[--c1]" />
          </div>
          <p className="text-sm tablet:text-lg text-light-4 py-5">Copyright ©2024</p>
        </div>
      </div>
    </div>
  );
};

const FLink = ({ label, route }: { label: string; route: string }) => {
  return (
    <Link href={route}>
      <li className="text-sm tablet:text-base mt-2 font-light">{label}</li>
    </Link>
  );
};

export default Footer;
