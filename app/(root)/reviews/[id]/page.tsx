"use client";

import Reviews from "@/components/Shared/Reviews";
import { fetcher, fetchOpt } from "@/lib/utils";
import { Link2Icon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Page = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/reviews/${id}`);
      const data = await res.json();
      setLoading(false);
      if (!data || !data.ok) return;
      setReviews(data.data);
    };
    getData();
  }, []);

  return (
    <div className="py-5 max-w-tablet mx-auto min-h-screen">
      {loading && <p>Loading...</p>}

      {!loading && reviews.length === 0 && <p>No reviews found</p>}

      {reviews.length > 0 && (
        <div>
          <Link href={`${reviews[0].product.slug}`} className="text-[--c2] flex gap-2 items-center">
            <Link2Icon /> <h2 className="text-xl font-semibold">{reviews[0].product.name}</h2>
          </Link>
          <Reviews data={reviews} showAll />
        </div>
      )}
    </div>
  );
};

export default Page;
