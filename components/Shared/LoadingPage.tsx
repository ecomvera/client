import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="p-2">
      <Skeleton className="w-full h-96 rounded" />
    </div>
  );
};

export default LoadingPage;
