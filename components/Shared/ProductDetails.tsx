"use client";

import Image from "next/image";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types";

const ProductDetails = ({ product }: { product: IProduct }) => {
  return (
    <div className="mobile:py-5">
      <div className="flex flex-col items-center tablet:items-start tablet:flex-row">
        <LeftGallaryView images={product.images} />
        <ProductDetail data={product} />
      </div>
    </div>
  );
};

const LeftGallaryView = ({ images }: { images: IProduct["images"] }) => {
  const [currentSlide, setCurrentSlide] = useState(images[0]?.url || "");

  const handleSlideChange = (index: number) => {
    setCurrentSlide(images[index].url);
  };

  return (
    <div className="flex gap-1 flex-col-reverse mobile:flex-row w-full max-w-[350px]">
      <div className="relative flex justify-between mobile:flex-col w-full mobile:w-[80px] h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative cursor-pointer border-2 m-[1px] h-full max-h-[80px] bg-background overflow-hidden ${
              currentSlide === image.url ? "border-muted-foreground" : ""
            }`}
          >
            <Image
              priority
              key={image.key}
              src={image.url}
              alt="product"
              className="w-full h-full object-cover"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onClick={() => handleSlideChange(index)}
            />
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-[350px]">
        <Image
          priority
          src={currentSlide}
          quality={100}
          className="w-full h-full object-cover"
          alt="product"
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

const ProductDetail = ({ data }: { data: IProduct }) => {
  const router = useRouter();

  return (
    <div className="w-full px-2 tablet:px-5 laptop:px-10 mt-2 tablet:mt-0">
      <h2 className="head-text font-bold">{data.name}</h2>
      <p className="text-sm mobile:text-lg">{data.description}</p>

      <p className="head-text font-semibold mt-5">
        Rs. {data.price} <span className="text-sm font-normal text-light-3">incl. of all taxes</span>
      </p>
      <p className="text-sm font-normal text-light-1 line-through">MRP {data.mrp}</p>

      <div className="border w-fit border-light-3 px-3 my-5">
        <p className="text-base font-semibold text-light-1">{data.material}</p>
      </div>

      <p className="text-base mobile:text-lg font-semibold text-dark-3 uppercase mt-5">Select Size</p>
      <div className="flex gap-1">
        {data.sizes.map((size) => (
          <div key={size.key} className="border border-light-3 px-3 py-1 cursor-pointer">
            <p className="text-base mobile:text-lg font-semibold text-dark-3">{size.key}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 py-5">
        <button
          className="bg-green-600 text-white rounded-[5px] uppercase text-sm tablet:text-base font-bold p-2 px-4"
          onClick={() => router.push("/cart")}
        >
          Add to cart
        </button>
        <button className="bg-gray-600 text-white rounded-[5px] uppercase text-sm tablet:text-base font-bold p-2 px-4">
          Add to wishlist
        </button>
      </div>

      <div>
        <span className="flex items-center gap-2">
          <IoLocationOutline className="text-base" />
          <p className="text-base font-semibold text-dark-3">Check for delivery details</p>
        </span>
        <p className="text-sm mobile:text-base font-normal text-light-1">Delivering all over India</p>

        <div className="border my-3 flex items-center gap-5 w-full tablet:w-[300px]">
          <Input
            type="text"
            placeholder="Enter Pincode"
            className="border-0 focus-visible:ring-transparent shadow-none text-base "
          />
          <Button variant="outline" className="border-none uppercase ">
            Check
          </Button>
        </div>
      </div>

      <p className="text-xl font-semibold text-dark-3 mt-10">Key Highlights</p>
      <div className="grid grid-cols-2 gap-5 mt-3">
        {data.attributes.map((item, index) => (
          <div key={index} className="text-lg text-dark-3">
            <p className="font-semibold">{item.key}</p>
            <p>{item.value}</p>
            <div className="w-full mobile:w-1/2 h-[1px] bg-light-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
