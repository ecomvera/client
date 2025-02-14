"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAction } from "@/stores/action";
import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDataStore } from "@/stores/data";
import { useEffect, useState } from "react";
import { ICategory } from "@/types";
import { usePathname } from "next/navigation";
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
        <SheetHeader className="text-start p-3">
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

        <div className="w-full p-3 ">
          <div className="text-sm text-muted-foreground">Contact Us</div>
          <div className="flex flex-col mt-2">
            <Link href={"#"} className="flex gap-3 p-2">
              <div className="text-sm font-semibold">Help & Support</div>
            </Link>
            <Link href={"#"} className="flex gap-3 p-2">
              <div className="text-sm font-semibold">Feedback & Suggestions</div>
            </Link>
            <Link href={"#"} className="flex gap-3 p-2">
              <div className="text-sm font-semibold">Become a Seller</div>
            </Link>
          </div>

          <div className="text-sm text-muted-foreground mt-3">About Us</div>
          <div className="flex flex-col mt-2">
            <Link href={"#"} className="flex gap-3 p-2">
              <div className="text-sm font-semibold">Blogs</div>
            </Link>
            <div className="flex gap-3 p-2">
              <div className="flex justify-center gap-5">
                <Link href={"#"}>
                  <FaInstagram className="text-2xl text-light-1" />
                </Link>
                <Link href={"#"}>
                  <FaFacebook className="text-2xl text-light-1" />
                </Link>
              </div>
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
  return (
    <div>
      <div className="line-break"></div>
      <ReactCarousel>
        <div className="flex gap-2 p-4">
          <CarouselItem className="basis-auto">
            <Link href={"/myaccount"} className="flex flex-col gap-2 items-center">
              <div className="border rounded w-16 h-16 flex items-center justify-center">
                <Image src="/assets/icons/user.png" alt="user" width={0} height={0} sizes="100vw" className="w-8 h-8" />
              </div>
              <p className="text-xs text-muted-foreground">My Account</p>
            </Link>
          </CarouselItem>
          <CarouselItem className="basis-auto">
            <Link href={"/orders"} className="flex flex-col gap-2 items-center">
              <div className="border rounded w-16 h-16 flex items-center justify-center">
                <Image src="/assets/icons/shipped.png" alt="user" width={0} height={0} sizes="100vw" className="w-8 h-8" />
              </div>
              <p className="text-xs text-muted-foreground">Orders</p>
            </Link>
          </CarouselItem>
          <CarouselItem className="basis-auto">
            <Link href={"/myaccount"} className="flex flex-col gap-2 items-center">
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
            </Link>
          </CarouselItem>
        </div>
      </ReactCarousel>
      <div className="line-break"></div>
    </div>
  );
};

export default SideBar;
