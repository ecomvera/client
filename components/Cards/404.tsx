import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-20 ">
      <h1 className="text-7xl mobile:text-9xl font-extralight">404</h1>
      <h3 className="text-3xl mobile:text-4xl font-extralight">Page Not Found</h3>
      <p className="text-sm mobile:text-lg mt-3">The page you are looking for doesn&apos;t exist.</p>

      <div className="h-[2px] bg-border w-80 my-3"></div>

      <p className="text-sm mobile:text-lg">Maybe you can find it from here</p>
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex gap-11">
          <p className="text-muted-foreground w-20">Men</p>
          <div className="grid grid-cols-2 gap-3">
            <Link href="#" className="underline text-blue-500">
              Topwear
            </Link>
            <Link href="#" className="underline text-blue-500">
              Bottombar
            </Link>
          </div>
        </div>
        <div className="flex gap-11">
          <p className="text-muted-foreground w-20">Women</p>
          <div className="grid grid-cols-2 gap-3">
            <Link href="#" className="underline text-blue-500">
              Topwear
            </Link>
            <Link href="#" className="underline text-blue-500">
              Bottombar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
