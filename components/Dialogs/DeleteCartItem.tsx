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
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useDataStore } from "@/stores/data";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { useToken } from "@/hooks/useToken";

const DeleteCartItem = ({ item }: { item: ICartItem }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();
  const { token } = useToken();
  const { removeFromCart } = useDataStore();

  const handleDelete = async () => {
    setLoading(true);
    if (user) {
      await fetch("/api/user/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
        body: JSON.stringify({ id: item.id }),
      });
    }
    removeFromCart(item);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center text-xs tablet:text-base">
        <Cross1Icon className="absolute top-0 right-0 cursor-pointer" onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Item</DialogTitle>
          <DialogDescription>Are you sure you want to remove this item?</DialogDescription>
        </DialogHeader>
        <div>{item.product.name}</div>
        <DialogFooter className="mt-10">
          <DialogTrigger asChild>
            <Button variant={"outline"} className="hover:bg-transparent">
              Close
            </Button>
          </DialogTrigger>
          <Button className="bg-red-400 font-semibold hover:bg-red-600" onClick={handleDelete}>
            {loading ? "Removing..." : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCartItem;
