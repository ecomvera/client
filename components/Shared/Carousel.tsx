import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function ReactCarousel({
  children,
  autoPlay,
  showArrows,
}: {
  children: React.ReactNode;
  autoPlay?: boolean;
  showArrows: boolean;
}) {
  return (
    <Carousel
      className="w-full mx-auto"
      plugins={
        autoPlay
          ? [
              Autoplay({
                delay: 2000,
              }),
            ]
          : []
      }
    >
      <CarouselContent className="-ml-1">{children}</CarouselContent>
      {showArrows && (
        <>
          <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-1" />
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-1" />
        </>
      )}
    </Carousel>
  );
}

export default ReactCarousel;
