import Image from "next/image";

const Banner = () => {
  return (
    <div>
      <Image
        src="/assets/banner.avif"
        priority
        alt="banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default Banner;
