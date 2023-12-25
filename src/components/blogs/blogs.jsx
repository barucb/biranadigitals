import Link from 'next/link';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import Image from "next/image"


export const BlogCard = ({ props }) => {
  return (
    <div key={props.id} className={"border-[#fc7405] mt-8  rounded-2xl  px-4 border-2  hover:scale-105 transition-transform transform  p-1 shadow-md shadow-red-400"}>
      <Image src={props?.img || "/logo.png"} alt={props?.title} className="w-full rounded-t-2xl pt-2 object-cover h-60 " />
      <h2 className="text-xl pt-2  font-bold">{props?.title}</h2>
      <span>{props?.createdAt?.substring(0, 10)}</span>

      <p className='pt-2'
        dangerouslySetInnerHTML={{ __html: props?.desc?.substring(0, 60) + "..." || "" }}
      />
      <div className='flex justify-between font-semibold'>
        <div className='flex text-blue-700 gap-1'>
          <FaEye size={20} className='pt-1' />
          {props?.views}
        </div>
        <div className='text-red-600 bg-white px-2 rounded-lg mb-2'>

          {props?.catSlug}
        </div>
      </div>
    </div>
  )
}

const Blogs = async ({ num }) => {
  const data = await fetch("http://biranadigitals.vercel.app/api/homepageposts")
  const BlogsList = await data.json()
  // Ensure that BlogsList is available before rendering
  if (!BlogsList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col mx-2 my-4 pt-60 lg:pt-96">


        <h4 className="sm:pl-5 mb-3 mt-5 text-3xl font-bold sm:text-4xl">Recent Blogs</h4>
        <div className="hidden sm:grid  sm:grid-cols-2 gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {BlogsList?.map((blog) => (
            <Link key={blog.id} className='pt-5' href={`/posts/${blog?.slug}`}>

              <BlogCard props={blog} />
            </Link>
          ))}
        </div>
        <div className="px- w-full sm:hidden grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {BlogsList?.slice(0, num).map((blog) => (
            <Link key={blog.id} href={`/posts/${blog?.slug}`}>

              <BlogCard props={blog} />
            </Link>
          ))}
        </div>



        <div className="flex justify-center">
          <Link href="/blogpage">
            <button className="my-12 py-2 px-5 text-[18px] border border-[#fc7405] hover:bg-[#fc7405] duration-200 rounded p-2 font-semibold ">See More Blogs ...  </button>
          </Link>
        </div>
      </div>
    </>
  );
};



export default Blogs;


// export async function getServerSideProps() {
//   try {
//     const res = await fetch('http://biranadigitals.vercel.app/api/homepageposts');

//     if (!res.ok) {
//       console.error("Error fetching data. Status:", res.status);
//       return {
//         notFound: true,
//       };
//     }

//     const BlogsList = await res.json();

//     return {
//       props: {
//         BlogsList,
//       },
//     };
//   } catch (error) {
//     console.error("Error in getServerSideProps:", error);

//     return {
//       props: {
//         BlogsList: null,
//       },
//     };
//   }
// }