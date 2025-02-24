"use client";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { formatDate } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const Reviews = ({ data, showAll = false }: { data: any; showAll?: boolean }) => {
  return (
    <div className="pt-5">
      <div>
        <h2 className="text-lg font-semibold">Here what our customers say ({data.length})</h2>
      </div>

      <RatingComponent data={data} />

      <div className="py-2">
        {data.length === 0 && <p>Be the first to review</p>}
        {data
          .sort((a: any, b: any) => b.rating - a.rating)
          .slice(0, showAll ? data.length : 2)
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

      <Link href={`/reviews/${data[0]?.productId}`} className={`${showAll || data.length <= 2 ? "hidden" : ""}`}>
        <div className="flex items-center gap-2 text-[--c3] font-semibold">
          <p>View all reviews</p>
          <ArrowRight className="h-4 w-4" />
        </div>
      </Link>
    </div>
  );
};

const RatingComponent = ({ data }: { data: any }) => {
  const totalRatings = data.length || 0;
  const averageRating = totalRatings > 0 ? data.reduce((acc: any, item: any) => acc + item.rating, 0) / totalRatings : 0;
  const ratingBreakdown = Array.from({ length: 5 }, (_, i) => ({
    stars: i + 1,
    count: data.filter((r: any) => r.rating === i + 1).length,
  })).sort((a: any, b: any) => b.stars - a.stars);

  return (
    <div className="w-full max-w-md py-3">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        Ratings <Star className="w-5 h-5 ml-2 text-[--c2]" />
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
        <div className="flex text-[--c2]">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? "fill-[--c2]" : "stroke-gray-400"}`} />
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500">{totalRatings} Verified Buyers</p>

      <div className="mt-4 space-y-2">
        {ratingBreakdown.map(({ stars, count }) => (
          <div key={stars} className="flex items-center space-x-2">
            <span className="text-sm font-medium min-w-5">{stars}★</span>
            <Progress value={(count / totalRatings) * 100} className="w-full h-2 bg-gray-200 " />
            <span className="text-sm text-gray-600 min-w-3">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
