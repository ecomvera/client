import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="max-w-desktop mx-auto px-2 pb-1 md:py-[2px] h-full min-h-[calc(100vh-200px)] flex items-center justify-center">
      <Link href="/search" className="text-blue-500 hover:underline">
        <Button variant={"outline"} className="w-full max-w-md">
          Go to Search Page
        </Button>
      </Link>
    </div>
  );
};

export default Page;
