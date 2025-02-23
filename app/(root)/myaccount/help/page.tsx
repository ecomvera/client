"use client";

import { HelpCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-3 gap-5 my-6 md:m-0">
      <h1 className="flex md:hidden items-center gap-2 font-semibold mb-5 text-xl font-sans">
        <span onClick={() => router.back()} className="hidden  cursor-pointer">
          <HelpCircleIcon className="w-7 h-7 md:hidden" />
        </span>
        Help
      </h1>
    </div>
  );
};

export default Page;
