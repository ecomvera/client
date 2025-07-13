"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/components/forms/Search";
import QueryResult from "./_components/QueryResult";
import DefaultPage from "./_components/DefaultPage";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="max-w-desktop mx-auto pb-1 md:py-[2px] h-full min-h-[calc(100vh-200px)]">
      {/* Mobile Search */}
      <Search className="flex laptop:hidden my-2 mb-4 border-2 mx-2" query={query} />

      {/* When query exists */}
      {query ? <QueryResult /> : <DefaultPage />}
    </div>
  );
};

export default Page;
