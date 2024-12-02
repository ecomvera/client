"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { IProduct, IProductSize } from "@/types";
import { useDataStore } from "@/stores/data";
import { useUser } from "@/hooks/useUser";
import { useData } from "@/hooks/useData";
import { AspectRatio } from "../ui/aspect-ratio";
import ImgaeGallary from "./ImgaeGallary";
import { useToken } from "@/hooks/useToken";
import ReturnDetails from "./ReturnDetails";
import { boldNumbersInString, getDiscount } from "@/lib/utils";
import { toast } from "../ui/use-toast";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.hex);

  return (
    <div className="py-2 mobile:py-5">
      <div className="flex flex-col tablet:flex-row">
        <div className="h-full tablet:sticky top-16">
          <LeftGallaryView images={product.images} currentColor={selectedColor} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <ProductDetail data={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </div>
      </div>
    </div>
  );
};

const LeftGallaryView = ({ images, currentColor }: { images: IProduct["images"]; currentColor: string }) => {
  const [currentSlide, setCurrentSlide] = useState(images.filter((image) => image.color === currentColor)[0].url);
  const [open, setOpen] = useState(false);
  const [startWith, setStartWith] = useState(0);

  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleSlideChange = (url: string) => {
    setCurrentSlide(url);
  };

  useEffect(() => {
    setCurrentSlide(images.filter((image) => image.color === currentColor)[0].url);
  }, [currentColor]);

  return (
    <div className="w-full tablet:w-auto flex flex-col justify-center gap-1 mobile:flex-row-reverse">
      <ImgaeGallary images={images} open={open} setOpen={setOpen} startWith={startWith} />
      <div
        className="relative w-full mobile:w-[500px] tablet:w-[350px] laptop:w-[500px] transition-all"
        onClick={() => {
          setOpen(true);
          setStartWith(images.findIndex((image) => image.url === currentSlide));
        }}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMoveCapture={(e) => {
          if (!showZoom) return;
          // @ts-ignore
          const rect = e.target.getBoundingClientRect();
          let x = ((e.clientX - rect.left) / rect.width) * 100;
          let y = ((e.clientY - rect.top) / rect.height) * 100;
          x = Math.max(0, Math.min(100, x));
          y = Math.max(0, Math.min(100, y));
          setZoomPosition({ x, y });
        }}
      >
        <AspectRatio ratio={0.8 / 1} className="border rounded-md relative">
          <Image
            priority
            src={currentSlide}
            quality={100}
            className="w-full h-full object-cover rounded-md"
            alt="product"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </AspectRatio>
      </div>

      {showZoom && (
        <div className="hidden tablet:block w-[500px] h-auto border border-gray-300 overflow-hidden absolute top-0 right-[-500px] bg-gray-50 rounded-md">
          <AspectRatio ratio={0.8 / 1} className="border rounded-md relative">
            <Image
              priority
              src={currentSlide}
              quality={100}
              className="absolute w-full h-full object-cover rounded-md"
              style={{
                transformOrigin: "center center",
                transform: `translate(calc(-${Math.max(0, Math.min(100, zoomPosition.x))}% + 50%), 
                              calc(-${Math.max(0, Math.min(100, zoomPosition.y))}% + 50%)) scale(2)`,
              }}
              alt="product"
              width={500}
              height={500}
            />
          </AspectRatio>
        </div>
      )}

      <div className="flex justify-between w-full h-fit mobile:flex-col mobile:w-[100px] tablet:w-[70px] laptop:w-[100px] tablet:transition-all">
        {images
          .filter((image) => image.color === currentColor)
          .map((image, index) => (
            <div key={index} className={`cursor-pointer w-full`}>
              <AspectRatio ratio={0.8 / 1} className="border rounded-md">
                <Image
                  priority
                  key={image.key}
                  src={image.url.split("/upload")[0] + "/upload/w_80/" + image.url.split("/upload")[1]}
                  alt="product"
                  className="w-full h-full object-cover rounded-md"
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onClick={() => {
                    if (currentSlide === image.url) return;
                    handleSlideChange(image.url);
                  }}
                  // onMouseEnter={() => { }}
                />
              </AspectRatio>
            </div>
          ))}
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
  const pathname = usePathname();
  const { user } = useUser();
  const { token } = useToken();
  const { cart, wishlist } = useData();
  const { addToCart, addToWishlist, removeFromWishlist } = useDataStore();
  const [selectedSize, setSelectedSize] = useState<IProductSize>();
  const [showSelectSizeMessage, setShowSelectSizeMessage] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const createItemId = (key?: string) => {
    return `${data.id}-${selectedColor}-${key === "wishlist" ? data.sizes[0].key : selectedSize?.key}`;
  };

  const isInWishlist = wishlist.some((item) => item.id === `${data.id}-${selectedColor}-${data.sizes[0].key}`);
  const isExistInCart = cart.some((item) => item.id === createItemId());
  const isItemUnavailable = useMemo(() => !data.sizes.some((size) => size.quantity > 0), [data]);

  const item = {
    id: createItemId(),
    color: selectedColor,
    size: selectedSize?.key,
    quantity: 1,
    productId: data.id || "",
  };

  const handleAddToCart = async () => {
    if (!selectedSize?.key) return setShowSelectSizeMessage(true);
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
    if (!user) {
      toast({
        description: "Please sign in to add items to your wishlist",
      });
      return router.push(`/sign-in?src=${pathname}`);
    }
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
    <div className="w-full px-2 mt-2 tablet:mt-0 laptop:px-5">
      <h2 className="text-xl font-bold">{data.name}</h2>
      <div>
        <p className={`${!showMore && "line-clamp-3"}`}>{data.description}</p>
        <span onClick={() => setShowMore(!showMore)} className="text-sm font-semibold text-blue-700 cursor-pointer">
          {!showMore ? "Read more" : "Read less"}
        </span>
      </div>

      <div className="flex mt-5 items-end gap-2">
        <p className="text-xl font-semibold">Rs. {data.price}</p>
        <p className="text-sm font-normal text-light-3 line-through">MRP {data.mrp}</p>
        <p className="text-lg text-green-600 font-semibold">{getDiscount(data.price, data.mrp)}% off</p>
      </div>
      <span className="text-sm font-normal text-light-3">incl. of all taxes</span>

      <div className="border w-fit border-light-3 px-3 my-5">
        <p className="text-base font-semibold text-light-1">{data.material}</p>
      </div>

      <p className="text-base mobile:text-lg font-semibold text-dark-3 uppercase mt-5">Select Color</p>
      <div className="flex gap-1">
        {data.colors.map((color) => (
          <div
            key={color.id}
            className={`w-9 h-9 rounded-full items-center justify-center cursor-pointer flex shadow-gray-500 shadow-sm`}
            style={{
              backgroundColor: color.hex,
              border: selectedColor === color.hex ? `1px solid black` : "1px solid transparent",
            }}
            onClick={() => setSelectedColor(color.hex)}
          >
            {selectedColor === color.hex && <div className="w-8 h-8 rounded-full border-white border-2" />}
          </div>
        ))}
      </div>

      {isItemUnavailable ? (
        <div className="py-5">
          <p className="text-base mobile:text-lg font-semibold text-red-600/70 uppercase">Out of Stock</p>
        </div>
      ) : (
        <>
          <p className="text-base mobile:text-lg font-semibold text-dark-3 uppercase mt-5">Select Size</p>
          <div className="flex gap-1">
            {data.sizes.map(
              (size) =>
                size.quantity > 0 &&
                size.productColor === selectedColor && (
                  <div key={size.key} className="flex flex-col">
                    <div
                      className="border border-light-3 w-10 h-10 flex justify-center items-center cursor-pointer"
                      style={{ border: selectedSize?.key === size.key ? `2px solid black` : "2px solid lightgray" }}
                      onClick={() => setSelectedSize(size)}
                    >
                      <p
                        className={`text-base mobile:text-lg font-${
                          selectedSize?.key === size.key ? "bold" : "semibold"
                        } text-dark-3`}
                      >
                        {size.key}
                      </p>
                    </div>
                    {size.quantity < 10 && <p className="text-xs text-red-600 font-semibold">{size.quantity} left</p>}
                  </div>
                )
            )}
          </div>
          {selectedSize?.key && selectedSize.productColor === selectedColor && (
            <p className="text-sm font-normal mt-2">
              <span>
                Size: <b>{selectedSize?.key}</b>
              </span>
              <span
                className="ml-2"
                dangerouslySetInnerHTML={{ __html: boldNumbersInString(selectedSize?.value as string) }}
              />
            </p>
          )}
          {!selectedSize?.key && showSelectSizeMessage && (
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
        </>
      )}

      <div>
        <span className="flex items-center gap-2">
          <IoLocationOutline className="text-base" />
          <p className="text-base font-semibold text-dark-3">Check for delivery details</p>
        </span>
        <p className="text-sm mobile:text-base font-normal text-light-1">Delivering all over India</p>

        <div className="border my-3 flex items-center gap-5 w-full tablet:max-w-[300px]">
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

      <ReturnDetails />
    </div>
  );
};

export default ProductDetails;
