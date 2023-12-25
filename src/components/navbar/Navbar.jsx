

import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";

const Navbar = () => {

  return (
    <div className="fixed text-[#f0ecd2] bg-[#17223d] bg-opacity-90 z-50 w-full left-0  top-0">

      <div className="flex    items-center py-3 justify-between  h-full">
        <div className="2xl:mx-28   xl:ml-10 lg:hidden xl:flex pl-5 pr-10 lg:pr-0  gap-8 xl:gap-4  hidden md:flex        ">
          <FaFacebook size={30} />

          <FaInstagram size={30} />
          <FaTiktok size={32} />
          <FaLinkedin size={30} />
        </div>
        <Link href="/" className="flex-1 flex text-center md:text-[30] text-[18px] lg:text-[30px]  sm:text-[24px] font-bold text-[#FC7405]
        ">


          <Image  src="/logo.png" className="w-16 sm:w-20  sm:h-10 h-8" />

          <p className="">

            Birana Digitals
          </p>

        </Link>

        <div className="flex items-center lg:text-[18px] lg:gap-[10px] justify-end  gap-[20px]  text-[20px]">
          <ThemeToggle />
          <AuthLinks />
        </div>
      </div>
    </div>
  );
};

export default Navbar;