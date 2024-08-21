import BreadcrumbCard from "@/components/Cards/BreadcrumbCard";
import Footer from "@/components/Shared/Footer";
import Header from "@/components/Shared/Header";
import ProductDetails from "@/components/Shared/ProductDetails";
import SimilarProducts from "@/components/Shared/SimilarProducts";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Header />

      <div className="max-w-desktop mx-auto px-2">
        <BreadcrumbCard />
        <ProductDetails />
        <SimilarProducts />
      </div>
      <Footer />
    </div>
  );
};

export default page;
