"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import ReactCarousel from "./Carousel";
import { CarouselItem } from "../ui/carousel";

const ShopByCategory = ({ data }: { data: any }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="px-2">
      {_.map(
        data,
        (category) =>
          category.children.length > 0 && (
            <div key={category.id} className="mt-5">
              <h2 className="text-center text-sm mobile:text-xl tablet:text-2xl text-light-1 font-semibold uppercase pb-3">
                Shop by Category - {category.name}
              </h2>

              <ReactCarousel autoPlay={5000}>
                {_.map(
                  category.children,
                  (child) =>
                    child.products.length > 0 && (
                      <CarouselItem key={child.id} className="basis-3/5 sm:basis-1/3 md:basis-1/5 lg:basis-1/6 mobile:py-4">
                        <Link href={`/${child.slug}`} key={child.id} className="w-full min-w-[200px]">
                          <AspectRatio ratio={0.8 / 1} className="border rounded-md relative overflow-hidden">
                            <Image
                              src={child.products[0].images[0].url}
                              quality={10}
                              priority
                              alt="image"
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="rounded-md object-cover w-full h-full"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
                            <h1 className="absolute left-0 bottom-0 ml-2 text-sm mobile:text-lg text-white">{child.name}</h1>
                          </AspectRatio>
                        </Link>
                      </CarouselItem>
                    )
                )}
                <CarouselItem className="basis-3/5 sm:basis-1/3 md:basis-1/5 lg:basis-1/6 mobile:py-4">
                  <Link href={`/${category.slug}`} key={category.id} className="w-full min-w-[200px]">
                    <AspectRatio
                      ratio={0.8 / 1}
                      className="border rounded-md relative bg-gray-100 flex items-center justify-center font-semibold text-lg"
                    >
                      <h1>View All</h1>
                    </AspectRatio>
                  </Link>
                </CarouselItem>
              </ReactCarousel>
            </div>
          )
      )}
    </div>
  );
};

export default ShopByCategory;
