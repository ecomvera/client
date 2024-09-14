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
import { useDataStore } from "@/stores/data";
import { useUser } from "@/hooks/useUser";

const UpdateQuantity = ({ item }: { item: ICartItem }) => {
  const { user, token } = useUser();
  const { updateQuantity } = useDataStore();
  const [currentQnt, setCurrentQnt] = useState(item.quantity);

  const handleQuantity = async () => {
    if (currentQnt === item?.quantity) return;

    updateQuantity(item.id, currentQnt);
    await fetch("/api/user/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ id: item.id, quantity: currentQnt }),
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center text-xs tablet:text-base">
        Qnt: <span className="font-semibold ml-1">{item?.quantity}</span> <ChevronDownIcon className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Quantiry</DialogTitle>
          <DialogDescription>Select from the list of sizes</DialogDescription>
          <div className="flex flex-wrap gap-3 pt-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i + 1}
                className={`border border-primary rounded-md px-2 py-1 w-10 h-10 flex items-center justify-center cursor-pointer font-semibold ${
                  i + 1 === currentQnt ? "bg-primary text-white" : ""
                }`}
                onClick={() => setCurrentQnt(i + 1)}
              >
                <span>{i + 1}</span>
              </div>
            ))}
          </div>
        </DialogHeader>
        <DialogTrigger asChild>
          <Button className="w-full text-lg" onClick={handleQuantity}>
            Confirm
          </Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateQuantity;
