// import {
//   Carousel,
//   CarouselIndicator,
//   CarouselMainContainer,
//   CarouselNext,
//   CarouselPrevious,
//   CarouselThumbsContainer,
//   SliderMainItem,
//   SliderThumbItem,
// } from "@/components/ui/extension/carousel";
// import { AspectRatio } from "../ui/aspect-ratio";
// import Image from "next/image";

// const ImageCarousel = ({ images, currentColor }: { images: any; currentColor: string }) => {
//   return (
//     <Carousel orientation="vertical" className="flex items-center gap-2">
//       <CarouselNext className="hidden" />
//       <CarouselPrevious className="hidden" />
//       <div className="relative basis-3/4 ">
//         <CarouselMainContainer className="h-[475px]">
//           {images
//             .filter((img) => img.color === currentColor)
//             .map((image, index) => (
//               <SliderMainItem key={index} className="border border-muted flex items-center justify-center rounded-md">
//                 <div key={index} className={`cursor-pointer w-full`}>
//                   <AspectRatio ratio={0.8 / 1} className="border rounded-md">
//                     <Image
//                       priority
//                       key={image.key}
//                       src={image.url.split("/upload")[0] + "/upload/" + image.url.split("/upload")[1]}
//                       alt="product"
//                       className="w-full h-full object-cover rounded-md"
//                       width={0}
//                       height={0}
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       // onMouseEnter={() => {
//                       //   if (currentSlide.url === image.url) return;
//                       //   handleSlideChange("image", image.url);
//                       // }}
//                       // onMouseEnter={() => { }}
//                     />
//                   </AspectRatio>
//                 </div>
//               </SliderMainItem>
//             ))}
//         </CarouselMainContainer>
//       </div>
//       <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
//         <CarouselThumbsContainer className="h-[475px]">
//           {images
//             .filter((img) => img.color === currentColor)
//             .map((image, index) => (
//               <SliderThumbItem key={index} index={index} className="rounded-md bg-transparent basis-1/5 mb-2">
//                 <CarouselIndicator key={index} index={index} className="mobile:hidden" />
//                 <div key={index} className={`hidden mobile:block cursor-pointer w-full`}>
//                   <AspectRatio ratio={0.8 / 1} className="border rounded-md">
//                     <Image
//                       priority
//                       key={image.key}
//                       src={image.url.split("/upload")[0] + "/upload/w_80/" + image.url.split("/upload")[1]}
//                       alt="product"
//                       className="w-full h-full object-cover rounded-md"
//                       width={0}
//                       height={0}
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       // onMouseEnter={() => {
//                       //   if (currentSlide.url === image.url) return;
//                       //   handleSlideChange("image", image.url);
//                       // }}
//                       // onMouseEnter={() => { }}
//                     />
//                   </AspectRatio>
//                 </div>
//               </SliderThumbItem>
//             ))}
//         </CarouselThumbsContainer>
//       </div>
//     </Carousel>
//   );
// };

// export default ImageCarousel;
