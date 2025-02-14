import BreadcrumbCard from "@/components/Cards/BreadcrumbCard";
import ProductsList from "@/components/Shared/ProductsList";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getData } from "@/lib/utils";
import Image from "next/image";

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await getData(`/api/gallery/${params.slug}`);

  console.log(data);

  return (
    <div className="max-w-desktop mx-auto px-2 pb-1 md:py-[2px] h-full min-h-[calc(100vh-200px)]">
      <BreadcrumbCard title={data?.name || ""} />

      <div className="flex flex-col w-full mt-[5px]">
        {data?.banner && (
          <div className="mb-3">
            <AspectRatio ratio={3.57 / 1}>
              <Image
                src={data?.banner || ""}
                alt="Image"
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-md object-contain w-full h-full"
              />
            </AspectRatio>
          </div>
        )}

        {data?.products?.length > 0 && <ProductsList products={data.products} />}
      </div>
    </div>
  );
};

export default Page;
