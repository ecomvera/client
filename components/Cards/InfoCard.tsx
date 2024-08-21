import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  label: string;
  route: string;
  price?: string;
  isCategory?: boolean;
}

const InfoCard = ({ image, route, label, price, isCategory = false }: Props) => {
  return (
    <div className="m-1">
      <Link href={route}>
        <Image
          src={image}
          alt={label}
          width="0"
          height="0"
          sizes="100vw"
          className={`w-[120px] tablet:w-[150px] laptop:w-[180px] h-auto  mx-auto ${isCategory && "rounded-full"}`}
        />

        <p className="text-center text-sm mobile:text-lg tablet:text-xl font-bold text-light-4 mt-2">{label}</p>
        {!isCategory && <p className="text-center text-sm tablet:text-lg  font-semibold text-light-4">{price}</p>}
      </Link>
    </div>
  );
};

export default InfoCard;
