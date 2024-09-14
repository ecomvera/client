import SelectSize from "@/components/Dialogs/SelectSize";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useData } from "@/hooks/useData";
import { useUser } from "@/hooks/useUser";
import { checkExistsOrAddToCart, useDataStore } from "@/stores/data";
import { ICartItem, IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WishList = ({ cart, wishlist }: { cart: ICartItem[]; wishlist: ICartItem[] }) => {
  const { user, token } = useUser();
  const { removeFromWishlist, setCart } = useDataStore();

  if (!user) return null;
  return (
    <div>
      <h1 className="font-semibold text-xl md:text-2xl font-sans text-light-1">WishList</h1>

      <div className="mt-4">
        {wishlist.length === 0 ? (
          <div className="text-light-1">No items in your wishlist</div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,150px))] gap-4">
            {wishlist.map((i) => (
              <ProductCard
                key={i.id}
                item={i}
                token={token}
                cart={cart}
                removeFromWishlist={removeFromWishlist}
                setCart={setCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({
  item,
  token,
  cart,
  removeFromWishlist,
  setCart,
}: {
  item: ICartItem;
  token: { access: string | null };
  cart: ICartItem[];
  removeFromWishlist: (id: string) => void;
  setCart: (item: ICartItem[]) => void;
}) => {
  const handleDeleteItem = async () => {
    removeFromWishlist(item.id);
    await fetch("/api/user/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ id: item.id }),
    });
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
        <SelectSize item={item} moveToCart deleteItem={handleDeleteItem} />
        <Button className="w-full hover:bg-red-300" variant="outline" onClick={handleDeleteItem}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WishList;
