import InfoCard from "../Cards/InfoCard";
import Carousel from "./Carousel";

const product = {
  image: "/assets/sample-tshirt.webp",
  route: "/product/1",
  label: "Men T-Shirt",
  price: "50.00",
};

const BestSellers = () => {
  return (
    <div className="py-6">
      <h2 className=" text-center text-3xl text-dark-3 font-bold uppercase">Best Sellers</h2>

      <div className="max-w-desktop mx-auto">
        <Carousel>
          <InfoCard {...product} />
          <InfoCard {...product} />
          <InfoCard {...product} />
          <InfoCard {...product} />
          <InfoCard {...product} />
        </Carousel>
      </div>
    </div>
  );
};

export default BestSellers;
