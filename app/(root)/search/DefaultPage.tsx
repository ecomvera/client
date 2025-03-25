import BestSellers from "@/components/Shared/BestSellers";
import NewArrivals from "@/components/Shared/NewArrivals";
import { fetcher, fetchOpt } from "@/lib/utils";
import useSWR from "swr";

const DefaultPage = () => {
  const fetchProducts = useSWR("/api/products?new-arrivals", fetcher, { ...fetchOpt, revalidateOnMount: true });
  const { data: products } = fetchProducts;

  return (
    <>
      <NewArrivals data={products?.data || []} />
      {/* <BestSellers /> */}
    </>
  );
};

export default DefaultPage;
