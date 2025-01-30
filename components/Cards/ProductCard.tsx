import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { IoHeart, IoHeartOutline, IoStar } from "react-icons/io5";
import { useDataStore } from "@/stores/data";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { AspectRatio } from "../ui/aspect-ratio";
import { useToken } from "@/hooks/useToken";

const ProductCard = ({
  product,
  showHeart = true,
  showRating = true,
}: {
  product: IProduct;
  showHeart?: boolean;
  showRating?: boolean;
}) => {
  const router = useRouter();
  const { user } = useUser();
  const { token } = useToken();
  const { addToWishlist, removeFromWishlist, wishlist } = useDataStore();

  const createItemId = () => {
    return `${product.id}-${product?.colors[0]}-${product?.sizes[0].key}`;
  };

  const isAdded = product && wishlist?.find((p) => p.id === createItemId());

  const handleAddToWishlist = async () => {
    if (!user) return router.push("/sign-in");

    const item = {
      id: createItemId(),
      color: product.colors[0].name,
      quantity: 1,
      productId: product.id as string,
    };

    addToWishlist({ ...item, product });
    const res = await fetch("/api/user/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ item }),
    }).then((res) => res.json());
    if (!res.ok) removeFromWishlist(createItemId());
  };

  const handleRemoveFromWishlist = async () => {
    if (!user) return;

    const id = createItemId();
    removeFromWishlist(createItemId());
    await fetch("/api/user/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <Link href={`/p/${product.slug}`}>
      <div className="flex flex-col text-light-1">
        <AspectRatio ratio={0.8 / 1} className="border rounded-md relative">
          {showHeart && (
            <div
              className="absolute top-1 right-1 z-[1]"
              onClick={(event) => {
                event.preventDefault();
                isAdded ? handleRemoveFromWishlist() : handleAddToWishlist();
              }}
            >
              {isAdded ? <IoHeart className="text-2xl text-red-500" /> : <IoHeartOutline className="text-2xl" />}
            </div>
          )}

          <Image
            src={product.images[0].url}
            quality={10}
            priority
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-md object-contain w-full h-full"
          />

          {showRating && (
            <div className="absolute bottom-2 rounded-l right-0 bg-light-1 text-background px-1 flex gap-1 items-center text-xs">
              <IoStar fill="var(--c1)" /> 4.5
            </div>
          )}
        </AspectRatio>

        <div className="p-1">
          <p className="text-sm tablet:text-lg text-ellipsis truncate">{product.name}</p>
          <p className="text-sm tablet:text-lg font-semibold">
            ₹{product.price}{" "}
            <span className="text-xs font-extralight tablet:text-sm line-through text-">₹{product.mrp}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
