import Banner from "@/components/Cards/Banner";
import BestSellers from "@/components/Shared/BestSellers";
import NewArrivals from "@/components/Shared/NewArrivals";
import ReactCarousel from "@/components/Shared/Carousel";
import { CarouselItem } from "@/components/ui/carousel";
import LoadingPage from "@/components/Shared/LoadingPage";
import { useEffect } from "react";
import GroupCategories from "@/components/Shared/GroupCategories";
import { getData } from "@/lib/utils";
import Loader from "@/components/Shared/loader";
import GalleryCollections from "@/components/Shared/GalleryCollections";
import _ from "lodash";
import ShopByCategory from "@/components/Shared/ShopByCategory";
export const dynamic = "force-dynamic";

export default async function Home() {
  const collections = await getData(`/api/collections?active=true`);
  const newArrivals = await getData(`/api/products?new-arrivals`);
  const bestSellers = await getData(`/api/products?best-sellers`);
  const shopByCategory = await getData(`/api/products?shop-by-category`);

  console.log(bestSellers);
  return (
    <div className="h-full min-h-[calc(100vh-100px)] pb-16">
      {/* <GalleryCollections collections={_.filter(collections, { isGallery: true })} /> */}
      <GroupCategories collections={_.filter(collections, { isGallery: false })} />

      <NewArrivals data={newArrivals} />

      <ShopByCategory data={shopByCategory} />

      <BestSellers data={bestSellers} />
    </div>
  );
}
