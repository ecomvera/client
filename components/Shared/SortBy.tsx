import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IProduct } from "@/types";
import React, { useEffect } from "react";
import { GrSort } from "react-icons/gr";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "../ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const SortBy = ({
  items,
  setItems,
  desktop,
}: {
  items: IProduct[];
  setItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
  desktop?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("featured");

  useEffect(() => {
    if (sortBy === "featured") {
      setItems(items);
    } else if (sortBy === "low-to-high") {
      const sortedItems = [...items.sort((a, b) => a.price - b.price)];
      setItems(sortedItems);
    } else if (sortBy === "high-to-low") {
      const sortedItems = [...items.sort((a, b) => b.price - a.price)];
      setItems(sortedItems);
    }
  }, [sortBy]);

  if (desktop) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <GrSort className="inline mr-1" /> Sort By
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-2">
          <RadioGroup defaultValue={sortBy} onValueChange={setSortBy}>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="low-to-high" id="r2" />
                <Label className="" htmlFor="r2">
                  Price: Low to High
                </Label>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="high-to-low" id="r3" />
                <Label className="" htmlFor="r3">
                  Price: High to Low
                </Label>
              </div>
            </DropdownMenuItem>
          </RadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTitle className="hidden">Sort</DrawerTitle>
        <DrawerTrigger onClick={() => setOpen(true)} className="w-full">
          <GrSort className="inline mr-1" /> Sort
        </DrawerTrigger>
        <DrawerContent className="px-5 mb-4" aria-describedby={undefined}>
          <h2 className="font-semibold mb-2">Sort By -</h2>
          <RadioGroup defaultValue={sortBy} onValueChange={setSortBy}>
            {/* <div className="flex items-center gap-2">
            <RadioGroupItem value="featured" id="r1" />
            <Label className="text-base" htmlFor="r1">
              Featured
            </Label>
          </div> */}
            <div className="flex items-center gap-2">
              <RadioGroupItem value="low-to-high" id="r2" />
              <Label className="text-base" htmlFor="r2">
                Price: Low to High
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="high-to-low" id="r3" />
              <Label className="text-base" htmlFor="r3">
                Price: High to Low
              </Label>
            </div>
          </RadioGroup>
        </DrawerContent>
      </Drawer>
    );
};

export default SortBy;
