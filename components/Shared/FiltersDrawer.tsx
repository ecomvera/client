import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

const FiltersDrawer = ({
  children,
  clearAll,
  applyedFilters,
}: {
  children: React.ReactNode;
  clearAll: () => void;
  applyedFilters: number;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Drawer shouldScaleBackground open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="font-semibold">Filters ({applyedFilters})</DrawerTrigger>
        <DrawerContent className="max-h-[calc(100vh-20rem)]" aria-describedby={undefined}>
          <DrawerHeader className="flex justify-between">
            <DrawerTitle hidden>Filters</DrawerTitle>
            <Button
              className="flex items-center gap-2"
              variant={"destructive"}
              onClick={() => {
                clearAll();
                setOpen(false);
              }}
            >
              <span>Clear all</span>
            </Button>
            <Button className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <span>Close</span>
            </Button>
          </DrawerHeader>
          <div className="px-4 overflow-y-scroll">{children}</div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FiltersDrawer;
