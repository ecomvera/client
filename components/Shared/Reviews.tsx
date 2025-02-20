import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { formatDate } from "@/lib/utils";

const Reviews = ({ data }: { data: any }) => {
  return (
    <div className="pt-5">
      <div>
        <h2 className="text-lg font-semibold">Here what our customers say ({data.length})</h2>
      </div>
      <div className="py-2">
        {data.length === 0 && <p>Be the first to review</p>}
        {data
          .sort((a: any, b: any) => b.rating - a.rating)
          .map((r: any) => (
            <div key={r.id}>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) =>
                  r.rating >= i ? (
                    <StarFilledIcon key={i} className="h-4 w-4 text-[--c3]" />
                  ) : (
                    <StarIcon key={i} className="h-4 w-4 text-[--c3]" />
                  )
                )}
                <p className="ml-2 text-sm">{r.user.name}</p>
              </div>
              <p>{r.comment}</p>
              <p className="text-sm mt-1">{formatDate(r.createdAt)}</p>
              <Separator className="my-1" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reviews;
