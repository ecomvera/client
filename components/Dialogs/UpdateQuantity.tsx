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
import { useMemo, useState } from "react";
import { useDataStore } from "@/stores/data";
import { useUser } from "@/hooks/useUser";
import { useToken } from "@/hooks/useToken";

const UpdateQuantity = ({ item }: { item: ICartItem }) => {
  const { user } = useUser();
  const { token } = useToken();
  const { updateQuantity } = useDataStore();
  const [currentQnt, setCurrentQnt] = useState(item.quantity);

  const handleQuantity = async () => {
    if (currentQnt === item?.quantity) return;
    updateQuantity(item.id, currentQnt);

    if (!user) return;
    await fetch("/api/user/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ id: item.id, quantity: currentQnt }),
    });
  };

  const getSizeQuantity = useMemo(() => item.product.sizes.filter((size) => size.key === item?.size)[0].quantity, [item]);

  return (
    <Dialog>
      <DialogTrigger className="flex items-center text-xs tablet:text-base">
        Qnt: <span className="font-semibold ml-2">{item?.quantity}</span> <ChevronDownIcon className="w-5 h-5 ml-2" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Quantiry</DialogTitle>
          <DialogDescription>Select from the list of sizes</DialogDescription>
          <div className="flex flex-wrap gap-3 pt-5">
            {Array.from({ length: getSizeQuantity < 10 ? getSizeQuantity : 10 }).map((_, i) => (
              <div
                key={i + 1}
                className={`border border-primary rounded-md px-2 py-1 w-10 h-10 flex items-center justify-center cursor-pointer font-semibold ${
                  i + 1 === currentQnt ? "bg-[--c1] text-[--white] border-[--c1]" : ""
                }`}
                onClick={() => setCurrentQnt(i + 1)}
              >
                <span>{i + 1}</span>
              </div>
            ))}
          </div>
          {getSizeQuantity < 10 && (
            <p className="text-sm text-red-500">
              Only {getSizeQuantity} item{getSizeQuantity > 1 ? "s" : ""} left
            </p>
          )}
        </DialogHeader>
        <DialogTrigger asChild>
          <Button className="w-full text-lg bg-[--c2] hover:bg-[--c3]" onClick={handleQuantity}>
            Confirm
          </Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateQuantity;
