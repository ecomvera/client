"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types";
import { useDataStore } from "@/stores/data";
import { useUser } from "@/hooks/useUser";
import { useData } from "@/hooks/useData";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="mobile:py-5">
      <div className="flex flex-col items-center tablet:items-start tablet:flex-row">
        <LeftGallaryView images={product.images} />
        <ProductDetail data={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
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

const ProductDetail = ({
  data,
  selectedColor,
  setSelectedColor,
}: {
  data: IProduct;
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();
  const { user, token } = useUser();
  const { cart, wishlist } = useData();
  const { addToCart, addToWishlist, removeFromWishlist } = useDataStore();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showSelectSizeMessage, setShowSelectSizeMessage] = useState(false);

  const createItemId = (key?: string) => {
    return `${data.id}-${selectedColor}-${key === "wishlist" ? data.sizes[0].key : selectedSize}`;
  };

  const isInWishlist = wishlist.some((item) => item.id === `${data.id}-${selectedColor}-${data.sizes[0].key}`);
  const isExistInCart = cart.some((item) => item.id === createItemId());

  const item = {
    id: createItemId(),
    color: selectedColor,
    size: selectedSize,
    quantity: 1,
    productId: data.id || "",
  };

  const handleAddToCart = async () => {
    if (!selectedSize) return setShowSelectSizeMessage(true);
    if (isExistInCart) return router.push("/cart");

    addToCart({ ...item, product: data });
    if (!user) return;

    // add item to DB if user is logged in
    await fetch("/api/user/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ item }),
    }).then((res) => res.json());
  };

  const handleAddToWishlist = async () => {
    if (!user) return router.push("/login");
    const id = createItemId("wishlist");

    if (isInWishlist) {
      const res = await fetch("/api/user/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
        body: JSON.stringify({ id }),
      }).then((res) => res.json());
      if (res.ok) removeFromWishlist(id);
      return;
    }

    addToWishlist({ ...item, id, product: data });
    const res = await fetch("/api/user/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ item: { ...item, id } }),
    }).then((res) => res.json());
    if (!res.ok) removeFromWishlist(id);
  };

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

      <p className="text-base mobile:text-lg font-semibold text-dark-3 uppercase mt-5">Select Color</p>
      <div className="flex gap-1">
        {data.colors.map((color) => (
          <div
            key={color}
            className={`w-9 h-9 rounded-full items-center justify-center cursor-pointer flex`}
            style={{
              backgroundColor: color,
              border: selectedColor === color ? `1px solid ${color}` : "1px solid transparent",
            }}
            onClick={() => setSelectedColor(color)}
          >
            {selectedColor === color && <div className="w-8 h-8 rounded-full border-white border-2" />}
          </div>
        ))}
      </div>

      <p className="text-base mobile:text-lg font-semibold text-dark-3 uppercase mt-5">Select Size</p>
      <div className="flex gap-1">
        {data.sizes.map((size) => (
          <div
            key={size.key}
            className="border border-light-3 w-10 h-10 flex justify-center items-center cursor-pointer"
            style={{ border: selectedSize === size.key ? `2px solid black` : "2px solid lightgray" }}
            onClick={() => setSelectedSize(size.key)}
          >
            <p className={`text-base mobile:text-lg font-${selectedSize === size.key ? "bold" : "semibold"} text-dark-3`}>
              {size.key}
            </p>
          </div>
        ))}
      </div>
      {!selectedSize && showSelectSizeMessage && (
        <div className="text-red-500 font-sans text-sm tablet:text-base tablet:font-semibold">Please select a size</div>
      )}

      <div className="flex gap-2 py-5">
        <button
          className={`bg-green-600 text-white rounded-[5px] text-sm tablet:text-base font-bold p-2 px-4 flex-1 md:flex-none`}
          onClick={handleAddToCart}
        >
          {isExistInCart ? "Added. Go to cart" : "Add to cart"}
        </button>
        <button
          className={`${
            isInWishlist ? "bg-red-600" : "bg-gray-600"
          } text-white rounded-[5px] text-sm tablet:text-base font-bold p-2 px-4 flex-1 md:flex-none`}
          onClick={handleAddToWishlist}
        >
          {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
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
