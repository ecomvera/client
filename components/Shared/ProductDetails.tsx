"use client";

import Image from "next/image";
import Carousel from "./Carousel";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Input } from "../ui/input";

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
    <div className="gap-2 tablet:gap-5 flex justify-center py-8 h-fit">
      <div className="w-[80px]">
        <Carousel isVertical infinite nodots>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="product"
              width={20}
              height={0}
              sizes="100vw"
              onClick={() => handleSlideChange(index)}
              className="cursor-pointer"
            />
          ))}
        </Carousel>
      </div>

      <div className="">
        <Image src={currentSlide} alt="product" width={400} height={0} sizes="100vw" />
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const sizes = ["S", "M", "L", "XL", "2XL"];

  const keyHighlight = {
    Design: "Graphic design",
    Color: "Black",
    "Wash Care": "Hand Wash",
    Fabric: "100% Cotton",
    Neck: "V-Neck",
    Sleeve: "Half Sleeve",
    Style: "Classic",
  };

  return (
    <div className="flex-1 px-2 tablet:px-5 laptop:px-10">
      <h2 className="text-3xl text-dark-3 font-bold mt-8">Product name </h2>
      <p className="mt-5 text-lg">
        Product description Sapiente iste placeat at qui voluptatem eaque dolore itaque numquam. Nihil omnis velit non facere
        sequi. Vel qui quasi nobis ipsa assumenda. Similique explicabo delectus.
      </p>

      <p className="text-3xl font-semibold mt-5">Rs. 5000.00</p>
      <p className="text-sm font-normal text-light-3">MRP incl. of all taxes</p>

      <div className="border w-fit border-light-3 px-3 my-5">
        <p className="text-lg font-semibold text-light-3">100% cotton</p>
      </div>

      <p className="text-lg font-semibold text-dark-3 uppercase mt-10">Select Size</p>
      <div className="flex gap-5 mt-3">
        {sizes.map((size) => (
          <div key={size} className="border border-light-3 px-3 py-1 cursor-pointer">
            <p className="text-lg font-semibold text-dark-3">{size}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-5 py-5 tablet:py-10">
        <button className="w-full bg-success text-white rounded-[5px] uppercase text-md font-bold h-[50px] mt-5">
          Add to cart
        </button>
        <button className="w-full bg-secondary text-white rounded-[5px] uppercase text-md font-bold h-[50px] mt-5">
          Add to wishlist
        </button>
      </div>

      <div>
        <span className="flex items-center gap-2">
          <IoLocationOutline className="text-2xl" />
          <p className="text-lg font-semibold text-dark-3 uppercase">Check for delivery details</p>
        </span>
        <p className="text-lg font-normal text-light-3">Delivering all over India</p>

        <div className="border my-5 py-1 flex items-center gap-5">
          <Input
            type="text"
            placeholder="Enter Pincode"
            className="border-0 focus-visible:ring-transparent shadow-none text-lg"
          />
          <p className="text-base font-semibold text-success uppercase mr-3 cursor-pointer">Check</p>
        </div>
      </div>

      <p className="text-2xl font-semibold text-dark-3 mt-10">Key Highlights</p>
      <ul className="list-disc list-inside">
        {Object.entries(keyHighlight).map(([key, value]) => (
          <li key={key} className="text-lg text-dark-3">
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;
