import { IoStorefront } from "react-icons/io5";
import Search from "../forms/Search";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full sticky top-0 bg-white z-10 shadow-lg">
      <div className="max-w-desktop mx-auto px-2 w-full sticky top-0 bg-white">
        <div className="flex justify-between gap-3 py-1 tablet:py-3 items-center">
          <div className="flex gap-3 items-center">
            <IoStorefront className="text-3xl" />
            <h2 className="hidden text-2xl text-dark-3 font-bold uppercase tracking-wide tablet:block">Brand Name</h2>
          </div>

          <Search />

          <div className="flex gap-5">
            <Image src="/assets/user.png" alt="user" width={25} height={25} />
            <Image src="/assets/bag.png" alt="user" width={25} height={25} />
          </div>
        </div>

        {/* <DropdownMenu /> */}
      </div>
    </div>
  );
};

export default Header;
