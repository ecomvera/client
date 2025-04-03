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
import { useRouter } from "next/navigation";

const SelectSize = ({
  item,
  moveToCart,
  deleteItem,
}: {
  item: ICartItem;
  moveToCart?: boolean;
  deleteItem?: () => void;
}) => {
  const router = useRouter();
  const { cart } = useData();
  const { user } = useUser();
  const { token } = useToken();
  const { setCart } = useDataStore();
  const [selectedSize, setSelectedSize] = useState(item.size || "");

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

    if (moveToCart && deleteItem) {
      deleteItem();
      router.push("/cart");
    }

    if (!user) return;
    await fetch("/api/user/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ cart: updatedCart.map(({ product, ...rest }) => rest) }),
    });
  };

  return (
    <Dialog onOpenChange={() => setSelectedSize(item?.size || "")}>
      <DialogTrigger className="flex items-center text-xs tablet:text-base" asChild>
        {moveToCart ? (
          <Button variant={"outline"} className="py-[6px] rounded-md w-full">
            Move to Cart
          </Button>
        ) : (
          <Button variant={"link"} className="py-[2px] h-fit rounded-md w-full decoration-transparent px-0">
            Size: <span className="font-semibold ml-1 ">{item?.size}</span> <ChevronDownIcon className="w-5 h-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Size</DialogTitle>
          <DialogDescription>Select from the list of sizes</DialogDescription>
          <div className="flex flex-wrap gap-3 pt-5">
            {item?.product.sizes
              .filter((size) => size.productColor === item.color)
              .map((size) => (
                <div
                  key={size.key}
                  className={`border border-primary rounded-md px-2 py-1 w-10 h-10 flex items-center justify-center cursor-pointer font-semibold ${
                    size.key === selectedSize ? "bg-[--c1] text-[--white] border-[--c1]" : ""
                  }`}
                  onClick={() => setSelectedSize(size.key)}
                >
                  <span>{size.key}</span>
                </div>
              ))}
          </div>
        </DialogHeader>
        <DialogTrigger asChild>
          <Button
            className="w-full text-lg bg-[--c2] hover:bg-[--c3]"
            onClick={handleChangeSize}
            disabled={selectedSize === "" || selectedSize === item?.size}
          >
            Confirm
          </Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

export default SelectSize;
