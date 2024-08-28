"use client";

import Image from "next/image";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ProductDetails = () => {
  const images = ["/assets/p1.webp", "/assets/p2.webp", "/assets/p3.webp", "/assets/p4.webp", "/assets/p5.webp"];
  return (
    <div className="py-5">
      <div className="flex flex-col tablet:flex-row">
        <LeftGallaryView images={images} />
        <ProductDetail />
      </div>
    </div>
  );
};

const LeftGallaryView = ({ images }: { images: string[] }) => {
  const [currentSlide, setCurrentSlide] = useState(images[0]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(images[index]);
  };

  return (
    <div className="flex justify-center h-[330px] mobile:h-[420px]">
      <div className="relative flex flex-col w-[80px] h-full">
        {images.map((image, index) => (
          <div key={index} className="relative cursor-pointer border border-muted-foreground m-[2px] h-[80px] bg-background">
            <Image
              layout="fill"
              key={index}
              src={image}
              alt="product"
              objectFit="contain"
              objectPosition="center"
              onClick={() => handleSlideChange(index)}
            />
          </div>
        ))}
      </div>

      <div className="relative w-[350px]">
        <Image layout="fill" src={currentSlide} quality={100} objectFit="contain" objectPosition="center" alt="product" />
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const router = useRouter();
  const sizes = ["S", "M", "L", "XL", "2XL"];

  const keyHighlight = [
    { key: "Design", value: "Graphic design" },
    { key: "Color", value: "Black" },
    { key: "Wash Care", value: "Hand Wash" },
    { key: "Fabric", value: "100% Cotton" },
    { key: "Neck", value: "V-Neck" },
    { key: "Sleeve", value: "Half Sleeve" },
    { key: "Style", value: "Classic" },
  ];

  return (
    <div className="w-full px-2 tablet:px-5 laptop:px-10 mt-5 tablet:mt-0">
      <h2 className="head-text text-dark-3 font-bold">Product name </h2>
      <p className="text-sm mobile:text-lg">
        Product description Sapiente iste placeat at qui voluptatem eaque dolore itaque numquam. Nihil omnis velit non facere
        sequi. Vel qui quasi nobis ipsa assumenda. Similique explicabo delectus.
      </p>

      <p className="head-text font-semibold mt-5">Rs. 5000.00</p>
      <p className="text-sm font-normal text-light-3 line-through">MRP 5000.00</p>

      <div className="border w-fit border-light-3 px-3 my-5">
        <p className="text-base font-semibold text-light-3">100% cotton</p>
      </div>

      <p className="text-base mobile:text-lg font-semibold text-dark-3 uppercase mt-5">Select Size</p>
      <div className="flex gap-1">
        {sizes.map((size) => (
          <div key={size} className="border border-light-3 px-3 py-1 cursor-pointer">
            <p className="text-base mobile:text-lg font-semibold text-dark-3">{size}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 py-5">
        <button
          className=" bg-success text-white rounded-[5px] uppercase text-sm tablet:text-base font-bold p-2 px-4"
          onClick={() => router.push("/cart")}
        >
          Add to cart
        </button>
        <button className=" bg-secondary text-white rounded-[5px] uppercase text-sm tablet:text-base font-bold p-2 px-4">
          Add to wishlist
        </button>
      </div>

      <div>
        <span className="flex items-center gap-2">
          <IoLocationOutline className="text-base" />
          <p className="text-base font-semibold text-dark-3">Check for delivery details</p>
        </span>
        <p className="text-sm mobile:text-base font-normal text-light-3">Delivering all over India</p>

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
        {keyHighlight.map((item, index) => (
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
