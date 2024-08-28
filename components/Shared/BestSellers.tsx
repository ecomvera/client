import InfoCard from "../Cards/InfoCard";
import { CarouselItem } from "../ui/carousel";
import ReactCarousel from "./Carousel";

const product = {
  image: "/assets/sample-tshirt.webp",
  route: "/product/1",
  label: "Men T-Shirt",
  price: "50.00",
};

const BestSellers = () => {
  return (
    <div className="px-2 mobile:py-4 mt-5">
      <h2 className="text-center text-xl mobile:text-2xl tablet:text-3xl text-light-1 font-bold uppercase">Best Sellers</h2>

      <ReactCarousel showArrows autoPlay>
        <CarouselItem className="pl-2 basis-1/2 md:basis-1/3">
          <InfoCard {...product} />
        </CarouselItem>
        <CarouselItem className="pl-2 basis-1/2 md:basis-1/3">
          <InfoCard {...product} />
        </CarouselItem>
        <CarouselItem className="pl-2 basis-1/2 md:basis-1/3">
          <InfoCard {...product} />
        </CarouselItem>
        <CarouselItem className="pl-2 basis-1/2 md:basis-1/3">
          <InfoCard {...product} />
        </CarouselItem>
      </ReactCarousel>
    </div>
  );
};

export default BestSellers;
