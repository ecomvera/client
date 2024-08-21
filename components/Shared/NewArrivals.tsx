import ProductCard from "../Cards/ProductCard";

const NewArrivals = () => {
  return (
    <div className="py-6 mt-5">
      <h2 className="text-center text-3xl text-dark-3 font-bold uppercase">New Arrivals</h2>

      <div className="max-w-desktop mx-auto px-2 flex overflow-scroll hide-scrollbar gap-2 mt-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default NewArrivals;
