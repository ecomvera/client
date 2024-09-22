import React, { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { IImageFile } from "@/types";
import { type CarouselApi } from "@/components/ui/carousel";
import { DialogTitle } from "@radix-ui/react-dialog";

const ImgaeGallary = ({
  open,
  setOpen,
  startWith,
  images,
}: {
  images: IImageFile[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  startWith: number;
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="slide flex bg-transparent border-none shadow-none items-center justify-center w-full max-w-[700px] p-0"
        aria-describedby={undefined}
      >
        <DialogTitle className="hidden">Image Gallery</DialogTitle>
        <Carousel className="w-full" setApi={setApi} opts={{ startIndex: startWith }}>
          <CarouselContent defaultChecked>
            {images.map((image, index) => (
              <CarouselItem key={image.id} className="" defaultValue={images[2].id}>
                <AspectRatio ratio={0.8 / 1} className="rounded-md">
                  <Image
                    priority
                    key={image.key}
                    src={image.url}
                    alt="product"
                    className="w-full h-full object-cover rounded-md"
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="w-full flex justify-between">
            <div className="text-white text-sm">
              Slide {current} of {count}
            </div>
          </div>
          <CarouselPrevious className="-translate-y-1/2 left-1 tablet:left-[-35px] laptop:left-[-100px] disabled:hidden" />
          <CarouselNext className="-translate-y-1/2 right-1 tablet:right-[-35px] laptop:right-[-100px] disabled:hidden" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImgaeGallary;
