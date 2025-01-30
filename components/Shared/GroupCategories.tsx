"use client";

import React from "react";
import ReactCarousel from "./Carousel";
import { CarouselItem } from "../ui/carousel";
import { IGroupCategory } from "@/types";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

const GroupCategories = ({ collections }: { collections: IGroupCategory[] }) => {
  if (collections?.length === 0) return null;

  if (collections?.length === 1) {
    return (
      <Link href={`/${collections[0]?.slug}`}>
        <AspectRatio ratio={3.57 / 1}>
          <Image
            src={collections[0]?.banner}
            priority
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </Link>
    );
  }

  return (
    <ReactCarousel autoPlay={3000}>
      {collections?.map((category: IGroupCategory) => (
        <CarouselItem key={category.id} className="basis-[80%] md:basis-[60%] lg:basis-[40%]">
          <Link href={`/${category.slug}`}>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={category.image}
                priority
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </Link>
        </CarouselItem>
      ))}
    </ReactCarousel>
  );
};

export default GroupCategories;
