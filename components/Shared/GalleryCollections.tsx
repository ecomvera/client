"use client";

import { ICollection } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ReactCarousel from "./Carousel";
import { CarouselItem } from "../ui/carousel";

const GalleryCollections = ({ collections }: { collections: ICollection[] }) => {
  return (
    <div className="px-5 py-3">
      <ReactCarousel>
        {collections?.map((collection: ICollection) => (
          <CarouselItem key={collection.id} className="basis-[80px] md:basis-[100px]">
            <Item collection={collection} />
          </CarouselItem>
        ))}
      </ReactCarousel>
    </div>
  );
};

const Item = ({ collection }: { collection: ICollection }) => {
  return (
    <>
      <Link key={collection.id} href={`/gallery/${collection.slug}`} className="flex items-center flex-col tablet:flex-row">
        <div className="tablet:hidden bg-gray-100 rounded-xl w-[60px] h-[60px]  flex items-center justify-center">
          <Image
            src={collection.icon}
            alt={collection.name}
            width={0}
            height={0}
            sizes="100vw"
            className="w-[40px] h-[40px]"
          />
        </div>
        <p className="text-sm mobile:text-base tablet:text-lg">{collection.name}</p>
      </Link>
    </>
  );
};

export default GalleryCollections;
