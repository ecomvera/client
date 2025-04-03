import React, { useMemo, useEffect, useState } from "react";
import Image from "next/image";

const imagesData = [
  "/assets/slider/1.png",
  "/assets/slider/2.png",
  "/assets/slider/3.png",
  "/assets/slider/4.png",
  "/assets/slider/5.png",
  "/assets/slider/6.png",
  "/assets/slider/7.png",
  "/assets/slider/8.png",
  "/assets/slider/9.png",
  "/assets/slider/10.png",
  "/assets/slider/11.png",
  "/assets/slider/12.png",
  "/assets/slider/13.png",
  "/assets/slider/14.png",
  "/assets/slider/15.png",
  "/assets/slider/16.png",
  "/assets/slider/17.png",
  "/assets/slider/18.png",
  "/assets/slider/19.png",
  "/assets/slider/20.png",
  "/assets/slider/21.png",
  "/assets/slider/22.png",
  "/assets/slider/23.png",
  "/assets/slider/24.png",
  "/assets/slider/25.png",
  "/assets/slider/26.png",
  "/assets/slider/27.png",
  "/assets/slider/28.png",
  "/assets/slider/29.png",
  "/assets/slider/30.png",
  "/assets/slider/31.png",
  "/assets/slider/32.png",
];

const duplicateAndShuffleImages = (images: string[], screenWidth: number) => {
  const multiplier = screenWidth < 768 ? 2 : screenWidth < 1024 ? 4 : 8;
  const duplicatedImages = [...images];
  for (let i = 0; i < multiplier; i++) {
    duplicatedImages.push(...images);
  }
  // Shuffle the duplicated images
  for (let i = duplicatedImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [duplicatedImages[i], duplicatedImages[j]] = [duplicatedImages[j], duplicatedImages[i]];
  }
  return duplicatedImages;
};

const ProductSlider = ({ gradient }: { gradient: "bottom" | "right" }) => {
  const [windowWidth, setWindowWidth] = useState<number>(800);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rows = useMemo(() => {
    const rowsData: any[] = [];
    // const imagesPerRow = windowWidth < 768 ? 8 : 18;
    const imagesPerRow = windowWidth < 768 ? 10 : windowWidth < 1024 ? 18 : 22;
    const duplicatedImages = duplicateAndShuffleImages(imagesData, windowWidth);

    for (let i = 0; i < duplicatedImages.length; i += imagesPerRow) {
      rowsData.push(duplicatedImages.slice(i, i + imagesPerRow));
    }
    return rowsData;
  }, [windowWidth]);

  return (
    <div className="pointer-events-none">
      <div className="auto-scroll ">
        <div className="grid justify-center items-center overflow-visible ">
          {rows.map((row, index) => {
            return <MemoizedRow key={index} row={row} index={index} />;
          })}
        </div>
      </div>
      {gradient === "bottom" && <div className="bottom-gradiant h-[100px] w-full  bottom-0 left-0 right-0 absolute"></div>}
      {gradient === "right" && <div className="right-gradiant h-full w-[100px] right-0 top-0 absolute"></div>}
    </div>
  );
};

const MemoizedRow = React.memo(({ row, index }: { row: any; index: number }) => {
  const horizontalShift = index % 2 === 0 ? -30 : 30;
  return (
    <div className="flex gap-2" style={{ transform: `translateX(${horizontalShift}px)` }}>
      {row.map((image: any, index: number) => {
        return (
          <div
            key={index}
            className={`mb-[6px] justify-center rounded-lg items-center flex overflow-hidden`}
            style={{
              width: "100px",
              height: "100px",
            }}
          >
            <Image
              src={image}
              alt="product"
              width={100}
              height={100}
              // loading="lazy"
              priority
              className="w-full h-full object-contain"
            />
          </div>
        );
      })}
    </div>
  );
});

MemoizedRow.displayName = "MemoizedRow";

export default ProductSlider;
