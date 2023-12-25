import React from "react";
import Welcome from "../welcome/Welcome";
import Image from "next/image"
import Link from "next/link";

const Featured = () => {

  return (
    <>
      <div className="md:pt-[150px] pt-16 xl:flex lg:justify-between ">
        <div className="md:mx-20 mx-2   md:pt-12 lg:ml-28 ">

          <p className="font-bold   ml-2 md:text-6xl text-3xl text-[#fc7405] pt-10 lg:my-6">
            Your Success Is In Our Hands
          </p>

          <p className="  mx-6 md:text-3xl  text-xl pt-8 lg:my-6">
            Birana Digitals - Where Imagination Meets Innovation
          </p>
          <div className="align-center justify-center flex mt-12">
            <Link href="/contact">
              <button className="p-5 mb-8    duration-500 ease-in-out  rounded-md     font-semibold  bg-[#fc7405]  ">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="md:mx-36 flex items-center justify-center pt-20 lg:mx-48 xl:mr-16">
          <Image className="w-full xl:w-[1400px]" src="/marketing-consulting-illustration.png" alt="" />
        </div>
      </div>
    </>

  );
};

export default Featured;
