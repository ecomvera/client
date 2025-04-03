import React, { useMemo } from "react";
import Image from "next/image";

const imagesData = [
  "/assets/slider-desktop/1.png",
  "/assets/slider-desktop/2.png",
  "/assets/slider-desktop/3.png",
  "/assets/slider-desktop/4.png",
  "/assets/slider-desktop/5.png",
  "/assets/slider-desktop/6.png",
  "/assets/slider-desktop/7.png",
  "/assets/slider-desktop/8.png",
  "/assets/slider-desktop/9.png",
  "/assets/slider-desktop/10.png",
  "/assets/slider-desktop/11.png",
  "/assets/slider-desktop/12.png",
  "/assets/slider-desktop/13.png",
  "/assets/slider-desktop/14.png",
  "/assets/slider-desktop/15.png",
  "/assets/slider-desktop/16.png",
  "/assets/slider-desktop/17.png",
  "/assets/slider-desktop/18.png",
  "/assets/slider-desktop/19.png",
  "/assets/slider-desktop/20.png",
  "/assets/slider-desktop/21.png",
  "/assets/slider-desktop/22.png",
  "/assets/slider-desktop/23.png",
  "/assets/slider-desktop/24.png",
  "/assets/slider-desktop/25.png",
  "/assets/slider-desktop/26.png",
  "/assets/slider-desktop/27.png",
  "/assets/slider-desktop/28.png",
  "/assets/slider-desktop/29.png",
  "/assets/slider-desktop/30.png",
  "/assets/slider-desktop/31.png",
  "/assets/slider-desktop/32.png",
];

const ProductSlider = ({ gradient }: { gradient: "bottom" | "right" }) => {
  const rows = useMemo(() => {
    const rowsData: any[] = [];
    for (let i = 0; i < imagesData.length; i += 8) {
      rowsData.push(imagesData.slice(i, i + 8));
    }
    return rowsData;
  }, []);

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
              width: "calc(100vw * 0.2)",
              height: "calc(100vw * 0.2)",
            }}
          >
            <Image
              src={image}
              alt="product"
              width={100}
              height={100}
              loading="lazy"
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
