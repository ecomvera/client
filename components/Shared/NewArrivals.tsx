import ProductCard from "../Cards/ProductCard";

const NewArrivals = () => {
  return (
    <div className="px-2 mobile:py-4 mt-5">
      <h2 className="text-center text-xl mobile:text-2xl tablet:text-3xl text-light-1 font-bold uppercase">New Arrivals</h2>

      <div className="max-w-desktop mx-auto px-2 flex overflow-scroll hide-scrollbar gap-2 my-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default NewArrivals;
