import BestSellers from "@/components/Shared/BestSellers";
import NewArrivals from "@/components/Shared/NewArrivals";
import { Input } from "@/components/ui/input";
import { fetcher, fetchOpt } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const DefaultPage = () => {
  const navigate = useRouter();
  const fetchProducts = useSWR("/api/products?new-arrivals", fetcher, { ...fetchOpt, revalidateOnMount: true });
  const { data: products } = fetchProducts;
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate.push(`/search?q=${search}`);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="mt-2 laptop:hidden">
          <Input placeholder="Search for products" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </form>
      <NewArrivals data={products?.data || []} />
      <BestSellers />
    </>
  );
};

export default DefaultPage;
