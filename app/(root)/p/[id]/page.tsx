import BreadcrumbCard from "@/components/Cards/BreadcrumbCard";
import ProductDetails from "@/components/Shared/ProductDetails";
import SimilarProducts from "@/components/Shared/SimilarProducts";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <div className="max-w-desktop mx-auto px-2">
        <BreadcrumbCard title="Product" />
        <ProductDetails />
        <SimilarProducts />
      </div>
    </div>
  );
};

export default Page;
