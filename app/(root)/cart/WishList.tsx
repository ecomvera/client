import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useStore } from "@/stores/store";
import { ICartItem, IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WishList = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  return (
    <div>
      <h1 className="font-semibold text-xl md:text-2xl font-sans text-light-1">WishList</h1>

      <div className="mt-4">
        {wishlist.length === 0 ? (
          <div className="text-light-1">No items in your wishlist</div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,150px))] gap-4">
            {wishlist.map((i) => (
              <ProductCard key={i.itemId} item={i} removeFromWishlist={removeFromWishlist} addToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({
  item,
  removeFromWishlist,
  addToCart,
}: {
  item: ICartItem;
  removeFromWishlist: (id: string) => void;
  addToCart: (item: ICartItem) => void;
}) => {
  const handleRemove = () => {
    removeFromWishlist(item.itemId);
  };

  const handleMoveToCart = () => {
    removeFromWishlist(item.itemId);
    addToCart(item);
  };
  return (
    <Card className="items-center justify-center text-light-1 overflow-hidden rounded-none border-none shadow-none">
      <Link href={`/p/${item.product.slug}`}>
        <CardHeader className="relative p-0 w-full">
          <Image
            src={item.product.images[0].url}
            quality={10}
            priority
            alt="mugs"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full"
            style={{ margin: "0" }}
          />
        </CardHeader>

        <CardContent className="p-1">
          <p className="text-sm tablet:text-base font-semibold text-ellipsis truncate">{item.product.name}</p>
          <p className="text-sm tablet:text-base font-semibold">
            ₹{item.product.price}{" "}
            <span className="text-xs font-extralight tablet:text-sm line-through text-">₹{item.product.mrp}</span>
          </p>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col gap-1 p-0 m-0">
        <Button className="w-full hover:bg-green-400" variant="outline" onClick={handleMoveToCart}>
          Move to Cart
        </Button>
        <Button className="w-full hover:bg-red-300" variant="outline" onClick={handleRemove}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WishList;
