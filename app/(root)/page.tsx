"use client";

import Banner from "@/components/Cards/Banner";
import BestSellers from "@/components/Shared/BestSellers";
import NewArrivals from "@/components/Shared/NewArrivals";
import ReactCarousel from "@/components/Shared/Carousel";
import { CarouselItem } from "@/components/ui/carousel";
import LoadingPage from "@/components/Shared/LoadingPage";
import { useEffect } from "react";
import GroupCategories from "@/components/Shared/GroupCategories";

export default function Home() {
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return <LoadingPage />;
  // }

  return (
    <div className="">
      {/* <Banner /> */}
      <GroupCategories />

      <BestSellers />
      <NewArrivals />

      {/* <ReactCarousel showArrows>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/5">
            <div className="p-1 bg-red-300">
              <div>
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </ReactCarousel> */}
    </div>
  );
}
