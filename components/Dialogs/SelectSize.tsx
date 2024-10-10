import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICartItem } from "@/types";
import { ArrowDownIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { checkExistsOrAddToCart, useDataStore } from "@/stores/data";
import { useData } from "@/hooks/useData";
import { useUser } from "@/hooks/useUser";
import { useToken } from "@/hooks/useToken";

const SelectSize = ({
  item,
  moveToCart,
  deleteItem,
}: {
  item: ICartItem;
  moveToCart?: boolean;
  deleteItem?: () => void;
}) => {
  const { cart } = useData();
  const { user } = useUser();
  const { token } = useToken();
  const { setCart } = useDataStore();
  const [selectedSize, setSelectedSize] = useState(item.size);

  const createItemId = () => {
    return `${item.product.id}-${item.color}-${selectedSize}`;
  };

  const handleChangeSize = async () => {
    if (selectedSize === item?.size) return;

    const updatedCart = checkExistsOrAddToCart(cart, { ...item, size: selectedSize, id: createItemId() }).filter(
      (i) => i.id !== item.id
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (moveToCart && deleteItem) deleteItem();

    if (!user) return;
    await fetch("/api/user/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ cart: updatedCart.map(({ product, ...rest }) => rest) }),
    });
  };

  return (
    <Dialog onOpenChange={() => setSelectedSize(item?.size)}>
      <DialogTrigger className="flex items-center text-xs tablet:text-base">
        {moveToCart ? (
          <span className="w-full hover:bg-primary-foreground border py-[6px] px-6 rounded-md">Move to Cart</span>
        ) : (
          <>
            Size: <span className="font-semibold ml-1 ">{item?.size}</span> <ChevronDownIcon className="w-5 h-5" />
          </>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Size</DialogTitle>
          <DialogDescription>Select from the list of sizes</DialogDescription>
          <div className="flex gap-3 pt-5">
            {item?.product.sizes.map((size) => (
              <div
                key={size.key}
                className={`border border-primary rounded-md px-2 py-1 w-10 h-10 flex items-center justify-center cursor-pointer font-semibold ${
                  size.key === selectedSize ? "bg-primary text-white" : ""
                }`}
                onClick={() => setSelectedSize(size.key)}
              >
                <span>{size.key}</span>
              </div>
            ))}
          </div>
        </DialogHeader>
        <DialogTrigger asChild>
          <Button className="w-full text-lg" onClick={handleChangeSize}>
            Confirm
          </Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

export default SelectSize;
