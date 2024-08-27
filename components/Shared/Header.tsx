import { IoReorderThreeOutline } from "react-icons/io5";
import Search from "../forms/Search";
import Image from "next/image";
import HeaderNavigation from "./HeaderNavigation";

const Header = () => {
  return (
    <div className="w-full sticky top-0 bg-white z-10 shadow-lg">
      <div className="max-w-desktop mx-auto px-2 w-full sticky top-0 bg-white">
        <div className="flex justify-between gap-3 py-2 tablet:py-2 items-center">
          <div className="flex gap-3 items-center">
            <IoReorderThreeOutline className="text-3xl tablet:hidden" />
            <h2 className="text-xl tablet:text-2xl text-dark-3 font-bold uppercase tracking-wide">Shikyester</h2>

            <div className="hidden tablet:flex gap-5 ml-5">
              <HeaderNavigation />
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <Search />
            <span>
              <Image src="/assets/user.png" alt="user" width={25} height={25} />
            </span>
            <span>
              <Image src="/assets/bag.png" alt="user" width={25} height={25} />
            </span>
          </div>
        </div>

        {/* <DropdownMenu /> */}
      </div>
    </div>
  );
};

export default Header;
