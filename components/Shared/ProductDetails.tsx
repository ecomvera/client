"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IoHeart, IoHeartOutline, IoLocationOutline } from "react-icons/io5";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ICartItem, IProduct, IProductSize } from "@/types";
import { useDataStore } from "@/stores/data";
import { useUser } from "@/hooks/useUser";
import { useData } from "@/hooks/useData";
import { AspectRatio } from "../ui/aspect-ratio";
import ImgaeGallary from "./ImgaeGallary";
import { useToken } from "@/hooks/useToken";
import ReturnDetails from "./ReturnDetails";
import { boldNumbersInString, getDiscount } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import Reviews from "./Reviews";
import ProductImageSlider from "./ProductImageSlider";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ReactCarousel from "./Carousel";
import { HeartIcon, Share1Icon } from "@radix-ui/react-icons";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";
// import ImageCarousel from "./ImageCarouosel";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.hex);

  return (
    <div className="py-2 mobile:py-5 max-w-laptop mx-auto">
      <div className="grid grid-temps-1 tablet:grid-cols-2 gap-2">
        <div className="h-fit tablet:sticky top-20">
          <LeftGallaryView images={product.images} currentColor={selectedColor} video={product.video} />
        </div>
        <div className="flex-1">
          <ProductDetail data={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </div>
      </div>
    </div>
  );
};

const LeftGallaryView = ({
  images,
  currentColor,
  video,
}: {
  images: IProduct["images"];
  currentColor: string;
  video: string;
}) => {
  const [currentSlide, setCurrentSlide] = useState({
    type: "image",
    url: images.filter((image) => image.color === currentColor)[0].url,
  });
  const [open, setOpen] = useState(false);
  const [startWith, setStartWith] = useState(0);

  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleSlideChange = (type: string, url: string) => {
    setCurrentSlide({ type, url });
  };

  useEffect(() => {
    setCurrentSlide({
      type: "image",
      url: images.filter((image) => image.color === currentColor)[0].url,
    });
  }, [currentColor]);

  return (
    <div className="w-full tablet:w-auto flex flex-col justify-center gap-1 mobile:flex-row-reverse">
      {/* <ImgaeGallary images={images} open={open} setOpen={setOpen} startWith={startWith} /> */}

      {/* <ImageCarousel images={images} currentColor={currentColor} /> */}

      {/* main image  */}
      <div
        className="relative w-[370px] hidden mobile:block tablet:w-[460px] laptop:w-[500px] transition-all"
        onClick={() => {
          if (currentSlide.type !== "image") return;
          setOpen(true);
          setStartWith(images.findIndex((image) => image.url === currentSlide.url));
        }}
        onMouseEnter={() => currentSlide.type === "image" && setShowZoom(true)}
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
          {currentSlide.type === "image" ? (
            <Image
              priority
              src={currentSlide.url}
              quality={100}
              className="w-full h-full object-cover rounded-md"
              alt="product"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <video
              controls
              controlsList="nodownload nofullscreen noremoteplayback noplaybackrate "
              autoPlay
              muted
              className="w-full h-full"
            >
              <source src={video} type="video/mp4" />
            </video>
          )}
        </AspectRatio>
      </div>

      {showZoom && (
        <div className="hidden tablet:block w-[500px] h-auto border border-gray-300 overflow-hidden absolute top-0 right-[-500px] bg-gray-50 rounded-md">
          <AspectRatio ratio={0.8 / 1} className="border rounded-md relative">
            <Image
              priority
              src={currentSlide.url}
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

      {/* side gallary  */}
      <div className=" hidden mobile:flex justify-between h-fit mobile:mt-10 tablet:mt-10 laptop:mt-11 w-full mobile:w-[80px] tablet:w-[80px] laptop:w-[100px] ">
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full max-w-xs"
        >
          <CarouselContent className="-mt-1 mobile:h-[380px] tablet:h-[350px] laptop:h-[440px]">
            {images
              .filter((image) => image.color === currentColor)
              .map((image, index) => (
                <CarouselItem key={index} className="pt-1 basis-1/6">
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
                        onMouseEnter={() => {
                          if (currentSlide.url === image.url) return;
                          handleSlideChange("image", image.url);
                        }}
                        // onMouseEnter={() => { }}
                      />
                    </AspectRatio>
                  </div>
                </CarouselItem>
              ))}
            {video && (
              <CarouselItem className="pt-1 basis-1/5">
                <div className={`cursor-pointer w-full`}>
                  <AspectRatio ratio={0.8 / 1} className="border rounded-md">
                    <video
                      className="w-full h-full"
                      onMouseEnter={() => {
                        if (currentSlide.url === video) return;
                        handleSlideChange("video", video);
                      }}
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                  </AspectRatio>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* {images
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
                  onMouseEnter={() => {
                    if (currentSlide.url === image.url) return;
                    handleSlideChange("image", image.url);
                  }}
                  // onMouseEnter={() => { }}
                />
              </AspectRatio>
            </div>
          ))}
        {video && (
          <div className={`cursor-pointer w-full`}>
            <AspectRatio ratio={0.8 / 1} className="border rounded-md">
              <video
                className="w-full h-full"
                onMouseEnter={() => {
                  if (currentSlide.url === video) return;
                  handleSlideChange("video", video);
                }}
              >
                <source src={video} type="video/mp4" />
              </video>
            </AspectRatio>
          </div>
        )} */}

      {/* mobile view  */}
      <div className="mobile:hidden">
        <ReactCarousel showDots autoPlay={3000}>
          {images
            .filter((image) => image.color === currentColor)
            .map((image, index) => (
              <CarouselItem key={index} className="pt-1">
                <div key={index} className={`cursor-pointer w-full`}>
                  <AspectRatio ratio={0.8 / 1} className="border rounded-md">
                    <Image
                      priority
                      key={image.key}
                      src={image.url.split("/upload")[0] + "/upload/" + image.url.split("/upload")[1]}
                      alt="product"
                      className="w-full h-full object-cover rounded-md"
                      width={0}
                      height={0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onMouseEnter={() => {
                        if (currentSlide.url === image.url) return;
                        handleSlideChange("image", image.url);
                      }}
                      // onMouseEnter={() => { }}
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
            ))}
          {video && (
            <CarouselItem className="pt-1">
              <div className={`cursor-pointer w-full`}>
                <AspectRatio ratio={0.8 / 1} className="border rounded-md">
                  <video
                    className="w-full h-full"
                    onMouseEnter={() => {
                      if (currentSlide.url === video) return;
                      handleSlideChange("video", video);
                    }}
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                </AspectRatio>
              </div>
            </CarouselItem>
          )}
        </ReactCarousel>
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
  const { addToCart, addToWishlist, removeFromWishlist, removeFromCart } = useDataStore();
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
    });
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
      });
      if (res.ok) removeFromWishlist(id);
      return;
    }

    addToWishlist({ ...item, id, product: data });
    const res = await fetch("/api/user/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ item: { ...item, id } }),
    });
    if (!res.ok) removeFromWishlist(id);
  };

  const handleBuyNow = async () => {
    if (!selectedSize?.key) return setShowSelectSizeMessage(true);
    try {
      addToCart({ ...item, product: data });
      if (!user) {
        return router.push(`/sign-in?src=${pathname}`);
      }
      await fetch("/api/user/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) router.push("/checkout");
          else removeFromCart(item as ICartItem);
        });
    } catch (error) {
      removeFromCart(item as ICartItem);
      toast({
        variant: "destructive",
        description: "Something went wrong, please try again",
      });
    }
  };

  return (
    <div className="w-full px-2 relative tablet:static mt-2 tablet:mt-0 laptop:px-5">
      <div className="absolute right-0 top-[-30px] flex justify-end gap-3 mt-2">
        {isInWishlist ? (
          <IoHeart className="cursor-pointer w-6 h-6 text-red-500" onClick={handleAddToWishlist} />
        ) : (
          <IoHeartOutline className="cursor-pointer w-6 h-6" onClick={handleAddToWishlist} />
        )}
        <Share1Icon className="cursor-pointer w-6 h-6" />
      </div>
      <h2 className="text-xl font-medium leading-[1.2] mobile:mt-10 tablet:mt-0">
        {data.name} Voluptatem aut id placeat vitae officia. Est aut quia optio.
      </h2>
      <div className="mt-3">
        <p className={`${!showMore && "line-clamp-3"} break-all`}>{data.description}</p>
        <span onClick={() => setShowMore(!showMore)} className="text-base font-bold text-[--c1] cursor-pointer">
          {!showMore ? "Read more" : "Read less"}
        </span>
      </div>

      <div className="flex mt-5 items-end gap-2">
        <p className="text-xl font-semibold">Rs. {data.price}</p>
        <p className="text-sm font-normal text-light-3 line-through">MRP {data.mrp}</p>
        <p className="text-lg text-[--c1] font-bold leading-5">{getDiscount(data.mrp, data.price)}% off</p>
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
            className={`w-9 h-9 rounded-full items-center justify-center cursor-pointer flex shadow-[--black] shadow-sm`}
            style={{
              backgroundColor: color.hex,
              // border: selectedColor === color.hex ? `1px solid var(--c5)` : "1px solid transparent",
            }}
            onClick={() => setSelectedColor(color.hex)}
          >
            {selectedColor === color.hex && <div className="w-8 h-8 rounded-full border-[--white] border-2" />}
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
                      className="border w-10 h-10 rounded flex justify-center items-center cursor-pointer"
                      style={{
                        // border: selectedSize?.key === size.key ? `2px solid gray` : "2px solid lightgray",
                        backgroundColor: selectedSize?.key === size.key ? "var(--c1)" : "transparent",
                        color: selectedSize?.key === size.key ? "white" : "black",
                      }}
                      onClick={() => setSelectedSize(size)}
                    >
                      <p className={`text-base mobile:text-lg `}>{size.key}</p>
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

          <div className="flex gap-2 py-5 w-full">
            <Button
              className={` rounded tablet:text-base p-2 w-full flex items-center`}
              variant={"outline"}
              onClick={handleAddToCart}
            >
              <FaCartPlus className="mr-2 mt-[-2px]" />
              {isExistInCart ? "Added. Go to cart" : "Add to cart"}
            </Button>
            {/* <Link href="/checkout" className={`rounded tablet:text-base w-full bg-[--c2] hover:bg-[--c3]`}> */}
            <Button className={`rounded tablet:text-base p-2 w-full bg-[--c2] hover:bg-[--c3]`} onClick={handleBuyNow}>
              Buy Now
            </Button>
            {/* </Link> */}
          </div>
        </>
      )}

      <CheckPincode />

      <p className="text-xl font-semibold mt-10">Product Highlights</p>
      <div className="grid grid-cols-2 gap-5 mt-3 w-full">
        {data.attributes.map((item, index) => (
          <div key={index} className="">
            <p className="font-semibold">{item.key}</p>
            <p>{item.value}</p>
            <div className="w-full mobile:w-1/2 h-[1px] bg-light-3"></div>
          </div>
        ))}
      </div>

      <ReturnDetails />

      <Reviews data={data.ProductReviews || []} />
    </div>
  );
};

const CheckPincode = () => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/shipment/check-pincode?code=${code}`).then((res) => res.json());
    if (!res?.ok) {
      setError(res?.error || "Something went wrong");
      setSuccess(null);
      return;
    }
    if (res?.data) {
      setError(null);
      setSuccess(res.message);
    }
  };

  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [code]);

  return (
    <div>
      <span className="flex items-center gap-2">
        <IoLocationOutline className="text-2xl text-[--c3]" />
        <p className="text-base font-semibold text-dark-3">Check for delivery details</p>
      </span>
      <p className="text-sm mobile:text-base font-normal text-light-1">Delivering all over India</p>

      <form onSubmit={handleCheck} className="border rounded mt-3 flex items-center gap-5 w-full tablet:max-w-[400px]">
        <Input
          type="text"
          placeholder="Enter Pincode"
          className="border-0 focus-visible:ring-transparent shadow-none text-base"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button variant="link" type="submit" className="border-none uppercase decoration-transparent" disabled={!code}>
          Check
        </Button>
      </form>
      {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}
      {success && <p className="text-sm text-green-600 font-semibold">{success}</p>}
    </div>
  );
};

export default ProductDetails;
