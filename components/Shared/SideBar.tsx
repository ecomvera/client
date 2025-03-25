"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAction } from "@/stores/action";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutube, FaTwitter, FaLinkedin, FaPinterest } from "react-icons/fa";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDataStore } from "@/stores/data";
import { use, useEffect, useState } from "react";
import { ICategory } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import ReactCarousel from "./Carousel";
import { CarouselItem } from "../ui/carousel";
import { startCase } from "lodash";

const SideBar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const { isSidebarOpen, setIsSidebarOpen } = useAction();
  const { categories } = useDataStore();

  if (pathname === "/sign-in") return null;

  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetContent side="left" className="p-0 border-border">
        <SheetTitle className="hidden"></SheetTitle>
        <SheetHeader className="text-start p-3 pb-0 h-[73px]">
          <div>Welcome {user ? <p className="text-lg font-semibold">{user.name}</p> : "User"}</div>
          {user ? (
            <></>
          ) : (
            <Link href={`/sign-in?src=${pathname}`}>
              <SheetDescription>Sign In/Sign Up</SheetDescription>
            </Link>
          )}
        </SheetHeader>
        <div className="line-break"></div>

        <div className="overflow-y-auto h-[calc(100vh-73px)]">
          <div className="flex flex-col gap-3 p-3">
            <div className="text-sm text-muted-foreground">Shop In</div>

            <div className="flex flex-col px-1">
              <Accordion type="single" collapsible>
                {categories.map((item) => (
                  <Item key={item.id} label={item.name} subCategories={item.children} setIsSidebarOpen={setIsSidebarOpen} />
                ))}
              </Accordion>
            </div>
          </div>

          <LinkSlider />

          <div className="w-full p-3">
            <div className="text-sm text-muted-foreground mt-2">About Us</div>
            <div className="flex flex-col mt-2">
              <Link href={"/blog"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">Blogs</div>
              </Link>
              <Link href={"/about-us"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">Who We Are</div>
              </Link>
            </div>

            <div className="text-sm text-muted-foreground mt-2">Social Media</div>
            <div className="flex justify-between w-full p-2">
              <Link href="https://www.instagram.com/silkyester/" target="_blank">
                <FaInstagram className="text-2xl text-[--c3]" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61565074614724#" target="_blank">
                <FaFacebook className="text-2xl text-[--c3]" />
              </Link>
              <Link href="https://www.youtube.com/@Silkyester" target="_blank">
                <FaYoutube className="text-2xl text-[--c3]" />
              </Link>
              <Link href="https://x.com/silkyester" target="_blank">
                <FaTwitter className="text-2xl text-[--c3]" />
              </Link>
              <Link href="https://www.linkedin.com/company/silkyester/" target="_blank">
                <FaLinkedin className="text-2xl text-[--c3]" />
              </Link>
              <Link href="https://in.pinterest.com/silkyester/" target="_blank">
                <FaPinterest className="text-2xl text-[--c3]" />
              </Link>
            </div>

            <div className="text-sm text-muted-foreground mt-2">Help</div>
            <div className="flex flex-col">
              <Link href={"https://www.silkyester.com/faq"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">FAQs</div>
              </Link>
              <Link href={"https://www.silkyester.com/contact-us"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">Contact Us</div>
              </Link>
              <Link href={"https://www.silkyester.com/privacy-policy"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">Privacy Policy</div>
              </Link>
              <Link href={"https://www.silkyester.com/shipping-and-returns"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">Shipping & Returns</div>
              </Link>
              <Link href={"https://www.silkyester.com/terms-and-conditions"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">Terms & Conditions</div>
              </Link>
              <Link href={"https://www.silkyester.com/cancellation-and-refunds"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">Cancellation & Refunds</div>
              </Link>
            </div>

            <div className="text-sm text-muted-foreground mt-2">Useful Links</div>
            <div className="flex flex-col">
              <Link href={"/myaccount/orders"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">Track Order</div>
              </Link>
              <Link href={"/careers"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">Careers</div>
              </Link>
              <Link href={"/seller-registration"} className="flex gap-3 p-2">
                <div className="text-sm font-semibold">Become a Seller</div>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Item = ({
  label,
  subCategories,
  setIsSidebarOpen,
}: {
  label: string;
  subCategories: any;
  setIsSidebarOpen: (openSidebar: boolean) => void;
}) => {
  const [arr, setArr] = useState<{ [key: string]: ICategory[] }>({});

  useEffect(() => {
    const arr = subCategories.reduce((acc: any[], item: any) => {
      if (!acc[item.wearType]) {
        acc[item.wearType] = [];
      }

      acc[item.wearType].push(item);

      return acc;
    }, {});

    setArr(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccordionItem value={label} className="border-none">
      <AccordionTrigger style={{ textDecoration: "none" }} className="font-semibold">
        {label}
      </AccordionTrigger>
      <AccordionContent className="px-2">
        <Accordion type="single" collapsible>
          {Object.keys(arr).map((item) => (
            <AccordionItem key={item} value={item} className="border-none">
              <AccordionTrigger style={{ textDecoration: "none" }}>{startCase(item)}</AccordionTrigger>
              <AccordionContent className="px-2">
                <Accordion type="single" collapsible>
                  {arr[item].map((i) => (
                    <Link href={`/${i.slug}`} onClick={() => setIsSidebarOpen(false)} key={i.id} className="flex gap-3 p-2">
                      <div className="text-sm">{i.name}</div>
                    </Link>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
};

const LinkSlider = () => {
  const { push } = useRouter();
  const { setIsSidebarOpen } = useAction();

  const handleLinkClick = (link: string) => {
    push(link);
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <div className="line-break"></div>
      <ReactCarousel>
        <div className="flex gap-2 p-4">
          <CarouselItem className="basis-auto">
            <div onClick={() => handleLinkClick("/myaccount")} className="cursor-pointer flex flex-col gap-2 items-center">
              <div className="border rounded w-16 h-16 flex items-center justify-center">
                <Image src="/assets/icons/user.png" alt="user" width={0} height={0} sizes="100vw" className="w-8 h-8" />
              </div>
              <p className="text-xs text-muted-foreground">My Account</p>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-auto">
            <div
              onClick={() => handleLinkClick("/myaccount/orders")}
              className="cursor-pointer flex flex-col gap-2 items-center"
            >
              <div className="border rounded w-16 h-16 flex items-center justify-center">
                <Image src="/assets/icons/shipped.png" alt="user" width={0} height={0} sizes="100vw" className="w-8 h-8" />
              </div>
              <p className="text-xs text-muted-foreground">Orders</p>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-auto">
            <div onClick={() => handleLinkClick("/wishlist")} className="cursor-pointer flex flex-col gap-2 items-center">
              <div className="border rounded w-16 h-16 flex items-center justify-center">
                <Image
                  src="/assets/icons/wishlist-icon.png"
                  alt="user"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-xs text-muted-foreground">Wishlist</p>
            </div>
          </CarouselItem>
        </div>
      </ReactCarousel>
      <div className="line-break"></div>
    </div>
  );
};

export default SideBar;
