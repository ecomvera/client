import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoHeart, IoHeartOutline, IoStar } from "react-icons/io5";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ProductCard = ({
  product,
  showHeart = true,
  showRating = true,
}: {
  product: IProduct;
  showHeart?: boolean;
  showRating?: boolean;
}) => {
  const [added, setAdded] = useState(false);

  return (
    <Card className="flex aspect-auto items-center justify-center text-light-1 overflow-hidden rounded-none border-none shadow-none">
      <Link href={`/p/${product.slug}`}>
        <CardHeader className="relative p-0 w-full">
          {showHeart && (
            <div
              className="absolute top-1 right-1 z-[1]"
              onClick={(event) => {
                event.preventDefault();
                setAdded(!added);
              }}
            >
              {added ? <IoHeart className="text-2xl text-red-500" /> : <IoHeartOutline className="text-2xl" />}
            </div>
          )}

          <Image
            src={product.images[0].url}
            quality={10}
            priority
            alt="mugs"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full"
            style={{ margin: "0" }}
          />

          {showRating && (
            <div className="absolute bottom-2 rounded-l right-0 bg-light-1 text-background px-1 flex gap-1 items-center text-xs">
              <IoStar fill="#FFC107" /> 4.5
            </div>
          )}
        </CardHeader>

        <CardContent className="p-1">
          <p className="text-sm tablet:text-lg font-bold text-ellipsis truncate">{product.name}</p>
          <p className="text-sm tablet:text-lg  font-semibold">
            ₹{product.price}{" "}
            <span className="text-xs font-extralight tablet:text-sm line-through text-">₹{product.mrp}</span>
          </p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
