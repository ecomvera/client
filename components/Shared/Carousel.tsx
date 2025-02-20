import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

function ReactCarousel({
  children,
  autoPlay,
  showArrows,
  showDots,
}: {
  children: React.ReactNode;
  autoPlay?: number;
  showArrows?: boolean;
  showDots?: boolean;
}) {
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
    <div>
      <Carousel
        className="w-full mx-auto"
        plugins={
          autoPlay
            ? [
                Autoplay({
                  delay: autoPlay,
                  // stopOnLastSnap: true,
                  // stopOnMouseEnter: true,
                }),
              ]
            : []
        }
        setApi={setApi}
      >
        <CarouselContent>{children}</CarouselContent>
        {showArrows && (
          <>
            <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-1 disabled:hidden" />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-1 disabled:hidden" />
          </>
        )}
      </Carousel>
      {showDots && (
        <div className="text-center text-sm text-muted-foreground">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={`inline-block h-2 w-2 rounded-full ${
                current === index + 1 ? "bg-[--c1] h-3 w-3" : "bg-muted m-[2px]"
              } mx-1`}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReactCarousel;
