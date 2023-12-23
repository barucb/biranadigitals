import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const CategoryList = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();


  return (
    <div >
      <div className='flex  justify-center'>
        <h5 className="sm:pl-5 mb-3 pt-48 text-2xl font-bold sm:text-4xl">Popular Blog Categories </h5>

      </div>
      <div className="flex items-center flex-wrap pt-5 gap-10 md:gap-36  justify-center ">
        {data?.map((item) => (

          <Link
            href={`/blogpage#${item.title}`}

            key={item._id}
          >
            <div className="flex flex-col hover:scale-110 justify-center pt-8  items-center">

              {item.img && (
                <img className="rounded-full w-16 h-16  md:w-32 md:h-32"
                  src={item.img}
                  alt=""



                />
              )}
              <h3 className=" text-2xl md:text-3xl pt-4 font-semibold">

                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default CategoryList;
