// @ts-ignore
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Carousel({ children }: { children: any }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="slider-container mx-auto">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="absolute right-0 top-[45%]" onClick={onClick}>
      <FiChevronRight className="text-2xl laptop:text-4xl text-dark-4" />
    </div>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="absolute left-0 top-[45%]" onClick={onClick}>
      <FiChevronLeft className="text-2xl laptop:text-4xl text-dark-4" />
    </div>
  );
}

export default Carousel;
