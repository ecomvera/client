"use client";

import SelectSize from "@/components/Dialogs/SelectSize";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useData } from "@/hooks/useData";
import { useToken } from "@/hooks/useToken";
import { useUser } from "@/hooks/useUser";
import { useDataStore } from "@/stores/data";
import { ICartItem } from "@/types";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "@/components/ui/use-toast";

const Page = () => {
  const { cart, wishlist } = useData();
  const { user } = useUser();
  const { token } = useToken();
  const { removeFromWishlist, setCart } = useDataStore();

  // if (!user) return null;
  return (
    <div className="max-w-desktop mx-auto px-2 py-5">
      <h1 className=" text-xl md:text-2xl text-[--black]">WishList</h1>

      <div className="mt-4">
        {wishlist.length === 0 || !user ? (
          <div>
            <div className="text-light-1">No items in your wishlist</div>
            <Image
              src="/assets/wishlist.png"
              alt="empty"
              width={0}
              height={0}
              sizes="100vw"
              className="mx-auto py-16 w-56 tablet:w-64 laptop:w-80"
            />
            <div className="flex items-center justify-center py-10">
              <Button onClick={() => window.location.replace("/")} className="bg-[--c2]">
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <ProductList
            wishlistItems={wishlist}
            token={token}
            cart={cart}
            removeFromWishlist={removeFromWishlist}
            setCart={setCart}
          />
        )}
      </div>
    </div>
  );
};

const ProductList = ({
  wishlistItems,
  token,
  cart,
  removeFromWishlist,
  setCart,
}: {
  wishlistItems: ICartItem[];
  token: { access: string | null };
  cart: ICartItem[];
  removeFromWishlist: (id: string) => void;
  setCart: (item: ICartItem[]) => void;
}) => {
  const handleDeleteItem = async (id: string) => {
    const res = await fetch("/api/user/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ id: id }),
    }).then((res) => res.json());

    if (res.ok) {
      removeFromWishlist(id);
      toast({
        title: "Success",
        variant: "default",
        description: "Item removed from wishlist",
      });
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlistItems.map((item) => (
        <Card key={item.id} className="border border-gray-200">
          <CardContent className="p-2 mobile:p-2">
            <div className="aspect-[3/4] relative mb-3">
              <Image
                src={item.product.images[0].url || "/placeholder.svg"}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-sm line-clamp-2">{item.product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="font-bold">₹{item.product.price}</span>
                <span className="text-gray-500 text-sm line-through">₹{item.product.mrp}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 p-4 pt-0">
            <SelectSize item={item} moveToCart deleteItem={() => handleDeleteItem(item.id)} />
            <Button className="w-full hover:bg-red-100" variant="ghost" onClick={() => handleDeleteItem(item.id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Page;
