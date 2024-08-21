import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="m-1 min-w-[180px] w-full">
      <Image src={"/assets/tshirt.webp"} alt="mugs" width="0" height="0" sizes="100vw" className="w-full h-auto mx-auto" />

      <div className="p-2">
        <p className="text-lg tablet:text-xl  font-bold text-light-4">Men T-Shirt</p>
        <p className="text-base text-light-4">Oversized T-Shirt</p>
        <p className="text-sm tablet:text-lg  font-semibold text-light-4">
          ₹50.00 <span className="text-sm font-normal text-light-3">MRP incl. of all taxes</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
