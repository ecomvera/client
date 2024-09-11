import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICartItem, IKeyValue } from "@/types";
import { ArrowDownIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { useStore } from "@/stores/store";

const SelectSize = ({ item }: { item: ICartItem }) => {
  const { addToCart, removeFromCart } = useStore();
  const [selectedSize, setSelectedSize] = useState(item.size);

  const createItemId = () => {
    return `${item.product.id}-${item.color}-${selectedSize}`;
  };

  const handleChangeSize = () => {
    if (selectedSize === item?.size) return;

    addToCart({ ...item, size: selectedSize, itemId: createItemId() });
    removeFromCart(item);
  };

  return (
    <Dialog onOpenChange={() => setSelectedSize(item?.size)}>
      <DialogTrigger className="flex items-center text-xs tablet:text-base">
        Size: <span className="font-semibold ml-1 ">{item?.size}</span> <ChevronDownIcon className="w-5 h-5" />
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
