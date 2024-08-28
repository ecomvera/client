import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoHeart, IoHeartOutline, IoStar } from "react-icons/io5";

const ProductCard = () => {
  const [added, setAdded] = useState(false);

  return (
    <div className="w-full text-light-1">
      <Link href={"/p/1"}>
        <div className="relative">
          <div
            className="absolute top-1 right-1 z-[1]"
            onClick={(event) => {
              event.preventDefault();
              setAdded(!added);
            }}
          >
            {added ? <IoHeart className="text-2xl text-red-500" /> : <IoHeartOutline className="text-2xl" />}
          </div>

          <Image
            src={"/assets/sample-tshirt.webp"}
            alt="mugs"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto mx-auto"
          />

          <div className="absolute bottom-2 rounded-l right-0 bg-light-1 text-background px-1 flex gap-1 items-center text-xs">
            <IoStar fill="#FFC107" /> 4.5
          </div>
        </div>

        <div className="p-1">
          <p className="text-sm tablet:text-lg font-bold text-ellipsis truncate">Men T-Shirt for men sure</p>
          <p className="text-lg tablet:text-lg  font-semibold">
            ₹50.00 <span className="text-xs font-extralight tablet:text-sm line-through text-">₹50.00</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
